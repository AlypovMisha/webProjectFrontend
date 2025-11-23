<script>
export default {
  name: "Product"
}
</script>

<template>
  <q-card class="my-card" flat>

    <img src="https://cdn.quasar.dev/img/mountains.jpg">

    <q-card-section>

      <RouterLink to="/product/">
        <div class="text-h6">Товар с алиэкспресс</div>
      </RouterLink>
      <div class="text-h6" style="font-weight: bold">
        <span style="font-size: 20px" class="operText">300₽</span>
      </div>
      <div>
        <span class="prevPrice">350₽</span>
        <span class="bargainText">-10%</span>
      </div>

    </q-card-section>

    <q-card-section class="q-pt-none">
      <div style="display: flex; justify-content: space-between">
        <div>
          <q-icon name="star" color="orange" size="sm"></q-icon>
          <q-icon name="star" color="orange" size="sm"></q-icon>
          <q-icon name="star" color="orange" size="sm"></q-icon>
          <q-icon name="star" color="orange" size="sm"></q-icon>
          <q-icon name="star" color="orange" size="sm"></q-icon>
        </div>
        <div style="color: rgba(153, 163, 174);">
          228 отзывов
        </div>
      </div>


    </q-card-section>
  </q-card>
</template>

<style>
.operText {
  background-clip: text;
  background-image: linear-gradient(225deg, rgb(241, 17, 126) 0%, rgb(241, 17, 126) 100%);
  color: transparent;
}

.prevPrice {
  color: rgba(153, 163, 174);
  text-decoration: line-through;
  font-size: 14px;
  //margin-left: 4px;
}

.bargainText {
  color: rgba(241, 17, 126, 1);
  font-size: 14px;
  margin-left: 4px;
}
</style>
