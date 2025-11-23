<template>
  <q-page class="q-pa-lg">
    <!-- Хлебные крошки -->
    <q-breadcrumbs class="q-mb-xl">
      <q-breadcrumbs-el label="Главная" icon="home"/>
      <q-breadcrumbs-el label="Корзина" />
      <q-breadcrumbs-el label="Оформление заказа" />
    </q-breadcrumbs>

    <div class="text-h4 text-weight-bold q-mb-lg">Оформление заказа</div>

    <div class="row q-col-gutter-xl">
      <!-- Левая колонка - информация о заказе -->
      <div class="col-8">
        <!-- Блок доставки -->
        <q-card flat bordered class="q-mb-lg">
          <q-card-section>
            <div class="text-h6 text-weight-bold q-mb-md">Доставка</div>

            <div class="row items-center justify-between">
              <div>
                <div class="text-weight-medium">Пункт выдачи заказов</div>
                <div class="text-caption text-grey-7">г. Пермь, ул. Уинская, 12</div>
                <div class="text-caption text-grey-7">Ежедневно с 09:00 до 21:00</div>
              </div>
              <q-btn
                label="Выбрать ПВЗ"
                color="primary"
                outline
                @click="showPvzModal = true"
              />
            </div>
          </q-card-section>
        </q-card>

        <!-- Блок товаров -->
        <q-card flat bordered>
          <q-card-section>
            <div class="text-h6 text-weight-bold q-mb-md">Товары в заказе</div>

            <div class="row q-col-gutter-md">
              <div
                v-for="item in orderItems"
                :key="item.id"
                class="col-6"
              >
                <q-card bordered>
                  <q-card-section class="row items-center">
                    <q-img
                      :src="item.image"
                      width="60px"
                      height="60px"
                      class="rounded-borders q-mr-md"
                    />

                    <div style="flex: 1">
                      <div class="text-weight-medium">{{ item.name }}</div>
                      <div class="text-caption text-grey-7">{{ item.description }}</div>
                      <div class="row items-center justify-between q-mt-sm">
                        <div class="text-caption">Количество: {{ item.quantity }}</div>
                        <div class="text-h6 text-primary">{{ item.finalPrice * item.quantity }}₽</div>
                      </div>
                    </div>
                  </q-card-section>
                </q-card>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>

      <!-- Правая колонка - итоги -->
      <div class="col-4">
        <q-card flat bordered class="sticky" >
          <q-card-section>
            <div class="column q-gutter-y-md">
              <!-- Кнопка оформления -->
              <q-btn
                label="Оформить заказ"
                color="primary"
                size="lg"
                icon="shopping_cart"
                class="full-width"
                unelevated
                to="/orderMade/"
              />

              <!-- Информация о стоимости -->
              <div class="column q-gutter-y-sm">
                <div class="row items-center justify-between">
                  <div class="text-caption text-grey-7">Товары ({{ orderItems.length }})</div>
                  <div class="text-caption">{{ totalOriginalPrice }}₽</div>
                </div>

                <div class="row items-center justify-between">
                  <div class="text-caption text-grey-7">Скидка</div>
                  <div class="text-caption text-green">-{{ totalDiscount }}₽</div>
                </div>

                <div class="row items-center justify-between">
                  <div class="text-caption text-grey-7">Доставка</div>
                  <div class="text-caption text-green">Бесплатно</div>
                </div>

                <q-separator />

                <div class="row items-center justify-between">
                  <div class="text-h6 text-weight-bold">Итого к оплате</div>
                  <div class="text-h5 text-weight-bold text-primary">{{ totalPrice }}₽</div>
                </div>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- Модалка выбора ПВЗ -->
    <q-dialog v-model="showPvzModal" full-width full-height>
      <q-card>
        <q-card-section class="row items-center">
          <div class="text-h6">Выбор пункта выдачи заказов</div>
          <q-space />
          <q-btn flat round dense icon="close" v-close-popup />
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="row" style="height: 70vh">
            <!-- Левая колонка - список ПВЗ -->
            <div class="col-4">
              <q-scroll-area style="height: 70vh">
                <div class="column q-gutter-y-md">
                  <q-card
                    v-for="pvz in pvzList"
                    :key="pvz.id"
                    bordered
                    :class="{ 'border-primary': selectedPvz === pvz.id }"
                  >
                    <q-card-section>
                      <div class="text-weight-medium">{{ pvz.address }}</div>
                      <div class="text-caption text-grey-7 q-mb-sm">{{ pvz.workingHours }}</div>
                      <q-btn
                        label="Выбрать"
                        color="primary"
                        size="sm"
                        outline
                        class="full-width"
                      />
                    </q-card-section>
                  </q-card>
                </div>
              </q-scroll-area>
            </div>

            <!-- Правая колонка - карта -->
            <div class="col-8">
              <q-card bordered class="full-height">
                <q-card-section>
                  <div class="text-weight-medium q-mb-md">Выберите пункт выдачи на карте</div>

                  <!-- Заглушка для карты -->
                  <div class="full-height flex flex-center bg-grey-3 rounded-borders">
                    <div class="text-center">
                      <q-icon name="map" size="xl" color="grey-6" class="q-mb-sm" />
                      <div class="text-h6 text-grey-6">Карта</div>
                      <div class="text-caption text-grey-6">Здесь будет виджет карты</div>
                    </div>
                  </div>
                </q-card-section>
              </q-card>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
export default {
  name: "CheckoutPage",
  data() {
    return {
      showPvzModal: false,
      selectedPvz: 1,
      orderItems: [
        {
          id: 1,
          name: "Футболка темно-синяя однотонная",
          description: "Размер: M, Цвет: синий",
          image: "https://cdn.quasar.dev/img/parallax2.jpg",
          originalPrice: 350,
          finalPrice: 300,
          quantity: 2
        },
        {
          id: 2,
          name: "Джинсы классические",
          description: "Размер: 32, Цвет: синий",
          image: "https://cdn.quasar.dev/img/parallax1.jpg",
          originalPrice: 2500,
          finalPrice: 2500,
          quantity: 1
        },
        {
          id: 3,
          name: "Худи оверсайз",
          description: "Размер: L, Цвет: черный",
          image: "https://cdn.quasar.dev/img/mountains.jpg",
          originalPrice: 1800,
          finalPrice: 1500,
          quantity: 1
        }
      ],
      pvzList: [
        {
          id: 1,
          address: "г. Пермь, ул. Уинская, 12",
          workingHours: "Ежедневно с 09:00 до 21:00"
        },
        {
          id: 2,
          address: "г. Пермь, ул. Ленина, 45",
          workingHours: "Пн-Пт с 10:00 до 20:00, Сб-Вс с 10:00 до 18:00"
        },
        {
          id: 3,
          address: "г. Пермь, ул. Попова, 23",
          workingHours: "Ежедневно с 08:00 до 22:00"
        },
        {
          id: 4,
          address: "г. Пермь, ул. Куйбышева, 78",
          workingHours: "Пн-Сб с 09:00 до 21:00, Вс с 10:00 до 20:00"
        }
      ]
    }
  },
  computed: {
    totalOriginalPrice() {
      return this.orderItems.reduce((sum, item) => sum + (item.originalPrice * item.quantity), 0);
    },
    totalFinalPrice() {
      return this.orderItems.reduce((sum, item) => sum + (item.finalPrice * item.quantity), 0);
    },
    totalDiscount() {
      return this.totalOriginalPrice - this.totalFinalPrice;
    },
    totalPrice() {
      return this.totalFinalPrice;
    }
  }
}
</script>

<style scoped>
.border-primary {
  border: 2px solid #1976d2;
}
</style>
