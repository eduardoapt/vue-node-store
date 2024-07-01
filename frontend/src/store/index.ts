import { IOrder, IState } from "@/types/types";
// @ts-ignore
import { createStore } from "vuex";

export default createStore({
  state: {
    offer: null,
    order: null,
  },
  mutations: {
    setOffer(state: IState, offer: string) {
      state.offer = offer;
    },
    setOrder(state: IState, order: IOrder) {
      state.order = order;
    },
  },
  actions: {},
  modules: {},
});
