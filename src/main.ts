import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { createPinia } from 'pinia'

// Criando a aplicação
const app = createApp(App)

// Criando e usando o Pinia
const pinia = createPinia()
app.use(pinia)

// Usando o Vuetify
app.use(vuetify)

// Montando a aplicação
app.mount('#app')
