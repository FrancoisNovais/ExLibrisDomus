import sequelize from "./sequelize.client.js";
import { DataTypes, Model } from "sequelize";

class Shelf extends Model {}

Shelf.init(
  {
    label: { type: DataTypes.TEXT, allowNull: false, unique: true },
  },
  { sequelize, tableName: "shelf" }
);

export default Shelf;
