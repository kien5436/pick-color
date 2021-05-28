<script>
export default {
  emits: ['toggle'],
  methods: {
    toggle() { this.$emit('toggle') },
  },
  props: ['active', 'background'],
}
</script>

<template>
  <div v-if="active" class="modal is-active">
    <div class="modal-background" :class="background" />
    <div class="modal-content">
      <slot />
    </div>
    <button type="button" class="modal-close is-large" aria-label="close" @click="toggle" />
  </div>
</template>