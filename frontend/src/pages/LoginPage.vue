<script>
 import axios from 'axios' ;

export default {
    name: "LoginPage",
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
        // return {
        //     username: "",
        //     password: "",
        //     error: ""
        // }
    },
    methods: {
        /*login() {
            if (this.username === "admin" && this.password === "admin") {
                this.$router.push("/")
            } else {
                this.error = "Invalid credential"
            }*/
          handleLogin() {
            if (this.username !== null && this.password !== null) {
              axios.post("http://localhost:3001/api/user/login/" , {username : this.username , password : this.password})
              .then((result) => {
                if (result.data.message == 'something went wrong') {
                  alert('indentifiants incorrect');
                } else if (result.data.message == "user don't exist") {
                  alert("Vous n'avez aucun compte chez nous");
                } else if(result.data.message == "user attempted") {
                  localStorage.setItem('token' , result.data.token);
                  localStorage.setItem('usersId' , result.data.usersId);
                  localStorage.setItem('isAdmin' , result.data.isAdmin);
                  location.replace('/home');
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
    <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

    <div class="form-floating">
      <input type="text" v-model="username" class="form-control" id="floatingInput" placeholder="name@example.com">
      <label for="floatingInput">username</label>
    </div>
    <div class="form-floating">
      <input type="password" v-model="password" class="form-control" id="floatingPassword" placeholder="Password">
      <label for="floatingPassword">Password</label>
    </div>

    <a href="#" @click="handleLogin" class="w-100 btn btn-lg btn-primary" type="submit">Sign in</a>
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