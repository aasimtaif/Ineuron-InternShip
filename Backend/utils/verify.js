import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(" ")[1]
    if (!token) {
        res.status(401).json({ error: 'Unauthorized' });
    }

    jwt.verify(token, process.env.JWT, (err, user) => {
        if (err) {
            res.status(401).json({ error: 'Unauthorized' });
        }
        req.user = user;
        next();
    });
};

export const verifyUser = (req, res, next) => {
    verifyToken(req, res, next, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next();
        } else {
            res.status(401).json({ error: 'Unauthorized' });
        }
    });
};

export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, next, () => {
        if (req.user.isAdmin) {
            next();
        } else {
            res.status(401).json({ error: 'Unauthorized' });
            return;
        }
    });
};