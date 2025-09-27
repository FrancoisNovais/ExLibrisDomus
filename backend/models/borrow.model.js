import sequelize from "./sequelize.client.js";
import { DataTypes, Model } from "sequelize";

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
