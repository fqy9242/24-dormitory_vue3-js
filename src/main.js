import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
const app = createApp(App)
const pinia = createPinia();
// 注册pinia持久化插件
pinia.use(piniaPluginPersistedstate);
app.use(pinia);
app.use(router);
app.use(router)
app.mount('#app')
