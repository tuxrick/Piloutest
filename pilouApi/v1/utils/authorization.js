const jwt = require('jsonwebtoken');

// middleware to validate token
module.exports = {

    verifyToken: async (req, res, next) => {

        const authorizationHeader = req.headers.authorization;
        let result;
        if (authorizationHeader) {
            const token = req.headers.authorization.split(' ')[1]; // Bearer <token>
            const options = {
                expiresIn: '90d',
            };
            try {
                // verify makes sure that the token hasn't expired and has been issued by us
                result = jwt.verify(token, process.env.TOKEN_SECRET, options);
                
                // Let's pass back the decoded token to the request object
                req.decoded = result;
                req.token = token;
                // We call next to pass execution to the subsequent middleware
                next(); 

            } catch (err) {
                return res.status(401).send({
                    err: err,
                    message:"Can't validate token",
                    status: "error"
                });
            }
        } else {
            return res.status(401).send({
                message:"Token not found",
                status: "error"
            });
        }    

    },
}