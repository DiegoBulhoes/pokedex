<template>
 <v-card  elevation="50" :color="types[pokemon.type]"
    @click="getPokemonDetails($event,pokemon)">
      <div v-if="pokemon.img">
        <v-img :src="pokemon.img" width=250px height="250px" ></v-img>
      </div>
      <div v-else>Imagem não existe</div>
      <v-card-title >{{ pokemon.name }}</v-card-title>
    </v-card>
</template>

<script>
export default {
  props: {
    pokemon: {
      img: { String, required: true },
      name: { String, required: true },
      id: { Number, required: true },
      type: { Object, required: true },
    },
  },
  data() {
    return {
      types: {
        fire: 'deep-orange darken-2',
        stell: 'grey lighten-3',
        dragon: 'orange darken-2',
        electric: 'yellow darken-3',
        grass: 'green darken-1',
        water: 'cyan darken-1',
        bug: 'light-green lighten-3',
        normal: 'grey lighten-1',
        ice: 'blue darken-2',
        fairy: 'pink lighten-2',
        poison: 'purple darken-3',
        ground: 'brown darken-1',
        fighting: 'red lighten-2',
        psychic: 'deep-purple lighten-2',
        rock: 'brown lighten-3',
        ghost: 'grey darken-1',
        dark: 'blue-grey darken-4',
      },
    };
  },
  methods: {
    getPokemonDetails(_event, pokemon) {
      this.$router.push({ name: 'Pokemon', params: { id: pokemon.id } });
    },
  },

};

</script>

<style lang="scss" scoped>

</style>
