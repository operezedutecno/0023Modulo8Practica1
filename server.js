const express = require("express")
const app = express()
const db = require("./app/models/index")

const port = 8000
app.use(express.json())

const jwt = require("node.jwt")
const secretKey = jwt.secret('#}.}5_nT3TENO^Z?7q,g<{<&_M4Py4b0(_tY>x1DKk%z[YS/Ik')

/* controllers */
const userController = require('./app/controllers/user.controller.js')
const postControllet = require('./app/controllers/post.controller.js')

app.listen(port, async() => {
    await db.conexion.sync()
    console.log("Servidor ejecutando Puerto: "+port);
})

/* rutas */
app.post('/newUser', async (request, response) =>{
    const {user, password} = request.body
    if(!user){
        return response.status(500).json({ success: false, message: 'Debe indicar usuario' })
    }
    if(!password){
        return response.status(500).json({ success: false, message: 'Debe indicar contraseña' })
    }

    const respuesta = await userController.createUser({usuario: user, contrasena: password})
    return response.json({ success: true, message: 'usuario creado', data: respuesta })

})

app.patch('/updUser', async (request, response) =>{
    const {id, user, password} = request.body
    if(!id){
        return response.status(500).json({ success: false, message: 'Debe indicar ID de Usuario' })
    }
    if(!user && !password){
        return response.status(500).json({ success: false, message: 'Debe indicar al menos un campo a actualizar' })
    }
    const updObjt = {usuario: user, contrasena: password}
    const respuesta = await userController.updateUser(id, updObjt)
    return response.json({ success: true, message: 'usuario actualizado', data: respuesta })
})

app.delete('/delUser', async (request, response) =>{
    const {id} = request.body
    if(!id){
        return response.status(500).json({ success: false, message: 'Debe indicar ID de Usuario' })
    }
    const respuesta = await userController.deleteUser(id)
    if(respuesta === 1){
        return response.json({ success: true, message: 'usuario eliminado' })
    }else{
        return response.status(500).json({ success: false, message: 'no se pudo eliminar el usuario' })
    }
})

app.get('/listUser', async (request, response) =>{
    const respuesta = await userController.listUsers()
    return response.json({ success: true, message: 'listado de usuarios', data: respuesta })
})

app.post('/login', async (request, response) =>{
    try{
        const token = await userController.login(request.body)
        response.json({ success: true, message: "Autenticación exitosa", token: token})
    }catch(err){
        return response.status(403).json({ success: false, message: err})
    }
})

/*
Crear proyecto Node con Express y Sequelize
Crear modelos de Usuarios y Posts
Crear controlador de Usuarios (CRUD y Login)
Crear controlador de Posts (CRUD) Implementando Json Web Token (JWT)
*/

/* middleware */
//app.use('/newPost', (request, response, next) =>{
//    if(request.method === 'POST'){
//        console.log('asds')
//        return response.status(403).json({ success: false })
//    }
//    next()
//})
let conectado = null

app.use((request, response, next) =>{
    /* obtengo el token */
    const token = request.headers.authorization
    const decodeToken = jwt.decode(token, secretKey)
    if(decodeToken.code !== '000'){
        return response.status(403).json({ success: false, message: 'Token invalido' })
    }
    conectado = decodeToken.payload.id
    next()
})

/* rutas post */
app.post('/newPost', async (request, response) =>{
    if(!request.body){
        return response.status(500).json({ success: false, message: 'Debe indicar el post' })
    }
    try{
        const respuesta = await postControllet.createPost(request.body,conectado)
        return response.json({ success: true, message: 'post registrado' })
    }catch(err){
        return response.status(400).json({ success: false, message: 'no se pudo registrar el post' })
    }
})

app.patch('/updPost', async (request, response) =>{
    if(!request.body){
        return response.status(500).json({ success: false, message: 'Debe indicar el post' })
    }
    const {id, titulo, cuerpo} = request.body
    const objUPD = {titulo: titulo, cuerpo: cuerpo}
    try{
        const respuesta = await postControllet.updatePost(objUPD, id, conectado)
        return response.json({ success: true, message: 'post actualizado' })
    }catch(err){
        return response.status(400).json({ success: false, message: err })
    }
    
})

app.delete('/delPost', async (request, response) =>{
    const {id} = request.body
    if(!id){
        return response.status(500).json({ success: false, message: 'Debe indicar el post' })
    }
    const respuesta = await postControllet.deletePost(id,conectado)
    if(respuesta === 1){
        return response.json({ success: true, message: 'post eliminado' })
    }else{
        return response.status(500).json({ success: false, message: 'no se pudo eliminar el post' })
    }
    return response.json({ success: true, message: 'post eliminado' })
})

app.get('/listPost', async (request, response) =>{
    const respuesta = await postControllet.listPost(conectado)
    return response.json({ success: true, message: 'listado de Post', data: respuesta })
})
