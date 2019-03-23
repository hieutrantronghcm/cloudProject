<template>
  <div>
    <v-container>
      <v-flex md4 offset-md4>
        <h2>
          <v-label>
            Register Page
          </v-label>
        </h2>
        <v-form @submit.prevent="register">
          <v-text-field :rules="[rules.usernameRequired]" v-model="account.username" label="Username">
          </v-text-field>

          <v-text-field :rules="[rules.passwordRequired]" v-model="account.password" label="Password" :type="'password'"></v-text-field>

          <v-text-field :rules="[rules.mismatchPassword, rules.passwordRequired]" ref="repass" label="Re-enter password" :type="'password'">
          </v-text-field>

          <v-text-field v-model="account.email" :type="'email'" label="Email"></v-text-field>
          <v-btn type="submit" color="success">Register</v-btn>
          <v-btn color="info" @click="goHome">Home</v-btn>
        </v-form>
      </v-flex>
    </v-container>
  </div>
</template>

<script>
  import axios from 'axios';
  import _ from 'lodash.debounce';
  export default {
    name: "RegisterForm",
    data() {
      return {
        account: {
          username: '',
          password: '',
          email: '',
          role: '',
        },
        isUsernameExisted: false,

        rules: {
          usernameRequired: username => !!username || "Username required !!",
          usernameExisted: username => !this.isUsernameExisted || "Username existed!!",
          passwordRequired: password => !!password || "Password required !!",
          mismatchPassword: password => this.account.password == password || "Password not match !!"
        }
      }
    },
    watch: {
      isUsernameExisted: function() {
        this.checkUsernameExist();
      }
    },

    methods: {
      goHome() {
        this.$router.push('/');
      },
      checkUsernameExist() {

        return axios.get('/users/check?username=' + this.account.username, {
          headers: {
            "Access-Control-Allow-Origin": "*"
          }
        })
          .then(res => {
            console.log(res.data)
            console.log(typeof res.data);
            this.isUsernameExisted = res.data;
            console.log(this.isUsernameExisted + " - " + this.account.username)
            return res.data;
          }).catch(
          error => {
            console.log("Cannot found any result!");
          }
        )
      },

      register() {
        axios.post('/users', this.account
        ).then(response => {
            console.log(res);
            this.$router.push('/login');
          }
        ).catch(error => {
          alert(error.response.data.message);
        })
      }
    }
  }
</script>

<style scoped>

</style>
