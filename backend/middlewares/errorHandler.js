import { StatusCodes } from "http-status-codes";

export default function errorHandler(err, _, res, __) {
  console.log(JSON.stringify(err, null, 4));
  const statusCode = err.statusCode
    ? err.statusCode
    : StatusCodes.INTERNAL_SERVER_ERROR;
  let message;
  if (err?.name === "SequelizeConnectionRefusedError") {
    message = "Connexion à la base de données impossible";
  } else {
    message = err.errors?.[0] ? err.errors[0].message : err.message;
  }
  res.status(statusCode).json({ message });
}