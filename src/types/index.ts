export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export interface IApi {
    get<T extends object>(uri: string): Promise<T>;
    post<T extends object>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}



export interface IProduct {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number | null;
}

export enum EValidationStep {
    shipping = 0,
    contacts = 1,
}

export enum EPayment {
    online = 'online',
    onReceipt = 'onReceipt',
}

export type TPayment = EPayment | null;

export interface IBuyer {
  payment: TPayment;
  email: string;
  phone: string;
  address: string;
}

export type BuyerValidationErrors = Partial<Record<keyof IBuyer, string>>;

export type TOrder = IBuyer & {
    items: Array<IProduct['id']>;
    total: number;
}

export type TOrderResponse = {
    id: string;
    total: number;
} 

export type TResponseError = {
    error: string;
}

export type TProductListResponse = {
    total: number;
    items: IProduct[];
}

export type TProductItemResponse = IProduct;