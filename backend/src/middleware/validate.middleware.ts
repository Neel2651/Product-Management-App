import { Request, Response, NextFunction } from 'express';
import { statusCodes } from '../constants/statusCodes';

const isValidStatus = (value: any): boolean => {
  return ['active', 'archived'].includes(value);
};

export const validateProductBody = (req: Request, res: Response, next: NextFunction) => {
  const { name, price, status, tags } = req.body;

  const errors: string[] = [];

  if (typeof name !== 'string' || name.trim().length === 0) {
    errors.push('Name must be a non-empty string.');
  }

  if (typeof price !== 'number' || price < 0) {
    errors.push('Price must be a positive number.');
  }

  if (!isValidStatus(status)) {
    errors.push('Status must be either "active" or "archived".');
  }

  if (!Array.isArray(tags) || !tags.every((tag) => typeof tag === 'string')) {
    errors.push('Tags must be an array of strings.');
  }

  if (errors.length > 0) {
    res.status(statusCodes.BAD_REQUEST).json({ errors });
  }

  next();
};
