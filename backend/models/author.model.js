import sequelize from "./sequelize.client.js";
import { DataTypes, Model } from "sequelize";

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
