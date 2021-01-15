const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authConfig = require('../config/auth.json');

class AuthController{
    async register(request, response){
        const { email } = request.body;
        try{
            if(await User.findOne({ email }))
                return response.status(400).send({ erro: 'User already exist' });

            const user = await User.create(request.body);

            user.password = undefined;

            return response.send({ 
                user,
                token: generateToken({ id: user.id }), 
            });
        }
        catch(err) {
            return response.status(400).send({ erro: "Registrations failed" });
        }
    }

    async authenticate(request, response){
        const { email, password } = request.body;

        const user = await User.findOne({ email }).select('+password');

        if(!user)
            return response.status(400).send({ erro: "User not found" });
        
        //console.log(password);
        if(!await bcrypt.compare(password, user.password))
            return response.status(400).send({ erro: "Invalid password" });

        user.password = undefined;

        const token = jwt.sign({ id: user.id }, authConfig.secret, {
            expiresIn: 86400,
        });
        
        return response.send({ 
            user,
            token: generateToken({ id: user.id }), 
        });
    }
}

/* util */
function generateToken(params = {}){
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
    });
}

module.exports = new AuthController();