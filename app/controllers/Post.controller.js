const db = require("./../models/index")
const { posts } = db

exports.crearPost = async(datosPost, idUsuario) => {
    const registro = await posts.create({ ...datosPost, usuario_id: idUsuario})
    return registro;
}

exports.listarPosts = async(idUsuario) => {
    const listado = await posts.findAll({ where: { usuario_id: idUsuario}})
    return listado
}

exports.consultarPost = async(idPost, idUsuario) => {
    const post = await posts.findOne({ where: { id: idPost, usuario_id: idUsuario}})
    return post
}

exports.actualizarPost = async (idPost, datosPost, idUsuario) => {
    const post = await posts.findByPk(idPost)
    if(!datosPost.titulo) {
        throw "Enviar el título del post"
    }
    if(!datosPost.cuerpo) {
        throw "Enviar el cuerpo del post"
    }
    if(!post) {
        throw "Id de post no registrado"
    }

    if(Number(post.usuario_id) !== Number(idUsuario)) {
        throw "No tiene permisos para actualizar este post"
    }

    await post.update(datosPost)
    return post
}

exports.eliminarPost = async (idPost, idUsuario) => {
    const post = await posts.findByPk(idPost)
    if(!post) {
        throw "Id de Post no registrado"
    }

    if(Number(post.usuario_id) !== Number(idUsuario)) {
        throw "No tiene permisos para eliminar este post"
    }

    await post.destroy()
    return post
}