const db = require('./../models/index.js')
const User = db.usuarios
const Post = db.posts

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

exports.listUsers = async () =>{
    const wantedUsers = await User.findAll({
        attributes: ['usuario','contrasena']
    })
    return wantedUsers
}

