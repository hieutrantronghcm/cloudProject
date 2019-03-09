<template>
  <div>
    <v-container>
      <v-flex md4 offset-md4>
        <h2>
          <v-label>
            Register Page
          </v-label>
        </h2>
        <v-text-field v-model="account.username" label="Username"></v-text-field>
        <v-text-field v-model="account.password" label="Password" :type="'password'"></v-text-field>
        <v-text-field ref="repass" label="Re-enter password" :type="'password'"></v-text-field>
        <v-text-field v-model="account.email" :type="'email'" label="Email"></v-text-field>
        <v-select :items="role" item-text="name" item-value="value" v-model="account.role" label="Role">
        </v-select>
        <v-btn @click="register" color="success">Register</v-btn>
        <v-btn color="info" @click="goHome">Home</v-btn>
      </v-flex>
    </v-container>
  </div>
</template>

<script>
  import axios from 'axios';
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
        role:[
          {
            name: 'Admin',
            value: 'ADMIN'
          },
          {
            name: 'Customer',
            value: 'CUSTOMER',
          }
        ]
      }
    },

    methods: {
      goHome() {
        this.$router.push('/');
      },

      register() {
        console.log(this.account);
        axios.post('http://localhost:8080/users', this.account
        ).then(
          response => {
            this.$router.push('/login');
          }
        )
      }
    }
  }
</script>

<style scoped>

</style>
