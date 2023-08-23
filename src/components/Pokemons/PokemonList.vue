<template>
  <div>
    <div class="pt-4 d-flex" :class="{ 'justify-content-center': isMobSmallScreen }">
      <div :class="{ 'col-3': !isMobSmallScreen }">
        <div v-for="(item, index) in items" :key="item.name" @click="showItemDetails(item, index)">
          <!-- Showing pokemon names in desktop view, with details to be shown on right side when clicked -->
          <div class="item mb-2" v-if="!isMobSmallScreen">{{ titleize(item.name) }}</div>

          <!-- Showing Names with collapsible cards in mobile view -->
          <pokemon-list-item
            :pokemon="item"
            :index="index"
            :isOpen="isOpenMobileCollapsible[index]"
            @increment="incrementCount"
            @update="updateIsOpenCollapsible"
            v-else
          />
        </div>
      </div>

      <!-- Item Detail on right of the screen -->
      <div class="col-8" v-if="!isMobSmallScreen && selectedItem">
        <pokemon-detail :pokemon="selectedItem" :selectedIndex="selectedIndex" @increment="incrementCount" />
      </div>
    </div>
  </div>
</template>

<script>
import PokemonDetail from './PokemonDetail.vue';
import PokemonListItem from './PokemonListItem.vue';
import { get } from 'lodash';
import { titleize } from '../../common/utils';
export default {
  components: {
    PokemonDetail,
    PokemonListItem,
  },
  data() {
    return {
      items: [],
      selectedItem: null,
      selectedIndex: null,
      windowWidth: window.innerWidth,
      isOpenMobileCollapsible: [],
      externalUrl: process.env.VUE_APP_POKE_URL,
    };
  },
  computed: {
    openCollapsibles() {
      return Array.from({ length: this.items.length }, () => false);
    },
    isMobSmallScreen() {
      return this.windowWidth <= 746;
    },
  },

  methods: {
    get,
    titleize,
    handleResize() {
      this.windowWidth = window.innerWidth;
    },
    async fetchPokemonData() {
      try {
        const response = await fetch(this.externalUrl);
        const data = await response.json();
        this.items = data.results.map((item, index) => ({
          name: item.name,
          imageUrl: `${process.env.VUE_APP_POKE_IMG_URL}/${index + 1}.png`,
          clickCount: 0,
        }));

        //mainting an array for item that is visible on screen and card of clicked item to be displayed in mobile view
        this.isOpenMobileCollapsible = [...this.openCollapsibles];
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    },
    updateIsOpenCollapsible(index) {
      this.isOpenMobileCollapsible[index] = !this.isOpenMobileCollapsible[index];
    },
    showItemDetails(item, selectIndex) {
      this.isOpenMobileCollapsible = this.isOpenMobileCollapsible.map((item, index) =>
        index === selectIndex ? true : false
      );
      this.selectedItem = item;
      this.selectedIndex = selectIndex;
    },
    incrementCount(index) {
      this.items[index].clickCount++;
    },
  },
  created() {
    this.fetchPokemonData();
  },

  mounted() {
    window.addEventListener('resize', this.handleResize);
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
  },
};
</script>


<style scoped>
</style>
