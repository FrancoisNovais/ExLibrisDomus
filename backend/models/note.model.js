import sequelize from "./sequelize.client.js";
import { DataTypes, Model } from "sequelize";

class Note extends Model {}

Note.init(
  {
    page: { type: DataTypes.INTEGER, allowNull: false },
    content: { type: DataTypes.TEXT },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.DATE },
  },
  { sequelize, tableName: "note" }
);

export default Note;
