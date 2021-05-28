<script>
import { onBeforeMount, provide, reactive, readonly, ref } from 'vue';
import { getUserInfo } from './services/user';
import { RouterView } from 'vue-router';
import { setCookie } from './utils/cookies';

export default {
  components: { RouterView },
  setup() {

    const user = reactive({});
    const loaded = ref(false);
    const updateUser = (data) => {

      for (const key in data) {
        user[key] = data[key];
      }

      setCookie('user', JSON.stringify({ id: user.id }));
    };

    onBeforeMount(async () => {

      const data = await getUserInfo();
      updateUser(data);
      loaded.value = true;
    });

    provide('user', readonly(user));
    provide('updateUser', updateUser);

    return { loaded };
  },
};
</script>

<template>
  <section class="section">
    <router-view v-if="loaded" />
  </section>
</template>