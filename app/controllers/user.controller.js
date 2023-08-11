const db = require('./../models/index.js')
const User = db.usuarios
const Post = db.posts

const jwt = require("node.jwt")
const secretKey = jwt.secret('#}.}5_nT3TENO^Z?7q,g<{<&_M4Py4b0(_tY>x1DKk%z[YS/Ik')

/* crear usuario */
exports.createUser = async (user) =>{
    try{
        const registeredUser = await User.create(user)
        return registeredUser
    }catch(err){
        console.log('the user cant be create', err)
        return null
    }
}

/* actualizar usuario */
exports.updateUser = async (userID,userInfo) =>{
    const wantedUser = await User.findByPk(userID)
    if(!wantedUser){
        return null
    }
    await User.update(userInfo,{where: {id: userID}})
}

/* eliminar usuario */
exports.deleteUser = async (userID) =>{
    const wantedUser = await User.findByPk(userID)
    if(!wantedUser){
        return null
    }
    await wantedUser.destroy()
    return 1
}

/* listar todos los usuarios */
exports.listUsers = async () =>{
    const wantedUsers = await User.findAll({
        attributes: ['usuario','contrasena']
    })
    return wantedUsers
}

exports.login = async(userData) =>{
    const {user, password} = userData
    const wantedUser = await User.findOne({ where: {usuario: user, contrasena: password} })
    if(!wantedUser){
        throw 'Usuario y/o contraseña incorrectos'
    }
    const token = jwt.encode(wantedUser, secretKey)
    return token
}
