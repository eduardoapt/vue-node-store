<template>
  <v-app>
    <router-view />
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
});
</script>

<style>
@import "vuetify/dist/vuetify.min.css";
body {
  font-family: "Roboto", sans-serif;
}
</style>
