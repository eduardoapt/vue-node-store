<template>
  <v-app-bar app>
    <v-app-bar-nav-icon class="home-icon">
      <v-icon>{{ "mdi-rocket-launch" }}</v-icon> Ofertas
      <span> | </span>
    </v-app-bar-nav-icon>

    <v-toolbar-title class="page-title">{{ pageTitle }} </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn icon @click="toggleTheme">
      <v-icon>{{
        isDarkTheme ? "mdi-white-balance-sunny" : "mdi-weather-night"
      }}</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useTheme } from "vuetify";

const theme = useTheme();
const { pageTitle } = defineProps({
  pageTitle: {
    type: String,
    required: true,
  },
});

const isDarkTheme = computed(() => theme.global.name.value === "dark");

const toggleTheme = () => {
  theme.global.name.value = isDarkTheme.value ? "light" : "dark";
};
</script>

<style scoped>
.home-icon {
  width: 145px !important;
  span {
    margin-left: 15px;
  }
}
.page-title {
  margin-inline-start: 0 !important;
}
.v-app-bar {
  background-color: var(--v-theme-background);
}
</style>
