import sequelize from "./sequelize.client.js";
import { DataTypes, Model } from "sequelize";

class Shelf extends Model {}

Shelf.init(
  {
    label: { type: DataTypes.TEXT, allowNull: false, unique: true },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.DATE },
  },
  { sequelize, tableName: "shelf" }
);

export default Shelf;
