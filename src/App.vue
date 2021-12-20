<template>
  <div id="app" >
    <!-- The nav -->
    <div :class="darkMode? 'darkStyle1':'' " class="flex w-full navi shadow-xl justify-between pt-3 pl-5 pr-5">
      <div>
        <p class="text-xl font-semibold">
          <!-- le Bon vieux a fonctionne mais il y a rafraichissement !!  -->
          <!-- <a href="/">Were in the world ?</a> -->
          <router-link to="/">Were in the world ?</router-link>
          </p>
      </div>
      <div>
        <button 
        @click="lauchDarkMode"
        class="flex">
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
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          </svg> 
          <span>Dark Mode</span> 
        </button>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
import { mapMutations,mapState } from "vuex";


export default {
  name:"App",
  computed: {
    ...mapState(["darkMode"])
  },
  methods: {
    ...mapMutations(["lauchDarkMode"])
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.navi{
  height: 10vh;
}
.darkStyle1{
 background-color: hsl(209, 23%, 22%);
 color: whitesmoke
}
.darkStyle2{
 background-color: hsl(207, 26%, 17%);
  color: whitesmoke

}

</style>
