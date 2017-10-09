<template>
  <div>
  <fb-signin-button
    :params="fbSignInParams"
    @success="onSignInSuccess"
    @error="onSignInError">
    Sign in with Facebook
  </fb-signin-button>
  <button type="button" @click="register">Register</button>
  <form>
  User Name:<br>
  <input type="text" v-model="formLog.username"name="username"><br>
  Password:<br>
  <input type="text" v-model="formLog.password" name="password">
  <br>
  <button type="button" @click="loged">Login</button>
</form>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      fbSignInParams: {
        scope: 'email,user_likes,public_profile',
        return_scopes: true
      },
      formLog: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    onSignInSuccess (response) {
      console.log(response)
      // FB.api('/me', dude => {
      //   console.log(`Good to see you, ${dude.name}.`)
      // })
      localStorage.setItem('fbaccesstoken', response.authResponse.accessToken)
      // console.log(response.authResponse.accessToken)
      axios({
        method: 'post',
        url: 'http://localhost:3000/loginfb',
        headers: {
          fbaccesstoken: localStorage.getItem('fbaccesstoken')
        }
      })
      .then(response => {
        console.log(response)
        localStorage.setItem('token', response.data.token)
        this.$router.push('/home')
      }).catch(err => {
        console.log(err)
      })
    },
    onSignInError (error) {
      console.log('OH NOES', error)
    },
    loged () {
      axios({
        method: 'post',
        url: 'http://localhost:3000/signin',
        data: {
          username: this.formLog.username,
          password: this.formLog.password
        }
      })
      .then(response => {
        // console.log(response)
        // console.log('ini headers response', response.data)
        localStorage.setItem('token', response.data)
        this.$router.push('/home')
      })
    },
    register () {
      this.$router.push('/register')
    }
  }
}
</script>

<style>
.fb-signin-button {
  /* This is where you control how the button looks. Be creative! */
  display: inline-block;
  padding: 4px 8px;
  border-radius: 3px;
  background-color: #4267b2;
  color: #fff;
}
</style>
