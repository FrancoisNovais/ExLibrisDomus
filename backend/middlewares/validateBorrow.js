import { Borrow } from "../models/index.js";

export default async function validateBorrow(req, res, next) {
  const { itemId } = req.params;
  let borrowDate;

  if (req.method === "PATCH") {
    const borrow = await Borrow.findByPk(itemId);
    if (!borrow) {
      return res.status(404).json({ message: "Borrow not found" });
    }
    borrowDate = borrow.borrow_date;
  } else if (req.method === "POST") {
    borrowDate = req.body.borrow_date;
  }

  const { return_date } = req.body;
  if (return_date && borrowDate && new Date(return_date) < new Date(borrowDate)) {
    return res.status(400).json({
      message: "return_date cannot be earlier than borrow_date",
    });
  }

  next();
}
