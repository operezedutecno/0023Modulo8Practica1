const conexion = require("./../config/Conexion.config")

const db = {
    conexion,
    usuarios: require("./Usuario.model"),
    posts: require("./Post.model")
}

db.usuarios.hasMany(db.posts, {
    as: "posts",
    foreignKey: "usuario_id"
})

db.posts.belongsTo(db.usuarios, {
    as: "usuario",
    foreignKey: "usuario_id"
})
module.exports = db