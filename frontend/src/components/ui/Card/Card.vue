<script>
import Comment from "./Comment.vue"
import Avatar from "../Avatar.vue"
import axios from 'axios'
export default {
    name: "Card",
    components: {
       Comment,
       Avatar
    },
    data() {
        //get all posts
        let posts ; 
        axios.get('http://localhost:3001/api/post/get/all' , {
            headers : {
                'Authorization' : 'Bearer-' + localStorage.getItem('token')
            }
        }).then ((result) => {
            this.posts = result.data
        });

        //get usersId
        let usersId = localStorage.getItem('usersId');
        usersId     = parseInt(usersId);
        //get users infos
        let user ;
        axios.get('http://localhost:3001/api/get/user/' + usersId , {headers:{'Authorization' : 'Bearer-' + localStorage.getItem('token')}})
        .then((result) => {
            this.user = result.data ;
        });
        //check if users authenticated is admin
        let isAdmin = false;
        let status  = localStorage.getItem('isAdmin');
        if (status == 'true') {
            isAdmin = true ;
        }
        return {posts , isAdmin , usersId , user} ;
    } , 
    methods : {
        // create a new comment
        handleComment(postId) {
            axios.post('http://localhost:3001/api/post/comment' , {
                    usersId : localStorage.getItem('usersId') ,
                    content : this.comment ,
                    postsId : postId
                } , {
                    headers : {
                        "Authorization": "Bearer-" + localStorage.getItem('token')
                    }
                }
            ).then((result) => {
                if (result.data.message == "Commentaire créer avec succès") {
                    location.reload()
                }
            })
        } ,

        //delete comment
        handleDeleteComment(commentId) {
            axios.post('http://localhost:3001/api/comment/delete/' ,{commentId : commentId} , {headers:{'Authorization' : 'Bearer-' + localStorage.getItem('token')}})
            .then((result) => {
                if (result.data.message == "comment deleted") {
                    location.reload()
                }
            });
        },

        // delete post image
        handleDeleteImage(file , postId) {
            axios.delete("http://localhost:3001/api/post/delete/image/" + file.split('images/')[1] , 
                {
                    headers:
                    {
                        "Authorization": "Bearer-" + localStorage.getItem('token')
                    } , 
                    data : {
                        postsId : postId
                    }
                }
            ).then((result) => {
                if (result.data.message == 'Image deleted') {
                    location.reload();
                }
            })
        }
    }
}
</script>

<template>
    <div class="card mb-3 m-auto" v-for="post in posts" :key="post">
        <div class="card-header">
            <img v-if="post.User.picture == null" src="./../../../assets/image/userprofil.jpg" class="show-comment-post card-img-top rounded-circle shadow-4" alt="...">
            <img v-else
                :src="post.User.picture"
                class="rounded-circle shadow-4 show-comment-post"
                alt="Avatar"
            /> 
            {{ post.User.username }}</div>
        <img :src="post.file" v-if="post.file" class="card-img-top" alt="...">
        <div v-if="post.User.id == this.usersId || isAdmin" class="row">
            <div v-if="post.file !== null" class="d-flex justify-content-end">
                <a href="#" @click="handleDeleteImage(post.file , post.id)" class="text-danger">
                    Supprimer l'image
                </a>
            </div>
        </div>
        <div class="card-body">
            <h5 class="card-title"></h5>
            <p class="card-text">{{ post.content }}</p>
            <p class="card-text"><small class="text-muted">{{ post.createdAt }}</small></p>
            <div v-for="comment in post.Comments" :key="comment" class="d-flex gap-1">
                <div class="d-flex flex-column comment_text p-1">
                    <img v-if="comment.User.picture == null" src="./../../../assets/image/userprofil.jpg" class="show-comment-post card-img-top rounded-circle shadow-4" alt="...">
                    <img v-else :src="comment.User.picture" class="show-comment-post card-img-top rounded-circle shadow-4" alt="...">
                    <p>{{ comment.User.username }}</p>
                    <p>{{ comment.content }}</p>  
                    <div class="" v-if="isAdmin">
                        <a type="button"  @click="handleDeleteComment(comment.id)" class="text-danger">
                            <span>supprimer</span>
                        </a>
                    </div>
                </div>      
            </div>
            <div class="d-flex gap-1">
                <img v-if="user.picture == null" src="./../../../assets/image/userprofil.jpg" class="show-comment-post card-img-top rounded-circle shadow-4" alt="...">
                <img v-else :src="user.picture" class="card-img-top show-comment-post rounded-circle shadow-4" alt="...">
                <input type="text" v-model="comment" class="form-control" placeholder="Username" aria-label="Username" />
                <button type="button" @click="handleComment(post.id)" class="btn btn-primary ms-auto rounded-pill">Post</button>
            </div>
        </div>
    </div>
</template>

<style>
@media (min-width: 768px) {
    .card {
        width: 70%;
    }
}

.card-header img {
    width: 50px;
}

.comment_text {
    background-color: var(--bs-gray-200);
    border-radius: 5px;
    width: 100%;
}

.card-body > .d-flex {
    margin-bottom: 1rem;
    
}
.show-comment-post {
    width: 30px !important;
    height: 30px;
    border-radius: 50%;
}

.d-flex p {
    margin-bottom: 0;
}
.d-flex p:nth-child(1) {
    font-weight: 500;
}
</style>