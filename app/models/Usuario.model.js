const Sequelize = require("sequelize")
const conexion = require("./../config/Conexion.config")

const Usuario = conexion.define("usuarios", {
    usuario: {
        type: Sequelize.STRING(20),
        allowNull: false,
        unique: true
    },
    contrasena: {
        type: Sequelize.STRING,
        allowNull: false
    }
})
module.exports = Usuario