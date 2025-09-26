import { Sequelize } from "sequelize";

const { PGUSER, PGPASSWORD, PGDATABASE, PGHOST } = process.env;

const sequelize = new Sequelize(PGDATABASE, PGUSER, PGPASSWORD, {
  host: PGHOST,
  dialect: "postgres",
  define: {
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
  logging: false,
});

try {
  await sequelize.authenticate();
  console.log("🔌 Connection has been established successfully.");
} catch (error) {
  console.error("❌ Unable to connect to the database:", error);
}

export default sequelize;