<template>
  <v-container fluid>
       <v-text-field
       v-model="search"
      label="Buscar Pokemon"
      hide-details="auto"
    ></v-text-field>
    <v-row>
    <div v-if="pokemonsData.length === 0">Pokemon Não Existe</div>
    <v-col v-for="pokemon in pokemons" :key="pokemon.id" cols="12" lg="3" sm="4" >
    <v-card  elevation="50" :color="types[pokemon.type]"
    @click="getPokemonDetails($event,pokemon)">
      <div v-if="pokemon.img">
        <v-img :src="pokemon.img" width=250px height="250px" ></v-img>
      </div>
      <div v-else>Imagem não existe</div>
      <v-card-title >{{ pokemon.name }}</v-card-title>
    </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src

export default {
  data() {
    return {
      search: '',
      offset: 0,
      pokemonsData: [],
      debounce: null,
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
  computed: {
    pokemons() {
      let pokemons = [];
      pokemons = this.pokemonsData.filter(
        (pokemon) => pokemon.name.toUpperCase().includes(this.search.toUpperCase()),
      );
      if (pokemons.length === 0) {
        this.getPokemonName(this.search);
      }
      return pokemons;
    },
  },
  methods: {
    async getPokemons(itemsPerPage = 24) {
      const req = [];
      const resp = await fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${this.offset}&&?limit=${itemsPerPage}`).then((res) => res.json());
      resp.results.forEach((element) => {
        req.push(this.busca(element.url));
      });
      const data = await Promise.allSettled(req);
      this.offset += itemsPerPage;
      console.log(this.offset);
      data.forEach((el) => {
        const pokemon = {};
        pokemon.id = el.value.id;
        // eslint-disable-next-line
        pokemon.img = el.value.sprites.other.['official-artwork'].front_default;
        pokemon.type = el.value.types['0'].type.name;
        pokemon.name = el.value.name.toUpperCase();
        this.pokemonsData.push(pokemon);
      });
    },
    busca(url) {
      return new Promise((resolve, reject) => {
        fetch(url).then((res) => {
          resolve(res.json());
        }).catch((err) => reject(err));
      });
    },
    getPokemonDetails(_event, pokemon) {
      this.$router.push({ name: 'Pokemon', params: { id: pokemon.id } });
    },
    async getPokemonName(name) {
      clearTimeout(this.debounce);
      this.debounce = setTimeout(async () => {
        const resp = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`).then((res) => res.json());
        console.log(resp);
        console.log(`${resp.sprites.other.['official-artwork'].front_default};`);
        const pokemon = {
          name: resp.name,
          id: resp.id,
          img: resp.sprites.other.['official-artwork'].front_default,
          type: resp.types['0'].type.name,
        };
        this.pokemonsData.push(pokemon);
      }, 1000);
    },
    infiniteScroll() {
      window.onscroll = () => {
        const bottomOfWindow = Math.floor(document.documentElement.scrollTop + window.innerHeight)
        === document.documentElement.offsetHeight;

        if (bottomOfWindow) {
          console.log('scroll');
          this.getPokemons(48);
        }
      };
    },

  },
  mounted() {
    this.infiniteScroll();
    this.getPokemons();
    this.$vuetify.theme.dark = true;
  },

};
</script>
<style scoped>

</style>
