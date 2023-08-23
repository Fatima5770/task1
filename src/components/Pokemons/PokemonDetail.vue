<template>
  <div>
    <h2>{{ titleize(get(pokemon, 'name')) }}</h2>
    <img :src="get(pokemon, 'imageUrl')" :alt="get(pokemon, 'name')" @click="increment" />
    <p>
      Clicks: <span>{{ get(pokemon, 'clickCount') }}</span>
    </p>
  </div>
</template>

<script>
import { get } from 'lodash';
import { titleize } from '../../common/utils';
export default {
  name: 'PokemonDetail',
  props: { pokemon: { type: Object, default: () => {} }, selectedIndex: { type: Number } },
  methods: {
    get,
    titleize,
    increment() {
      this.$emit('increment', this.selectedIndex);
    },
  },
};
</script>

<style>
</style>