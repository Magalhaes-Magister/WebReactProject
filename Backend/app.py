from flask import Flask
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

    books = db.books.find()
    books_list = list(books)
    return parse_json(books_list), 200