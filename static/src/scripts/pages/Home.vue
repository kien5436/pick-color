<script>
import Modal from '../components/base/Modal';
import Playground from '../components/Playground';
import WelcomeForm from '../components/WelcomeForm';

export default {
  components: {
    Modal,
    Playground,
    WelcomeForm,
  },
  inject: ['user'],
  // eslint-disable-next-line sort-keys
  data() {
    return {
      shouldLogin: !this.user.id,
    }
  },
  methods: {
    toggleLoginModal() { this.shouldLogin = !this.shouldLogin },
  },
}
</script>

<template>
  <teleport to="body">
    <modal :active="shouldLogin" :background="'has-background-primary-light'" @toggle="toggleLoginModal">
      <welcome-form @hide-modal="toggleLoginModal" />
    </modal>
  </teleport>
  <playground v-if="!shouldLogin" />
</template>