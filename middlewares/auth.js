const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');

module.exports = (request, response, next) => {
    const authHeader = request.headers.authorization;

    if(!authHeader)
        return response.status(401).send({ erro: "No token provide" });
    
    const parts = authHeader.split(' ');

    if(!parts.length === 2)
        return response.status(401).send({ erro: "Token error" });

    const [ scheme, token ] = parts;

    if(!/^Bearer$/i.test(scheme))
        return response.status(401).send({ erro: "Token malformatted" });
    
    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if(err) return response(401).send({ erro: "Toekn invalid" });

        request.userId = decoded.id;
        return next();
    });
};