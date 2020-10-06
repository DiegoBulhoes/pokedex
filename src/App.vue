<template>
  <v-app app dark>
    <v-app-bar
      app
      color="red darken-4"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          @click="ListPokemons"
          alt="ultraball"
          class="shrink mr-2"
          contain
          :src="require('@/assets/ultra-ball.png')"
          transition="scale-transition"
          width="40"
        />

      <span @click="ListPokemons" >POKEDEX</span>
      </div>

    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
  methods: {
    ListPokemons() {
      this.$router.push({ name: 'Pokedex' });
    },
  },
};
</script>
