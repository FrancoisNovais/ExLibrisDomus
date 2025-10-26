import { StatusCodes } from "http-status-codes";

export default function errorHandler(err, _, res, __) {
  // Utilise le code d’erreur défini ou 500 par défaut
  let statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  let message = err.errors?.[0]?.message || err.message;

  // Gestion spécifique des erreurs Sequelize
  if (err.name === "SequelizeConnectionRefusedError") {
    message = "Connexion à la base de données impossible";
  } else if (err.name === "SequelizeUniqueConstraintError") {
    statusCode = StatusCodes.CONFLICT; // 409
    const field = err.errors[0].path;
    message = `A ${field} with this value already exists`;
  }
  res.status(statusCode).json({ message });
}
