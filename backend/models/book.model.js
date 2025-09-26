import sequelize from "./sequelize.client.js";
import { DataTypes, Model } from "sequelize";

class Book extends Model {}

Book.init(
  {
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    year: {
      type: DataTypes.INTEGER,
    },
    pages: {
      type: DataTypes.INTEGER,
    },
    language: {
      type: DataTypes.TEXT,
    },
    rating: {
      type: DataTypes.INTEGER,
      validate: {
        min: 1,
        max: 5,
      },
    },
    cover: {
      type: DataTypes.TEXT,
    },
    favorite: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    synopsis: {
      type: DataTypes.TEXT,
    },
    analysis: {
      type: DataTypes.TEXT,
    },
    read: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    tableName: "book",
  }
);

export default Book;
