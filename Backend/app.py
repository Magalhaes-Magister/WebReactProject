from flask import Flask, request, jsonify
from pymongo import MongoClient
from flask_cors import CORS
from bson import ObjectId, json_util
from datetime import datetime, timedelta
from functools import wraps
import jwt
import json
import ast
import math

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

app.config['SECRET_KEY'] = '303100f962cd65d687b93398530b87015d9180c7740b657bf2030e0a2af40940'
client = MongoClient('mongodb+srv://iagms:uHj56fJdlWHTurVd@clusterprojeto.ca1xd8i.mongodb.net/',tls=True,tlsAllowInvalidCertificates=True)
db = client["Projeto_livraria"]

def token_required(func):
    @wraps(func)
    def decorated(*args, **kwargs):
        token = request.args.get('token')
        if not token:
            return jsonify({'message': 'Token is missing!'}), 401

        try:
            data = jwt.decode(token, app.config["SECRET_KEY"], algorithms=["HS256"])
        except jwt.ExpiredSignatureError:
            return jsonify({'expirado': True}), 401
        except jwt.InvalidTokenError:
            return jsonify({'message': 'Token Inválido'}), 401
        return func(data, *args, **kwargs)
    return decorated


def parse_json(data):
    return json.loads(json_util.dumps(data))

def handle_pagination(query, request):
    if request.args.get('page') != None or request.args.get('limit') != None:
        page = int(request.args.get('page'))
        limit = int(request.args.get('limit'))
        last = math.ceil(len(list(db.books.find(query)))/limit)
        if page <= last:
            skip = (page-1)*limit
            books = db.books.find(query).skip(skip).limit(limit)
            previous = 0
            next = 0
            previous = page-1 if page > 1 else None
            next = page+1 if page < last else None
            books_pages = {"books": books,"pages": {"current": page, "previous": previous, "next": next, "last": last, "total": len(list(db.books.find(query)))}}
            return books_pages
        else:
            return jsonify({'error: Página não acessível'}),
    else:
        books = db.books.find(query)
        return {"books": books}

@app.route("/books/<id>", methods=["GET"])
def get_book_id(id):
    try:
        book = db.books.find_one({"_id": ObjectId(id)})
        if book:
            return parse_json(book), 200
        else:
            return jsonify({"error": "Livro não encontrado"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route("/books", methods=["GET"])
def get_books():
    query = {}
    books_list = handle_pagination(query, request)
    return parse_json(books_list), 200

@app.route("/books", methods=["POST"])
@token_required
def post_books():
    print(request.args)
    books = request.json
    if type(books) != list: books = [books]
    db.books.insert_many(books)
    return 'The book was added', 200

@app.route("/books/total", methods=["GET"])
def get_total_books():
    total = db.books.count_documents({})
    return {'Total': total}, 200

@app.route("/books/autor/<autor>", methods=["GET"])
def get_books_autor(autor):
    query = {"authors": {'$regex': autor, '$options': 'i'}}
    books_list = handle_pagination(query, request)
    return parse_json(books_list), 200

@app.route("/books/ano/<int:ano>", methods=["GET"])
def get_books_year(ano):
    ano_inicial = datetime(ano, 1, 1)
    ano_fim = datetime(ano, 12, 31)
    query = {"publishedDate":{"$gte": ano_inicial, "$lte": ano_fim}}
    books_list = handle_pagination(query, request)
    return parse_json(books_list), 200

@app.route("/user/signup", methods=["POST"])
def create_user():
    data = request.json
    if db.user.find_one({"username": data["username"]}) == None:
        data['confirmed'] = False
        data['is_admin'] = False
        db.user.insert_one(data)
        return "Utilizador adicionado", 200
    else:
        return "Utilizador já existe", 409

@app.route("/cart", methods=["POST"])
def add_cart():
    cart = request.json
    print(cart)
    db.cart.insert_one(cart)
    return jsonify(message='Carrinho carregado'), 200

@app.route('/user/login', methods=['POST'])
def login():
    # Fazer Login do user
    # Check se user é válido e se tem o campo confirmation = True
    # Apenas gerir Authentication Token se confirmation = True
    dados = request.json
    user = db.user.find_one({"username": dados["username"]})
    if user == None:
        return "Utilizador não existe", 409
    elif user['password'] != dados['password']:
        return "Password errada", 409
    elif user['confirmed'] == False:
        return "Utilizador não tem autorização", 403
    else:
        token = jwt.encode({
            'username': dados['username'],
            'exp': datetime.utcnow() + timedelta(minutes=5)
            }, app.config['SECRET_KEY'], algorithm="HS256")

        return jsonify({'token': token}), 200



@app.route("/books/featured/", methods=["GET"])
def get_featured_books():
    try:
        top_books_price = db.books.find().sort("price", -1).limit(5)
        if top_books_price:
            return parse_json(list(top_books_price)), 200
        else:
            return jsonify({"error": "Livro não encontrado"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route("/books/categorias/<categoria>/", methods=["GET"])
def get_books_by_category(categoria):
    query = {"categories": {'$regex': categoria, '$options': 'i'}}
    books_list = handle_pagination(query, request)
    return parse_json(books_list), 200


#FAZER!!!
#Tirar os parametos das funções abaixo e colocar tudo a keys e fazer o sort diretamente na query
#Criar a as funções Delete e Post dos books, e a função Confirmation dos users

@app.route("/books/price/<float:min_price>/<float:max_price>", methods=["GET"])
def get_books_by_price(min_price, max_price):
    try:
        order = request.args.get('order', 'asc')
        sort_order = 1 if order == 'asc' else -1

        query = {
            "price": {
                "$gte": min_price,
                "$lte": max_price
            }
        }
        books_list = handle_pagination(query, request, sort=[("price", sort_order)])
        return parse_json(books_list), 200

    except ValueError:
        return jsonify({"error": "Invalid price format"}), 400

    except Exception as e:
        return jsonify({"error": str(e)}), 400



@app.route("/books/score/<float:min_score>/<float:max_score>", methods=["GET"])
def get_books_by_score(min_score, max_score):
    try:
        order = request.args.get('order', 'asc') #podemos tambem meter no link /books/score/<float:min_score>/<float:max_score>/<order> não? - não.
        sort_order = 1 if order == 'asc' else -1

        query = {
            "score": {
                "$gte": min_score,
                "$lte": max_score
            }
        }
        books_list = handle_pagination(query, request, sort=[("score", sort_order)])
        return parse_json(books_list), 200

    except ValueError:
        return jsonify({"error": "Invalid score format"}), 400

    except Exception as e:
        return jsonify({"error": str(e)}), 400




@app.route("/books/<string:id>", methods=["PUT", "DELETE"])
@token_required
def manage_book(data, id):
    try:
        current_user = db.user.find_one({"username": data["username"]})
        if not current_user.get('is_admin'):
            return jsonify({"error": "Admin access required!"}), 403

        if request.method == "PUT":
            request_data = request.json
            book = db.books.find_one({"_id": ObjectId(id)})
            if book:
                db.books.update_one({"_id": ObjectId(id)}, {"$set": request_data})
                return jsonify({"message": "Livro atualizado"}), 200
            else:
                return jsonify({"error": "Livro não encontrado"}), 404

        elif request.method == "DELETE":
            book = db.books.find_one({"_id": ObjectId(id)})
            if book:
                db.books.delete_one({"_id": ObjectId(id)})
                return jsonify({"message": "Livro eliminado"}), 200
            else:
                return jsonify({"error": "Livro não encontrado"}), 404

    except Exception as e:
        return jsonify({"error": str(e)}), 400


@app.route("/user/confirmation", methods=["POST"])
@token_required
def confirm_user_registration(data):
    try:
        current_user = db.user.find_one({"username": data["username"]})
        if not current_user:
            return jsonify({'message': 'Token inválido!'}), 401

        if not current_user.get('is_admin'):
            return jsonify({"error": "Acesso de admin necessário"}), 403

        request_data = request.json
        user = db.user.find_one({"username": request_data["username"]})
        if user:
            db.user.update_one({"username": request_data["username"]}, {"$set": {"confirmed": True}})
            return jsonify({"message": "Utilizador confirmado"}), 200
        else:
            return jsonify({"error": "Utilizador não encontrado"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route("/admin/designate_admin", methods=["POST"])
@token_required
def designate_admin(data):
    try:
        current_user = db.user.find_one({"username": data["username"]})
        if not current_user.get('is_admin'):
            return jsonify({"error": "Acesso de admin necessário"}), 403

        request_data = request.json
        username = request_data.get('username')
        if not username:
            return jsonify({"error": "O nome do utilizador não existe"}), 400

        user = db.user.find_one({"username": username})
        if not user:
            return jsonify({"error": "Utilizador não encontrado"}), 404

        db.user.update_one({"username": username}, {"$set": {"is_admin": True}})

        return jsonify({"message": f"{username} foi aceite como administrador"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500