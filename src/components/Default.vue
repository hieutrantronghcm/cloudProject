<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div>
    <b-navbar type="dark" variant="info">
      <b-navbar-brand>
        <a href="/" class="link-color">Home</a>
      </b-navbar-brand>
      <b-navbar-nav>
        <b-nav-item>
          <router-link to="/admin" class="link-color">Admin</router-link>
        </b-nav-item>
      </b-navbar-nav>

      <b-navbar-nav class="ml-auto">
        <b-nav-item v-if="this.haveToken == false" @click="goLogin">
          Login
        </b-nav-item>

        <b-nav-item v-if="this.haveToken == false" @click="goRegister">
          Register
        </b-nav-item>

        <b-nav-item v-if="this.haveToken == true" @click="goPayment">
          Payment
        </b-nav-item>

        <b-nav-item v-if="this.haveToken == true" @click="goCart" class="mr-5">
          <img src="../assets/shopping-cart.png" height="20px" width="20px"/>
          Cart
          <v-badge color="#FDD835">
            <template v-slot:badge>
                <span style="color: black; font-weight: bold">
                  {{cartItemQuantity}}</span>
            </template>
          </v-badge>
        </b-nav-item>


        <b-nav-item v-if="this.haveToken == true" @click="signout">Sign out</b-nav-item>

      </b-navbar-nav>
    </b-navbar>

  </div>
</template>

<script>
  import {mapState, mapActions} from 'vuex';

  export default {
    name: "Default",
    data() {
      return {
        haveToken: false,
      }
    },
    created: function () {
      this.tokenExist();
      this.getTotalItemInCart();
    },
    computed: {
      ...mapState({
        cartItemQuantity: state => state.cartItemQuantity
      }),

    },
    methods: {
      getTotalItemInCart() {
        this.$store.dispatch('getTotalItemInCart');
      },
      goRegister() {
        this.$router.push("/register")
      },
      goLogin() {
        this.$router.push("/login")
      },
      goPayment() {
        this.$root.$emit('view-payment');
      },
      goCart() {
        this.$root.$emit('view-cart');
      },
      goHome() {
        this.$router.go();
      },
      tokenExist() {
        if (localStorage.getItem("cdpmToken") !== null) {
          this.haveToken = true;
        } else {
          this.haveToken = false;
        }
      },
      signout() {
        localStorage.removeItem("cdpmToken");
        this.haveToken = false;
        this.$router.push("/login")
      }
    }
  }
</script>

<style scoped>
  .link-color {
    color: white;
  }
</style>
