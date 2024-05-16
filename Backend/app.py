from flask import Flask, jsonify
from pymongo import MongoClient
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)

client = MongoClient('mongodb+srv://iagms:uHj56fJdlWHTurVd@clusterprojeto.ca1xd8i.mongodb.net/',tls=True,tlsAllowInvalidCertificates=True)
db = client["Projeto_livraria"]

@app.route("/books", methods=["GET"])
def get_books():

    book = db.books.find()
    return json.dumps(list(book), default=str)