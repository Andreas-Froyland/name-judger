<template>
  <div class="overflow-x-hidden">
    <header class="absolute right-20 pt-8 flex flex-row">
      <select data-choose-theme class="select select-bordered w-full max-w-xs capitalize">
        <option v-for="theme in themes" :value="theme" :key="theme">{{theme}}</option>
      </select>
    </header>
    <Homepage />
    <footer class="bg-base-200 text-center text-xs text-gray-500 mb-2">
    <p class="mb-2">
        <a href="https://github.com/andreasNordstrand/name-judger">Made by Ananords - Visit the Github repo for more information</a>
      </p>
      <p>
        APIs used in this project:
        <a href="https://genderize.io">api.genderize.io</a> - 
        <a href="https://agify.io">api.agify.io</a> - 
        <a href="https://nationalize.io">api.nationalize.io</a>
      
      </p>
    </footer>
  </div>
</template>

<script>
import Homepage from "./components/Homepage.vue";
import { onMounted } from "vue";
import { themeChange } from "theme-change";

export default {
  components: { Homepage },
  data() {
    return {
      themes: ["light", "dark", "cupcake", "bumblebee", "emerald", "corporate", "synthwave", "retro", "cyberpunk", "valentine", "halloween", "garden", "forest", "aqua", "lofi", "pastel", "fantasy", "wireframe", "black", "luxury", "dracula", "cmyk"]
    };
  },
  setup() {
    onMounted(() => {
      themeChange(false);
    });
  },
};
</script>

<style>
</style>