export interface IOrder {
  orderId?: string;
  status: string;
  message: string;
  paymentInfo: string;
  errorMessage?: string;
}

export interface IState {
  offer: string;
  order: IOrder;
}

export interface FormRef {
  validate: () => {
    valid: boolean;
    errors: Object[];
  };
}

export interface Offer {
  id: number;
  code: string;
  name: string;
  price: number;
  items: string;
  paymentMethods: string;
  images: string;
}
