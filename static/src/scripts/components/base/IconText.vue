<script>
export default {
  props: {
    name: String,
    size: {
      type: String,
      validator: (value) => ['small', 'medium', 'large'].includes(value),
    },
    text: [Number, String],
  },
}
</script>

<template>
  <span class="icon-text">
    <span>{{ text }}</span>
    <span class="icon" :class="size && 'is-' + size">
      <i class="fas" :class="'fa-' + name" />
    </span>
  </span>
</template>