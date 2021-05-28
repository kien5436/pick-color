<script>
import IconText from './base/IconText';

export default {
  components: { IconText },
  data() {
    return {
      time: 0,
      timer: null,
    };
  },
  props: {
    shouldStop: {
      default: false,
      type: Boolean,
    },
    timeout: {
      default: 0,
      required: true,
      type: Number,
    },
    withIcon: {
      default: false,
      type: Boolean,
    },
  },
  // eslint-disable-next-line sort-keys
  emits: ['stop'],
  mounted() {

    this.time = this.timeout;
    this.run();
  },
  // eslint-disable-next-line sort-keys
  beforeUnmount() { this.stop() },
  methods: {
    run() {
      this.stop();
      this.timer = setInterval(() => {
        if (this.time) this.time--;
        else this.stop();
      }, 1000);
    },
    stop() {
      this.timer && clearInterval(this.timer);
      this.$emit('stop', this.time);
    },
  },
  watch: {
    shouldStop(value) {

      if (value) this.stop();
      else this.run();
    },
    timeout(value) { this.time = value },
  },
}
</script>

<template>
  <icon-text v-if="withIcon" name="stopwatch" :text="time" class="has-text-weight-bold is-size-3" />
  <p v-else class="has-text-weight-bold is-size-2">{{ time }}</p>
</template>