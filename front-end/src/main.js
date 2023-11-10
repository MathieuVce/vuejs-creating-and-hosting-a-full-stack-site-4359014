import { createApp } from 'vue';
import App from './App.vue';
import './main.css';
import * as VueRouter from 'vue-router';
import ShoppingCartPage from './pages/ShoppingCartPage';
import ProductDetailPage from './pages/ProductDetailPage';
import ProductsPage from './pages/ProductsPage';
import NotFoundPage from './pages/NotFoundPage';

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBAB5VejAREMhkXQKBYJ-Sl7EbB59QJeyA",
  authDomain: "fullstack-vue-70af2.firebaseapp.com",
  projectId: "fullstack-vue-70af2",
  storageBucket: "fullstack-vue-70af2.appspot.com",
  messagingSenderId: "172215951722",
  appId: "1:172215951722:web:a2d1bcd60fe3dfb2c94513"
};

initializeApp(firebaseConfig);

createApp(App)
.use(VueRouter.createRouter({
  history: VueRouter.createWebHistory(process.env.BASE_URL),
  routes:[{
    path: '/cart',
    component: ShoppingCartPage,
  },
  {
    path: '/products',
    component: ProductsPage,
  },
  {
    path: '/products/:productId',
    component: ProductDetailPage,
  }, {
    path: '/',
    redirect: '/products'
  }
  ,{
    path: '/:pathMatch(.*)*',
    component: NotFoundPage
  }]
}))
.mount('#app')
