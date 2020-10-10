<template>
  <v-app-bar app color="red darken-4" dark>
    <div class="d-flex align-center">
      <v-img
        @click="ListPokemons"
        alt="ultraball"
        class="shrink mr-2 zelda"
        contain
        :src="require('@/assets/ultra-ball.png')"
        transition="scale-transition"
        width="40"
      />

      <span class="zelda" @click="ListPokemons">POKEDEX</span>
    </div>
    <v-spacer></v-spacer>
    <v-switch
      @change="darkMode"
      label="Tema Escuro"
      color="white"
      hide-details
    ></v-switch>
  </v-app-bar>
</template>

<script>
export default {
  methods: {
    ListPokemons() {
      this.$router.push({ name: 'Pokedex' });
    },
    darkMode() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    },
  },
};
</script>

<style lang="scss" scoped>
.zelda {
  cursor: pointer;
}
</style>
