import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    cartItemQuantity: 0,
  },
  mutations: {
    increaseQuantity() {
      this.cartItemQuantity++;
    },

    decreaseQuantity() {
      this.cartItemQuantity--;
    }
  },
  actions: {
    getTotalItemInCart() {
      let carts = null;
      this.state.cartItemQuantity = 0;
      if (localStorage.getItem("cart") != null) {
        carts = JSON.parse(localStorage.getItem("cart"));
        for (let i = 0; i < carts.length; i++) {
          this.state.cartItemQuantity = parseInt(this.state.cartItemQuantity) + parseInt(carts[i].quantity);
        }
      }
    }
  }
});

export default store;

