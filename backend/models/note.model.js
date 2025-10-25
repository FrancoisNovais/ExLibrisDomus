import sequelize from "./sequelize.client.js";
import { DataTypes, Model } from "sequelize";

/**
 * A Note
 * @typedef {object} Note
 * @property {number} page.required - Page number the note refers to
 * @property {string} content - Content of the note
 * @property {number} id_book.required - ID of the book the note belongs to
 */

class Note extends Model {}

Note.init(
  {
    page: { type: DataTypes.INTEGER, allowNull: false },
    content: { type: DataTypes.TEXT },
  },
  { sequelize, tableName: "note" }
);

export default Note;
