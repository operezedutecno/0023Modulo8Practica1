const express = require("express")
const router = express.Router()
const postController = require("./../controllers/Post.controller")
const { verifyToken } = require("./../middlewares/index")
const jwt = require("node.jwt")

// Listado de Posts
router.get("/", verifyToken, async(request, response) => {
    try {
        const listado = await postController.listarPosts(request.conectado.id)
        response.json({ success: true, message: "Listado de Posts", data: listado})
    } catch (error) {
        response.status(400).json({ success: false, message:"Error en listado de Posts"})
    }
})

// Mostrar Post específico
router.get("/:id", verifyToken, async(request, response) => {
    try {
        const id = request.params.id
        const post = await postController.consultarPost(id, request.conectado.id)
        response.json({ success: true, message: "Mostrar Post", data: post})
    } catch (error) {
        response.json({ success: false, message: "Error consultando Post"})
    }
})

// Registrar Post
router.post("/", verifyToken, async(request, response) => {
    try {
        const registro = await postController.crearPost(request.body, request.conectado.id)
        response.json({ success: true, message: "Registro de Post", data: registro})
    } catch (error) {
        response.status(400).json({success: false, message: "Error en registro de post"})
    }
    
})

// Actualizar Post
router.put("/:id", verifyToken, async(request, response) => {
    try {
        const id = request.params.id
        const actualizacion = await postController.actualizarPost(id, request.body, request.conectado.id)
        response.json({ success: true, message: "Post actualizado con éxito", data: actualizacion })
    } catch (error) {
        response.status(400).json({ success: false, message: error.code ? error.message : error})
    }
})

// Eliminar Post
router.delete("/:id", verifyToken, async(request, response) => {

    try {
        const id = request.params.id
        const eliminacion = await postController.eliminarPost(id, request.conectado.id)
        response.json( {success: true, message: "Post eliminado con éxito", data: eliminacion})
    } catch (error) {
        response.status(400).json({success: false, message: error.code ? error.message : error})
    }
})


module.exports = router