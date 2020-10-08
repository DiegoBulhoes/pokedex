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
      <CardPokemon :pokemon="pokemon"></CardPokemon>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src
import CardPokemon from '@/components/CardPokemon.vue';

export default {
  components: {
    CardPokemon,
  },
  data() {
    return {
      search: '',
      offset: 0,
      pokemonsData: [],
      debounce: null,
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
    factoryPokemon(resp) {
      const name = resp.name.toUpperCase();
      return {
        name,
        id: resp.id,
        img: resp.sprites.other.['official-artwork'].front_default,
        type: resp.types[0].type.name,
      };
    },
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
        const pokemon = this.factoryPokemon(el.value);
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
        const pokemon = this.factoryPokemon(resp);
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
