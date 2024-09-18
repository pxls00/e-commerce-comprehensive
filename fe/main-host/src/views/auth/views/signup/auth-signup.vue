<template>
  <div>
    <AuthSignForm @submit="onSubmit">
      <template #header>
        {{ msg }}
      </template>
      <template #footer>
        <div>

          <RouterLink :to="{name: 'auth-signin'}">
            Авторизоваться
          </RouterLink>
          <button type="submit">
            Зарегистрироваться
          </button>
        </div>
      </template>
    </AuthSignForm>
    <p v-if="loading">Загрузка...</p>
  </div>
</template>

<script src="./auth-signup.ts"></script>