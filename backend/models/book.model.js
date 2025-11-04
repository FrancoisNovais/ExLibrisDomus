import sequelize from "./sequelize.client.js";
import { DataTypes, Model } from "sequelize";

/**
 * A Book
 * @typedef {object} Book
 * @property {string} title.required - Book title
 * @property {integer} year - Year of publication (e.g. 1999)
 * @property {integer} pages - Number of pages (must be positive)
 * @property {string} language - Language of the book (e.g. "English", "French")
 * @property {integer} rating - Rating from 1 to 5
 * @property {string} cover - URL of the book cover (must be a valid URI)
 * @property {boolean} favorite - Whether the book is a favorite (default: false)
 * @property {string} synopsis - Short summary of the book
 * @property {string} analysis - Detailed analysis or review
 * @property {boolean} read - Whether the book has been read (default: false)
 * @property {integer} id_author - Foreign key referencing the author
 * @property {integer} id_shelf - Foreign key referencing the shelf
 * @property {integer} id_genre - Foreign key referencing the genre
 */

/**
 * @typedef {object} BookAdvanced
 * @property {string} title.required - Titre du livre
 * @property {integer} year - Année de publication
 * @property {integer} pages - Nombre de pages
 * @property {string} language - Langue du livre
 * @property {integer} rating - Note du livre
 * @property {string} cover - URL de la couverture
 * @property {boolean} favorite - Livre favori
 * @property {string} synopsis - Synopsis du livre
 * @property {string} analysis - Analyse ou commentaire
 * @property {boolean} read - Lu ou non
 * @property {integer} [id_author] - ID auteur existant
 * @property {object} [author] - Auteur à créer si id_author non fourni
 * @property {string} author.first_name - Prénom de l'auteur
 * @property {string} author.last_name - Nom de l'auteur
 * @property {string} [author.birth_date] - Date de naissance
 * @property {integer} [id_genre] - ID genre existant
 * @property {string} [genre] - Nom du genre à créer si id_genre non fourni
 * @property {integer} [id_shelf] - ID étagère
 */


class Book extends Model {}

Book.init(
  {
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    year: {
      type: DataTypes.INTEGER,
    },
    pages: {
      type: DataTypes.INTEGER,
    },
    language: {
      type: DataTypes.TEXT,
    },
    rating: {
      type: DataTypes.INTEGER,
      validate: {
        min: 1,
        max: 5,
      },
    },
    cover: {
      type: DataTypes.TEXT,
    },
    favorite: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    synopsis: {
      type: DataTypes.TEXT,
    },
    analysis: {
      type: DataTypes.TEXT,
    },
    read: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    tableName: "book",
  }
);

export default Book;
