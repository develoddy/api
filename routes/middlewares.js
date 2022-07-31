const moment = require('moment');
const jwt = require('jwt-simple');

const checkToken = (req, res, next) => {

    // if( !req.headers['user-token'] ) {
    //     return res.json({ error: 'Necesitas incluir el user-token en la cabecera' });
    // }

    if( !req.headers['authorization'] ) {
        return res.json({ error: 'Necesitas incluir el user-token en la cabecera' });
    }
    //req.headers['authorization'];
    const bearer = req.headers['authorization'].split(' ');
    const bearerToken = bearer[1];
    const userToken = bearerToken; 
    let payload = {};

    try {
        payload = jwt.decode(userToken, 'frase secreta');
    } catch (err) {
        return res.json({ error: 'El token es incorrecto' });
    }

    if (payload.expiredAt < moment().unix() ) {
        return res.json({ error: 'El token ha expirado' });
    }

    req.userId = payload.userId;
    
    next();
}

module.exports = {
    checkToken: checkToken
}