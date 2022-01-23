import {createApp} from 'vue';
import {createRouter, createWebHashHistory} from 'vue-router';
import routes from './routers';
import 'assets/css/main.less';
import 'assets/style/theme/index.css';

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

const myApp = createApp({
    el: '#app-wrapper',
});

myApp.use(router);

myApp.mount("#app-wrapper");
