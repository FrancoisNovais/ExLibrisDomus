import sequelize from "./sequelize.client.js";
import { DataTypes, Model } from "sequelize";

/**
 * A Book
 * @typedef {object} Book
 * @property {string} title.required - Book title
 * @property {integer} year - Year of publication
 * @property {integer} pages - Number of pages
 * @property {string} language - Language of the book
 * @property {integer} rating - Rating from 1 to 5
 * @property {string} cover - URL of the book cover
 * @property {boolean} favorite - Whether the book is a favorite (default: false)
 * @property {string} synopsis - Short summary of the book
 * @property {string} analysis - Detailed analysis
 * @property {boolean} read - Whether the book has been read (default: false)
 * @property {string} created_at - Creation date (ISO string)
 * @property {string} updated_at - Last update date (ISO string)
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
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    tableName: "book",
  }
);

export default Book;
