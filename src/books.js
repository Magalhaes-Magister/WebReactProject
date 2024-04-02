import Books from './db.json'
export const BOOKS = Books.books.filter(x => x.id !== "120a");