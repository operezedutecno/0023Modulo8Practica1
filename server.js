const express = require("express")
const cors = require("cors")
const app = express()
const db = require("./app/models/index")
const port = 3000

app.use(express.json())
app.use(cors({
    // origin: ["http://127.0.0.1:5500", "http://localhost:5500"]
    origin: "*"
}))

app.use("/jquery", express.static(`${__dirname}/node_modules/jquery/dist`))
app.use("/bootstrap", express.static(`${__dirname}/node_modules/bootstrap/dist`))
app.use("/public", express.static(`${__dirname}/assets`))

const usuarioController = require("./app/controllers/Usuario.controller")
const postController = require("./app/controllers/Post.controller")


app.listen(port, async() => {
    await db.conexion.sync()
    console.log("Servidor ejecutando Puerto: "+port);
})

app.get("/", (request, response) => {
    response.sendFile(`${__dirname}/app/views/index.html`)
})

app.get("/registro", (request, response) => {
    response.sendFile(`${__dirname}/app/views/registro.html`)
})

app.use("/usuarios", require("./app/router/Usuario.route"))
app.use("/posts", require("./app/router/Post.route"))


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