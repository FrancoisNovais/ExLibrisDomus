import Joi from "joi";

export const createBorrowSchema = Joi.object({
    status: Joi.string().valid('ongoing', 'returned', 'late').required(),
    borrow_date: Joi.date().required(),
    return_date: Joi.date().allow(null),
    id_book: Joi.number().integer().required(),
    id_borrower: Joi.number().integer().required(),
});

export const updateBorrowSchema = Joi.object({
    status: Joi.string().valid('ongoing', 'returned', 'late'),
    borrow_date: Joi.date(),
    return_date: Joi.date().allow(null),
    id_book: Joi.number().integer(),
    id_borrower: Joi.number().integer(),
}).min(1);
