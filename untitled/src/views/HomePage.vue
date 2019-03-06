<template>
  <div>
    <search-bar></search-bar>
  </div>
</template>

<script>
    import SearchBar from "@/components/SearchBar";
    export default {
        name: "HomePage",
      components: {SearchBar},
      methods: {
          fun() {
            this.searchByName()
          }
      }
    }
</script>

<style scoped>

</style>
