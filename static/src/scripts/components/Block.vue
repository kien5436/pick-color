<script>
export default {
  emits: ['select'],
  methods: {
    flipBlock() {

      if (this.canSelect) {

        this.$emit('select', this.id);
      }
    },
  },
  props: ['color', 'canSelect', 'isFlipped', 'id'],
}
</script>

<template>
  <div class="block-outer" :class="{'zoom-out': !canSelect}" @click="flipBlock">
    <div class="block-inner" :class="{flipped: isFlipped}">
      <div class="block-front" :style="{background: color}" />
      <div class="block-back" />
    </div>
  </div>
</template>

<style scoped>
.block-outer {
  background-color: transparent;
  cursor: pointer;
  perspective: 1000px;
  transition: .3s;
}

.zoom-out {
  transform: scale(0);
}

.block-inner {
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  transition: transform .5s;
}

.block-inner.flipped {
  transform: rotateY(180deg);
}

.block-front, .block-back {
  backface-visibility: hidden;
  height: 100%;
  position: absolute;
  width: 100%;
}

.block-front {
  transform: rotateY(180deg);
}

.block-back {
  background: url('../../images/block-bg.jpg');
}
</style>