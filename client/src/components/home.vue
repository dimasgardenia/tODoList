<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <todolist v-bind:result="tampung"></todolist>
    <button type="button" v-on:click="logout" name="logout">logout</button>
    <inputtodo></inputtodo>
  </div>
</template>

<script>
import axios from 'axios'
import todolist from '@/components/todolist'
import login from '@/components/login'
import inputtodo from '@/components/inputtodo'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to ToDo List',
      tampung: [],
      token: localStorage.getItem('token')
    }
  },
  methods: {
    getlist () {
      axios.get('http://localhost:3000/api', {
        headers: {token: localStorage.getItem('token')}
      })
      .then(response => {
        console.log(response)
        this.tampung = response.data
      })
      .catch(err => {
        console.log(err)
      })
    },
    addtask () {
      axios({
        method: 'post',
        url: 'http://localhost:3000/api',
        headers: {token: localStorage.getItem('token')},
        data: {
          task: this.addtodo.task
        }
      })
      .then(response => {
        this.tampung = response.data
        this.$router.push('/home')
      })
    },
    logout () {
      localStorage.removeItem('token')
      localStorage.removeItem('fbaccesstoken')
      this.$router.push('/')
    }
  },
  components: {
    todolist,
    login,
    inputtodo
  },
  created () {
    if (this.token == null || this.token === 'invalid username') {
      alert('invalid username or password')
      this.$router.push('/')
    }
    this.getlist()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
