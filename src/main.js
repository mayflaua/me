import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import GroceryList from './store/grocery-list'

import "element-plus/dist/index.css";
import ElementPlus from "element-plus";


createApp(App).use(ElementPlus).use(GroceryList).use(router).mount('#app')
