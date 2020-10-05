<template>
  <v-container fluid>
    <v-row>
    <v-col v-for="pokemon in pokemons" :key="pokemon.id" cols="12" lg="2" >
    <v-card :color="pokemon.type" @click="">
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
  name: 'Home',
  data() {
    return {

      pokemons: [],
      types: {
        fire: 'red lighten-3',
        dragon: 'vermelho um pouco mais escuro',
        eletric: 'amarelo',
        grass: 'verde',
        water: 'azul',
        bug: 'verde com outro tom',
        normal: 'cinza',
        ice: 'azul mais escuro ou claro seila',
        fairy: 'roxo ou rosa claro',
        posion: 'roxo ou rosa escuro',
        ground: 'amarelo mais escuro ou marrom',
        fighting: 'algum tom de vermelho',
        psythic: 'roxo ou rosa',
        rock: 'cinza ou amarelo',
        ghost: 'branco',
        dark: 'roxo ou preto',
      },
    };
  },
  methods: {
    busca(url) {
      return new Promise((resolve, reject) => {
        fetch(url).then((res) => {
          resolve(res.json());
        }).catch((err) => reject(err));
      });
    },
  },
  async mounted() {
    const req = [];
    const resp = await fetch('https://pokeapi.co/api/v2/pokemon/').then((res) => res.json());
    resp.results.forEach((element) => {
      req.push(this.busca(element.url));
    });
    const data = await Promise.allSettled(req);
    data.forEach((el) => {
      const pokemon = {};
      pokemon.id = el.value.id;
      pokemon.img = el.value.sprites.other.['official-artwork'].front_default;
      pokemon.type = el.value.types['0'].type.name;
      pokemon.name = el.value.name.toUpperCase();
      this.pokemons.push(pokemon);
    });
    console.log(this.pokemons);
    // 'const data = await seila.json();
    // this.pokemon.img = el.sprites.other.['official-artwork'].front_default;
    // this.pokemon.name = resp.name.toUpperCase();
    // this.type(resp.types['0'].type.name);
  },

};
</script>
