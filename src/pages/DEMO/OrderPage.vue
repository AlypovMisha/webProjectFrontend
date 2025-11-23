<template>
  <q-page class="q-pa-lg">
    <!-- Хлебные крошки -->
    <q-breadcrumbs class="q-mb-xl">
      <q-breadcrumbs-el label="Главная" icon="home"/>
      <q-breadcrumbs-el label="Мои заказы" />
      <q-breadcrumbs-el label="Заказ #123456" />
    </q-breadcrumbs>

    <div class="row items-center justify-between q-mb-lg">
      <div class="col">
        <h4 class="q-my-none text-weight-bold">Заказ #123456</h4>
        <div class="text-caption text-grey-7">от 15 декабря 2024</div>
      </div>
      <div class="col-auto">
        <q-badge
          color="blue"
          label="В пути"
          size="lg"
        />
      </div>
    </div>

    <div class="row q-col-gutter-xl">
      <!-- Левая колонка - информация о заказе -->
      <div class="col-md-8 col-12">
        <!-- Товары в заказе -->
        <q-card flat bordered class="q-mb-lg">
          <q-card-section>
            <div class="text-h6 text-weight-bold q-mb-md">Товары в заказе</div>

            <div class="column q-gutter-y-md">
              <q-item
                v-for="item in orderItems"
                :key="item.id"
                class="q-pa-none"
              >
                <q-item-section avatar>
                  <q-img
                    :src="item.image"
                    width="80px"
                    height="80px"
                    class="rounded-borders"
                  />
                </q-item-section>

                <q-item-section>
                  <q-item-label class="text-weight-medium">{{ item.name }}</q-item-label>
                  <q-item-label caption>{{ item.description }}</q-item-label>
                  <q-item-label>
                    <q-badge v-if="item.discount" color="red">
                      -{{ item.discount }}%
                    </q-badge>
                  </q-item-label>
                </q-item-section>

                <q-item-section side>
                  <div class="column items-end">
                    <div class="text-h6 text-weight-bold text-primary">
                      {{ item.finalPrice * item.quantity }}₽
                    </div>
                    <div v-if="item.discount" class="text-caption text-strike text-grey">
                      {{ item.originalPrice * item.quantity }}₽
                    </div>
                    <div class="text-caption text-grey-7">{{ item.quantity }} шт.</div>
                  </div>
                </q-item-section>
              </q-item>
            </div>
          </q-card-section>
        </q-card>

        <!-- Информация о доставке -->
        <q-card flat bordered class="q-mb-lg">
          <q-card-section>
            <div class="text-h6 text-weight-bold q-mb-md">Информация о доставке</div>

            <q-list bordered separator>
              <q-item>
                <q-item-section>
                  <q-item-label caption>Способ доставки</q-item-label>
                  <q-item-label>Пункт выдачи заказов</q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label caption>Адрес ПВЗ</q-item-label>
                  <q-item-label>г. Пермь, ул. Уинская, 12</q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label caption>Время работы</q-item-label>
                  <q-item-label>Ежедневно с 09:00 до 21:00</q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label caption>Статус доставки</q-item-label>
                  <q-item-label>Посылка в пути к пункту выдачи</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>

        <!-- История статусов -->
        <q-card flat bordered>
          <q-card-section>
            <div class="text-h6 text-weight-bold q-mb-md">История заказа</div>

            <q-timeline color="primary">
              <q-timeline-entry
                title="Заказ создан"
                subtitle="15 декабря 2024, 14:30"
                icon="create"
              />
              <q-timeline-entry
                title="Оплачен"
                subtitle="15 декабря 2024, 14:35"
                icon="payment"
              />
              <q-timeline-entry
                title="Передан в сборку"
                subtitle="16 декабря 2024, 10:15"
                icon="inventory_2"
              />
              <q-timeline-entry
                title="Передан в доставку"
                subtitle="17 декабря 2024, 09:30"
                icon="local_shipping"
                color="blue"
              />
              <q-timeline-entry
                title="Ожидает в ПВЗ"
                subtitle="Ожидается 19 декабря 2024"
                icon="store"
                color="orange"
              />
            </q-timeline>
          </q-card-section>
        </q-card>
      </div>

      <!-- Правая колонка - итоги -->
      <div class="col-md-4 col-12" :class="$q.screen.lt.md ? 'order-first' : ''">
        <q-card flat bordered class="sticky">
          <q-card-section>
            <div class="column q-gutter-y-md">
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
                  <div class="text-h6 text-weight-bold">Итого</div>
                  <div class="text-h5 text-weight-bold text-primary">{{ totalPrice }}₽</div>
                </div>
              </div>

              <!-- Кнопки действий -->
              <div class="column q-gutter-y-sm">
                <q-btn
                  label="Повторить заказ"
                  color="primary"
                  outline
                  to="/checkout/"
                  class="full-width"
                />
                <q-btn
                  label="Связаться с поддержкой"
                  color="grey"
                  flat
                  class="full-width"
                />
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: "OrderPage",
  data() {
    return {
      orderItems: [
        {
          id: 1,
          name: "Футболка темно-синяя однотонная",
          description: "Размер: M, Цвет: синий",
          image: "https://cdn.quasar.dev/img/parallax2.jpg",
          originalPrice: 350,
          finalPrice: 300,
          discount: 10,
          quantity: 2
        },
        {
          id: 2,
          name: "Джинсы классические",
          description: "Размер: 32, Цвет: синий",
          image: "https://cdn.quasar.dev/img/parallax1.jpg",
          originalPrice: 2500,
          finalPrice: 2500,
          discount: 0,
          quantity: 1
        },
        {
          id: 3,
          name: "Худи оверсайз",
          description: "Размер: L, Цвет: черный",
          image: "https://cdn.quasar.dev/img/mountains.jpg",
          originalPrice: 1800,
          finalPrice: 1500,
          discount: 15,
          quantity: 1
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
