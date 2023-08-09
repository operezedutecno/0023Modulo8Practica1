const db = require('./../models/index.js')
const User = db.usuarios
const Post = db.posts

/* crear post */
exports.createPost = async (post) =>{
    try{
        const postedPost = await Post.create(post)
        return postedPost
    }catch(err){
        console.log('asd', err)
        return null
    }
}


/*

exports.createUser = async (user) =>{
    try{
        const registeredUser = await User.create(user)
        return registeredUser
    }catch(err){
        console.log('the user cant be create', err)
        return null
    }
}


exports.updateUser = async (userID,userInfo) =>{
    const wantedUser = await User.findByPk(userID)
    if(!wantedUser){
        return null
    }
    await User.update(userInfo,{where: {id: userID}})
}


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
*/