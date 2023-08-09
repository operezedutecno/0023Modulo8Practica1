const Sequelize = require("sequelize")

const conexion = new Sequelize("blog0023", "postgres", "sasdasdas", {
    dialect: "postgres",
    host: "localhost",
    port: 5432
})

module.exports = conexion