<template>
  <div class="map-screen">
    <div class="map-controls">
      <div class="map-info">
        <h2>{{ gameMap.name }}</h2>
        <p v-if="gameMap.description">{{ gameMap.description }}</p>
        <p>Dimensions: {{ gameMap.width }}x{{ gameMap.height }}</p>
      </div>
      
      <div class="controls">
        <button class="control-btn" @click="generateNewMap">Generate New Map</button>
        <div class="size-controls">
          <label>Width:
            <input type="number" v-model.number="mapWidth" min="10" max="100" />
          </label>
          <label>Height:
            <input type="number" v-model.number="mapHeight" min="10" max="100" />
          </label>
        </div>
        <label class="toggle">
          <input type="checkbox" v-model="showCoordinates" />
          Show Coordinates
        </label>
        <label class="toggle">
          <input type="range" v-model.number="tileSize" min="16" max="64" step="4" />
          Tile Size: {{ tileSize }}px
        </label>
      </div>
    </div>
    
    <GameMap 
      :map="gameMap" 
      :tileSize="tileSize" 
      :showCoordinates="showCoordinates" 
    />
    
    <div class="legend">
      <h3>Legend</h3>
      <div class="legend-items">
        <div v-for="(terrain, key) in terrainTypes" :key="key" class="legend-item">
          <div class="legend-color" :style="{ backgroundColor: terrain.color }"></div>
          <div class="legend-name">{{ terrain.name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import GameMap from '../components/GameMap.vue';
import { mapService, TERRAIN_TYPES } from '../services/mapService';
import type { GameMap as GameMapType } from '../interfaces/map';

const mapWidth = ref(30);
const mapHeight = ref(20);
const tileSize = ref(32);
const showCoordinates = ref(false);
const terrainTypes = TERRAIN_TYPES;

// Initialize the map
const gameMap = ref<GameMapType>({} as GameMapType);

// Generate a new map
const generateNewMap = () => {
  gameMap.value = mapService.generateRandomMap(mapWidth.value, mapHeight.value, 'Tactical Map');
};

onMounted(() => {
  generateNewMap();
});
</script>

<style scoped>
.map-screen {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #1e1e1e;
  color: #eaeaea;
  font-family: 'Courier New', monospace;
}

.map-controls {
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  background-color: #333;
  border-bottom: 1px solid #555;
}

.map-info {
  flex: 1;
}

.map-info h2 {
  margin-top: 0;
  color: #7cc;
}

.controls {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.control-btn {
  background-color: #2c7;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.2s;
}

.control-btn:hover {
  background-color: #3d8;
}

.size-controls {
  display: flex;
  gap: 1rem;
}

.size-controls input {
  width: 60px;
  background-color: #444;
  color: white;
  border: 1px solid #666;
  border-radius: 3px;
  padding: 0.25rem;
}

.toggle {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

.legend {
  margin: 1rem;
  padding: 1rem;
  background-color: #333;
  border-radius: 8px;
}

.legend h3 {
  margin-top: 0;
  border-bottom: 1px solid #555;
  padding-bottom: 0.5rem;
}

.legend-items {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 0.5rem;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.legend-color {
  width: 20px;
  height: 20px;
  border: 1px solid #888;
}

.legend-name {
  font-size: 0.9rem;
}
</style> 