<template>
  <v-app>
    <v-main>
      <!-- Menu Principal -->
      <div v-if="currentScreen === 'mainMenu'" class="main-menu-screen">
        <div class="menu-background"></div>
        <div class="menu-container">
          <div class="game-title">
            <h1>ARMORED TACTICS</h1>
            <div class="title-underline"></div>
          </div>
          
          <div class="menu-options">
            <div 
              class="menu-option" 
              @click="startNewGame"
              :class="{ 'active': menuOption === 'newGame' }"
              @mouseover="menuOption = 'newGame'"
              @mouseleave="menuOption = ''"
            >
              <span class="option-marker">►</span>
              <span class="option-text">NEW GAME</span>
            </div>
            
            <div 
              class="menu-option" 
              @click="showCredits"
              :class="{ 'active': menuOption === 'credits' }"
              @mouseover="menuOption = 'credits'"
              @mouseleave="menuOption = ''"
            >
              <span class="option-marker">►</span>
              <span class="option-text">CREDITS</span>
            </div>
          </div>
          
          <div class="menu-footer">
            <span>v0.1 ALPHA</span>
          </div>
        </div>
      </div>
      
      <!-- Tela do Jogo -->
      <game-map v-if="currentScreen === 'game'" />
      
      <!-- Tela de Créditos -->
      <div v-if="currentScreen === 'credits'" class="credits-screen">
        <div class="menu-background"></div>
        <div class="credits-container">
          <h1>CRÉDITOS</h1>
          <div class="credits-content">
            <p>Desenvolvido como um exemplo de jogo RTS baseado em estilo topográfico antigo.</p>
            <p>Inspirado no American Kriegsspiel, 1882.</p>
          </div>
          <v-btn @click="returnToMainMenu" color="primary" class="mt-4">
            Voltar ao Menu
          </v-btn>
        </div>
      </div>
    </v-main>
  </v-app>
</template>

<script>
// Usando modo Options API para simplicidade
import GameMap from './game/components/GameMap.vue';
import { useGameStore } from './game/store/gameStore';

export default {
  components: {
    GameMap
  },
  
  data() {
    return {
      menuOption: '',
      gameStore: null
    }
  },
  
  computed: {
    currentScreen() {
      return this.gameStore?.currentScreen || 'mainMenu';
    }
  },
  
  methods: {
    startNewGame() {
      this.gameStore.startNewGame();
    },
    
    showCredits() {
      this.gameStore.showCredits();
    },
    
    returnToMainMenu() {
      this.gameStore.returnToMainMenu();
    }
  },
  
  created() {
    this.gameStore = useGameStore();
  }
}
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  overflow: hidden;
}

#app {
  font-family: 'Roboto', sans-serif;
  height: 100vh;
  width: 100vw;
  background-color: #121212;
  color: #eaeaea;
}

.main-menu-screen {
  height: 100%;
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.menu-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(rgba(0, 0, 0, 0.8), rgba(20, 30, 40, 0.9)),
              linear-gradient(135deg, #1a2a3a 0%, #16213e 50%, #0f3460 100%);
  z-index: 0;
}

.menu-container {
  position: relative;
  z-index: 1;
  width: 80%;
  max-width: 600px;
  background-color: rgba(30, 35, 40, 0.85);
  border: 2px solid #2c7;
  box-shadow: 0 0 20px rgba(44, 119, 112, 0.4);
  padding: 40px;
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.game-title {
  text-align: center;
}

.game-title h1 {
  font-size: 3rem;
  font-weight: 700;
  letter-spacing: 2px;
  color: #2c7;
  margin: 0;
  text-shadow: 0 0 10px rgba(44, 119, 112, 0.6);
}

.title-underline {
  height: 3px;
  background-color: #2c7;
  width: 80%;
  margin: 10px auto;
}

.menu-options {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.menu-option {
  padding: 10px 20px;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
  border-left: 3px solid transparent;
}

.menu-option:hover, .menu-option.active {
  background-color: rgba(44, 119, 112, 0.2);
  border-left: 3px solid #2c7;
}

.option-marker {
  color: #2c7;
  margin-right: 15px;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.menu-option:hover .option-marker, .menu-option.active .option-marker {
  opacity: 1;
}

.option-text {
  font-size: 1.5rem;
  font-weight: 500;
  letter-spacing: 1px;
}

.menu-footer {
  text-align: right;
  opacity: 0.7;
  font-size: 0.9rem;
}

/* Tela de créditos */
.credits-screen {
  height: 100%;
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.credits-container {
  position: relative;
  z-index: 1;
  width: 80%;
  max-width: 600px;
  background-color: rgba(30, 35, 40, 0.85);
  border: 2px solid #2c7;
  box-shadow: 0 0 20px rgba(44, 119, 112, 0.4);
  padding: 40px;
  text-align: center;
}

.credits-content {
  margin: 30px 0;
  line-height: 1.6;
}

/* Para versões mobile */
@media (max-width: 600px) {
  .menu-container, .credits-container {
    width: 95%;
    padding: 20px;
  }
  
  .game-title h1 {
    font-size: 2rem;
  }
  
  .option-text {
    font-size: 1.2rem;
  }
}
</style>
