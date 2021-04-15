<template>
<div>
  <h1>{{this.$root.$data.cartInfo}}</h1>
  <CartList :products="products" />
  <h6 class = "bg-light">All Content Copyright Chris Harden<br><br>
    <a href="https://github.com/BYU-CS-260-Winter-2021/lab-3b-grocery-store-chardensoft" target = "_blank">Github link for website code</a>
  </h6>
</div>
</template>

<script>
import CartList from "../components/CartList.vue"
export default {
  name: 'Cart',
  components: {
    CartList
  },
  data() {
    return {
    }
  },
  computed: {
    products() {
      return this.$root.$data.cart;
    }
  },
}
</script>

<style scoped>
h1 {
 text-align: center;
}

h6 {
  width: 100%;
  background: lightgray;
  margin-top: 50px;
  text-align: center;
  height: 100px;
  padding-top: 25px;
}

</style>
