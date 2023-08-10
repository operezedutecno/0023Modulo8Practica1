const express = require("express")
const app = express()
const db = require("./app/models/index")
const port = 3000

app.use(express.json())

const usuarioController = require("./app/controllers/Usuario.controller")


app.listen(port, async() => {
    await db.conexion.sync()
    console.log("Servidor ejecutando Puerto: "+port);
})

// Listado de Usuarios
app.get("/usuarios", async (request, response) => {
    try {
        const usuarios = await usuarioController.listarUsuarios()
        const retorno = JSON.parse(JSON.stringify(usuarios))
        response.json({success: true, message: "Listado de usuarios", data: retorno})
    } catch (error) {
        response.status(400).json({success: false, message: "Error en listado de usuarios"})
    }
})

// Mostrar usuario específico
app.get("/usuarios/:id", async (request, response) => {
    try {
        const id = request.params.id
        const usuario = await usuarioController.mostrarUsuario(id)
        response.json({success: true, message: "Mostrar Usuario", data: usuario})
    } catch (error) {
        response.status(400).json({success: false, message: error})
    }
})

// Registro de Usuarios
app.post("/usuarios", async(request, response) => {
    try {
        const registro = await usuarioController.crearUsuario(request.body)
        const retorno = JSON.parse(JSON.stringify(registro))
        response.json({success: true, message: "Registro de usuarios", data: retorno})
    } catch (error) {
        response.status(400).json({success: false, message: error.message })
    }
})


// Actualización de Usuarios
app.put("/usuarios/:id", async (request, response) => {
    try {
        const id = request.params.id
        const actualizacion = await usuarioController.actualizarUsuario(id, request.body)
        response.json({success: true, message: "Actualización de usuarios", data: actualizacion})
    } catch (error) {
        response.status(400).json({ success: false, message: error })
    }
})

// Eliminación de usuarios
app.delete("/usuarios/:id", async(request, response) => {
    try {
        const id = request.params.id
        const eliminacion = await usuarioController.eliminarUsuario(id)
        response.json({ success: true, message: "Eliminación de usuarios", data: eliminacion})
    } catch (error) {
        response.status(400).json({ success: false, message: error })
    }
})

app.post("/login", async(request, response) => {
    try {
        const token = await usuarioController.login(request.body)
        response.json({ success: true, token: token})
    } catch (error) {
        response.status(403).json({ success: false, message: error})
    }
})