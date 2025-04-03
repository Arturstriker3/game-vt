<template>
  <div class="game-map-container">
    <div class="game-map" :style="{ width: `${map.width * tileSize}px`, height: `${map.height * tileSize}px` }">
      <div
        v-for="(row, y) in map.tiles"
        :key="`row-${y}`"
        class="map-row"
      >
        <div
          v-for="(tile, x) in row"
          :key="`tile-${x}-${y}`"
          class="map-tile"
          :style="{
            width: `${tileSize}px`,
            height: `${tileSize}px`,
            backgroundColor: tile.terrain.color,
            filter: `brightness(${100 - tile.elevation * 3}%)`,
            border: selectedTile && selectedTile.x === x && selectedTile.y === y ? '2px solid yellow' : '1px solid rgba(0, 0, 0, 0.2)'
          }"
          @click="handleTileClick(tile)"
        >
          <div v-if="showCoordinates" class="tile-coordinates">{{ x }},{{ y }}</div>
          <div v-if="tile.isOccupied" class="unit-indicator">U</div>
        </div>
      </div>
    </div>
    
    <div v-if="selectedTile" class="tile-info">
      <h3>Tile Information</h3>
      <p>Coordinates: {{ selectedTile.x }}, {{ selectedTile.y }}</p>
      <p>Terrain: {{ selectedTile.terrain.name }}</p>
      <p>Elevation: {{ selectedTile.elevation }}</p>
      <p>Occupied: {{ selectedTile.isOccupied ? 'Yes' : 'No' }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, computed } from 'vue';
import type { GameMap, MapTile } from '../interfaces/map';
import { mapService } from '../services/mapService';

const props = defineProps<{
  map: GameMap;
  tileSize?: number;
  showCoordinates?: boolean;
}>();

const tileSize = computed(() => props.tileSize || 32);
const showCoordinates = computed(() => props.showCoordinates || false);

const selectedTile = ref<MapTile | null>(null);

const handleTileClick = (tile: MapTile) => {
  selectedTile.value = tile;
  // Emit event for listeners (parent component)
  // For example, if you want to select a unit to move to this tile
};
</script>

<style scoped>
.game-map-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: auto;
  margin: 1rem;
  border: 2px solid #333;
  background-color: #222;
  color: white;
}

.game-map {
  overflow: auto;
  user-select: none;
}

.map-row {
  display: flex;
}

.map-tile {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: filter 0.2s ease;
}

.map-tile:hover {
  filter: brightness(120%) !important;
  border: 1px solid white !important;
  z-index: 1;
}

.tile-coordinates {
  font-size: 10px;
  color: rgba(255, 255, 255, 0.7);
  text-shadow: 1px 1px 1px black;
}

.unit-indicator {
  position: absolute;
  width: 80%;
  height: 80%;
  background-color: rgba(255, 0, 0, 0.5);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

.tile-info {
  margin-top: 1rem;
  padding: 1rem;
  background-color: #333;
  border-radius: 0.5rem;
  width: 300px;
}

.tile-info h3 {
  margin-top: 0;
  border-bottom: 1px solid #666;
  padding-bottom: 0.5rem;
}

.tile-info p {
  margin: 0.5rem 0;
}
</style> 