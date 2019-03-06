<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info" class="text-center">
        <b-navbar-brand>
          <router-link to="/" style="color: white">Home</router-link>
        </b-navbar-brand>

        <b-navbar-nav>
          <!--<b-nav-item-dropdown text="Product">-->
            <!--<b-dropdown-item>-->
              <!--<router-link to="/">create new</router-link>-->
            <!--</b-dropdown-item>-->
            <!--<b-dropdown-item>-->
              <!--<router-link to="/">update</router-link>-->
            <!--</b-dropdown-item>-->
          <!--</b-nav-item-dropdown>-->
          <b-nav-item @click="enableCategoryPage = false, enableProductPage = true">Product</b-nav-item>

          <b-nav-item @click="enableCategoryPage = true, enableProductPage= false">Category</b-nav-item>
          <!--<b-nav-item-dropdown text="Category">-->
            <!--<b-dropdown-item>-->
              <!--<router-link to="/createCategory">create new</router-link>-->
            <!--</b-dropdown-item>-->
            <!--<b-dropdown-item>-->
              <!--<router-link to="/updateCategory">update</router-link>-->
            <!--</b-dropdown-item>-->
          <!--</b-nav-item-dropdown>-->

          <!--<b-nav-item-dropdown text="Supplier">-->
            <!--<b-dropdown-item>Apple</b-dropdown-item>-->
            <!--<b-dropdown-item>Samsung</b-dropdown-item>-->
            <!--<b-dropdown-item>Sony</b-dropdown-item>-->
          <!--</b-nav-item-dropdown>-->
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto">
          <b-nav-item @click="signout">Sign out</b-nav-item>
          <!--<b-nav-item-dropdown text="Admin" right>-->
            <!--<b-dropdown-item>Profile</b-dropdown-item>-->
            <!--<b-dropdown-item>Sign out</b-dropdown-item>-->
          <!--</b-nav-item-dropdown>-->
        </b-navbar-nav>
    </b-navbar>
    <update-category-form v-if="enableCategoryPage"></update-category-form>
    <manage-product v-if="enableProductPage"></manage-product>
  </div>

</template>

<script>
    import UpdateCategoryForm from "@/components/UpdateCategoryForm";
    import ManageProduct from "@/components/ManageProduct";
    export default {
      name: "DashBoard",
      data() {
        return {
          enableCategoryPage: false,
          enableProductPage: false,
        }
      },
      methods: {
        signout() {
          localStorage.removeItem("cdpmToken");
          this.$router.push("/login")
        }
      },
      components: {ManageProduct, UpdateCategoryForm},
    }
</script>

<style scoped>

</style>
