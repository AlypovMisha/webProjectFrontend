<template>
  <q-layout view="lHh Lpr lFf">

    <div class="q-pa-md" style="padding-top: 0">
      <!-- Container with max-width breakpoints (like Bootstrap's .container) -->
      <div class="container_gay q-gutter-y-md" style="background-color: white">
        <div class="row" style=" align-items: center">
          <div class="col-1">
            <RouterLink to="/"><p style="margin: 0; font-size: 2em">Sellzy</p></RouterLink>
          </div>
          <div class="col-2" style="display: flex; justify-content: space-around">
            <q-btn icon="menu">Каталог</q-btn>
          </div>
          <div class="col-6">
            <q-input label="Розыск">
              <template v-slot:after>
                <q-btn round dense flat icon="search" to="/search/"/>
              </template>
            </q-input>
          </div>
          <div class="col-3" style="display:flex;justify-content: center;">
            <q-btn round flat icon="shopping_basket" to="/cart/"/>
            <q-btn round flat icon="account_circle" to="/orders/"/>
          </div>
          <div class="col-12">

            <q-page-container>
              <router-view/>
            </q-page-container>

            <div style="margin-top: 50px; margin-bottom: 100px" class="row">
              <div class="col-lg-3 col-md-6 col-12" style="display: flex; flex-direction: column; justify-content: space-between; padding-right: 50px">
                <p style="margin: 0; font-size: 2em">Sellzy</p>
                <p style="font-size: 12px; color: grey">Подпишись, чтобы первым быть в курсе новых акций и скидок на
                  нашей площадке!</p>
                <p style="font-size: 14px;">© 2025 Sellzy</p>
              </div>
              <div class="col-lg-3 col-md-6 col-12">
                <h6 style="margin-bottom: 10px;margin-top: 0;">Покупателям</h6>
                <p style="font-size: 14px; color: grey">Вопросы и ответы</p>
                <p style="font-size: 14px; color: grey">Заказы и доставка</p>
                <p style="font-size: 14px; color: grey">Возврат товаров</p>
                <p style="font-size: 14px; color: grey">Оплата</p>
                <p style="font-size: 14px; color: grey">Акции и скидки</p>
              </div>
              <div class="col-lg-3 col-md-6 col-12">
                <h6 style="margin-bottom: 10px;margin-top: 0;">О нас</h6>
                <p style="font-size: 14px; color: grey">Контакты</p>
                <p style="font-size: 14px; color: grey">Социальные сети</p>
                <p style="font-size: 14px; color: grey">Сотрудничество</p>
              </div>
              <div class="col-lg-3 col-md-6 col-12">
                <h6 style="margin-bottom: 10px;margin-top: 0;">Подписаться на новости</h6>
                <p style="font-size: 14px; color: grey">Подпишись, чтобы первым быть в курсе новых акций и скидок на
                  нашей площадке!</p>
                <p>
                  <q-input label="Подписаться на новости">
                    <template v-slot:after>
                      <q-btn round dense flat icon="arrow_right"/>
                    </template>
                  </q-input>

                </p>
                <p>
                  <q-checkbox v-model="xer">
                     <span>Соглашаюсь с <a href="http://google.com" target="_blank" style="color: black" @click.stop>Политикой конфидицеальности</a></span>
                  </q-checkbox>


                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>


  </q-layout>
</template>

<script>
import {defineComponent, ref} from 'vue'
import EssentialLink from 'components/EssentialLink.vue'
import Product from "components/DEMO/Product.vue";
import DemoProductsGrid from "components/DEMO/DemoProductsGrid.vue";

const linksList = [
  {
    title: 'Docs',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'https://quasar.dev'
  },
  {
    title: 'Github',
    caption: 'github.com/quasarframework',
    icon: 'code',
    link: 'https://github.com/quasarframework'
  },
  {
    title: 'Discord Chat Channel',
    caption: 'chat.quasar.dev',
    icon: 'chat',
    link: 'https://chat.quasar.dev'
  },
  {
    title: 'Forum',
    caption: 'forum.quasar.dev',
    icon: 'record_voice_over',
    link: 'https://forum.quasar.dev'
  },
  {
    title: 'Twitter',
    caption: '@quasarframework',
    icon: 'rss_feed',
    link: 'https://twitter.quasar.dev'
  },
  {
    title: 'Facebook',
    caption: '@QuasarFramework',
    icon: 'public',
    link: 'https://facebook.quasar.dev'
  },
  {
    title: 'Quasar Awesome',
    caption: 'Community Quasar projects',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev'
  }
]

export default defineComponent({
  name: 'MainLayout',

  components: {
    DemoProductsGrid,
    Product,
    EssentialLink
  },

  data() {
    return {
      slide: 1,
      xer: false,
      linksList,
      leftDrawerOpen: false
    }
  },

  methods: {
    toggleLeftDrawer() {
      this.leftDrawerOpen = !this.leftDrawerOpen
    }
  }
})
</script>

<style>
.container_gay {
  width: 100%;
  margin: 0 auto;
}

/* Responsive container breakpoints similar to Bootstrap */
@media (min-width: 576px) {
  .container_gay {
    max-width: 540px;
  }
}

@media (min-width: 768px) {
  .container_gay {
    max-width: 720px;
  }
}

@media (min-width: 992px) {
  .container_gay {
    max-width: 960px;
  }
}

@media (min-width: 1200px) {
  .container_gay {
    max-width: 1140px;
  }
}

@media (min-width: 1400px) {
  .container_gay {
    max-width: 1320px;
  }
}
</style>
