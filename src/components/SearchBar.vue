<template>
    <v-form>
      <br>
      <v-flex style="display: inline-flex">
        <v-text-field v-model="searchValue" solo label="Search product" style="width: 500px"/>
        <v-btn style="float: left;">Search</v-btn>
      </v-flex>
    </v-form>
</template>

<script>
  import axios from 'axios'
    export default {
        name: "SearchBar",
      data() {
          return {
            searchValue: ''
          }
      },
      methods: {
          searchByName() {
            axios.get('http://localhost:8080/products/all', {
              headers: {
                // "Authorization": `Bearer ${localStorage.getItem("cdpmToken")}`,
                "Content-type": 'application/json'
              }
            }).then(response => {
              this.products = response.data;
            }).catch(
              () => console.log("Cannot found any result!")
            )
          }
      }
    }
</script>

<style scoped>
#txtSearch {
  width: 400px;
}
</style>
