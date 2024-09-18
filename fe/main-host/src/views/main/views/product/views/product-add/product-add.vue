<template>
  <h1>Добавить продукт</h1>

  <div v-if="!pageInterface.loading">
    <form @submit.prevent="onSubmit">
      <div>
        <label for="name">Название:</label>
        <input id="name" v-model="productFormData.name" type="text">
      </div>
      <div>
        <label for="description">Описание:</label>
        <textarea
          id="description"
          v-model="productFormData.description"
          rows="5"
          cols="100"
        />
      </div>
      <div>
        <label for="price">Цена:</label>
        <input id="price" v-model="productFormData.price" type="number">
      </div>
      <button type="submit">
        Добавить
      </button>
    </form>
    <div v-if="pageInterface.error">
      <hr />
      <p>
        Не удалось добавить продукт!
      </p>
    </div>
  </div>
  <p v-else>
    Загрузка...
  </p>

  <div v-if="pageInterface.success">
    <hr />
    <p>
      Продукт успешно добавлен!
    </p>
  </div>

  <hr />
  <div>
    <RouterLink :to="{name: 'home'}">На главную</RouterLink>
  </div>
</template>

<script src="./product-add.ts"></script>