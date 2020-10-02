<template>
<v-container>
  <v-card>
    <div v-if="pokemon.img">
    <v-img :src="pokemon.img" ></v-img>
    </div>
    <div v-else>
      Imagem não existe
    </div>
    <v-card-title>{{ pokemon.name }}</v-card-title>
  </v-card>
</v-container>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  data() {
    return {
      pokemon: {
        img: '',
        name: '',
      },
    };
  },

  async mounted() {
    const resp = await fetch('https://pokeapi.co/api/v2/pokemon/quilava')
      .then((res) => res.json());
    this.pokemon.img = resp.sprites.other.['official-artwork'].front_default;
    this.pokemon.name = resp.name.toUpperCase();
  },
};
</script>
