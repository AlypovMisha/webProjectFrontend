<template>
  <q-page >
    <q-carousel
              animated
              v-model="slide"
              arrows
              navigation
              infinite
              style="height: auto"
            >
              <q-carousel-slide :name="1">
                <div class="row" style="height: 350px">
                  <div class="col-6" style="height: 100%">
                    <div style="display: flex; justify-content: center; align-items: center; height: 100%">
                      <div>
                        <h4 style="margin: 0">Слайд #1</h4>
                        <p>Описание слайда</p>
                        <q-btn>Шопинг</q-btn>
                      </div>
                    </div>
                  </div>
                  <div class="col-6" style="height: 100%">
                    <img src="../../public/Screenshot_4.png" style="width: 100%; height: 100%; object-fit: cover;">
                  </div>
                </div>
              </q-carousel-slide>
              <q-carousel-slide :name="2">
                <div class="row" style="height: 350px">
                  <div class="col-6" style="height: 100%">
                    <div style="display: flex; justify-content: center; align-items: center; height: 100%">
                      <div>
                        <h4 style="margin: 0">ОПА!</h4>
                        <p>Описание слайда</p>
                        <q-btn>Шопинг</q-btn>
                      </div>
                    </div>
                  </div>
                  <div class="col-6" style="height: 100%">
                    <img src="../../public/statya_sbyt_tovarov.jpg"
                         style="width: 100%; height: 100%; object-fit: cover;">
                  </div>
                </div>
              </q-carousel-slide>
            </q-carousel>



          <div class="col-12" style="margin-top: 25px">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <div >
                <span style="font-weight: bold; cursor: pointer">Людское</span>
                <span style="margin-left: 20px; cursor: pointer">Мужское</span>
                <span style="margin-left: 20px; cursor: pointer">Женское</span>
              </div>
              <div style="padding-right: 15px">
                <q-btn flat round icon="filter_alt"></q-btn>
              </div>
            </div>
            <DemoProductsGrid/>
          </div>

  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import DemoProductsGrid from "components/DEMO/DemoProductsGrid.vue";

export default defineComponent({
  name: 'IndexPage' ,
  components: {DemoProductsGrid},
  data() {
    return {
      slide: 1
    }
  }
});
</script>
