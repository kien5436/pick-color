<script>
import { login } from '../services/user';
import Grid from './base/Grid';
import IconText from './base/IconText';

export default {
  components: {
    Grid,
    IconText,
  },
  data() {
    return {
      colors: ['primary', 'warning', 'warning', 'primary'],
      usernameValid: true,
    }
  },
  inject: ['user', 'updateUser'],
  // eslint-disable-next-line sort-keys
  emits: ['hide-modal'],
  methods: {
    async onSubmit(e) {

      const data = new FormData(e.target);
      const username = data.get('name').trim();
      const crsf = document.querySelector('[name=csrfmiddlewaretoken]').value;

      if (!username) {
        this.usernameValid = false;
        return;
      }

      const user = await login(username);
      this.updateUser(user);

      this.$emit('hide-modal');
    }
  },
}
</script>

<template>
  <form method="post" class="box" @submit.prevent="onSubmit">
    <div class="field">
      <h3 class="title has-text-centered">Pick Color</h3>
      <div class="logo">
        <grid class="p-3" :size="2" :gap=".5">
          <div v-for="(color, i) in colors" :key="i" :class="'has-background-' + color" />
        </grid>
      </div>
    </div>
    <div class="field">
      <label class="label">What's your name?</label>
      <div class="control">
        <input type="text" name="name" autofocus class="input is-small" :class="!usernameValid && 'is-danger'">
      </div>
      <p class="help">Login to save your scores</p>
    </div>
    <div class="field">
      <button type="submit" class="button is-primary is-fullwidth">
        <icon-text name="arrow-right" text="Play" />
      </button>
    </div>
  </form>
</template>

<style scoped>
form.box {
  margin: auto;
  width: 20em;
}

.logo {
  height: 10em;
  margin: auto;
  width: 10em;
}
</style>