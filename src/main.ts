import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import vuetify from './plugins/vuetify'

// Criando a aplicação
const app = createApp(App)

// Usando o Vuetify
app.use(vuetify)

// Montando a aplicação
app.mount('#app')
