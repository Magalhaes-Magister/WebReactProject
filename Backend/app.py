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

        return func(*args, **kwargs)
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
    books = request.json
    if type(books) != list: books = [books]
    db.books.insert_many(books)
    return 'The book was added', 200

@app.route("/books/<id>", methods=["DELETE", "PUT"])
@token_required
def delete_put_books(id):
    return

@app.route("/books/total", methods=["GET"])
def get_total_books():
    total = db.books.count_documents({})
    return {'Total': total}, 200

@app.route("/books/autor/<autor>", methods=["GET"])
def get_books_autor(autor):
    query = {"authors": autor}
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
        return "Utilizador não tem autorização", 405
    else:
        token = jwt.encode({
            'username': dados['username'],
            'exp': datetime.utcnow() + timedelta(minutes=5)
            }, app.config['SECRET_KEY'], algorithm="HS256")

        return jsonify({'token': token}), 200