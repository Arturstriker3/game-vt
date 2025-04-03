<template>
  <div class="main-menu">
    <div class="menu-background"></div>
    <div class="menu-content">
      <h1 class="game-title">ARMORED TACTICS</h1>
      <div class="menu-subtitle">A Tactical Warfare Simulator</div>
      
      <div class="menu-options">
        <button class="menu-btn primary-btn" @click="startGame">Start Game</button>
        <button class="menu-btn" @click="showMapSettings = true">Map Settings</button>
        <button class="menu-btn" @click="toggleFullscreen">Fullscreen</button>
        <button class="menu-btn" @click="showCredits = true">Credits</button>
      </div>
      
      <div class="version-info">Version 0.1 Alpha</div>
    </div>
    
    <!-- Map Settings Modal -->
    <div v-if="showMapSettings" class="modal-overlay" @click.self="showMapSettings = false">
      <div class="modal-container">
        <div class="modal-header">
          <h3>Map Settings</h3>
          <button class="close-btn" @click="showMapSettings = false">×</button>
        </div>
        <div class="modal-content">
          <div class="control-group">
            <h4>Map Size</h4>
            <div class="size-controls">
              <label>Width:
                <input type="number" v-model.number="mapWidth" min="10" max="100" />
              </label>
              <label>Height:
                <input type="number" v-model.number="mapHeight" min="10" max="100" />
              </label>
            </div>
          </div>
          
          <div class="control-group">
            <h4>Display Options</h4>
            <label class="toggle">
              <input type="checkbox" v-model="showCoordinates" />
              Show Coordinates
            </label>
            <div class="slider-control">
              <span>Tile Size:</span>
              <input type="range" v-model.number="tileSize" min="16" max="64" step="4" />
              <span>{{ tileSize }}px</span>
            </div>
          </div>
          
          <button class="generate-btn" @click="saveSettings">Save Settings</button>
        </div>
      </div>
    </div>
    
    <!-- Credits Modal -->
    <div v-if="showCredits" class="modal-overlay" @click.self="showCredits = false">
      <div class="modal-container">
        <div class="modal-header">
          <h3>Credits</h3>
          <button class="close-btn" @click="showCredits = false">×</button>
        </div>
        <div class="modal-content">
          <div class="credits-content">
            <h4>Armored Tactics</h4>
            <p>Inspired by Armored Brigade</p>
            <p>Developed as a learning project</p>
            <p>© 2023 - All rights reserved</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue';

const emit = defineEmits(['start-game']);

const showMapSettings = ref(false);
const showCredits = ref(false);
const mapWidth = ref(30);
const mapHeight = ref(20);
const tileSize = ref(36);
const showCoordinates = ref(false);

// Start the game
const startGame = () => {
  emit('start-game', {
    mapWidth: mapWidth.value,
    mapHeight: mapHeight.value,
    tileSize: tileSize.value,
    showCoordinates: showCoordinates.value
  });
};

// Save settings and close modal
const saveSettings = () => {
  showMapSettings.value = false;
};

// Toggle fullscreen mode
const toggleFullscreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch(err => {
      console.error(`Error attempting to enable fullscreen: ${err.message}`);
    });
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
};
</script>

<style scoped>
.main-menu {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  font-family: 'Segoe UI', 'Arial', sans-serif;
  color: white;
}

.menu-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
  z-index: -1;
  opacity: 0.9;
  background-size: cover;
  background-position: center;
  overflow: hidden;
}

.menu-background::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at center, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 100%);
}

.menu-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1;
  width: 100%;
  max-width: 600px;
  padding: 2rem;
}

.game-title {
  font-size: 4rem;
  font-weight: 800;
  text-align: center;
  margin: 0;
  letter-spacing: 4px;
  color: #4c8;
  text-shadow: 0 0 20px rgba(0, 255, 128, 0.5), 0 0 40px rgba(0, 255, 128, 0.3);
  background: linear-gradient(to bottom, #6df 0%, #4c8 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1rem;
}

.menu-subtitle {
  font-size: 1.2rem;
  margin-bottom: 3rem;
  opacity: 0.8;
  text-align: center;
}

.menu-options {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-width: 300px;
}

.menu-btn {
  background-color: rgba(40, 40, 50, 0.8);
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.2);
  padding: 0.8rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: 600;
  transition: all 0.3s ease;
  width: 100%;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.menu-btn:hover {
  background-color: rgba(60, 60, 70, 0.8);
  border-color: rgba(255, 255, 255, 0.4);
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.primary-btn {
  background-color: #2c7;
  border-color: rgba(0, 255, 128, 0.5);
}

.primary-btn:hover {
  background-color: #3d8;
  border-color: rgba(0, 255, 128, 0.8);
}

.version-info {
  margin-top: 3rem;
  font-size: 0.8rem;
  opacity: 0.6;
}

/* Modal styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-container {
  background-color: #16213e;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
  overflow: hidden;
  border: 1px solid rgba(100, 100, 100, 0.3);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: rgba(40, 40, 60, 0.9);
  border-bottom: 1px solid rgba(100, 100, 100, 0.3);
}

.modal-header h3 {
  margin: 0;
  color: #7cc;
  font-size: 1.2rem;
}

.close-btn {
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
}

.close-btn:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.modal-content {
  padding: 1rem;
}

.control-group {
  margin-bottom: 1.5rem;
}

.control-group h4 {
  margin: 0 0 0.5rem 0;
  color: #7cc;
  font-size: 1rem;
  border-bottom: 1px solid rgba(100, 100, 100, 0.3);
  padding-bottom: 0.3rem;
}

.size-controls {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.size-controls input {
  width: 60px;
  background-color: rgba(40, 40, 60, 0.5);
  color: white;
  border: 1px solid rgba(100, 100, 100, 0.3);
  border-radius: 3px;
  padding: 0.25rem;
}

.toggle {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  margin-bottom: 1rem;
}

.slider-control {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.slider-control input {
  flex: 1;
}

.generate-btn {
  width: 100%;
  background-color: #2c7;
  color: white;
  border: none;
  padding: 0.7rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  font-size: 1rem;
  transition: background-color 0.2s;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.generate-btn:hover {
  background-color: #3d8;
}

.credits-content {
  text-align: center;
  padding: 1rem;
}

.credits-content h4 {
  color: #7cc;
  margin-bottom: 1rem;
  font-size: 1.2rem;
}

.credits-content p {
  margin: 0.5rem 0;
  opacity: 0.8;
}

/* Responsive styles */
@media screen and (max-width: 768px) {
  .game-title {
    font-size: 3rem;
  }
  
  .menu-subtitle {
    font-size: 1rem;
    margin-bottom: 2rem;
  }
  
  .menu-btn {
    padding: 0.7rem 1.2rem;
    font-size: 1rem;
  }
  
  .modal-container {
    width: 95%;
  }
}

@media screen and (max-width: 480px) {
  .game-title {
    font-size: 2.2rem;
    letter-spacing: 2px;
  }
  
  .menu-subtitle {
    font-size: 0.9rem;
    margin-bottom: 1.5rem;
  }
  
  .menu-options {
    max-width: 250px;
  }
  
  .menu-btn {
    padding: 0.6rem 1rem;
    font-size: 0.9rem;
    letter-spacing: 1px;
  }
  
  .size-controls {
    flex-direction: column;
    gap: 0.5rem;
  }
}
</style> 