const { request, response } = require('express');
const db        = require('./../models/index');
const bcrypt    = require('bcrypt');
const dotenv    = require('dotenv');
const jwt       = require('jsonwebtoken');
// const secret    = process.env.SECRET_TOKEN;
const secret    = 'RANDOM_TOKEN_SECRET';

dotenv.config();

exports.register = (request , response) => {

    let user_email = db.User.findOne({
        where : {'email' : request.body.email}
    }).then((user) => {
       if (user) {
         return response.send({message : 'Error! Email already used'});
       }
    });

    let user_username = db.User.findOne({
        where : {'username' : request.body.username}
    }).then((user) => {
        if (user) {
            return response.send({message : 'Error! username already used'});
        }
    });

    let new_user = db.User.create({
        username : request.body.username ,
        email    : request.body.email ,
        isAdmin  : false ,
        password : bcrypt.hashSync(request.body.password , 10)
    }).then((user) => {
        return response.send({message: 'users created'});
    })
}

exports.login = (request , response) => {
    var user = db.User.findOne({
        where : {'username' : request.body.username }
    })
    .then( (user) => {
        if (user == null) {
            response.send({message : "user don't exist"})
        } else {
            bcrypt.compare(request.body.password , user.password , (error , result) => {
                if (result) {
                    const token     = jwt.sign({ id : user.id} , secret)
                    let isAdmin   = false ;
                    if (user.isAdmin) {
                        isAdmin = true ;
                    }
                    response.send({message : "user attempted" , token : token , usersId : user.id , isAdmin : isAdmin})

                } else {
                    response.send({message : "something went wrong"})
                }
                
            })
        }
    })
    .catch( (err) => {
        response.send(err)
        console.log(err)
    })
}