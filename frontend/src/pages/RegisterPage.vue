<script>
import axios from 'axios' ;

export default {
    name: "RegisterPage",
      data() {
        if (localStorage.getItem('token')) {
          localStorage.removeItem('token');
        }
        if (localStorage.getItem('usersId')) {
          localStorage.removeItem('usersId');
        }
        if (localStorage.getItem('isAdmin')) {
          localStorage.removeItem('isAdmin')
        }
        return {
            valideEmail: true,
        }
    },
    methods: {
        // login() {
        //     if (this.username === "admin" && this.password === "admin") {
        //         this.$router.push("/")
        //     } else {
        //         this.error = "Invalid credential"
        //     }
        // }
        verifEmail() {
          const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          if (this.email !== "") {
            if (regex.test(this.email)) {
               this.valideEmail = true ;
            } else {
                this.valideEmail = false ;
            }
          } 
        } ,
        // verifPassword() {
        //   const password_regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/
        //   if (this.password !== "") {
        //     if (password_regex.test(this.password)) {
        //        document.getElementById("signupbtn").disabled = false ;
        //     } else {
        //        document.getElementById("signupbtn").disabled = true ;
        //     }
        //   }
        // }
        handleSignup() {
          if (this.username !== "" && this.password !== "" && this.email !== "") {
            axios.post("http://localhost:3001/api/user/signup/" , {password : this.password , email : this.email , username : this.username}).then((result) => {
              if (result.data.message == 'Error! Email already used') {
                alert('Erreur! Adresse email déjà utilisée');
              } else if(result.data.message == 'Error! username already used') {
                alert('Pseudo déjà utilisé');
              } else {
                alert('inscription réussie. Veuillez vous connecter avec votre compte');
                location.replace('/login');
              }
            })
          }
        }
    }
}
</script>

<template>
    <main class="form-signin">
  <form>
    <img class="mb-4 d-block mx-auto" src="../assets/image/icon-left-font.png" alt="" width="250" height="200">
    <h1 class="h3 mb-3 fw-normal">Please sign up</h1>

    <div class="form-floating">
      <input @keyup="verifEmail" v-model="email" type="email" class="form-control" id="floatingInputEmail" placeholder="name@example.com">
      <label for="floatingInput">Email address</label>
      <span v-if="valideEmail == false" class="text-center text-danger">Email Invalid</span>
    </div>
    <div class="form-floating">
      <input v-model="username" type="text" class="form-control" id="floatingInput" placeholder="Toto">
      <label for="floatingInput">Username</label>
    </div>
    <div class="form-floating">
      <input  v-model="password" type="password" class="form-control" id="floatingPassword" placeholder="Password">
      <label for="floatingPassword">Password</label>
    </div>

    <a @click="handleSignup" v-show="valideEmail" id="signupbtn" href="#" class="w-100 btn btn-lg btn-primary" type="submit">Sign up</a>
    <p class="mt-5 mb-3 text-muted">&copy; 2017–2021</p>
  </form>
</main>
</template>
<style>
    html,
body {
  height: 100%;
}


body {
  align-items: center;
  padding-bottom: 40px;
}

.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}

.form-signin .checkbox {
  font-weight: 400;
}

.form-signin .form-floating:focus-within {
  z-index: 2;
}

.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

.bd-placeholder-img {
        font-size: 1.125rem;
        text-anchor: middle;
        -webkit-user-select: none;
        -moz-user-select: none;
        user-select: none;
      }

      @media (min-width: 768px) {
        .bd-placeholder-img-lg {
          font-size: 3.5rem;
        }
      }

</style>