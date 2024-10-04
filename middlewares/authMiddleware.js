// authMiddleware.js
const jwt = require('jsonwebtoken');

exports.authMiddleware = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }

    // Extract token if it has the 'Bearer' prefix
    jwt.verify(token.split(' ')[1], process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized: Invalid or expired token' });
        }

        req.userId = decoded.id;
        req.userRole = decoded.role;
        next();
    });
};
