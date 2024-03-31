import { Request, Response, NextFunction } from 'express';
import { CheckRole } from '../controllers/user.controller';

export const IsManager = (req: Request, res: Response, next: NextFunction) => {
    const user = CheckRole(req, res);
    if (typeof user === 'object' && 'role' in user && (user.role === 'manager' || user.role === 'admin')) {
        next();
    } else {
        return res.status(401).json({ message: 'Unauthorized' });
    }
}