<template>
  <div class="container">
    <div class="row">
      <div class="col-md-4">
            <div class="thumbnail" v-for="results in result">
              <!-- <img src="style/image/poma.jpg" alt="pomade0"> -->
              <!-- <div class="caption"> -->
                <h3>List Todos</h3>
                <p>{{results.task}}</p>
                <button type="button" name="button" v-if="results.status == false ">undone</button>
                <button type="button" name="button" v-else="results.status == true">done</button>
              </div>
            </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['result']
}
</script>
