import Joi from "joi";

export const createBorrowSchema = Joi.object({
    status: Joi.string().valid('ongoing', 'returned', 'late').required(),
    borrow_date: Joi.date().required(),
    return_date: Joi.date().min(Joi.ref('borrow_date')).allow(null),
    id_book: Joi.number().integer().required(),
    id_borrower: Joi.number().integer().required(),
});

