import {createApp} from 'vue';
import {createRouter, createWebHashHistory} from 'vue-router';
import routes from './routers';
import 'assets/css/main.less';
import 'assets/style/theme/index.css';
// 1. 引入你需要的组件
import { Button, Field, Popup, Picker, Tabs, Tab, List, Cell, Radio, RadioGroup } from 'vant';
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
myApp.use(Button).use(Field).use(Popup).use(Picker).use(Tabs).use(Tab).use(List).use(Cell).use(Radio).use(RadioGroup);

myApp.use(router);

myApp.mount("#app-wrapper");
