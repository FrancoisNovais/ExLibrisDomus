import sequelize from "./sequelize.client.js";
import { DataTypes, Model } from "sequelize";

class Note extends Model {}

Note.init(
  {
    page: { type: DataTypes.INTEGER, allowNull: false },
    content: { type: DataTypes.TEXT },
  },
  { sequelize, tableName: "note" }
);

export default Note;
