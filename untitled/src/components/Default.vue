<template>
  <div>
    <b-navbar type="dark" variant="info">
      <b-navbar-brand>
        <router-link class="link-color" to="/">Home</router-link>
      </b-navbar-brand>
      <b-navbar-nav>
        <b-nav-item>

        </b-nav-item>
      </b-navbar-nav>

      <b-navbar-nav class="ml-auto">
        <b-nav-item v-if="this.haveToken == false" @click="goLogin">
          Login
        </b-nav-item>

        <b-nav-item v-if="this.haveToken == true" @click="signout">Sign out</b-nav-item>

      </b-navbar-nav>
    </b-navbar>

  </div>
</template>

<script>
    export default {
        name: "Default",
      data() {
          return {
            haveToken: false,
        }
      },
      created: function() {
          this.tokenExist();
      },
      methods: {
          goLogin() {
            this.$router.push("/login")
          },
        goHome() {
          this.$router.push('/');
        },
          tokenExist() {
            if (localStorage.getItem("cdpmToken") !== null) {
              console.log("co token");
              this.haveToken = true;
            }
            else {
              console.log("ko co token");
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
