const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET

exports.verify = (req, res, next) => {
    const auth = req.headers.authorization;
    if (!auth?.startsWith('Bearer '))
        return res.status(401).json({ error: 'Kein Token'})
    try {
        req.user = jwt.verify(auth.split(' ')[1], SECRET);
        next();
    } catch (error) {
        res.status(403).jos({ error: 'Token ungültig'})
    }
}