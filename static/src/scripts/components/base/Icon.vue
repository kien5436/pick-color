<script>
export default {
  props: {
    name: String,
    size: {
      type: String,
      validator: (value) => ['small', 'medium', 'large'].includes(value),
    },
  },
  // eslint-disable-next-line sort-keys
  computed: {
    iconSize() {
      switch (this.size) {
        case 'medium': return 'fa-2x';
        case 'large': return 'fa-4x';
        default: return '';
      }
    },
  },
}
</script>

<template>
  <span class="icon" :class="'is-' + size">
    <i class="fas" :class="{
      ['fa-' + name]: true,
      [iconSize]: true,
    }" />
  </span>
</template>