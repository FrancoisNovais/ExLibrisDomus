import sequelize from "./sequelize.client.js";
import { DataTypes, Model } from "sequelize";

/**
 * A Genre
 * @typedef {object} Genre
 * @property {string} label.required - Label of the genre
 */

class Genre extends Model {}

Genre.init(
  {
    category: { type: DataTypes.TEXT, allowNull: false, unique: true },
  },
  { sequelize, tableName: "genre" }
);

export default Genre;
