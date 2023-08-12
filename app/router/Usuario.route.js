const express = require("express")
const router = express.Router()
const usuarioController = require("./../controllers/Usuario.controller")

// Listado de Usuarios
router.get("/", async (request, response) => {
    try {
        const usuarios = await usuarioController.listarUsuarios()
        const retorno = JSON.parse(JSON.stringify(usuarios))
        response.json({success: true, message: "Listado de usuarios", data: retorno})
    } catch (error) {
        response.status(400).json({success: false, message: "Error en listado de usuarios"})
    }
})

// Mostrar usuario específico
router.get("/:id", async (request, response) => {
    try {
        const id = request.params.id
        const usuario = await usuarioController.mostrarUsuario(id)
        response.json({success: true, message: "Mostrar Usuario", data: usuario})
    } catch (error) {
        response.status(400).json({success: false, message: error})
    }
})

// Registro de Usuarios
router.post("/", async(request, response) => {
    try {
        const registro = await usuarioController.crearUsuario(request.body)
        const retorno = JSON.parse(JSON.stringify(registro))
        response.json({success: true, message: "Registro de usuarios", data: retorno})
    } catch (error) {
        response.status(400).json({success: false, message: error.message })
    }
})

// Actualización de Usuarios
router.put("/:id", async (request, response) => {
    try {
        const id = request.params.id
        const actualizacion = await usuarioController.actualizarUsuario(id, request.body)
        response.json({success: true, message: "Actualización de usuarios", data: actualizacion})
    } catch (error) {
        response.status(400).json({ success: false, message: error })
    }
})

// Eliminación de usuarios
router.delete("/:id", async(request, response) => {
    try {
        const id = request.params.id
        const eliminacion = await usuarioController.eliminarUsuario(id)
        response.json({ success: true, message: "Eliminación de usuarios", data: eliminacion})
    } catch (error) {
        response.status(400).json({ success: false, message: error })
    }
})

module.exports = router