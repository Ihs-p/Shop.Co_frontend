



export interface Product {
  _id: string;
  name: string;
  price: number;
  images: string[];
  category: {
    _id: string;
    name: string;
  };
  description: string;
  rating: number;
  stock: number;
  style: {
    _id: string;
    name: string;
  };
  discount: {
    discount: number;
    discountPrice: number;
  };
  size: string[];

  colors: [
    {
      name: string;
      code: string;
    }
  ],
  review: [
    {
      user: {
        name: string;
      };
      rating: number;
      comment:string
    }
  ];
}

export interface ProductState {
  products: Product[];
  product: Product | null;
  inProgressFetchAll: boolean; // For fetchAllProducts
  inProgressFetchSingle: boolean; // For fetchProduct
  error?: string;
  totalPages: number;
  currentPage: number;
  totalProducts: number;
}


export interface OrderState {
  orders: Order[] | null;
  order: Order | null;
  checkoutsessionId:string
  inprogressCreateCheckoutSesssion:boolean
  inprogressFetchAllOrders:boolean
  inprogressPlacingOrder: boolean; // For fetchAllProducts

  error?: string;
  cartFinalTotal:number

}

export interface FetchProductsParams {
  page: number;
  limit: number;
  category?: string;
  currentProductId?: string; // New parameter for the current product ID
}

export type Cart = {
  _id: string;
  name: string;
  size: string;
  color: string;
  price: number;
  images: string[];
  quantity: number;
  stock: number;
  discount: {
    discount: number;
    discountPrice: number;
  };
};

export type Carts = Cart[];

export interface SignupFormData {
  name?: string;
  email: string;
  password: string;
}

export interface UserState {
  inprogressSignup: boolean;
  inprogressLogin: boolean;
  inprogressGoogle: boolean;
  user: UserInfo["user"] | null;
  token: string | null;
  signUperror: string | null;
  Loginerror: string | null;
  googleError: string | null;
}

export interface UserInfo {
  token: string;
  user: {
    name: string;
    email: string;
  };
}

export interface Order {
  _id: string;
  user: string;
  name: string;
  email: string;
  address: {
    country: string;
    city: string;
    state: string;
    zip: string;
  };
  phone: number;
  products: [
    {
      product: {
        _id: string;
        name: string;
        price: number;
        image: string;
        description: string;
        
      }
      quantity: number;
      color: string;
      size: string;
    }
  ],
  date:string,
  status:string,
  total: number;
  paymentStatus:string,
  sessionId:string
}

export type Orders = Order[];



export interface OrderData {
  name: string;
  email: string;
  address: {
    country: string;
    city: string;
    state: string;
    zip: string;
  };
  phone: string;
  products: {
    product: string;
    quantity: number;
    color: string;
    size: string;
  }[];
}