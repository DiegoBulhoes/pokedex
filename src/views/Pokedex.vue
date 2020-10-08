<template>
  <v-container>
    <ListPokemons itemsPerPage=30 ></ListPokemons>
  </v-container>
</template>

<script>
import ListPokemons from '@/components/ListPokemons.vue';

export default {
  components: {
    ListPokemons,
  },
};
</script>
