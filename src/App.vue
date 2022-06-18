<template>
  <div class="overflow-x-hidden">
    <header class="absolute right-20 pt-8">
    <select data-choose-theme class="select select-bordered w-full max-w-xs capitalize">
      <option v-for="theme in themes" :value="theme" :key="theme">{{theme}}</option>
    </select>
    </header>
    <Homepage />
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