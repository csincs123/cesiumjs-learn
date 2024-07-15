import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './assets/global.css'

import {Ion} from 'cesium';
import "cesium/Build/Cesium/Widgets/widgets.css";

Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJlZDNiMDU1Yi0zNTM0L' + 
                          'TQ3ZGEtYTYwNy03NjExYjY5NGVjNTYiLCJpZCI6MTA1NDE2LCJpYXQiOjE2NjEwODc' + 
                          '2Mzl9.Tb0oUIPl1DsCS6BQDDvhTeImZI8PQDb1g3hX62SopF0';

const app = createApp(App)

// app.config.globalProperties.Cesium = Cesium;

app.use(createPinia())
app.use(router)
app.use(ElementPlus)

app.mount('#app')