const express = require("express")
const app = express()
const db = require("./app/models/index")
const jwt = require("node.jwt")

const port = 8000
app.use(express.json())

/* controllers */
const userController = require('./app/controllers/user.controller.js')

app.listen(port, async() => {
    await db.conexion.sync()
    console.log("Servidor ejecutando Puerto: "+port);
})

/* llave secreta */
const secretKey = jwt.secret('#}.}5_nT3TENO^Z?7q,g<{<&_M4Py4b0(_tY>x1DKk%z[YS/Ik')

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
    console.log(request.body)
    const {user, password} = request.body
    
    if(!user || !password){
        return response.status(403).json({ success: false, message: "Debe indicar Uuario Y Contraseña" })
    }

    const respuesta = await userController.listUsers()
    const usuarios = JSON.parse(JSON.stringify(respuesta))

    const datosUsuario = usuarios.find(item => item.usuario === user && item.contrasena === password)
    if(!datosUsuario) {
        return response.status(403).json({ success: false, message: "Usuario y/o contraseña incorrectos"})
    }
    const token = jwt.encode(datosUsuario, secretKey)
    response.json({ success: true, message: "Autenticación exitosa", token: token})
})  
/*
Crear proyecto Node con Express y Sequelize
Crear modelos de Usuarios y Posts
Crear controlador de Usuarios (CRUD y Login)
Crear controlador de Posts (CRUD) Implementando Json Web Token (JWT)
*/