const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;
const authentication = async (req, res, next) => {
    try {
        const token = req.headers.token;
        const authenticated = await jwt.verify(token, secret)
        console.log(authenticated)
        if(authenticated) return next()
        
    } catch (error) {
        return res.status(400).json({
            msg: 'Authentication Failed',
            error: error.message
        })
    }
}

module.exports = authentication