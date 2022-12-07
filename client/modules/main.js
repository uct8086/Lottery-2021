import {createApp} from 'vue';
import {createRouter, createWebHashHistory} from 'vue-router';
import routes from './routers';
import 'assets/css/main.less';
import 'assets/style/theme/index.css';
// 1. 引入你需要的组件
import { Button } from 'vant';
// 2. 引入组件样式
import 'vant/lib/index.css';

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

const myApp = createApp({
    el: '#app-wrapper',
});
// 3. 注册你需要的组件
myApp.use(Button);

myApp.use(router);

myApp.mount("#app-wrapper");
