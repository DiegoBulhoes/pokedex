<template>
  <v-app app dark>
    <v-app-bar
      app
      color="red darken-4"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://img1.gratispng.com/20190127/bqk/kisspng-portable-network-graphics-clip-art-image-illustrat-pokemon-pokmon-pokeball-pokball-pokemongo-5c4e30c63fd559.5942467415486281662615.jpg"
          transition="scale-transition"
          width="40"
        />

      POKEDEX
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
};
</script>
