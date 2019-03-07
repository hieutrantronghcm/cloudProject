<template>
    <v-form>
      <br>
      <v-flex style="display: inline-flex">
        <v-text-field v-model="searchValue" solo label="Search product" style="width: 500px"/>
        <v-btn style="float: left;" @click="">Search</v-btn>
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
    }
</script>

<style scoped>
#txtSearch {
  width: 400px;
}
</style>
