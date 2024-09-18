<template>
  <div>
    <AuthSignForm @submit="onSubmit">
      <template #header>
        {{ msg }}
      </template>
      <template #footer>
        <div>

          <RouterLink :to="{name: 'auth-signup'}">
            Зарегистрироваться
          </RouterLink>
          <button type="submit">
            Авторизоваться
          </button>
        </div>
      </template>
    </AuthSignForm>
    <p v-if="loading">Загрузка...</p>
  </div>
</template>

<script src="./auth-signin.ts"></script>