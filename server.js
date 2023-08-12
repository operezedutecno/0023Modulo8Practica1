const express = require("express")
const app = express()
const db = require("./app/models/index")
const port = 3000
const jwt = require("node.jwt")
const secret = jwt.secret("blog0023")

app.use(express.json())

const usuarioController = require("./app/controllers/Usuario.controller")
const postController = require("./app/controllers/Post.controller")


app.listen(port, async() => {
    await db.conexion.sync()
    console.log("Servidor ejecutando Puerto: "+port);
})

let conectado

app.use((request, response, next) => {
    if(request.url.startsWith("/posts")) {
        const token = request.headers.authorization
        const dataUsuario = jwt.decode(token,secret)
        if(dataUsuario.code !== '000') {
            return response.status(403).json({ success: false, message: "Token inválido" })
        }
        conectado = dataUsuario.payload
        return next();
    }
    return next();
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

// Middleware para la ruta "/post"
// app.use("/posts", (request, response, next) => {
//     if(request.method === 'GET') {
//         console.log("Solicitud de listado");
//         return response.status(403).json({ success: false})
//     }
//     next()
// })

// Listado de Posts
app.get("/posts", async(request, response) => {
    try {
        const listado = await postController.listarPosts(conectado.id)
        response.json({ success: true, message: "Listado de Posts", data: listado})
    } catch (error) {
        response.status(400).json({ success: false, message:"Error en listado de Posts"})
    }
})

// Mostrar Post específico
app.get("/posts/:id", async(request, response) => {
    try {
        const id = request.params.id
        const post = await postController.consultarPost(id, conectado.id)
        response.json({ success: true, message: "Mostrar Post", data: post})
    } catch (error) {
        response.json({ success: false, message: "Error consultando Post"})
    }
})

// Registrar Post
app.post("/posts", async(request, response) => {
    try {
        const registro = await postController.crearPost(request.body, conectado.id)
        response.json({ success: true, message: "Registro de Post", data: registro})
    } catch (error) {
        response.status(400).json({success: false, message: "Error en registro de post"})
    }
    
})

// Actualizar Post
app.put("/posts/:id", async(request, response) => {
    try {
        const id = request.params.id
        const actualizacion = await postController.actualizarPost(id, request.body, conectado.id)
        response.json({ success: true, message: "Post actualizado con éxito", data: actualizacion })
    } catch (error) {
        response.status(400).json({ success: false, message: error.code ? error.message : error})
    }
})

// Eliminar Post
app.delete("/posts/:id", async(request, response) => {

    try {
        const id = request.params.id
        const eliminacion = await postController.eliminarPost(id, conectado.id)
        response.json( {success: true, message: "Post eliminado con éxito", data: eliminacion})
    } catch (error) {
        response.status(400).json({success: false, message: error.code ? error.message : error})
    }
})