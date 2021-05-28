<script>
export default {
  computed: {
    gridStyle() {
      return {
        gap: this.gap + 'em',
        gridTemplate: 'repeat(' + this.size + ', 1fr)/repeat(' + this.size + ', 1fr)',
      };
    },
  },
  mounted() {

    setTimeout(() => {
      this.$refs.grid.style.setProperty('height', this.$refs.grid.clientWidth + 'px');
    }, 0);
  },
  props: {
    gap: Number,
    size: Number,
  },
}
</script>

<template>
  <div ref="grid" class="grid box" :style="gridStyle">
    <slot />
  </div>
</template>

<style scoped>
.grid {
  display: grid;
  height: 100%;
}

.grid :deep() div {
  border-radius: 4px;
}
</style>