from flask import Flask, request, jsonify
from pymongo import MongoClient
from flask_cors import CORS
from bson import ObjectId, json_util
from datetime import datetime, timedelta
from functools import wraps
import jwt
import json
import ast

app = Flask(__name__)
CORS(app)


app.config['SECRET_KEY'] = 'SEGREDO'

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

client = MongoClient('mongodb+srv://iagms:uHj56fJdlWHTurVd@clusterprojeto.ca1xd8i.mongodb.net/',tls=True,tlsAllowInvalidCertificates=True)
db = client["Projeto_livraria"]

def parse_json(data):
    return json.loads(json_util.dumps(data))

@app.route("/books", methods=["GET", "POST", "DELETE", "PUT"])
def get_books():
    if request.method == "GET":
        page = int(request.args.get('page'))
        limit = int(request.args.get('limit'))
        skip = (page-1)*limit
        books = db.books.find().skip(skip).limit(limit)
        books_list = list(books)
        return parse_json(books_list), 200

    elif request.method == "POST":
        books = request.json
        if type(books) != list: books = [books]
        db.books.insert_many(books)
        return 'The book was added', 200

    elif request.method == "DELETE":
        return

@app.route("/books/<id>", methods=["GET"])
def get_book_id(id):
    book =  db.books.find_one({"_id": ObjectId(id)})
    return parse_json(book), 200

@app.route("/books/total", methods=["GET"])
def get_total_books():
    total = db.books.count_documents({})
    return {'Total': total}, 200

@app.route("/books/autor/<autor>", methods=["GET"])
def get_books_autor(autor):
    page = int(request.args.get('page'))
    limit = int(request.args.get('limit'))
    skip = (page-1)*limit
    books = db.books.find({"authors": autor}).skip(skip).limit(limit)
    books_list = list(books)
    return parse_json(books_list), 200

@app.route("/books/ano/<int:ano>", methods=["GET"])
def get_books_year(ano):
    page = int(request.args.get('page'))
    limit = int(request.args.get('limit'))
    skip = (page-1)*limit
    ano_inicial = datetime(ano, 1, 1)
    ano_fim = datetime(ano, 12, 31)
    books = db.books.find({"publishedDate":{"$gte": ano_inicial, "$lte": ano_fim}}).skip(skip).limit(limit)
    books_list = list(books)
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
            'exp': datetime.utcnow() + timedelta(minutes=1)
            }, app.config['SECRET_KEY'], algorithm="HS256")

        return jsonify({'token': token}), 200