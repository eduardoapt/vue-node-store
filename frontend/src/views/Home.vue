<template>
  <v-container>
    <HeaderComponent pageTitle="Ofertas" />
    <v-row>
      <v-col cols="12">
        <h1>Deep Space Store - Nossas Ofertas</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col v-for="offer in offers" :key="offer.code" cols="12" sm="6" md="4">
        <v-card>
          <v-img :src="offer.images" height="230px" />
          <v-card-title>{{ offer.name }}</v-card-title>
          <v-card-subtitle>R$ {{ offer.price }}</v-card-subtitle>
          <v-card-actions>
            <v-btn
              color="blue"
              :to="{ name: 'Checkout', params: { offerCode: offer.code } }"
            >
              Comprar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import axios from "axios";
import { Offer } from "@/types/types";
import HeaderComponent from "../components/HearderComponent.vue";

const offersRef = ref<Offer[]>([]);

const offers = computed(() => offersRef.value);

onMounted(async () => {
  try {
    const response = await axios.get(`http://localhost:8000/offers`);
    offersRef.value = response.data;
  } catch (error) {
    console.error("Offer not found", error);
  }
});
</script>
<style scoped></style>
