const jwt = require("node.jwt")
const secret = jwt.secret("blog0023")

exports.validarToken = (token) => {
    const dataUsuario = jwt.decode(token,secret)
    return dataUsuario
}