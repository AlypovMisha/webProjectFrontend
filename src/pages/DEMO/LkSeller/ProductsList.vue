<template>

        <!-- Шапка страницы -->
        <div class="row items-center justify-between q-mb-lg">
          <div>
            <div class="text-h4 text-weight-bold">Товары</div>
            <div class="text-caption text-grey-7">Управление товарами вашего магазина</div>
          </div>
          <q-btn
            label="Добавить товар"
            color="primary"
            icon="add"
            unelevated
            to="/seller/products/add"
          />
        </div>

        <!-- Фильтры и поиск -->
        <q-card flat bordered class="q-mb-lg">
          <q-card-section>
            <div class="row items-center q-col-gutter-md">
              <div class="col-4">
                <q-input
                  v-model="searchQuery"
                  placeholder="Поиск по названию..."
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
                  v-model="categoryFilter"
                  :options="categories"
                  label="Категория"
                  dense
                  outlined
                  clearable
                />
              </div>
              <div class="col-3">
                <q-select
                  v-model="statusFilter"
                  :options="statusOptions"
                  label="Статус"
                  dense
                  outlined
                  clearable
                />
              </div>
              <div class="col-2">
                <q-btn
                  label="Применить"
                  color="primary"
                  class="full-width"
                  unelevated
                />
              </div>
            </div>
          </q-card-section>
        </q-card>

        <!-- Таблица товаров -->
        <q-card flat bordered>
          <q-table
            :rows="products"
            :columns="columns"
            row-key="id"
            :loading="loading"
            :filter="searchQuery"
            flat
            bordered
          >
            <!-- Колонка с фотографией -->
            <template v-slot:body-cell-photo="props">
              <q-td :props="props">
                <q-img
                  :src="props.row.photo"
                  width="50px"
                  height="50px"
                  class="rounded-borders"
                />
              </q-td>
            </template>

            <!-- Колонка с ценой -->
            <template v-slot:body-cell-price="props">
              <q-td :props="props">
                <div class="text-weight-bold text-primary">{{ props.row.price }}₽</div>
              </q-td>
            </template>

            <!-- Колонка со статусом -->
            <template v-slot:body-cell-status="props">
              <q-td :props="props">
                <q-badge
                  :color="props.row.status === 'active' ? 'green' : 'orange'"
                  :label="props.row.status === 'active' ? 'Активен' : 'Неактивен'"
                />
              </q-td>
            </template>

            <!-- Колонка с действиями -->
            <template v-slot:body-cell-actions="props">
              <q-td :props="props">
                <div class="row q-gutter-xs">
                  <q-btn
                    icon="edit"
                    size="sm"
                    color="blue"
                    dense
                    flat
                    :to="`/seller/products/edit/${props.row.id}`"
                  />
                  <q-btn
                    icon="delete"
                    size="sm"
                    color="red"
                    dense
                    flat
                    @click="confirmDelete(props.row)"
                  />
                </div>
              </q-td>
            </template>
          </q-table>
        </q-card>

        <!-- Диалог подтверждения удаления -->
        <q-dialog v-model="deleteDialog">
          <q-card>
            <q-card-section>
              <div class="text-h6">Удаление товара</div>
            </q-card-section>

            <q-card-section>
              Вы уверены, что хотите удалить товар "{{ selectedProduct?.name }}"?
            </q-card-section>

            <q-card-actions align="right">
              <q-btn flat label="Отмена" color="primary" v-close-popup />
              <q-btn label="Удалить" color="red" @click="deleteProduct" v-close-popup />
            </q-card-actions>
          </q-card>
        </q-dialog>

</template>

<script>
export default {
  name: "SellerProductsPage",
  data() {
    return {
      leftDrawerOpen: true,
      searchQuery: '',
      categoryFilter: null,
      statusFilter: null,
      loading: false,
      deleteDialog: false,
      selectedProduct: null,
      categories: [
        'Одежда', 'Обувь', 'Аксессуары', 'Электроника'
      ],
      statusOptions: [
        'Активен', 'Неактивен'
      ],
      columns: [
        {
          name: 'photo',
          label: 'Фото',
          field: 'photo',
          align: 'center',
          sortable: false
        },
        {
          name: 'name',
          label: 'Название',
          field: 'name',
          align: 'left',
          sortable: true
        },
        {
          name: 'category',
          label: 'Категория',
          field: 'category',
          align: 'left',
          sortable: true
        },
        {
          name: 'price',
          label: 'Цена',
          field: 'price',
          align: 'right',
          sortable: true
        },
        {
          name: 'stock',
          label: 'Остаток',
          field: 'stock',
          align: 'center',
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
          name: 'actions',
          label: 'Действия',
          field: 'actions',
          align: 'center',
          sortable: false
        }
      ],
      products: [
        {
          id: 1,
          name: 'Футболка темно-синяя',
          category: 'Одежда',
          price: 300,
          stock: 15,
          status: 'active',
          photo: 'https://cdn.quasar.dev/img/parallax2.jpg'
        },
        {
          id: 2,
          name: 'Джинсы классические',
          category: 'Одежда',
          price: 2500,
          stock: 8,
          status: 'active',
          photo: 'https://cdn.quasar.dev/img/parallax1.jpg'
        },
        {
          id: 3,
          name: 'Кроссовки спортивные',
          category: 'Обувь',
          price: 3500,
          stock: 0,
          status: 'inactive',
          photo: 'https://cdn.quasar.dev/img/mountains.jpg'
        }
      ]
    }
  },
  methods: {
    confirmDelete(product) {
      this.selectedProduct = product
      this.deleteDialog = true
    },
    deleteProduct() {
      // Логика удаления товара
      this.products = this.products.filter(p => p.id !== this.selectedProduct.id)
      this.selectedProduct = null
    }
  }
}
</script>
