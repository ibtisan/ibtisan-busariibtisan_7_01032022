const express       = require('express') ;
const app           = express() ;
const dotenv        = require('dotenv');
dotenv.config();
const port          = process.env.port || 3001 ;
const bodyParser    = require('body-parser') ;
const cors    = require('cors');
const path    = require('path');


// Middlewares
//defaults
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
//
const validateToken = require('./middlewares/validateToken').validateToken;
const multer        = require('./middlewares/multer-config');
app.use('/images', express.static(path.join(__dirname, 'images')));



// controllers
const auth      = require('./controllers/auth');
const post      = require('./controllers/post');
const comment   = require('./controllers/comment');
const user      = require('./controllers/user');



//routes
app.post('/api/user/signup/' , auth.register);
app.post('/api/user/login' , auth.login);
app.get('/api/get/user/:id' , validateToken , user.getUser);
app.post('/api/user/edit/:id' , multer , user.editProfilPhoto);
app.post('/api/user/edit/password/:id' , validateToken , user.editPassword);
app.delete('/api/user/delete/account/:id' , validateToken , user.deleteAccount);
// posts routes
app.post('/api/post/create', validateToken , multer , post.create);
app.post('/api/post/create/without/image' , validateToken , post.createWithoutImage);
app.get('/api/post/get/all' , validateToken , post.getAll);
app.delete('/api/post/delete/image/:file' , validateToken , post.deletePostImage);

//comment routes
app.post('/api/post/comment/' , validateToken , comment.create);
app.post('/api/comment/delete' , validateToken , comment.delete);



// Start server
app.listen(port)
console.log("On écoute le port : "+ port);