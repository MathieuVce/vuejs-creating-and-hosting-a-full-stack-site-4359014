<template>
  <h1>MY Cart</h1>
  <div v-if="cartItems.length > 0">
    <ShoppingCartList :products="cartItems" @remove-from-cart="removeFromCart($event)"/>
    <button class="checkout-button">Proceed to Checkout</button>
  </div>
  <div v-else>
    You don't have any items in your Cart
  </div>
</template>

<script>
import axios from 'axios';
import ShoppingCartList from '@/components/ShoppingCartList'

export default {
  name: "ShoppingCartPage",
  props: ['user'],
  components: {
    ShoppingCartList
  },
  data () {
    return {
      cartItems: [],
    }
  },
  watch: {
    async user(newUserValue) {
      if (newUserValue) {
        const cartResponse = await axios.get(`/api/users/${newUserValue.uid}/cart`);
        const cartItems = cartResponse.data;
        this.cartItems = cartItems;
      }
    }
  },
  methods: {
    async removeFromCart(productId) {
      const response = await axios.delete(`/api/users/${this.user.uid}/cart/${productId}`)
      const updatedCart = response.data
      this.cartItems = updatedCart;
      alert('Item removed from cart')
    }
  },
  async created() {
    if (this.user) {
      const response = await axios.get(`/api/users/${this.user.uid}/cart`)
      const cartItems = response.data
      this.cartItems = cartItems
    }
  },
}
</script>