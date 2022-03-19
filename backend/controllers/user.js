const { request, response } = require('express');
const db        = require('./../models/index');
const path      = require('path');
const fs        = require('fs');
const bcrypt    = require('bcrypt');
exports.getUser = (request , response) => {
    let usersId = request.params.id;

    db.User.findOne({
        where : {id : usersId}
    }).then((user) => {
        if (user != null) {
            return response.json(user)
        } else {
            return response.json({message : 'utilisateur introuvable'})
        }
    }).catch((err) => {
        console.log(err);
        return response.json(err);
    })
}

exports.editProfilPhoto = (request , response) => {
    if (request.file != undefined) {
        attachmentURL = `${request.protocol}://${request.get('host')}/images/${request.file.filename}`;
    }
    else {
        attachmentURL == null
    };
    let id = request.params.id ;
    db.User.findOne({
        where : {id : id}
    }).then((user) => {
        if(user.picture != null) {
            const filename = user.picture.split('images/')[1];
            const target   = path.join(__dirname , '../images/' , filename);
            fs.unlink(target , (err , result) => {
                user.update(
                    {
                        picture : attachmentURL ,
                    },
                    {
                        returning : true ,
                        where :  {id : id}
                }).then((result) => {
                        return response.json({message : 'Photo modifiée avec succès'});
                });
            });
            
        } else {
                user.update(
                    {
                        picture : attachmentURL ,
                    },
                    {
                        returning : true ,
                        where :  {id : id}
                }).then((result) => {
                        return response.json({message : 'Photo modifiée avec succès'});
                });
        }

        
    })
}

exports.editPassword = (request , response) => {
    let id = request.params.id ;
    db.User.findOne({
        where : {id : id}
    }).then((user) => {
        user.update(
            {
                password : bcrypt.hashSync(request.body.password , 10)
            },
            {
                returning : true ,
            }
        ).then((result) => {
            return response.json({message : 'Password updated'});
        })
    })
}

exports.deleteAccount = (request , response) => {
    let id = request.params.id ;
    db.Comment.findAll({
        where : {usersId : id}
    }).then((result) => {
        if (result) {
            db.Post.destroy({
                where : {usersId : id}
            }).then((result) => {
                db.User.destroy({
                    where : {id : id}
                }).then((result) => {
                    if (result) {
                        return response.json({message : 'account deleted'})   
                    }
                })
            })
        }
    })

}