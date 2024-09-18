<template>
  <h1>{{ headerText }}</h1>

  <hr />
  <div>
    <RouterLink :to="{ name: 'main-profile' }">Профиль</RouterLink>
  </div>
  <hr />

  <h2>Продукты</h2>

  <div v-if="!loading">
    <table :class="[style['table']]">
      <thead>
        <tr>
          <th>Наименование</th>
          <th>Описание</th>
          <th>Цена</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in productsList" :key="product.uuid">
          <td>
            <RouterLink :to="{ name: 'main-product-detail', params: { uuid: product.uuid } }">
              {{ product.name }}
            </RouterLink>
          </td>
          <td>{{ product.description }}</td>
          <td>{{ product.price }}</td>
        </tr>
      </tbody>
    </table>
    <p v-if="hasError">
      {{ msgError }}
    </p>
  </div>

  <p v-else>Загрузка</p>

  <hr />
  <div>
    <RouterLink :to="{ name: 'product-add' }">Добавить продукт</RouterLink>
  </div>
</template>

<script src="./main-home.ts"></script>

<style module src="./main-home.css"></style>
