<template>
<div>
  <div class="pure-menu pure-menu-horizontal">
    <ul class="pure-menu-list">
      <li class="pure-menu-item"><a @click="select('United States')" href="#" class="pure-menu-link">United States</a></li>
      <li class="pure-menu-item"><a @click="select('Canada')" href="#" class="pure-menu-link">Canada</a></li>
      <li class="pure-menu-item"><a @click="select('Mexico')" href="#" class="pure-menu-link">Mexico</a></li>
      <li class="pure-menu-item"><a @click="select('Brazil')" href="#" class="pure-menu-link">Brazil</a></li>
    </ul>
  </div>
  <ProductList :products="products" />
  <h6 class = "bg-light">All Content Copyright Chris Harden<br><br>
    <a href="https://github.com/BYU-CS-260-Winter-2021/lab-3b-grocery-store-chardensoft" target = "_blank">Github link for website code</a>
  </h6>
</div>
</template>

<script>
import ProductList from "../components/ProductList.vue"
export default {
  name: 'Browse',
  components: {
    ProductList
  },
  data() {
    return {
      country: '',
    }
  },
  computed: {
    products() {
      return this.$root.$data.products.filter(product => product.country === this.country);
    }
  },
  methods: {
    select(country) {
      this.country = country;
    }
  }
}
</script>

<style scoped>
h6 {
  width: 100%;
  background: lightgray;
  margin-top: 50px;
  text-align: center;
  height: 100px;
  padding-top: 25px;
}

</style>
