import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';

export const requireAuth = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Authorization token required or malformed' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
        const userId = decodedToken._id;

        // Fetch user details and attach to request object
        req.user = await User.findById(userId).select('_id');
        if (!req.user) {
            return res.status(401).json({ error: 'User not found' });
        }

        next();
    } catch (err) {
        console.error('JWT verification error:', err);
        return res.status(401).json({ error: 'Invalid token' });
    }
};
