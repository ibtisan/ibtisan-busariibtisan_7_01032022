const { request, response } = require('express');
const db          = require('./../models/index');
const bcrypt      = require('bcrypt');
const dotenv      = require('dotenv');
const { json }    = require('body-parser');
const path        = require('path');
const fs          = require('fs');
const { basename } = require('path');

exports.create = (request , response) => {
     //Récupération du corps du post
     let content = request.body.content;
     let usersId = request.body.usersId;
     if (request.file !== undefined) {
         attachmentURL = `${request.protocol}://${request.get('host')}/images/${request.file.filename}`;
     }
     else {
         attachmentURL == null
     };
    if ((content == 'null' && attachmentURL == null)) {
        res.status(400).json({ error: 'Rien à publier' })
    } else {
        let post = db.Post.create({
            content : content,
            file    : attachmentURL,
            usersId : usersId
        }).then((value) => {
            return response.json({message: "Post créer avec succès"});
        }).catch((error) => {
            console.log(error)
        })
    };
}

exports.createWithoutImage = (request , response) => {
    let content = request.body.content ;
    let usersId = request.body.usersId ;
    if(content !== null) {
        db.Post.create({
            content : content,
            usersId : usersId
        }).then( (result) => {
            return response.json({message : 'Post créer avec succès'})
        }).catch((error) => {
            return response.json({error});
        });
    }
}

exports.getAll = (request , response) => {
    let posts = db.Post.findAll({
        include : [
            {
                model : db.User ,
                as    : 'User',
            } , 
            {
                model : db.Comment ,
                include : [
                    {
                        model : db.User
                    }
                ]
            } 
        ]
    }).then((posts) => {return response.send(posts)});
}

exports.deletePostImage =  (request , response) => {
    let file = path.join(__dirname , '../images' , request.params.file); 
    fs.unlink(file , (err , stats) => {
        db.Post.update(
            {file : null} , 
            {returning : true , where : {id : request.body.postsId}}
        ).then((result) => {
            if (result) {
                return response.json({message : 'Image deleted'});
            }
        })
    });
}