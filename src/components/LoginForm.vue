<template>
  <div>
    <v-form>
      <v-container>
        <v-flex md4 offset-md4>
          <h2>
            <v-label>
              Login Page
            </v-label>
          </h2>
          <v-text-field v-model="account.username" label="Username"></v-text-field>
          <v-text-field v-model="account.password" label="Password" :type="'password'"></v-text-field>
          <v-btn @click="login" color="success">Login</v-btn>
          <v-btn color="info" @click="goHome">Home</v-btn>
        </v-flex>
      </v-container>
    </v-form>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    name: "LoginForm",
    data() {
      return {
        account: {
          username: '',
          password: ''
        }
      }
    },
    methods: {
      goHome() {
        this.$router.push('/');
      },
      login() {

        axios.post('/login', this.account
        ).then(
          response => {
            console.log("cdpmToken : " + response.data.token);
            localStorage.setItem("cdpmToken", response.data.token);
            this.$router.push('/');
          }
        ).catch(
          (error) => {
            console.log(error.response.data);
            localStorage.removeItem("cdpmToken");
          }
        )
      }
    }
  }
</script>

<style scoped>

</style>
