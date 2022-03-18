<script>
import axios from 'axios' ;
export default {
    name: "ProfilePage",
    data() {
      let usersId = localStorage.getItem('usersId');
      let user ; 
      let editPicture  = false ;
      let editPassword = false ;
      let errPassword  = false ;
      let errEmptyPassword = false ;
      let file   = "" ;
      axios.get('http://localhost:3001/api/get/user/' + usersId , {headers:{'Authorization' : 'Bearer-' + localStorage.getItem('token')}})
      .then((result) => {
        this.user = result.data ;
      })
      return {user , editPicture , file , usersId , editPassword , errPassword , errEmptyPassword} ;
    },
    methods : {
      handleEditProfilePhoto() {
        if (this.file != "") {
          let formData = new FormData();
          formData.append('file' , this.file);
          axios.post('http://localhost:3001/api/user/edit/' + this.usersId , formData , {
            headers : {
              'Authorization' : 'Bearer-' + localStorage.getItem('token')
            }
          }).then((result) => {
             if (result.data.message == "Photo modifiée avec succès") {
               location.reload();
             }
          })
        }
      },
      getImage(event) {
        this.file = event.target.files[0];
      },
      showForm() {
        if (this.editPicture) {
          this.editPicture = false ;
        } else {
          this.editPicture = true ;
          this.editPassword = false ;
        }
      },
      showFormPassword() {
        if (this.editPassword) {
          this.editPassword = false ;
        } else {
          this.editPassword = true ;
          this.editPicture = false ;
        }
      } , 
      handleEditPassword() {
          if (this.newPassword && this.newPasswordConfirmation !== "") {
            this.errEmptyPassword = false ;
            if (this.newPassword == this.newPasswordConfirmation) {
              this.errPassword = false ;
              // send request to backend 
              axios.post('http://localhost:3001/api/user/edit/password/' + this.usersId , {password : this.newPassword} , {headers : {'Authorization' : 'Bearer-' + localStorage.getItem('token')}})
              .then((result) => {
                if (result.data.message == 'Password updated') {
                  alert('Mot de passe changé avec succès! Connectez vous prochainement avec le nouveau')
                }
              })
            } else {
              this.errPassword = true ;
            }
          } else {
            this.errEmptyPassword = true ;
          }
      },
      deleteAccount() {
        axios.delete('http://localhost:3001/api/user/delete/account/' + this.usersId , {headers : {'Authorization' : 'Bearer-' + localStorage.getItem('token')}})
        .then((result) => {
          if (result.data.message == 'account deleted') {
            alert('Vous avez supprimé votre compte. Au revoir!');
            this.$router.go();
            this.$router.push('/login');
          }
        })
      }
    }
}
</script>

<template>
    <div class="container">
    <div class="main-body">
    
          <div class="row gutters-sm">
            <div class="card col-md-12 mb-3">
                  <div class="d-flex flex-column align-items-center text-center">
                    <img v-if="user.picture == null" src="./../assets/image/userprofil.jpg" :alt="user.username" class="rounded-circle" width="150">
                    <img v-else :src="user.picture" class="show-comment-post rounded-circle" :alt="user.username">
                    <a @click="showForm" href="#">Edit photo</a>
                    <a @click="showFormPassword" href="#">Edit Password</a>
                    <a @click="deleteAccount" class="text-danger" href="#">Delete account</a>
                    <form v-if="editPicture" class="mt-3" action="" enctype="multipar multipart/form-data" method="post">
                      <div class="row">
                        <div class="col-6">
                            <input id="file-input" accept="" class="col-12 form-control" @change="getImage" type="file"  />
                        </div>
                        <div class="col-6">
                            <button  @click="handleEditProfilePhoto" type="button" class="col-12 btn btn-primary mt-1 ms-auto">Change</button>
                        </div>
                      </div>
                    </form>
                    <form v-if="editPassword" class="mt-3" action="" method="post">
                      <div class="row">
                        <div class="col-6">
                            <input id="file-input" v-model="newPassword" accept="" class="col-12 form-control" type="password" placeholder="saisir le nouveau mot de passe" />
                        </div>
                        <div class="col-6">
                            <input id="file-input" v-model="newPasswordConfirmation" accept="" class="col-12 form-control" type="password" placeholder="confirmez le nouveau mot de passe" />
                        </div>
                        <span v-if="errPassword" class="text-danger mt-2">Mot de passe non identique</span>
                        <span v-if="errEmptyPassword" class="text-danger mt-2"> Les deux champs sont obligatoires </span>
                        <div class="col-4 mt-2 m-auto">
                            <button @click="handleEditPassword" type="button" class="col-12 btn btn-primary mt-1 ms-auto">Change</button>
                        </div>
                      </div>
                    </form>
                    <div class="mt-3">
                      <h4>{{ user.username }}</h4>
                    </div>
                  </div>
            </div>
            <div class="d-flex flex-column flex-md-row gap-3">
              <!-- <div class="card col-md-4">
                  <ul class="list-group list-group-flush">
                    <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                      <h6 class="mb-0">
                          <img src="../assets/svg/world.svg" alt="" srcset="">
                          Website
                      </h6>
                      <span class="text-secondary">https://bootdey.com</span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                      <h6 class="mb-0">
                          <img src="../assets/svg/github.svg" alt="" srcset="">
                          Github
                      </h6>
                      <span class="text-secondary">bootdey</span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                      <h6 class="mb-0">
                          <img src="../assets/svg/twitter.svg" alt="" srcset="">
                          Twitter
                      </h6>
                      <span class="text-secondary">@bootdey</span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                      <h6 class="mb-0">
                          <img src="../assets/svg/instagram.svg" alt="" srcset="">
                          Instagram
                          </h6>
                      <span class="text-secondary">bootdey</span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                      <h6 class="mb-0">
                          <img src="../assets/svg/facebook.svg" alt="" srcset="">
                          Facebook
                          </h6>
                      <span class="text-secondary">bootdey</span>
                    </li>
                  </ul>
              </div> -->
              <div class="card col-md-12">
                  <div class="card-body">
                    <div class="row">
                      <div class="col-sm-3">
                        <h6 class="mb-0">Email</h6>
                      </div>
                      <div class="col-sm-9 text-secondary">
                        {{ user.email }}
                      </div>
                    </div>
                    <hr>
                    <div class="row">
                      <div class="col-sm-3">
                        <h6 class="mb-0">Username</h6>
                      </div>
                      <div class="col-sm-9 text-secondary">
                       {{ user.username }}
                      </div>
                    </div>
                    <!-- <div class="row mt-10">
                      <div class="col-sm-12">
                        <a class="btn btn-info " target="__blank" href="">Edit</a>
                      </div>
                    </div> -->
                  </div>
              </div>
            </div>  
          </div>
        </div>
    </div>
</template>

<style scoped>
.show-comment-post {
    width: 350px !important;
    height: 350px;
    border-radius: 50%;
}

    body{
    margin-top:20px;
    color: #1a202c;
    text-align: left;
    background-color: #e2e8f0;    
}
.main-body {
    padding: 15px;
}
.card {
    box-shadow: 0 1px 3px 0 rgba(0,0,0,.1), 0 1px 2px 0 rgba(0,0,0,.06);
}

.card {
    position: relative;
    display: flex;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background-color: #fff;
    background-clip: border-box;
    border: 0 solid rgba(0,0,0,.125);
    border-radius: .25rem;
}

.card-body {
    flex: 1 1 auto;
    min-height: 1px;
    padding: 1rem;
}

.gutters-sm {
    margin-right: -8px;
    margin-left: -8px;
}

.gutters-sm>.col, .gutters-sm>[class*=col-] {
    padding-right: 8px;
    padding-left: 8px;
}
.mb-3, .my-3 {
    margin-bottom: 1rem!important;
}

.bg-gray-300 {
    background-color: #e2e8f0;
}
.h-100 {
    height: 100%!important;
}
.shadow-none {
    box-shadow: none!important;
}

.row.gutters-sm > * {
  padding: 0;
}

:root {
  --gap: 5rem;
}

.row.gutters-sm > .d-flex {
   --gap: 5rem;
   gap: var(--gap) !important;
}

.row.gutters-sm > .d-flex.gap-1 {
  --gap: 0.25rem;
}

.row.gutters-sm > .d-flex.gap-2 {
  --gap: 0.5rem;
}

.row.gutters-sm > .d-flex.gap-3 {
  --gap: 1rem;
}

.row.gutters-sm > .d-flex.gap-4 {
  --gap: 2rem;
}

.row.gutters-sm > .d-flex.gap-5 {
  --gap: 4rem;
}

@media (min-width: 768px) {
  .card.col-md-4 {
  width: calc(33.33333333% - var(--gap) /2);
  }

.card.col-md-8 {
  width: calc(66.66666667% -var(--gap) /2);
  }
}

</style>