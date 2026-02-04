const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const authHeader = req.header('Authorization');
    const token = authHeader ? authHeader.replace('Bearer ', '') : null;

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        const secret = process.env.JWT_SECRET || 'secretkey';
        const decoded = jwt.verify(token, secret);

        // Handle both token formats: { user: {...} } and direct { id, role }
        req.user = decoded.user || decoded;

        // normalize role to lowercase to avoid case mismatches
        if (req.user && req.user.role) {
            req.user.role = String(req.user.role).toLowerCase();
        }

        if (!req.user.id) {
            return res.status(401).json({ message: 'Invalid token structure' });
        }

        next();
    } catch (err) {
        console.error('JWT verification error:', err.message);
        res.status(401).json({ message: 'Token is not valid: ' + err.message });
    }
};

const roleAuth = (roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Access denied' });
        }
        next();
    };
};

module.exports = { auth, roleAuth };