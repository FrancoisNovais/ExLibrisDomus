import { StatusCodes } from "http-status-codes";
import HTTPError from "../errors/httpError.js";

export default function Handler404(_, res) {
  throw new HTTPError(StatusCodes.NOT_FOUND, "Resource non trouvée");
}