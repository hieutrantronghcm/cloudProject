<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info" class="text-center">
        <b-navbar-brand>
          <router-link to="/" style="color: white">Home</router-link>
        </b-navbar-brand>

        <b-navbar-nav>
          <b-nav-item @click="showProduct">Product</b-nav-item>

          <b-nav-item @click="showCategory">Category</b-nav-item>

          <b-nav-item @click="showSupplier">Supplier</b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto">
          <b-nav-item @click="signout">Sign out</b-nav-item>
        </b-navbar-nav>
    </b-navbar>
    <update-category-form v-if="enableCategoryPage"></update-category-form>
    <manage-product v-if="enableProductPage"></manage-product>
    <manage-supplier v-if="enableSupplierPage"></manage-supplier>
  </div>

</template>

<script>
    import UpdateCategoryForm from "@/components/UpdateCategoryForm";
    import ManageProduct from "@/components/ManageProduct";
    import ManageSupplier from "@/components/ManageSupplier";
    export default {
      name: "DashBoard",
      components: {ManageSupplier, ManageProduct, UpdateCategoryForm},
      data() {
        return {
          enableCategoryPage: false,
          enableProductPage: false,
          enableSupplierPage: false,
        }
      },
      methods: {
        signout() {
          localStorage.removeItem("cdpmToken");
          this.$router.push("/login")
        },

        resetFlag() {
          this.enableCategoryPage = false;
          this.enableProductPage = false;
          this.enableSupplierPage = false
        },

        showProduct() {
          this.resetFlag();
          this.enableProductPage = true;
        },

        showCategory() {
          this.resetFlag();
          this.enableCategoryPage = true;
        },

        showSupplier() {
          this.resetFlag();
          this.enableSupplierPage = true;
        }
      },

    }
</script>

<style scoped>

</style>
