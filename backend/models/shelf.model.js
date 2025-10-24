import sequelize from "./sequelize.client.js";
import { DataTypes, Model } from "sequelize";

/**
 * A Shelf
 * @typedef {object} Shelf
 * @property {string} label.required - Label of the shelf
 */

class Shelf extends Model {}

Shelf.init(
  {
    label: { type: DataTypes.TEXT, allowNull: false, unique: true },
  },
  { sequelize, tableName: "shelf" }
);

export default Shelf;
