<script>
import Product from "components/DEMO/Product.vue";

export default {
  name: "DemoProductsGrid",
  components: {Product}
}
</script>

<template>
  <div class="row">
    <div class="col-lg-3 col-md-4 col-sm-6 col-12"
         :style="prod % 4 == 0 ? 'padding: 15px 15px 15px 0;' : 'padding: 15px 15px;'"
         v-for="prod in [0,1,2,3,4,5,6,7]">
      <Product/>
    </div>
  </div>
</template>

<style scoped>

</style>
