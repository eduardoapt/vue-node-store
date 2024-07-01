<template>
  <v-container v-if="order !== null" class="final-message">
    <v-row>
      <v-col cols="12" :align="'center'" justify="'center'">
        <h1>{{ order.message }}</h1>
        <div v-if="order.status === 'success'">
          <h2>Seu pedido foi realizado com sucesso!</h2>
          <h2>ID do Pedido: {{ order.orderId }}</h2>
          <div
            v-if="order.paymentInfo === 'boleto' || order.paymentInfo === 'pix'"
          >
            <div v-if="order.paymentInfo === 'pix'">
              <QRCodeVue3
                :width="200"
                :height="200"
                :value="`${order.orderId}${order.orderId}${order.orderId}${order.orderId}${order.orderId}${order.orderId}`"
                :dotsOptions="{
                  color: '#000000',
                }"
                :backgroundOptions="{ color: '#ffffff' }"
                fileExt="png"
                :download="true"
                :downloadOptions="{ name: 'qr-product', extension: 'png' }"
              />
            </div>

            <div v-else>
              <v-barcode
                :value="`${order.orderId}${order.orderId}${order.orderId}${order.orderId}${order.orderId}${order.orderId}`"
                :width="width > 700 ? 4 : width / 180"
                :displayValue="false"
              />
            </div>
            <h3>Aguardando pagamento.</h3>
          </div>
          <div v-else>
            <h3>Pagamento realizado com sucesso!</h3>
          </div>
        </div>
        <div v-else>
          <p>Ocorreu um erro: {{ order.errorMessage }}</p>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col justify="center" :align="'center'">
        <v-btn
          :color="order.status === 'success' ? 'light-green' : 'red'"
          :to="{ name: 'Home' }"
        >
          Voltar para tela inicial
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { IOrder } from "@/types/types";
import { computed, onMounted, onUnmounted, ref } from "vue";
// @ts-ignore
import { useStore } from "vuex";
// @ts-ignore
import { VBarcode } from "vbarcode";
import QRCodeVue3 from "qrcode-vue3";

const store = useStore();
const order = ref<IOrder | null>(null);

const screenWidth = ref(window.innerWidth);

const width = computed(() => screenWidth.value);

const updateDimensions = () => {
  screenWidth.value = window.innerWidth;
};

onMounted(async () => {
  order.value = await store.state.order;
  window.addEventListener("resize", updateDimensions);
});

onUnmounted(() => {
  window.removeEventListener("resize", updateDimensions);
});
</script>
<style>
.final-message {
  margin-top: 10vh;
  h1 {
    margin-bottom: 3%;
  }
  h2 {
    margin-bottom: 3%;
  }
  h3 {
    margin-top: 2%;
  }
}
</style>
