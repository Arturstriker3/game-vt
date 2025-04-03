<script setup lang="ts">
import { ref } from 'vue';
import MapScreen from './game/screens/MapScreen.vue';
import MainMenuScreen from './game/screens/MainMenuScreen.vue';

interface GameSettings {
  mapWidth: number;
  mapHeight: number;
  tileSize: number;
  showCoordinates: boolean;
}

const activeScreen = ref('menu'); // 'menu' or 'game'
const gameSettings = ref<GameSettings>({
  mapWidth: 30,
  mapHeight: 20,
  tileSize: 36,
  showCoordinates: false
});

const startGame = (settings: GameSettings) => {
  gameSettings.value = settings;
  activeScreen.value = 'game';
};

const returnToMenu = () => {
  activeScreen.value = 'menu';
};
</script>

<template>
  <div class="app-container">
    <!-- Main Menu Screen -->
    <MainMenuScreen v-if="activeScreen === 'menu'" @start-game="startGame" />
    
    <!-- Game Screen -->
    <div v-if="activeScreen === 'game'" class="game-screen">
      <header class="game-header">
        <h1>Armored Tactics</h1>
        <div class="header-controls">
          <button class="header-btn" @click="returnToMenu">Main Menu</button>
          <button class="header-btn">Options</button>
        </div>
      </header>
      
      <main class="main-content">
        <MapScreen 
          :initial-map-width="gameSettings.mapWidth"
          :initial-map-height="gameSettings.mapHeight"
          :initial-tile-size="gameSettings.tileSize"
          :initial-show-coordinates="gameSettings.showCoordinates"
        />
      </main>
    </div>
  </div>
</template>

<style>
html, body {
  margin: 0;
  padding: 0;
  height: 100vh;
  width: 100vw;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #1e1e1e;
  color: #eaeaea;
  overflow: hidden;
}

body {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

#app {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background-color: #1e1e1e;
}

.app-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #1e1e1e;
}

.game-screen {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}

.game-header {
  background-color: #222;
  padding: 0.5rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid #444;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  height: 60px;
  flex-shrink: 0;
  z-index: 10;
}

.game-header h1 {
  margin: 0;
  color: #4c8;
  text-shadow: 0 0 10px rgba(0, 255, 128, 0.3);
  font-size: 2.2rem;
  letter-spacing: 1px;
}

.header-controls {
  display: flex;
  gap: 0.8rem;
}

.header-btn {
  background-color: #333;
  color: #eaeaea;
  border: 1px solid #555;
  padding: 0.6rem 1.2rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 1rem;
  font-weight: 500;
}

.header-btn:hover {
  background-color: #444;
  border-color: #777;
  transform: translateY(-2px);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.main-content {
  flex: 1;
  overflow: hidden;
  display: flex;
  width: 100%;
  height: calc(100vh - 60px);
  background-color: #1e1e1e;
}

@media screen and (max-width: 768px) {
  .game-header {
    padding: 0.3rem 0.6rem;
    height: auto;
    min-height: 50px;
  }
  
  .game-header h1 {
    font-size: 1.5rem;
  }
  
  .header-btn {
    padding: 0.3rem 0.8rem;
    font-size: 0.85rem;
  }
}

@media screen and (max-width: 480px) {
  .game-header {
    flex-direction: column;
    padding: 0.2rem 0.4rem;
    gap: 0.3rem;
    min-height: 70px;
  }
  
  .game-header h1 {
    font-size: 1.3rem;
  }
  
  .header-controls {
    width: 100%;
    justify-content: center;
  }
  
  .header-btn {
    padding: 0.2rem 0.6rem;
    font-size: 0.8rem;
  }
}
</style>
