<template>
  <h1>Обновить данные пользователя</h1>
  <form @submit.prevent="onSubmit" >
    <div>
      <label for="email">
        Email:
      </label>
      <input
        id="email"
        v-model="updateUserFormData.email"
        type="text"
        disabled
      >
    </div>
    <div>
      <label for="name">
        Имя:
      </label>
      <input
        id="name"
        v-model="updateUserFormData.name"
        type="text"
      >
    </div>
    <div>
      <label for="surname">
        Фамилия:
      </label>
      <input
        id="surname"
        v-model="updateUserFormData.surname"
        type="text"
      >
    </div>
    <div>
      <label for="age">
        Возраст:
      </label>
      <input
        id="age"
        v-model="updateUserFormData.age"
        type="number"
      >
    </div>

    <button type="submit">
      Сохранить
    </button>
  </form>

  <hr />
  <p v-if="loading">
    Загрузка...
  </p>

  <div>
    <RouterLink :to="{name: 'main-profile'}">Профиль</RouterLink>
  </div>
</template>

<script src="./profile-update.ts"></script>
