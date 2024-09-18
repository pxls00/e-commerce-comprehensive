<template>
  <h1>Detail product</h1>

  <div v-if="!pageInterface.loading">
    <form v-if="!pageInterface.error" @submit.prevent="onSubmit">
      <div>
        <label for="name">Название:</label>
        <input id="name" v-model="currentProduct.name" type="text">
      </div>
      <div>
        <label for="description">Описание:</label>
        <textarea
          id="description"
          v-model="currentProduct.description"
          rows="5"
          cols="100"
        />
      </div>
      <div>
        <label for="price">Цена:</label>
        <input id="price" v-model="currentProduct.price" type="number">
      </div>
      <hr />
      <button type="submit">
        Обновить
      </button>
    </form>
    <p v-else>
      Не удалось получить данные продукта
    </p>
    <div v-if="pageInterface.updateError">
      Не удалось обновить продукт
    </div>
  </div>
  <p v-else>
    Загрузка...
  </p>

  <hr />
  <button type="button" @click="onDelete">
    Удалить продукт
  </button>

  <hr />

  <div>
    <RouterLink :to="{name: 'home'}">На главную</RouterLink>
  </div>
</template>

<script src="./product-detail.ts"></script>