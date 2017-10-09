<template>
  <div class="">
    <form>
      <br>
    Task<br>
    <input type="text" v-model='addtodo.task' name="task"><br>
    <br>
    <button type="button" @click="addtask">Submit</button>
  </form>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      addtodo: {
        task: ''
      }
    }
  },
  methods: {
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
        this.$router.push('/home')
      })
    }
  }
}
</script>

<style lang="css">
</style>
