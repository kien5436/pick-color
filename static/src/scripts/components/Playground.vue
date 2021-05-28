<script>
import { getUserInfo, submitResult } from '../services/user';
import Block from './Block';
import Grid from './base/Grid';
import IconText from './base/IconText';
import Modal from './base/Modal';
import { routes } from '../router';
import Stopwatch from './Stopwatch';

Object.defineProperty(Array.prototype, 'shuffle', {
  value() {
    for (let i = this.length - 1; 0 < i; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this[i], this[j]] = [this[j], this[i]];
    }

    return this;
  },
});

export default {
  components: {
    Block,
    Grid,
    IconText,
    Modal,
    Stopwatch,
  },
  data() {
    return {
      blocks: [],
      pause: true,
      preColor: [],
      preTime: 3,
      remainingTime: 0,
      routes,
      status: {
        giveup: 'Play a new game?',
        init: 1,
        lose: 'Time is up!',
        win: 'You won!',
      },
      stopTimer: true,
      totalTime: 0,
    };
  },
  inject: ['user', 'updateUser'],
  // eslint-disable-next-line sort-keys
  computed: {
    gameStatus() {

      if (this.pause) {

        if (!this.remainingTime && this.preColor.length) return 'init';

        return 'giveup';
      }

      if (!this.remainingTime && this.preColor.length) return 'lose';

      if (!this.preColor.length) return 'win';

      return undefined;
    },
    shouldPause() { return this.pause || !this.preColor.length || !this.remainingTime },
  },
  methods: {
    async newGame() {

      this.$refs.boardOverlay.classList.add('spinner');

      this.pause = true;
      this.remainingTime = 0;
      this.stopTimer = true;
      this.blocks.length = 0;
      this.preColor = ['#1eae98', '#f55c47', '#233e8b', '#ffcc29', '#a4b787', '#7400b8', '#e71d36', '#d62828'];
      const colors = [...this.preColor, ...this.preColor].shuffle();
      const len = colors.length;

      for (let i = len; 0 <= --i;) {

        this.blocks.push({
          canSelect: true,
          color: colors[i],
          id: len - 1 - i,
          isFlipped: false,
        });
      }

      await this.suspend(this.preTime);

      this.remainingTime = this.totalTime = 45;
      this.pause = false;
      this.stopTimer = false;
    },
    quit() { this.pause = true; this.stopTimer = true },
    resume() { this.pause = false; this.stopTimer = false },
    async selectBlock(blockId) {

      const block = this.blocks.find(({ id }) => id === blockId);
      block.isFlipped = !block.isFlipped;

      const flippedBlocks = this.blocks.filter(({ isFlipped }) => isFlipped);

      if (2 === flippedBlocks.length) {

        await this.suspend(.5);

        if (flippedBlocks[0].color === flippedBlocks[1].color) {

          flippedBlocks[0].canSelect = flippedBlocks[1].canSelect = false;
          const i = this.preColor.findIndex((c) => c === flippedBlocks[0].color);
          this.preColor.splice(i, 1);
        }

        flippedBlocks[0].isFlipped = flippedBlocks[1].isFlipped = block.id === flippedBlocks[0].id ? !flippedBlocks[1].isFlipped : !flippedBlocks[0].isFlipped;
      }
    },
    suspend(time) {
      return new Promise((resolve) => {

        setTimeout(resolve, time * 1000, undefined);
      });
    },
    updateRemainingTime(time) { this.remainingTime = time },
  },
  mounted() { this.newGame() },
  watch: {
    gameStatus(value) {

      if ('win' === value || 'lose' === value) {

        this.stopTimer = true;
      }
    },
    async remainingTime(value) {

      if (('win' === this.gameStatus || 'lose' === this.gameStatus) && this.user) {

        await submitResult({
          userId: this.user.id,
          time: this.totalTime - value,
          win: 'win' === this.gameStatus,
        });
        // const data = await getUserInfo();
        // this.updateUser(data);
      }
    },
  },
};
</script>

<template>
  <div class="container">
    <div class="columns">
      <div class="column is-6 is-offset-3">
        <grid :size="4" :gap="1" class="is-clipped is-relative">
          <div v-if="shouldPause" ref="boardOverlay" class="board-overlay is-flex is-justify-content-center">
            <modal :active="status[gameStatus]" class="is-relative">
              <stopwatch
                v-if="'init' === gameStatus" :timeout="preTime"
                class="has-text-centered"
              />
              <div v-else class="box has-text-centered">
                <p class="title">{{ status[gameStatus] }}</p>
                <button v-if="'win' === gameStatus || 'lose' === gameStatus" type="button" class="button is-primary" @click="newGame">
                  <icon-text name="arrow-right" :text="'Replay'" />
                </button>
                <div v-else-if="'giveup' === gameStatus" class="buttons is-centered">
                  <button type="button" class="button is-danger" @click="newGame">Yes</button>
                  <button type="button" class="button is-primary" @click="resume">No</button>
                </div>
              </div>
            </modal>
          </div>
          <block
            v-for="(ablock, i) in blocks"
            :id="i"
            :key="i"
            :can-select="ablock.canSelect"
            :color="ablock.color"
            :is-flipped="ablock.isFlipped"
            @select="selectBlock"
          />
        </grid>
      </div>
      <div class="column is-2">
        <div class="is-flex is-flex-direction-column is-justify-content-center" :style="{height: '100%'}">
          <p class="has-text-centered">
            <stopwatch :timeout="remainingTime" :should-stop="stopTimer" :with-icon="true" @stop="updateRemainingTime" />
          </p>
          <button type="button" class="button is-danger is-outlined my-4" :disabled="pause" @click="quit">Quit</button>
          <router-link v-if="user.id" v-slot="{ href, navigate }" custom :to="routes[1].path">
            <a :href="href" class="button is-primary is-outlined" @click="navigate">Your scores</a>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.board-overlay {
  background: #ffffffbd;
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 99;
}

.board-overlay :deep() .modal {
  width: 50%;
}

.board-overlay :deep() .modal-background {
  display: none;
}

.board-overlay :deep() .modal-content {
  width: 100%;
}

.spinner:after {
  animation: spin .7s linear infinite;
  border-radius: 50%;
  border: .7em solid #c66d70;
  border-right-color: transparent;
  border-top-color: transparent;
  content: '';
  display: block;
  height: 30%;
  left: 50%;
  position: absolute;
  top: 50%;
  transform-origin: top left;
  width: 30%;
}

@keyframes spin {
  from {
    transform: rotate(0) translate(-50%, -50%);
  }
  to {
    transform: rotate(359deg) translate(-50%, -50%);
  }
}
</style>