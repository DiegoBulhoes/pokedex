<template>
  <v-container>
    <v-row justify="space-around">
      <v-col sm="6" lg="12">
        <v-card>
          <div v-if="pokemon.img">
            <v-img max-height="250" max-width="250" :src="pokemon.img"></v-img>
          </div>
          <div v-else>Imagem não existe</div>
          <v-card-title>{{ pokemon.name }}</v-card-title>
          <v-card-text
            >Base experience: {{ pokemon.base_experience }} xp</v-card-text
          >
          <v-card-text>weight: {{ pokemon.weight }} Kg</v-card-text>
          <v-card-text>height: {{ pokemon.height }}</v-card-text>
          <v-card-text v-if="pokemon.evolves_from_species"
            >evolves from species:
            {{ pokemon.evolves_from_species }}</v-card-text
          >
          <v-card-title>Abilities</v-card-title>
          <v-card-text>
            <v-chip-group column>
              <v-chip
                close-icon="mdi-close-outline"
                color="orange"
                outlined
                v-for="item in pokemon.abilities"
                :key="item.name"
                >{{ item.ability.name }}</v-chip
              >
            </v-chip-group>
          </v-card-text>
          <v-card-title>Moves</v-card-title>
          <v-card-text>
            <v-chip-group column>
              <v-chip
                close-icon="mdi-close-outline"
                color="green"
                outlined
                v-for="item in pokemon.moves"
                :key="item.move.name"
                >{{ item.move.name }}</v-chip
              >
            </v-chip-group>
          </v-card-text>
          <v-card-title>Types</v-card-title>
          <v-card-text>
            <v-chip-group column>
              <v-chip
                close-icon="mdi-close-outline"
                color="red"
                outlined
                v-for="item in pokemon.types"
                :key="item.name"
                >{{ item.type.name }}</v-chip
              >
            </v-chip-group>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      pokemon: {
        img: '',
        base_experience: '',
        weight: '',
        height: '',
        name: '',
        abilities: [],
        moves: [],
        types: [],
        evolves_from_species: '',
      },
    };
  },
  methods: {
    async getDetails() {
      const apiUrl1 = `https://pokeapi.co/api/v2/pokemon/${this.$route.params.id}`;
      const apiUrl2 = `https://pokeapi.co/api/v2/pokemon-species/${this.$route.params.id}`;
      Promise.all([
        fetch(apiUrl1).then(
          (res) => (res.ok && res.json()) || Promise.reject(res),
        ),
        fetch(apiUrl2).then(
          (res) => (res.ok && res.json()) || Promise.reject(res),
        ),
      ]).then((data) => {
        this.pokemon.img = data[0].sprites.other['official-artwork'].front_default;
        this.pokemon.name = data[0].name.toUpperCase();
        this.pokemon.abilities = data[0].abilities;
        this.pokemon.base_experience = data[0].base_experience;
        this.pokemon.weight = data[0].weight;
        this.pokemon.height = data[0].height;
        this.pokemon.moves = data[0].moves;
        this.pokemon.types = data[0].types;
        this.pokemon.evolves_from_species = data[1].evolves_from_species.name;
      });
    },
  },
  mounted() {
    this.getDetails();
    this.$vuetify.theme.dark = true;
  },
};
</script>
