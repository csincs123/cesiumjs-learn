import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
// import router from './router/DynamicRoute'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './assets/global.css'

import {Ion} from 'cesium';
// import "cesium/Build/Cesium/Widgets/widgets.css";

// Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIwZTllZmQxNS1mOWY4LTQwZWQtYjBjMC0yNjZkODVjMGI3YmUiLCJpZCI6MTA1NDE2LCJpYXQiOjE3MzQ1OTQ2NzR9.z47KK7AUjSlFHDhnI7QwDdK-nQa61_LOXarD0kecTk4' // self token 
Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI0ZDdmNWJiNy0wMmNlLTQ1MWUtODM2YS02NGM1MTBlOGMwMWQiLCJpZCI6MjU5LCJpYXQiOjE3MzMxNTc4OTV9.B3URHf0VdHDtGckb-hv7uqATdn8KfvkiuoAFZUq8tAo' // cesium official token


const app = createApp(App)

// app.config.globalProperties.Cesium = Cesium;

app.use(createPinia())
app.use(router)
app.use(ElementPlus)

app.mount('#app')