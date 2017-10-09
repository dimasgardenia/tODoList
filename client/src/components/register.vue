<template>
  <form>
  User Name:<br>
  <input type="text" v-model='formLogin.username' name="username"><br>
  Password:<br>
  <input type="text" v-model='formLogin.password' name="password"><br>
  Email:<br>
  <input type="text" v-model='formLogin.email' name="email"><br>
  <br>
  <button type="button" @click="adduser">Submit</button>
</form>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      formLogin: {
        username: '',
        password: '',
        email: ''
      }
    }
  },
  methods: {
    adduser () {
      axios({
        method: 'post',
        url: 'http://localhost:3000/signup',
        data: {
          username: this.formLogin.username,
          password: this.formLogin.password,
          email: this.formLogin.email
        }
      })
      .then(response => {
        // localStorage.getItem('token', response.headers.token)
        this.$router.push('/')
      })
    }
  }
}
</script>

<style lang="css">
</style>
