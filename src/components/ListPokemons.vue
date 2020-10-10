/* eslint-disable dot-notation */
<template>
  <v-container fluid>
    <v-text-field v-model="search" label="Buscar Pokemon"></v-text-field>
    <v-row>
      <div v-if="pokemonsData.length === 0">Pokemon Não Existe</div>
      <v-col
        v-for="pokemon in pokemons"
        :key="pokemon.id"
        cols="12"
        lg="3"
        sm="4"
      >
        <CardPokemon :pokemon="pokemon"></CardPokemon>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src
import CardPokemon from '@/components/CardPokemon.vue';

export default {
  props: {
    itemsPerPage: { type: String, required: true, default: '20' },
  },
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
      // eslint-disable-next-line
      pokemons = this.pokemonsData.filter((pokemon) => pokemon.name.toUpperCase().includes(this.search.toUpperCase()));
      if (pokemons.length === 0) {
        this.getPokemonName(this.search);
      }
      return pokemons;
    },
  },
  methods: {
    factoryPokemon(resp) {
      const img = resp.sprites.other;
      return {
        name: String(resp.name).toUpperCase(),
        id: resp.id,
        img: img['official-artwork'].front_default,
        type: resp.types[0].type.name,
        searched: false,
      };
    },
    async getPokemons() {
      const req = [];
      const arraypokemons = this.pokemonsData.filter(
        (pokemon) => pokemon.searched === false,
      );
      this.pokemonsData = [];
      this.pokemonsData = arraypokemons;
      const resp = await fetch(
        `https://pokeapi.co/api/v2/pokemon/?offset=${this.offset}&limit=${this.itemsPerPage}`,
      ).then((res) => res.json());
      resp.results.forEach((element) => {
        req.push(this.busca(element.url));
      });
      const data = await Promise.allSettled(req);
      this.offset += parseInt(this.itemsPerPage, 10);
      data.forEach((el) => {
        // eslint-disable-next-line no-unused-vars
        const { status, value } = el;
        const pokemon = this.factoryPokemon(value);
        this.pokemonsData.push(pokemon);
      });
    },
    busca(url) {
      return new Promise((resolve, reject) => {
        fetch(url)
          .then((res) => {
            resolve(res.json());
          })
          .catch((err) => reject(err));
      });
    },
    async getPokemonName(name) {
      clearTimeout(this.debounce);
      this.debounce = setTimeout(async () => {
        const resp = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${name}`,
        ).then((res) => res.json());
        const pokemon = this.factoryPokemon(resp);
        pokemon.searched = true;
        this.pokemonsData.push(pokemon);
      }, 1000);
    },
    infiniteScroll() {
      window.onscroll = () => {
        const bottomOfWindow = Math.floor(
          document.documentElement.scrollTop + window.innerHeight,
        ) === document.documentElement.offsetHeight;

        if (bottomOfWindow) {
          this.getPokemons();
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
