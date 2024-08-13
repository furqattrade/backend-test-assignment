import { body } from 'express-validator';

export const deductBalanceValidator = [
  body('userId')
    .isInt({ gt: 0 })
    .withMessage('User ID must be a positive integer')
    .custom((value) => {
      if (!Number.isInteger(value)) {
        throw new Error('User ID must be a valid integer');
      }
      return true;
    }),
  body('amount')
    .isFloat({ gt: 0 })
    .withMessage('Amount must be a positive number')
    .custom((value) => {
      if (value <= 0) {
        throw new Error('Amount must be greater than zero');
      }
      return true;
    })
];
