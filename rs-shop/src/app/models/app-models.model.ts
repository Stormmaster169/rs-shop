export interface ISubCategory {
  id: string;
  name: string;
}

export interface ICategory {
  id: string;
  name: string;
  subCategories: ISubCategory[];
}

export interface IShopItem {
  id: string;
  name: string;
  imageUrls: Array<string>;
  rating: number;
  availableAmount: number;
  price: number;
  description: string;
  isInCart: boolean;
  isFavorite: boolean;
  category?: string;
  subCategory?: string;
}

export interface IUserLogin {
  login: string;
  password: string;
}

export interface IUserRegister {
  firstName: string;
  lastName: string;
  login: string;
  password: string;
}

export interface ITokenResponse {
  token: string;
}

export interface IOrderItem {
  id: string;
  amount: string;
}

export interface IUserOrderRequest {
  items: IOrderItem[];
  details: {
    name: string;
    address: string;
    phone: string;
    timeToDeliver: string;
    comment: string;
  };
}

export interface IUserOrder {
  items : IOrderItem[];
  details: {
    name: string;
    address: string;
    phone: string;
    timeToDeliver: string;
    comment: string;
  };
  id: string
}

export interface IUserInfo {
  firstName : string;
  lastName: string;
  cart: Array<string>;
  favorites : Array<string>;
  orders : IUserOrder[]
}
