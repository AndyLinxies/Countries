<template>
  <div :class="darkMode? 'darkStyle2':''" class="home pt-4 pl-20 pr-14">
    <!-- search input -->
    <div class="mb-10 mt-20 flex justify-between pr-5">
      <form action=""
        :class="darkMode? 'darkStyle2':''"
       class="w-full" @submit="handleInput">
        <input
          v-model="searchValue"
          placeholder="Search for any country..."
          type="text"
          class="block rounded-md px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring input shadow-md"
        />
        <!-- <button type="submit">Submit</button> -->
      </form>
      <div>
        <select
          name="regions"
          @change="getContinent"
          v-model="continentName"
          :class="darkMode? 'darkStyle2':''"
        >
          <option value="" disabled selected hidden>Filter by Region</option>
          <option value="Africa">Africa</option>
          <option value="Americas">Americas</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
          <option value="all">All</option>
        </select>
      </div>
    </div>
    <div class="grid xl:grid-cols-4  md:grid-cols-1 sm:grid-cols-1 gap-5">
      <!-- the country v-for -->
      <router-link
        :to="{
          name: 'Details',
          params: {
            slug: country.name,
          },
        }"

        
        :class="darkMode? 'darkStyle1':''"

        class="rounded-sm shadow-md"
        v-for="country in getCountry"
        :key="country.name"
      >
        <div class="flag">
          <img class="imgFlag" :src="country.flags.svg" alt="" />
        </div>
        <p class="font-bold text-xl">{{ country.name }}</p>
        <p class="font-medium">
          Population: <span>{{ country.population }}</span>
        </p>
        <p class="font-medium">
          Region: <span>{{ country.region }}</span>
        </p>
        <p class="font-medium">
          Capital: <span>{{ country.capital }}</span>
        </p>
      </router-link>
      <router-view :key="$route.path"></router-view>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapState } from "vuex";
import { mapFields } from "vuex-map-fields";

export default {
  name: "Home",
  components: {},
  data() {
    return {
      region: "",
    };
  },
  methods: {
    //@click ne fonctionne pas sur les options mais sur le select
    //le v-model fonctionne sur le select, il suffit de lui assigner une variable
    getContinent() {
      console.log(this.continentName);
      //Relance la requete a chaque fois qu'on choisis un continent
      //Pour appeler une actions
      this.$store.dispatch("pullCountriesFromApi");
      // this.$store.commit("Nom De La mutation"); Pour appeler une mutation (methods)
    },

    ...mapMutations(["handleInput"]),

    //Pour le input
    // handleInput(e){
    //   e.preventDefault();
    //   // state.inputIsSubmited=true
    //   console.log("i was submited");
    // }
  },
  mounted() {
    //Pour appeler la methode du action vu que l'affichage ne se fait pas au click.Equivalent du mapActions

    this.$store.dispatch("pullCountriesFromApi");
    // if (this.$route.path !="/") {
    //   this.$store.dispatch("pullCountriesFromApi");
    // }
  },
  computed: {
    ...mapState(["darkMode"]),
    //Pour utiliser le result en tant que getCountry
    ...mapGetters(["getCountry"]),
    //Pour utiliser le state continentNameet searchValue
    ...mapFields(["continentName", "searchValue"]),
  },
};
</script>

<style scoped>
.input {
  width: 40%;
}

</style>
