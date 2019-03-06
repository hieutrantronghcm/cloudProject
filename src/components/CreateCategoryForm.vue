<template>
  <div>
    <b-form inline>
      <b-form-input
        type="text"
        required
        placeholder="Enter category name"
        class="m-3">

      </b-form-input>


      <b-button type="submit" variant="primary">Create</b-button>
    </b-form>
  </div>
</template>

<script>
    export default {
        name: "CreateCategoryForm"
    }
</script>

<style scoped>

</style>
