import { WebLarekApi } from './components/WebLarekApi';
import { Api } from './components/base/Api';
import { Cart } from './components/Models/Cart';
import { ProductList } from './components/Models/ProductList';
import { Order } from './components/Models/Order';
import './scss/styles.scss';
import { EPayment, IProduct } from './types';
import { API_URL } from './utils/constants';
import { apiProducts } from './utils/data';

const testProductList = (products: ProductList, items: IProduct[]) => {
  const product = items[0];
  const productId = product.id;
  
  products.setItems(items)
  console.log('======= ProductList ======');
  console.log('Количество товаров:', products.getTotal());
  console.log('Все товары в каталоге:', products.getItems());
  console.log('Товар по id:', products.getItemById(productId));
  console.log('Выбранный товар (нет):', products.getSelectedItem());
  products.setSelectedItem(product);
  console.log('Выбранный  после setSelectedItem:', products.getSelectedItem());
}


const testCart = (cart: Cart, items: IProduct[]) => {
  const product1 = items[0];
  const product2 = items[1];
  const productId = product1.id;
  
  console.log('====== Cart ======');
  console.log('Товары в корзине (нет):', cart.getItems());
  cart.addItem(product1);
  cart.addItem(product2);
  cart.addItem(product1);
  console.log('Товары в корзине (0, 1):', cart.getItems());
  console.log('Количество товаров в корзине:', cart.getItemsCount());
  console.log('Стоимость всей корзины:', cart.getTotal());
  console.log('Товар в корзине есть:', cart.hasProduct(productId));
  cart.clear();
  console.log('Корзина после clear:', cart.getItems());
  cart.removeItem(product1);
  console.log('Товары после removeItem:', cart.getItems());
}

const testOrder = (orders: Order) => {
  console.log('====== Order ======');
  console.log('Данные покупателя:', orders.get());
  console.log('Валидация (пустые данные):', orders.validate());

  orders.set({ address: 'Краснодар, ул. Моссковская, 1' });
  console.log('Данные после set:', orders.get());
  console.log('валидация (только address):', orders.validate());

  orders.set({ payment: EPayment.online });
  console.log('Данные после set (address и payment):', orders.get());
  console.log('Валидация (без контактов):', orders.validate());

  orders.set({ email: 'test@gmail.com', phone: '+79930237067' });
  console.log('Данные покупателя (Все):', orders.get());
  console.log('Валидация (Все данные):', orders.validate());

  orders.clear();
  console.log('данные после clear:', orders.get());
}




const testModels = () => {
  
  const products = new ProductList();
  testProductList(products, apiProducts.items);

  const cart = new Cart();
  testCart(cart, apiProducts.items);

  const orders = new Order();
  testOrder(orders);
}

const testAPI = async () => {
  console.log('====== Test API ======');

  const api = new Api(API_URL);
  const webLarekApi = new WebLarekApi(api);
  const cart = new Cart();
  const products = new ProductList();

  try {
    const { items } = await webLarekApi.getProductList();

    testProductList(products, items);
    testCart(cart, products.getItems());
  } catch (error) {
    console.error('Ошибка сервера:', error);
  }
};

testModels();
testAPI();