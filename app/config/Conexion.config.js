const Sequelize = require("sequelize")

const conexion = new Sequelize("blog0023", "tu usuario", "tu contraseña", {
    dialect: "postgres",
    host: "localhost",
    port: 5432
})

module.exports = conexion