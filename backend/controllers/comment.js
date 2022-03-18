const { request, response } = require('express');
const db        = require('./../models/index');

exports.create = (request , response) => {
    db.Comment.create({
        content : request.body.content ,
        usersId : request.body.usersId ,
        postsId : request.body.postsId
    }).then((value) => {
        return response.json({message: "Commentaire créer avec succès"});
    }).catch((error) => {
        console.log(error)
    })
}

exports.delete = (request , response) => {
    let commentId = request.body.commentId ;
    db.Comment.findOne({
        where : {id : commentId}
    }).then((comment) => {
        comment.destroy();
        return response.json({message : 'comment deleted'})
    })
}