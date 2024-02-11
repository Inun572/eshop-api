import { NextFunction, Request, Response } from 'express';

export const validateParams = (param: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.params[param]) {
      return res.status(400).json({
        message: `Parameter ${param} is required`,
      });
    }

    if (param === 'id') {
      if (isNaN(Number(req.params[param]))) {
        return res.status(400).json({
          message: `Please provide a valid ${param}`,
        });
      }
    }

    next();
  };
};
