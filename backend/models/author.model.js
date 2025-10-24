import sequelize from "./sequelize.client.js";
import { DataTypes, Model } from "sequelize";

/**
 * An Author
 * @typedef {object} Author
 * @property {string} first_name - First name of the author
 * @property {string} last_name.required - Last name of the author
 * @property {Date} birth_date - Birth date of the author (e.g. "1970-01-01")
 */

class Author extends Model {}

Author.init(
  {
    first_name: { type: DataTypes.TEXT },
    last_name: { type: DataTypes.TEXT, allowNull: false },
    birth_date: { type: DataTypes.DATE },
  },
  { sequelize, tableName: "author" }
);

export default Author;
