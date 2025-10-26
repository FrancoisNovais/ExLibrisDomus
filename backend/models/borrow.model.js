import sequelize from "./sequelize.client.js";
import { DataTypes, Model } from "sequelize";

/**
 * A Borrow
 * @typedef {object} Borrow
 * @property {string} status.required - Borrow status ('ongoing', 'returned', 'late')
 * @property {Date} borrow_date.required - Date when the book was borrowed
 * * @property {string} return_date - Date when the book was returned (format: YYYY-MM-DD)
 * @property {number} id_book.required - ID of the book being borrowed
 * @property {number} id_borrower.required - ID of the borrower
 */


class Borrow extends Model {}

Borrow.init(
  {
    status: {
      type: DataTypes.ENUM("ongoing", "returned", "late"),
      allowNull: false,
    },
    borrow_date: { type: DataTypes.DATE, allowNull: false },
    return_date: { type: DataTypes.DATE },
  },
  { sequelize, tableName: "borrow" }
);

export default Borrow;
