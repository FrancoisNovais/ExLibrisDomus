import sequelize from "./sequelize.client.js";
import { DataTypes, Model } from "sequelize";

class Genre extends Model {}

Genre.init(
  {
    category: { type: DataTypes.TEXT, allowNull: false, unique: true },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.DATE },
  },
  { sequelize, tableName: "genre" }
);

export default Genre;
