const express = require("express")
const router = express.Router()
const postController = require("./../controllers/Post.controller")
const {validarToken} = require("./../middlewares/validarToken")
const jwt = require("node.jwt")

const secret = jwt.secret("blog0023")

let conectado

router.use((request, response, next) => {
    const token = request.headers.authorization
    const dataUsuario = validarToken(token)
    if(dataUsuario.code !== '000') {
        return response.status(403).json({ success: false, message: "Token inválido" })
    }
    conectado = dataUsuario.payload
    return next();
})

// Listado de Posts
router.get("/", async(request, response) => {
    try {
        const listado = await postController.listarPosts(conectado.id)
        response.json({ success: true, message: "Listado de Posts", data: listado})
    } catch (error) {
        response.status(400).json({ success: false, message:"Error en listado de Posts"})
    }
})

// Mostrar Post específico
router.get("/:id", async(request, response) => {
    try {
        const id = request.params.id
        const post = await postController.consultarPost(id, conectado.id)
        response.json({ success: true, message: "Mostrar Post", data: post})
    } catch (error) {
        response.json({ success: false, message: "Error consultando Post"})
    }
})

// Registrar Post
router.post("/", async(request, response) => {
    try {
        const registro = await postController.crearPost(request.body, conectado.id)
        response.json({ success: true, message: "Registro de Post", data: registro})
    } catch (error) {
        response.status(400).json({success: false, message: "Error en registro de post"})
    }
    
})

// Actualizar Post
router.put("/:id", async(request, response) => {
    try {
        const id = request.params.id
        const actualizacion = await postController.actualizarPost(id, request.body, conectado.id)
        response.json({ success: true, message: "Post actualizado con éxito", data: actualizacion })
    } catch (error) {
        response.status(400).json({ success: false, message: error.code ? error.message : error})
    }
})

// Eliminar Post
router.delete("/:id", async(request, response) => {

    try {
        const id = request.params.id
        const eliminacion = await postController.eliminarPost(id, conectado.id)
        response.json( {success: true, message: "Post eliminado con éxito", data: eliminacion})
    } catch (error) {
        response.status(400).json({success: false, message: error.code ? error.message : error})
    }
})


module.exports = router