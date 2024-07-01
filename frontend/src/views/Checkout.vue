<template>
  <v-container class="container-checkout">
    <HeaderComponent pageTitle="Checkout da Compra" />
    <v-row>
      <v-col cols="12">
        <h1>Checkout</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="6">
        <v-card v-if="offer">
          <v-img :src="offer.images" height="230px"></v-img>
          <v-card-title>{{ offer.name }}</v-card-title>
          <v-card-subtitle>{{ offer.price }}</v-card-subtitle>
          <v-card-text>
            <ul v-for="(item, i) in items" :key="`${item}-${i}`">
              <li>
                {{ item }}
              </li>
            </ul></v-card-text
          >
        </v-card>
      </v-col>
      <v-col cols="12" sm="6">
        <!-- FORM DADOS USUÁRIO -->
        <h2 class="mb">Dados do Comprador</h2>
        <v-form
          ref="personalDataForm"
          v-model="formsValid.personalData"
          lazy-validation
        >
          <v-text-field
            v-model="personalData.name"
            label="Nome Completo"
            :rules="[rules.required]"
          ></v-text-field>
          <v-text-field
            v-model="personalData.email"
            label="Email"
            :rules="[rules.optionalEmail]"
          ></v-text-field>
          <v-text-field
            v-model="personalData.phone"
            label="Telefone"
            :rules="[rules.required, rules.phone]"
          ></v-text-field>
        </v-form>

        <!-- FORM DADOS ENDEREÇO -->
        <h2 class="mb">Endereço</h2>
        <v-form
          ref="deliveryDataForm"
          v-model="formsValid.deliveryData"
          lazy-validation
        >
          <v-text-field
            v-model="deliveryData.cep"
            label="CEP"
            :rules="[rules.required, rules.cep]"
            @change="fetchAddress"
          ></v-text-field>
        </v-form>
      </v-col>
    </v-row>

    <v-form
      ref="deliveryDataForm"
      v-model="formsValid.deliveryData"
      lazy-validation
    >
      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="deliveryData.address"
            label="Endereço"
            :rules="[rules.required]"
            readonly
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="deliveryData.number"
            label="Número"
            :rules="[rules.required]"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="deliveryData.complement"
            label="Complemento"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="deliveryData.neighborhood"
            label="Bairro"
            :rules="[rules.required]"
            readonly
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="deliveryData.city"
            label="Cidade"
            :rules="[rules.required]"
            readonly
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="deliveryData.state"
            label="Estado"
            :rules="[rules.required]"
            readonly
          ></v-text-field>
        </v-col>
      </v-row>
    </v-form>

    <!-- FORM DADOS PAGAMENTO -->
    <v-form ref="paymentDataForm" v-model="formsValid.payment" lazy-validation>
      <h2 class="mb">Meio de Pagamento</h2>

      <v-row>
        <v-col cols="12" sm="6" md="4" justify="center" :align="'center'">
          <v-btn
            :disabled="paymentData.method === 'card'"
            size="large"
            type="button"
            class="method-button"
            color="blue-grey"
            @click="setMethod('card')"
          >
            <v-icon icon="mdi-credit-card" height="30px" />
            Cartão de Crédito</v-btn
          >
        </v-col>
        <v-col cols="12" sm="6" md="4" justify="center" :align="'center'">
          <v-btn
            :disabled="paymentData.method === 'boleto'"
            size="large"
            type="button"
            class="method-button"
            color="blue-grey"
            @click="setMethod('boleto')"
          >
            <v-icon icon="mdi-barcode" height="30px" />
            Boleto</v-btn
          >
        </v-col>
        <v-col cols="12" sm="6" md="4" justify="center" :align="'center'">
          <v-btn
            :disabled="paymentData.method === 'pix'"
            size="large"
            type="button"
            class="method-button"
            color="blue-grey"
            @click="setMethod('pix')"
          >
            <PixIcon />
            Pix</v-btn
          >
        </v-col>
      </v-row>
      <v-radio-group
        class="radio-hide"
        v-model="paymentData.method"
        :rules="[rules.requiredPaymentMethod]"
      >
        <v-row>
          <v-col cols="12" sm="6" md="4">
            <v-radio value="boleto"> </v-radio>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-radio value="card"></v-radio>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-radio value="pix"></v-radio>
          </v-col>
        </v-row>
      </v-radio-group>
      <v-text-field
        class="mt"
        v-model="paymentData.cpf"
        label="CPF"
        :rules="[rules.required, rules.cpf]"
      ></v-text-field>
    </v-form>
    <v-form
      ref="cardPaymentDataForm"
      v-model="formsValid.cardPayment"
      lazy-validation
    >
      <div v-if="paymentData.method === 'card'">
        <v-text-field
          v-model="paymentData.cardNumber"
          label="Número do Cartão"
          :rules="[rules.requiredOnlyInCard]"
        ></v-text-field>
        <v-text-field
          v-model="paymentData.cardName"
          label="Nome no Cartão"
          :rules="[rules.requiredOnlyInCard]"
        ></v-text-field>
        <v-text-field
          v-model="paymentData.cardExpiry"
          label="Validade"
          :rules="[rules.requiredOnlyInCard]"
          placeholder="MM/AA"
        ></v-text-field>
        <v-text-field
          v-model="paymentData.cardCvv"
          label="CVV"
          :rules="[rules.requiredOnlyInCard]"
        ></v-text-field>
      </div>
    </v-form>

    <v-row class="mt">
      <v-col justify="center" :align="'center'">
        <v-btn color="green" @click="finalizeOrder(offerCode)"
          >Finalize Order</v-btn
        >
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { onMounted, computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
// @ts-ignore
import { useStore } from "vuex";
import axios from "axios";
import { FormRef, Offer } from "@/types/types";
import HeaderComponent from "../components/HearderComponent.vue";
import PixIcon from "../components/PixIcon.vue";

const route = useRoute();
const store = useStore();
const router = useRouter();
const offer = ref<Offer | null>(null);
const itemsRef = ref([]);
const offerCode = route.params.offerCode as string;
const paymentDataForm = ref<FormRef | null>(null);
const cardPaymentDataForm = ref<FormRef | null>(null);
const personalDataForm = ref<FormRef | null>(null);
const deliveryDataForm = ref<FormRef | null>(null);

const items = computed(() => itemsRef.value);

const validateCPF = (cpf: string) => {
  cpf = cpf.replace(/[^\d]+/g, "");
  if (cpf === "") return false;
  if (cpf.length !== 11) return false;
  var sum, rest;
  sum = 0;
  if (cpf === "00000000000") return false;
  for (var i = 1; i <= 9; i++)
    sum = sum + parseInt(cpf.substring(i - 1, i)) * (11 - i);
  rest = (sum * 10) % 11;
  if (rest === 10 || rest === 11) rest = 0;
  if (rest !== parseInt(cpf.substring(9, 10))) return false;
  sum = 0;
  for (i = 1; i <= 10; i++)
    sum = sum + parseInt(cpf.substring(i - 1, i)) * (12 - i);
  rest = (sum * 10) % 11;
  if (rest === 10 || rest === 11) rest = 0;
  if (rest !== parseInt(cpf.substring(10, 11))) return false;
  return true;
};

const personalData = ref({
  name: "",
  email: "",
  phone: "",
});
const deliveryData = ref({
  cep: "",
  address: "",
  number: "",
  complement: "",
  neighborhood: "",
  city: "",
  state: "",
});
const paymentData = ref({
  method: "",
  cpf: "",
  cardNumber: "",
  cardName: "",
  cardExpiry: "",
  cardCvv: "",
});
const formsValid = ref({
  personalData: false,
  deliveryData: false,
  payment: false,
  cardPayment: true,
});

const rules = ref({
  required: (value: string) => !!value || "Campo obrigatório",
  requiredPaymentMethod: (value: string) =>
    ["boleto", "pix", "card"].includes(value) || "Campo obrigatório",
  requiredOnlyInCard: (value: string) => {
    let boletoOrPix =
      paymentData.value.method === "boleto" ||
      paymentData.value.method === "pix";
    let result = boletoOrPix;
    if (!boletoOrPix) {
      result = !!value;
    }
    return result || "Campo obrigatório";
  },
  optionalEmail: (value: string) =>
    !value || /\S+@\S+\.\S+/.test(value) || "Email inválido",
  phone: (value: string) =>
    /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/.test(value) || "Telefone inválido",
  cep: (value: string) => /^\d{5}-?\d{3}$/.test(value) || "CEP inválido",
  cpf: (value: string) => validateCPF(value) || "CPF inválido",
});

onMounted(async () => {
  try {
    const response = await axios.get(
      `http://localhost:8000/offers/${offerCode}`
    );
    offer.value = response.data;
    itemsRef.value = JSON.parse(response.data.items);
    store.commit("setOffer", offer.value);
  } catch (error) {
    console.error("Error fetching offer:", error);
  }
});

const fetchAddress = async () => {
  try {
    const response = await axios.get(
      `https://viacep.com.br/ws/${deliveryData.value.cep}/json/`
    );
    const data = response.data;
    if (!data.erro) {
      deliveryData.value.address = data.logradouro;
      deliveryData.value.neighborhood = data.bairro;
      deliveryData.value.city = data.localidade;
      deliveryData.value.state = data.uf;
    } else {
      clearAddress();
    }
  } catch (error) {
    clearAddress();
    console.error("Error fetching address:", error);
  }
};
const clearAddress = () => {
  deliveryData.value.address = "";
  deliveryData.value.neighborhood = "";
  deliveryData.value.city = "";
  deliveryData.value.state = "";
};

const setMethod = (value: string) => {
  paymentData.value.method = value;
};

const finalizeOrder = async (offerCode: string) => {
  let validation = [];
  const personalValidation =
    personalDataForm.value !== null &&
    (await personalDataForm.value.validate());
  const deliveryValidation =
    deliveryDataForm.value !== null &&
    (await deliveryDataForm.value.validate());
  const paymentValidation =
    paymentDataForm.value !== null && (await paymentDataForm.value.validate());
  const cardPaymentValidation =
    cardPaymentDataForm.value !== null &&
    (await cardPaymentDataForm.value.validate());

  validation.push(
    personalValidation !== false && personalValidation.valid,
    deliveryValidation !== false && deliveryValidation.valid,
    paymentValidation !== false && paymentValidation.valid,
    cardPaymentValidation !== false && cardPaymentValidation.valid
  );

  if (validation.some((item) => !item)) {
    const error = document.getElementsByClassName(
      "v-messages__message"
    )[0] as HTMLElement;
    error?.focus();
    error?.scrollIntoView({ behavior: "smooth", block: "center" });
    return;
  }
  const orderData = {
    customerName: personalData.value.name,
    customerEmail: personalData.value.email,
    customerPhone: personalData.value.phone,
    address: deliveryData.value.cep,
    paymentMethod: paymentData.value.method,
    cpf: paymentData.value.cpf,
  };

  let orderResult = {};

  try {
    const response = await axios.post(
      `http://localhost:8000/offers/${offerCode}/create_order`,
      orderData
    );

    orderResult = {
      status: "success",
      message: "Pedido Realizado!",
      orderId: response.data.id,
      paymentInfo: response.data.paymentMethod,
    };
    store.commit("setOrder", orderResult);
    router.push({ name: "Success" });
  } catch (error) {
    let message = "Ocorreu um erro inesperado.";
    if (error instanceof Error) {
      message = error.message;
    }
    orderResult = {
      status: "fail",
      message: "Erro ao realizar pedido.",
      errorMessage: message,
    };
    console.error("Error creating order:", error);
    router.push({ name: "Success" });
  }
};
</script>
<style scoped>
.method-button {
  min-width: 100%;
}
.radio-hide {
  display: none;
}
.mb {
  margin-bottom: 5%;
}
.mt {
  margin-top: 3%;
}
.container-checkout {
  margin-top: 7%;
  ul {
    margin-left: 5%;
  }
}
</style>
