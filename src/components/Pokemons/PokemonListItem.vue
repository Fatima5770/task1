<template>
  <div>
    <div
      class="item mb-2"
      data-toggle="collapse"
      :data-target="`#item-${index}`"
      aria-expanded="false"
      :aria-controls="`item-${index}`"
      style="width: 320px"
      @click="collapsibleClosed"
    >
      {{ titleize(pokemon.name) }}
    </div>
    <div class="mb-2">
      <div class="" :id="`item-${index}`" :class="{ 'show-card': isOpen, 'hide-card': !isOpen }">
        <div class="card card-body" style="width: 320px">
          <div class="flex">
            <img :src="pokemon.imageUrl" :alt="pokemon.name" @click="increment" />
            <p>
              Clicks: <span>{{ pokemon.clickCount }}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { titleize } from '../../common/utils';
export default {
  props: {
    pokemon: { type: Object, default: () => {} },
    index: { type: Number },
    isOpen: { type: Boolean },
  },
  data() {
    return {
      itemVisible: false,
      windowWidth: window.innerWidth,
    };
  },

  computed: {
    isMobSmallScreen() {
      return this.windowWidth <= 746;
    },
  },

  methods: {
    titleize,
    handleResize() {
      this.windowWidth = window.innerWidth;
    },
    increment() {
      this.$emit('increment', this.index);
    },
    collapsibleClosed(index) {
      this.$emit('update', index);
    },
  },
  mounted() {
    window.addEventListener('resize', this.handleResize);
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
  },
};
</script>

<style>
</style>