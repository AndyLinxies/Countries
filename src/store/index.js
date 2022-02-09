import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import { getField, updateField } from "vuex-map-fields";

Vue.use(Vuex);



export default new Vuex.Store({
  state: {
    //1
    //On recoit un array donc mettre un Array vide de base pour éviter les erreurs. On mettrais un string si on recevais un string 
    resultsAll: [],
    continentName: "all",
    searchValue:"",
    inputIsSubmited:false,
    all:'https://restcountries.com/v2/all',
    darkMode: false
  },
  mutations: {
    updateField,
    // 3'- Pour update la valeur de result
    //Au 2e paramètre On récupère response.data qu'on appel ici countries puis on réassigne resultsAll à cette valeur récupérée
    gotCountries(state, countries) {
      state.resultsAll = countries;
    },

    //Pour le input search
    handleInput(state,e){
      e.preventDefault();
      state.inputIsSubmited=true
      //pour que la première lettre du input sois toujours en uppercase
      state.searchValue=state.searchValue.charAt(0).toUpperCase() + state.searchValue.slice(1)
      console.log('I was submited');
    },

    //DarkMode
    lauchDarkMode(state){
      state.darkMode=!state.darkMode;
      console.log("darkmode is:", state.darkMode);
    }
  },
  //De base Récupérer des données deja existantes via un call API
  actions: {
    //On met en paramètre le commit car on va l'utiliser
    pullCountriesFromApi({ commit, state }) {
      //2
      // .get(`${state.continentName =="" ? state.byContinent : state.all}`)
      axios
        //si on clique sur all il fait la requete sur l'Url /all SINON requete sur /region/continentName

        .get(state.continentName=='all'? state.all : `https://restcountries.com/v2/region/${state.continentName}`)
        .then((response) => {
          //3- Pour update la valeur de results il faut absolument passer par une Mutation
          //on Lance la fonction gotCountries et on lui passe response.data (le 2e paramètre est le playload)
          commit("gotCountries", response.data);
        });
    },
  },
  getters: {
    getField,
    //Return the result
    getCountry(state) {
      return(
        //Si inputIsSubmited=true ET searchValue n'est pas vide ALORS il fait le filter sur l'array resultsAll et nous revoit celui dont le name correspond a ce qu'on a tapé  dans le input
        state.inputIsSubmited && state.searchValue !="" ? state.resultsAll.filter((country)=>{
          return country.name.includes(state.searchValue)
        } ) : state.resultsAll

        ) 
    },

    //To filter the countries based on the Continent
  },
  modules: {},
});
