<template>
  <h1>Данные пользователя</h1>
  <div>
    Email - {{ user.email }}
  </div>
  <div>
    Имя - {{ user.name ? user.name : "Нет данных" }}
  </div>
  <div>
    Фамилия - {{ user.surname ? user.surname : "Нет данных" }}
  </div>
  <div>
    Возраст - {{ user.age ? user.age : "Нет данных" }}
  </div>

  <hr />

  <div>
    <RouterLink :to="{name: 'main-profile-update'}">Обновить</RouterLink>
  </div>

  <hr />

  <div>
    <RouterLink :to="{name: 'home'}">Главная</RouterLink>
  </div>

  <hr />

  <div>
    <RouterLink :to="{name: 'auth'}">Выйти</RouterLink>
  </div>
</template>

<script src="./main-profile.ts"></script>