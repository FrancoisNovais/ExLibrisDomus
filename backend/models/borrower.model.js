import sequelize from "./sequelize.client.js";
import { DataTypes, Model } from "sequelize";

class Borrower extends Model {}

Borrower.init(
  {
    email: { type: DataTypes.TEXT, allowNull: false, unique: true },
    last_name: { type: DataTypes.TEXT, allowNull: false },
    first_name: { type: DataTypes.TEXT },
    phone: { type: DataTypes.TEXT },
  },
  { sequelize, tableName: "borrower" }
);

export default Borrower;
