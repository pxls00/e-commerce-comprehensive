<template>
  <form :class="style['form']" @submit.prevent="onSubmit">
    <div :class="style['form__header']">
      <slot name="header" />
    </div>

    <div :class="style['form__main']">
      <div :class="style['form__field']">
        <label for="email">Email:</label>
        <input id="email" v-model="formData.email" type="text" />
      </div>

      <div :class="style['form__field']">
        <label for="password">Password:</label>
        <input id="password" v-model="formData.password" type="password" />
      </div>
    </div>

    <div :class="style['form__footer']">
      <slot name="footer">
        <div>
          <button type="submit">Submit</button>
        </div>
      </slot>
    </div>
  </form>
</template>

<script src="./auth-sign-form.ts"></script>

<style module src="./auth-sign-form.css"></style>
