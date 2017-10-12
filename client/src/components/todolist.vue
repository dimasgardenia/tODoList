<template>
  <div class="container">
    <div class="row">
      <div class="col-md-4">
            <div class="thumbnail" v-for="results in result">
              <!-- <img src="style/image/poma.jpg" alt="pomade0"> -->
              <!-- <div class="caption"> -->
                <h3>List Todos</h3>
                <p>{{results.task}}</p>
                <button type="button" name="changestatus" v-show="results.status == false" @click="changestatus(results._id)">Undone</button>
                <button type="button" name="button" v-show="results.status">done</button>
              </div>
            </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  props: ['result'],
  data () {
    return {
      status: false
    }
  },
  methods: {
    changestatus (id) {
      axios.put(`http://localhost:3000/api/${id}`, {
        status: false
      }, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(response => {
        console.log('masuk response true', response.data)
        this.getlist()
      })
      .catch(err => {
        console.log(err)
      })
    }
  }
}
</script>
