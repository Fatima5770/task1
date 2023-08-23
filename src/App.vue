<template>
  <div>
    <nav class="navbar navbar-light bg-light">
      <a class="navbar-brand" href="#">
        <img src="@/assets/images/logo.png" width="30" height="30" class="d-inline-block align-top" alt="" />
        Pokemon Image Clicker
      </a>
    </nav>
    <div id="app" class="container">
      <pokemons />
    </div>
  </div>
</template>

<script>
import Pokemons from './components/Pokemons/PokemonList.vue';
export default {
  name: 'App',

  components: {
    Pokemons,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0px;
}
</style>
