<template>
  <!-- Основная область -->
  <div>
    <!-- Шапка страницы -->
    <div class="row items-center justify-between q-mb-lg">
      <div>
        <div class="text-h4 text-weight-bold">Заказы</div>
        <div class="text-caption text-grey-7">Управление заказами вашего магазина</div>
      </div>
    </div>

    <!-- Фильтры и поиск -->
    <q-card flat bordered class="q-mb-lg">
      <q-card-section>
        <div class="row items-center q-col-gutter-md">
          <div class="col-3">
            <q-input
              v-model="searchQuery"
              placeholder="Поиск по номеру заказа..."
              dense
              outlined
              clearable
            >
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </div>
          <div class="col-3">
            <q-select
              v-model="statusFilter"
              :options="statusOptions"
              label="Статус заказа"
              dense
              outlined
              clearable
            />
          </div>
          <div class="col-3">
            <q-select
              v-model="pvzFilter"
              :options="pvzOptions"
              label="ПВЗ"
              dense
              outlined
              clearable
            />
          </div>
          <div class="col-3">
            <q-btn
              label="Применить фильтры"
              color="primary"
              class="full-width"
              unelevated
            />
          </div>
        </div>
      </q-card-section>
    </q-card>

    <!-- Таблица заказов -->
    <q-card flat bordered>
      <q-table
        :rows="orders"
        :columns="columns"
        row-key="id"
        :loading="loading"
        :filter="searchQuery"
        flat
        bordered
      >
        <!-- Колонка с товарами -->
        <template v-slot:body-cell-products="props">
          <q-td :props="props">
            <div class="row q-gutter-xs">
              <q-img
                v-for="(product, index) in props.row.products"
                :key="index"
                :src="product.photo"
                width="40px"
                height="40px"
                class="rounded-borders"
              />
              <div
                v-if="props.row.products.length > 3"
                class="flex flex-center bg-grey-3 rounded-borders"
                style="width: 40px; height: 40px"
              >
                <div class="text-caption text-grey-7">+{{ props.row.products.length - 3 }}</div>
              </div>
            </div>
          </q-td>
        </template>

        <!-- Колонка со статусом -->
        <template v-slot:body-cell-status="props">
          <q-td :props="props">
            <q-badge
              :color="getStatusColor(props.row.status)"
              :label="getStatusText(props.row.status)"
            />
          </q-td>
        </template>

        <!-- Колонка с суммой -->
        <template v-slot:body-cell-total="props">
          <q-td :props="props">
            <div class="text-weight-bold text-primary">{{ props.row.total }}₽</div>
          </q-td>
        </template>

        <!-- Колонка с ПВЗ -->
        <template v-slot:body-cell-pvz="props">
          <q-td :props="props">
            <div class="text-caption">{{ props.row.pvz.address }}</div>
            <div class="text-caption text-grey-7">{{ props.row.pvz.workingHours }}</div>
          </q-td>
        </template>

        <!-- Колонка с действиями -->
        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <div class="row q-gutter-xs">
              <q-btn
                icon="visibility"
                size="sm"
                color="blue"
                dense
                flat
                :to="`/seller/orders/${props.row.id}`"
              />
            </div>
          </q-td>
        </template>
      </q-table>
    </q-card>
  </div>
</template>

<script>
export default {
  name: "SellerOrdersPage",
  data() {
    return {
      searchQuery: '',
      statusFilter: null,
      pvzFilter: null,
      loading: false,
      statusOptions: [
        'packing', 'shipping', 'waiting', 'done', 'canceled'
      ],
      pvzOptions: [
        'ПВЗ Уинская', 'ПВЗ Ленина', 'ПВЗ Попова'
      ],
      columns: [
        {
          name: 'id',
          label: 'Номер заказа',
          field: 'id',
          align: 'left',
          sortable: true
        },
        {
          name: 'products',
          label: 'Товары',
          field: 'products',
          align: 'left',
          sortable: false
        },
        {
          name: 'total',
          label: 'Сумма',
          field: 'total',
          align: 'right',
          sortable: true
        },
        {
          name: 'status',
          label: 'Статус',
          field: 'status',
          align: 'center',
          sortable: true
        },
        {
          name: 'pvz',
          label: 'Пункт выдачи',
          field: 'pvz',
          align: 'left',
          sortable: true
        },
        {
          name: 'createdDate',
          label: 'Дата создания',
          field: 'createdDate',
          align: 'center',
          sortable: true
        },
        {
          name: 'actions',
          label: 'Действия',
          field: 'actions',
          align: 'center',
          sortable: false
        }
      ],
      orders: [
        {
          id: '123456',
          total: 4300,
          status: 'packing',
          createdDate: '15.12.2024',
          pvz: {
            address: 'г. Пермь, ул. Уинская, 12',
            workingHours: '09:00-21:00'
          },
          products: [
            { photo: 'https://cdn.quasar.dev/img/parallax2.jpg' },
            { photo: 'https://cdn.quasar.dev/img/parallax1.jpg' },
            { photo: 'https://cdn.quasar.dev/img/mountains.jpg' }
          ]
        },
        {
          id: '123455',
          total: 2800,
          status: 'shipping',
          createdDate: '10.12.2024',
          pvz: {
            address: 'г. Пермь, ул. Ленина, 45',
            workingHours: '10:00-20:00'
          },
          products: [
            { photo: 'https://cdn.quasar.dev/img/parallax2.jpg' },
            { photo: 'https://cdn.quasar.dev/img/mountains.jpg' }
          ]
        },
        {
          id: '123454',
          total: 5200,
          status: 'waiting',
          createdDate: '01.12.2024',
          pvz: {
            address: 'г. Пермь, ул. Попова, 23',
            workingHours: '08:00-22:00'
          },
          products: [
            { photo: 'https://cdn.quasar.dev/img/parallax2.jpg' },
            { photo: 'https://cdn.quasar.dev/img/parallax1.jpg' }
          ]
        }
      ]
    }
  },
  methods: {
    getStatusColor(status) {
      const colors = {
        packing: 'orange',
        shipping: 'blue',
        waiting: 'yellow',
        done: 'green',
        canceled: 'red'
      }
      return colors[status] || 'grey'
    },
    getStatusText(status) {
      const texts = {
        packing: 'Упаковывается',
        shipping: 'В пути',
        waiting: 'Ожидает в ПВЗ',
        done: 'Доставлен',
        canceled: 'Отменен'
      }
      return texts[status] || 'Неизвестно'
    },
    updateStatus(order, newStatus) {
      // Логика обновления статуса заказа
      order.status = newStatus
    }
  }
}
</script>
