const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // You'll need to add this user fetch once you implement the User model
        // const user = await User.findOne({ _id: decoded.user.id });
        // if (!user) throw new Error();
        
        req.user = decoded.user;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Not authorized, token failed' });
    }
};

module.exports = auth;