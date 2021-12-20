<template>
  <div :class="darkMode? 'darkStyle2':''">
    <div class="pt-32 ml-14 pb-80">
      <button @click="goBack" class="flex shadow-xl pl-3 pr-3 p-1 rounded-md">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M7 16l-4-4m0 0l4-4m-4 4h18"
          />
        </svg>
        <span>Back</span>
      </button>

      <!-- Flag & details -->
      <div v-if="country" class="grid xl:grid-cols-2 md:grid-cols-1 sm:grid-cols-1">
        <!-- Flag -->
        <div>
          <img :src="country.flags.svg" alt="flag" />
        </div>
        <!-- Details -->
        <div class="ml-14">
          <p class="font-black text-xl text-left">{{ country.name }}</p>
        <div class="grid grid-cols-2">
        <!-- left -->
        <div class="text-left mt-5">
        <p class="font-medium">Native name: <span class="font-normal">{{ country.nativeName }}</span> </p>
        <p class="font-medium">
          Population: <span class="font-normal">{{ country.population }}</span>
        <p class="font-medium">
          Region: <span class="font-normal">{{ country.region }}</span>
        </p>
        <p class="font-medium">
          Subregion: <span class="font-normal">{{ country.subregion }}</span>
        </p>
        <p class="font-medium">
          Capital: <span class="font-normal">{{ country.capital }}</span>
        </p>
        
        </div>
        <!-- right -->
        <div class="text-left mt-5" >
        <p class="font-medium">
          Top Level Domain: <span class="font-normal">{{ country.topLevelDomain[0] }}</span>
        </p>
        <p class="font-medium">
          Currencies: <span class="font-normal">{{ country.currencies[0].name }}</span>
        </p>
        <p class="font-medium">
          Languages: <span v-for=" lang,i in country.languages" :key="i" class="font-normal">{{ lang.name }} |</span>
        </p>
        </div>
        <!-- Border Countries -->
        <div class="text-left mt-20">
        <span class="font-medium">Border Countries </span>
        <!-- v-if car tous n'ont pas de borders -->
        <div v-if="country.borders">

        <router-link 
        
        class="shadow-md ml-1 border-2"
        :to="{
            name: 'Details',
            params: {
            slug: border.name,
          },
        }"
        v-for="border,i in borderCountries" :key="i">
        <!-- Le @click se met dans le span car le router-Link ne le déclanche pas. Il me sert à recupérer ce sur quoi je clique -->
           <span @click="getCountryCode(border.name)">{{border.name}}</span> 
        </router-link>
        <router-view :key="$route.path"></router-view>
        </div>
        </div>
        </div>
        </div>
      </div>
    </div>

    <!-- <p class="text-3xl">Detail page</p>
    <p>{{ country.name }}</p> -->
  </div>
</template>
<script>
import { mapState } from "vuex";


export default {
  name: "Details",
  props: {
    slug : {
        type: String,
        required: true
    }
  },
  data() {
    return {
      //recupère tous les pays car le passe des pays en props ne fonctionne pas
    //   theCountry: this.$store.state.resultsAll,
      //le slug passé en params de la route
      //Il est preférable de récupérer le slug via les props de la route en faisant props=true dans le index.js
      //Ensuite rérupérer le props (ici le slug ) comme au dessus et faire le computed dessus
    
    //   theCountryName: this.$route.params.slug,
      countryCode:""
    };
  },
  //recupérer le code du pays sur lequel on a cliqué
  methods: {
      getCountryCode(value){
        this.countryCode=value
        console.log(value);
      },
    //Go back
    goBack(){
    this.$router.go(-1)
    }
  },
  computed: {
        //le resultsAll
    ...mapState(['resultsAll','darkMode']),
    country() {
      return this.resultsAll.find(
        (nation) => nation.name == this.slug
      );
    },
    //alpha3Code
    borderCountries(){
        //Trouver TOUS (donc avec filter) les pays dont les borders (code à 3 lettres) du PAYS ACTUEL sont les memes que les leurs 
        return this.resultsAll.filter(
        (nation) => this.country.borders.includes(nation.alpha3Code)
      );
    }
  
  },
  //Le cycle de vie se fait par Component !!!
  //resultsAll se vide quand on fait le refresh niveau de Details, ce qui fait que rien ne s'affiche plus sur la page detail au refresh, donc  lorsque ce component ci est monté, on va vérifier que resultsAll contient qqch sinon on refait un appel d'api
  mounted() {
      if (this.resultsAll=="") {
        this.$store.dispatch("pullCountriesFromApi");
      }
  },
};
</script>
<style></style>
