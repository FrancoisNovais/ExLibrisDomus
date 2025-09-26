import sequelize from "./sequelize.client.js";
import Book from "./book.model.js";
import Author from "./author.model.js";
import Shelf from "./shelf.model.js";
import Genre from "./genre.model.js";
import Note from "./note.model.js";
import Borrow from "./borrow.model.js";
import Borrower from "./borrower.model.js";

// Book -> Author, Shelf, Genre
Book.belongsTo(Author, { as: "author", foreignKey: "id_author" });
Author.hasMany(Book, { as: "books", foreignKey: "id_author" });

Book.belongsTo(Shelf, { as: "shelf", foreignKey: "id_shelf" });
Shelf.hasMany(Book, { as: "books", foreignKey: "id_shelf" });

Book.belongsTo(Genre, { as: "genre", foreignKey: "id_genre" });
Genre.hasMany(Book, { as: "books", foreignKey: "id_genre" });

// Book -> Note
Book.hasMany(Note, { as: "notes", foreignKey: "id_book" });
Note.belongsTo(Book, { as: "book", foreignKey: "id_book" });

// Book -> Borrow
Book.hasMany(Borrow, { as: "borrows", foreignKey: "id_book" });
Borrow.belongsTo(Book, { as: "book", foreignKey: "id_book" });

// Borrow -> Borrower
Borrow.belongsTo(Borrower, { as: "borrower", foreignKey: "id_borrower" });
Borrower.hasMany(Borrow, { as: "borrows", foreignKey: "id_borrower" });

export {
  sequelize,
  Book,
  Author,
  Shelf,
  Genre,
  Note,
  Borrow,
  Borrower,
};
