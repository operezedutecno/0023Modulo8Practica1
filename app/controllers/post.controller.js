const db = require('./../models/index.js')
const User = db.usuarios
const Post = db.posts

/* crear post */
exports.createPost = async (post, userID) =>{
    try{
        const postedPost = await Post.create({...post, usuario_id: userID})
        return postedPost
    }catch(err){
        return null
    }
}

/* actualizar post */
exports.updatePost = async (post, postID, userID) =>{
    const wantedPost = await Post.findOne({ where: {id: postID, usuario_id: userID} })
    if(!wantedPost){
        throw 'No tienes autorización para editar'
    }
    await Post.update(post, {where: {id: postID, usuario_id: userID}})
}

/* eliminar post */
exports.deletePost = async (postId,userID) =>{
    const wantedPost = await Post.findOne({ where: {id:postId, usuario_id: userID} })
    if(!wantedPost){
        return null
    }
    await wantedPost.destroy()
    return 1
}

exports.listPost = async (userID) =>{
    const wantedPosts = await Post.findAll({ where: {usuario_id: userID} })
    return wantedPosts
}