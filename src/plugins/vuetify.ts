import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.css'

// Definindo tema militar escuro personalizado
const darkMilitaryTheme = {
  dark: true,
  colors: {
    primary: '#2c7',    // Verde militar 
    secondary: '#227',  // Azul escuro para botões secundários
    accent: '#7cc',     // Azul claro para destacar elementos
    success: '#3d8',
    info: '#7bbcdb',
    warning: '#e6b500',
    error: '#e53935',
    background: '#1e1e1e',
    surface: '#222',
    'surface-variant': '#333',
    'on-surface-variant': '#eaeaea',
  }
}

export default createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'darkMilitaryTheme',
    themes: {
      darkMilitaryTheme,
    }
  },
  defaults: {
    VBtn: {
      variant: 'flat',
      rounded: 'sm'
    },
    VCard: {
      rounded: 'sm'
    },
    VTextField: {
      variant: 'outlined',
      density: 'compact',
      color: 'primary'
    },
    VCheckbox: {
      color: 'primary'
    },
    VSlider: {
      color: 'primary'
    }
  }
}) 