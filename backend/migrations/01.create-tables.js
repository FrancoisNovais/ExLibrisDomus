import "dotenv/config";
import { sequelize } from "../models/index.js";

console.log("🚧 Définition des tables...");
await sequelize.sync({ force: true });
console.log(
  "🗃️  Structure de la base de données : ",
  await sequelize.getQueryInterface().showAllTables()
);
console.log("✅ Migration OK ! Fermeture de la base...");
await sequelize.close();