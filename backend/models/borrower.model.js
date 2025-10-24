import sequelize from "./sequelize.client.js";
import { DataTypes, Model } from "sequelize";

/**
 * A Borrower
 * @typedef {object} Borrower
 * @property {string} email.required - Email of the borrower
 * @property {string} last_name.required - Last name of the borrower
 * @property {string} first_name - First name of the borrower
 * @property {string} phone - Phone number of the borrower
 */

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
