<script>
import axios from 'axios';
export default {
    name: "PostForm",
    data() {
        return {
            file : ""
        }
    },
    methods : {
        getImage(event) {
            this.file = event.target.files[0];
        },
        handlePost() {
            // var data =  {
            //     file    : this.file ,
            //     content : this.post ,
            //     usersId : localStorage.getItem('usersId')
            // }
            const formData = new FormData();
            formData.append("file" , this.file);
            formData.append("content" , this.post);
            formData.append("usersId" , localStorage.getItem("usersId"));
            if (this.post !== null && this.file !== "") {
                axios.post('http://localhost:3001/api/post/create' , formData ,
                    {
                        headers:{
                            "Authorization": "Bearer-" + localStorage.getItem('token')
                        }
                    }
                ).then((result) => {
                    if (result.data.message == 'Post créer avec succès') {
                        this.file = "" ;
                       location.reload();
                    }
                })
            }

            if (this.post !== null && this.file == "") {
                axios.post('http://localhost:3001/api/post/create/without/image' , {usersId : localStorage.getItem('usersId') , content : this.post},
                {
                    headers : {
                        'Authorization' : 'Bearer-' + localStorage.getItem('token')
                    }
                }).then((result) => {
                    if (result.data.message == "Post créer avec succès") {
                        this.file = "" ;
                        location.reload();
                    }
                })
            }
        }
    }
}
</script>

<template>
    <form action="" method="POST" enctype="multipart/form-data">
        <div class="form-floating mt-4">
        <textarea rows="5" v-model="post" contenteditable class="form-control" placeholder="Leave a comment here" id="floatingTextarea"></textarea>
        <label for="floatingTextarea">Posts</label>
    </div>
    <div class="row">
        <label for="file-input"  class="mt-1">Add Image</label>
        <div class="col-6">
            <input id="file-input" accept="" class="col-6 form-control" @change="getImage" type="file"  />
        </div>
        <div class="col-6">
            <button  @click="handlePost" type="button" class="col-12 btn btn-primary mt-1 ms-auto">Post</button>
        </div>
    </div>
    <hr class="dropdown-divider mt-4" />
    </form>
</template>

<style module>

/* input {
    display: none;
} */

body {
  background-color: #f5f5f51a !important;
}

</style>