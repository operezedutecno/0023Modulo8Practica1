const jwt = require("node.jwt")
const { secret } = require("./../config/auth.config") 
const keySecret = jwt.secret(secret)

const verifyToken = (request, response, next) => {
    const token = request.headers.authorization
    const dataUsuario = jwt.decode(token, keySecret)
    console.log(dataUsuario);

    if(dataUsuario.code !== '000') {
        return response.status(403).json({success: false, message: "Token inválido"})
    }

    request.conectado = dataUsuario.payload
    next()
}
module.exports = verifyToken