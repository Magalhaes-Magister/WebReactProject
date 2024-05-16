from flask import Flask, request
from pymongo import MongoClient
from flask_cors import CORS
from bson import ObjectId, json_util
import json

app = Flask(__name__)
CORS(app)

client = MongoClient('mongodb+srv://iagms:uHj56fJdlWHTurVd@clusterprojeto.ca1xd8i.mongodb.net/',tls=True,tlsAllowInvalidCertificates=True)
db = client["Projeto_livraria"]

def parse_json(data):
    return json.loads(json_util.dumps(data))

@app.route("/books", methods=["GET"])
def get_books():
    page = int(request.args.get('page'))
    limit = int(request.args.get('limit'))
    skip = (page-1)*limit
    books = db.books.find().skip(skip).limit(limit)
    books_list = list(books)
    return parse_json(books_list), 200

@app.route("/books/<id>", methods=["GET"])
def get_book_id(id):
    book =  db.books.find_one({"_id": ObjectId(id)})
    return parse_json(book), 200

@app.route("/books/total", methods=["GET"])
def get_total_books():
    total = db.books.count_documents({})
    return {'Total': total}

@app.route("/books/autor/<autor>", methods=["GET"])
def get_books_autor(autor):
    page = int(request.args.get('page'))
    limit = int(request.args.get('limit'))
    skip = (page-1)*limit
    books = db.books.find({"authors": autor}).skip(skip).limit(limit)
    books_list = list(books)
    return parse_json(books_list), 200
