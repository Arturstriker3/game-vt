<template>
  <div class="map-screen" :class="{ 'fullscreen-mode': isFullscreen }">
    <div class="map-header">
      <h2>{{ gameMap.name }}</h2>
      <div class="header-buttons">
        <button class="control-btn" @click="showControls = true">Map Settings</button>
        <button class="control-btn fullscreen-btn" @click="toggleFullscreen">
          {{ isFullscreen ? 'Exit Fullscreen' : 'Fullscreen' }}
        </button>
      </div>
    </div>
    
    <GameMap 
      :map="gameMap" 
      :tileSize="tileSize" 
      :showCoordinates="showCoordinates" 
    />
    
    <div class="legend">
      <div class="legend-items">
        <div v-for="(terrain, key) in terrainTypes" :key="key" class="legend-item">
          <div class="legend-color" :style="{ backgroundColor: terrain.color }"></div>
          <div class="legend-name">{{ terrain.name }}</div>
        </div>
      </div>
    </div>

    <!-- Modal Controls -->
    <div v-if="showControls" class="modal-overlay" @click.self="showControls = false">
      <div class="modal-container">
        <div class="modal-header">
          <h3>Map Settings</h3>
          <button class="close-btn" @click="showControls = false">×</button>
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
          
          <button class="generate-btn" @click="generateAndCloseModal">Generate New Map</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';
import GameMap from '../components/GameMap.vue';
import { mapService, TERRAIN_TYPES } from '../services/mapService';
import type { GameMap as GameMapType } from '../interfaces/map';

const props = defineProps({
  initialMapWidth: { type: Number, default: 30 },
  initialMapHeight: { type: Number, default: 20 },
  initialTileSize: { type: Number, default: 36 },
  initialShowCoordinates: { type: Boolean, default: false }
});

const mapWidth = ref(props.initialMapWidth);
const mapHeight = ref(props.initialMapHeight);
const tileSize = ref(props.initialTileSize);
const showCoordinates = ref(props.initialShowCoordinates);
const terrainTypes = TERRAIN_TYPES;
const isFullscreen = ref(false);
const showControls = ref(false);
const windowWidth = ref(window.innerWidth);

// Automatically adjust tile size based on screen width
const autoAdjustTileSize = () => {
  if (windowWidth.value <= 480) {
    tileSize.value = 24;
  } else if (windowWidth.value <= 768) {
    tileSize.value = 30;
  } else if (windowWidth.value <= 1024) {
    tileSize.value = 36;
  } else {
    tileSize.value = 40;
  }
};

// Initialize the map
const gameMap = ref<GameMapType>({} as GameMapType);

// Generate a new map
const generateNewMap = () => {
  gameMap.value = mapService.generateRandomMap(mapWidth.value, mapHeight.value, 'Tactical Map');
};

// Generate map and close modal
const generateAndCloseModal = () => {
  generateNewMap();
  showControls.value = false;
};

// Toggle fullscreen mode
const toggleFullscreen = () => {
  if (!isFullscreen.value) {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
      isFullscreen.value = true;
    } else if ((elem as any).mozRequestFullScreen) { /* Firefox */
      (elem as any).mozRequestFullScreen();
      isFullscreen.value = true;
    } else if ((elem as any).webkitRequestFullscreen) { /* Chrome, Safari & Opera */
      (elem as any).webkitRequestFullscreen();
      isFullscreen.value = true;
    } else if ((elem as any).msRequestFullscreen) { /* IE/Edge */
      (elem as any).msRequestFullscreen();
      isFullscreen.value = true;
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
      isFullscreen.value = false;
    } else if ((document as any).mozCancelFullScreen) { /* Firefox */
      (document as any).mozCancelFullScreen();
      isFullscreen.value = false;
    } else if ((document as any).webkitExitFullscreen) { /* Chrome, Safari & Opera */
      (document as any).webkitExitFullscreen();
      isFullscreen.value = false;
    } else if ((document as any).msExitFullscreen) { /* IE/Edge */
      (document as any).msExitFullscreen();
      isFullscreen.value = false;
    }
  }
};

// Listen for window resize
const handleResize = () => {
  windowWidth.value = window.innerWidth;
  autoAdjustTileSize();
};

// Listen for fullscreen change
onMounted(() => {
  generateNewMap();
  autoAdjustTileSize();
  
  window.addEventListener('resize', handleResize);
  
  document.addEventListener('fullscreenchange', () => {
    isFullscreen.value = !!document.fullscreenElement;
  });
  document.addEventListener('mozfullscreenchange', () => {
    isFullscreen.value = !!(document as any).mozFullScreenElement;
  });
  document.addEventListener('webkitfullscreenchange', () => {
    isFullscreen.value = !!(document as any).webkitFullscreenElement;
  });
  document.addEventListener('msfullscreenchange', () => {
    isFullscreen.value = !!(document as any).msFullscreenElement;
  });
});
</script>

<style scoped>
.map-screen {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  background-color: #1e1e1e;
  color: #eaeaea;
  font-family: 'Courier New', monospace;
  overflow: hidden;
  position: relative;
}

.fullscreen-mode {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
}

.map-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  background-color: #333;
  border-bottom: 1px solid #555;
  width: 100%;
  box-sizing: border-box;
  flex-shrink: 0;
  height: 50px;
}

.map-header h2 {
  margin: 0;
  color: #7cc;
  font-size: 1.3rem;
}

.header-buttons {
  display: flex;
  gap: 0.5rem;
}

.control-btn {
  background-color: #2c7;
  color: white;
  border: none;
  padding: 0.4rem 0.8rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.2s;
}

.control-btn:hover {
  background-color: #3d8;
}

.fullscreen-btn {
  background-color: #227;
}

.fullscreen-btn:hover {
  background-color: #44a;
}

.legend {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 0.2rem;
  background-color: rgba(34, 34, 34, 0.9);
  width: 100%;
  z-index: 10;
  box-sizing: border-box;
  border-top: 1px solid rgba(100, 100, 100, 0.3);
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.legend-items {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.7rem;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.1rem 0.3rem;
  border-radius: 4px;
  background-color: rgba(42, 42, 42, 0.7);
}

.legend-color {
  width: 20px;
  height: 20px;
  border: 1px solid #888;
  border-radius: 2px;
}

.legend-name {
  font-size: 0.9rem;
  font-weight: 500;
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
  border-radius: 50%;
}

.close-btn:hover {
  background-color: rgba(255, 255, 255, 0.1);
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

/* Fullscreen adjustments */
.fullscreen-mode .map-header {
  padding: 0.3rem 0.8rem;
}

.fullscreen-mode .legend {
  padding: 0.2rem;
}

.fullscreen-mode .legend-item {
  padding: 0.1rem 0.3rem;
}

@media screen and (max-width: 768px) {
  .map-header {
    padding: 0.2rem 0.5rem;
    height: auto;
    min-height: 40px;
  }
  
  .map-header h2 {
    font-size: 1rem;
  }
  
  .control-btn {
    padding: 0.2rem 0.4rem;
    font-size: 0.8rem;
  }
  
  .legend {
    height: auto;
    min-height: 30px;
    padding: 0.1rem;
  }
  
  .legend-items {
    gap: 0.3rem;
  }
  
  .legend-item {
    padding: 0.1rem 0.2rem;
  }
  
  .legend-color {
    width: 14px;
    height: 14px;
  }
  
  .legend-name {
    font-size: 0.75rem;
  }
  
  .modal-container {
    width: 95%;
    max-height: 90vh;
    overflow-y: auto;
  }
  
  .modal-header {
    padding: 0.5rem;
  }
  
  .modal-content {
    padding: 0.5rem;
  }
  
  .size-controls {
    flex-direction: column;
    gap: 0.5rem;
  }
}

@media screen and (max-width: 480px) {
  .control-btn {
    font-size: 0.75rem;
    padding: 0.2rem 0.3rem;
  }
  
  .header-buttons {
    flex-wrap: wrap;
    gap: 0.3rem;
  }
  
  .legend-item {
    padding: 0.05rem 0.1rem;
  }
  
  .legend-color {
    width: 12px;
    height: 12px;
    border-width: 1px;
  }
  
  .legend-name {
    font-size: 0.7rem;
  }
}
</style> 