<template>
  <div class="game-map-container" :class="{ 'sidebar-hidden': !sidebarVisible }">
    <div class="map-area" ref="mapContainer">
      <div class="map-grid" :style="mapGridStyle">
        <div 
          v-for="(row, y) in mapTiles" 
          :key="'row-' + y" 
          class="map-row"
        >
          <div 
            v-for="(tile, x) in row" 
            :key="`tile-${x}-${y}`" 
            class="map-tile" 
            :class="[`tile-${tile.type}`, { 'not-passable': !tile.passable }]"
            @click="selectTile(tile)"
          >
            <!-- Decorações específicas para cada tipo de terreno -->
            <div v-if="tile.type === 'forest'" class="tile-decoration forest-tree"></div>
            <div v-if="tile.type === 'city'" class="tile-decoration city-building"></div>
            <div v-if="tile.type === 'mountain'" class="tile-decoration mountain-peak"></div>
          </div>
        </div>
      </div>
      
      <!-- Indicadores de coordenadas militares -->
      <div class="coordinates-overlay">
        <div class="coordinate-x">10</div>
        <div class="coordinate-y">A</div>
      </div>
    </div>
    
    <!-- Botão para ocultar/mostrar menu lateral -->
    <div class="sidebar-toggle" @click="toggleSidebar">
      <span class="toggle-icon">{{ sidebarVisible ? '►' : '◄' }}</span>
    </div>
    
    <div class="map-sidebar">
      <div class="sidebar-header">
        <div class="classification-stamp">CONFIDENCIAL</div>
        <div class="map-title">
          <h2>{{ mapName }}</h2>
          <div class="title-underline"></div>
        </div>
      </div>
      
      <div class="sidebar-section map-info">
        <p>{{ mapDescription }}</p>
        <div class="date-stamp">JUL 1973</div>
      </div>
      
      <div class="sidebar-section map-options">
        <h3>Map Options</h3>
        <div class="zoom-options">
          <h4>Zoom Level</h4>
          <div class="dpi-indicator">
            <span v-for="dpi in dpiOptions" :key="dpi" 
              :class="{ active: dpi === selectedDpi }"
              @click="selectedDpi = dpi">
              {{ dpi }}
            </span>
          </div>
        </div>
        
        <div class="military-notation">
          <h4>Legenda</h4>
          <div class="notation-item">
            <span class="notation-symbol forest"></span>
            <span class="notation-text">Floresta</span>
          </div>
          <div class="notation-item">
            <span class="notation-symbol water"></span>
            <span class="notation-text">Água</span>
          </div>
          <div class="notation-item">
            <span class="notation-symbol city"></span>
            <span class="notation-text">Cidade</span>
          </div>
          <div class="notation-item">
            <span class="notation-symbol mountain"></span>
            <span class="notation-text">Montanha</span>
          </div>
        </div>
      </div>
      
      <div class="sidebar-section coordinates-section">
        <div class="coord-label">COORDENADAS:</div>
        <div class="coord-value" id="current-coords">--/--</div>
      </div>
      
      <div class="sidebar-controls">
        <button class="military-button" @click="returnToMenu">
          <div class="button-label">VOLTAR AO MENU</div>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { useGameStore } from '../store/gameStore';

export default {
  data() {
    return {
      dpiOptions: [96, 300, 600, 1200, 2400],
      selectedDpi: 96,
      mapContainer: null,
      gameStore: null,
      currentCoords: { x: '--', y: '--' },
      sidebarVisible: true
    }
  },
  
  computed: {
    mapName() {
      return this.gameStore?.map?.name || 'Carregando mapa...';
    },
    
    mapDescription() {
      return this.gameStore?.map?.description || '';
    },
    
    mapTiles() {
      return this.gameStore?.map?.tiles || [];
    },
    
    mapGridStyle() {
      const scale = this.selectedDpi / 96;
      return {
        transform: `scale(${scale})`,
        transformOrigin: 'top left'
      };
    }
  },
  
  methods: {
    selectTile(tile) {
      // Atualiza as coordenadas militares (formato letra+número)
      const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      const letterCoord = letters[tile.y % letters.length];
      const numberCoord = (tile.x + 1).toString().padStart(2, '0');
      
      this.currentCoords = { x: numberCoord, y: letterCoord };
      
      // Atualiza o elemento DOM com as coordenadas atuais
      const coordElement = document.getElementById('current-coords');
      if (coordElement) {
        coordElement.textContent = `${letterCoord}${numberCoord}`;
      }
      
      console.log(`Selecionado tile em x: ${tile.x}, y: ${tile.y}, tipo: ${tile.type}`);
      console.log(`Coordenadas militares: ${letterCoord}${numberCoord}`);
    },
    
    returnToMenu() {
      this.gameStore.returnToMainMenu();
    },
    
    updateCoordinateMarkers() {
      // Aqui poderíamos implementar lógica para atualizar os marcadores de coordenadas
      // à medida que o jogador move o mouse sobre o mapa
    },
    
    toggleSidebar() {
      this.sidebarVisible = !this.sidebarVisible;
    }
  },
  
  created() {
    this.gameStore = useGameStore();
    if (!this.gameStore.map) {
      this.gameStore.loadMap('americanKriegsspiel');
    }
  },
  
  mounted() {
    // Adiciona tratamento para movimentação do mouse sobre o mapa
    const mapArea = this.$refs.mapContainer;
    if (mapArea) {
      mapArea.addEventListener('mousemove', this.updateCoordinateMarkers);
    }
  },
  
  beforeUnmount() {
    // Remove o listener quando o componente for desmontado
    const mapArea = this.$refs.mapContainer;
    if (mapArea) {
      mapArea.removeEventListener('mousemove', this.updateCoordinateMarkers);
    }
  }
}
</script>

<style scoped>
.game-map-container {
  display: flex;
  height: 100vh;
  width: 100vw;
  position: relative;
  overflow: hidden;
  background-color: #e5dfc5; /* Tom de papel envelhecido */
}

.map-area {
  flex: 1;
  position: relative;
  overflow: auto;
  height: 100%;
  background-image: 
    linear-gradient(rgba(228, 222, 194, 0.5) 1px, transparent 1px),
    linear-gradient(90deg, rgba(228, 222, 194, 0.5) 1px, transparent 1px),
    repeating-linear-gradient(rgba(98, 125, 77, 0.05) 0px, rgba(98, 125, 77, 0.05) 2px, transparent 2px, transparent 4px);
  background-size: 24px 24px, 24px 24px, 100% 100%;
  background-position: -1px -1px;
  box-shadow: inset 0 0 40px rgba(30, 30, 30, 0.15);
  transition: width 0.3s ease-in-out;
}

.coordinates-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 4;
}

.coordinate-x, .coordinate-y {
  position: absolute;
  color: rgba(80, 80, 80, 0.6);
  font-family: 'Courier New', monospace;
  font-size: 10px;
}

.coordinate-x {
  top: 5px;
  left: 50%;
}

.coordinate-y {
  left: 5px;
  top: 50%;
}

/* Botão de toggle do menu lateral */
.sidebar-toggle {
  position: absolute;
  top: 50%;
  right: 280px;
  transform: translateY(-50%);
  width: 24px;
  height: 60px;
  background-color: #1a2a30;
  border: 2px solid #2c7;
  border-right: none;
  border-radius: 4px 0 0 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 11;
  transition: right 0.3s ease-in-out;
  box-shadow: -2px 0 8px rgba(0, 0, 0, 0.3);
}

.toggle-icon {
  color: #2c7;
  font-size: 14px;
}

.map-sidebar {
  width: 280px;
  height: 100%;
  background-color: #1a2a30;
  border-left: 2px solid #2c7;
  color: #eaeaea;
  font-family: 'Courier New', monospace; /* Fonte de máquina de escrever, típica da era */
  display: flex;
  flex-direction: column;
  box-shadow: -3px 0 15px rgba(0, 0, 0, 0.3);
  z-index: 10;
  transition: transform 0.3s ease-in-out;
}

/* Estado do container quando o menu está oculto */
.sidebar-hidden .map-sidebar {
  transform: translateX(100%);
}

.sidebar-hidden .sidebar-toggle {
  right: 0;
}

.sidebar-header {
  padding: 20px;
  border-bottom: 1px solid #2c7;
  background-color: rgba(44, 119, 112, 0.1);
  position: relative;
}

.classification-stamp {
  position: absolute;
  top: 8px;
  right: 10px;
  background-color: #b02020;
  color: white;
  font-size: 0.65rem;
  padding: 2px 5px;
  transform: rotate(5deg);
  letter-spacing: 1px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  text-transform: uppercase;
  font-weight: bold;
  border: 1px solid #801515;
}

.map-title h2 {
  font-weight: 500;
  font-size: 1.4rem;
  color: #2c7;
  margin: 0;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 1.5px;
}

.title-underline {
  height: 2px;
  background-color: #2c7;
  width: 60%;
  margin: 8px auto;
  opacity: 0.7;
}

.sidebar-section {
  padding: 15px 20px;
  border-bottom: 1px solid rgba(44, 119, 112, 0.3);
}

.map-info {
  position: relative;
}

.map-info p {
  font-size: 0.9rem;
  font-style: italic;
  line-height: 1.4;
  color: #ccc;
}

.date-stamp {
  position: absolute;
  bottom: 5px;
  right: 10px;
  color: rgba(200, 200, 200, 0.7);
  font-size: 0.7rem;
  letter-spacing: 1px;
}

.map-options h3 {
  font-size: 1.1rem;
  margin-bottom: 15px;
  color: #2c7;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.zoom-options h4 {
  font-size: 0.9rem;
  margin-bottom: 10px;
  color: #eaeaea;
  font-weight: normal;
}

.dpi-indicator {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 5px;
  margin-bottom: 20px;
}

.dpi-indicator span {
  cursor: pointer;
  padding: 4px 8px;
  border: 1px solid #2c7;
  background-color: rgba(44, 119, 112, 0.1);
  border-radius: 0;
  font-size: 0.8rem;
  transition: all 0.2s ease;
}

.dpi-indicator span.active {
  background-color: #2c7;
  color: #1a2a3a;
  font-weight: bold;
}

.dpi-indicator span:hover:not(.active) {
  background-color: rgba(44, 119, 112, 0.3);
}

.military-notation {
  margin-top: 15px;
}

.military-notation h4 {
  font-size: 0.9rem;
  margin-bottom: 10px;
  color: #eaeaea;
  font-weight: normal;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.notation-item {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

.notation-symbol {
  width: 16px;
  height: 16px;
  margin-right: 10px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.notation-symbol.forest {
  background-color: #8fb573;
}

.notation-symbol.water {
  background-color: #a4c0d0;
}

.notation-symbol.city {
  background-color: #d5c9a8;
  background-image: repeating-linear-gradient(45deg, transparent, transparent 3px, rgba(0, 0, 0, 0.3) 3px, rgba(0, 0, 0, 0.3) 4px);
  background-size: 8px 8px;
}

.notation-symbol.mountain {
  background-color: #b5aa94;
}

.notation-text {
  font-size: 0.8rem;
  color: #ccc;
}

.coordinates-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.2);
}

.coord-label {
  font-size: 0.8rem;
  color: #2c7;
  letter-spacing: 1px;
}

.coord-value {
  font-size: 0.9rem;
  color: #2c7;
  font-weight: bold;
  letter-spacing: 1px;
}

.sidebar-controls {
  margin-top: auto;
  padding: 20px;
  border-top: 1px solid rgba(44, 119, 112, 0.3);
}

.military-button {
  width: 100%;
  padding: 10px 15px;
  background-color: #4d1e1e;
  border: 1px solid #601a1a;
  color: #eaeaea;
  font-family: 'Courier New', monospace;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3), inset 0 1px rgba(255, 255, 255, 0.1);
}

.military-button:hover {
  background-color: #5a2424;
}

.military-button:active {
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3), inset 0 1px rgba(255, 255, 255, 0.1);
  transform: translateY(1px);
}

.button-label {
  font-size: 0.9rem;
  font-weight: bold;
}

.arrow-left {
  width: 0;
  height: 0;
  border-top: 5px solid transparent;
  border-bottom: 5px solid transparent;
  border-right: 8px solid #eaeaea;
  margin-right: 8px;
}

/* Estilos do mapa */
.map-grid {
  position: relative;
  padding: 2px;
  transition: transform 0.3s ease;
}

.map-row {
  display: flex;
}

.map-tile {
  width: 24px;
  height: 24px;
  position: relative;
  border: 1px solid rgba(125, 108, 70, 0.35);
  box-sizing: border-box;
}

/* Estilos dos diferentes tipos de terreno estilo mapa militar */
.tile-grass {
  background-color: #cfd5a7;
  background-image: 
    radial-gradient(circle at 30% 30%, rgba(207, 213, 167, 0.7) 0%, rgba(193, 200, 155, 0.7) 100%),
    repeating-linear-gradient(45deg, transparent, transparent 7px, rgba(0, 0, 0, 0.03) 7px, rgba(0, 0, 0, 0.03) 8px);
}

.tile-water {
  background-color: #a4c0d0;
  background-image: repeating-linear-gradient(0deg, rgba(164, 192, 208, 0.8) 0px, rgba(164, 192, 208, 0.8) 2px, rgba(154, 182, 198, 0.8) 2px, rgba(154, 182, 198, 0.8) 4px);
}

.tile-forest {
  background-color: #8fb573;
  background-image: 
    radial-gradient(circle at 50% 50%, rgba(143, 181, 115, 0.9) 0%, rgba(133, 171, 105, 0.9) 70%),
    repeating-linear-gradient(45deg, transparent, transparent 5px, rgba(0, 0, 0, 0.03) 5px, rgba(0, 0, 0, 0.03) 6px);
}

.tile-mountain {
  background-color: #b5aa94;
  background-image: 
    linear-gradient(45deg, rgba(181, 170, 148, 0.7) 0%, rgba(171, 160, 138, 0.7) 100%),
    repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0, 0, 0, 0.04) 3px, rgba(0, 0, 0, 0.04) 6px);
}

.tile-road {
  background-color: #d6c7a2;
  background-image: repeating-linear-gradient(90deg, rgba(214, 199, 162, 0.9) 0px, rgba(214, 199, 162, 0.9) 3px, rgba(196, 182, 142, 0.9) 3px, rgba(196, 182, 142, 0.9) 6px);
}

.tile-swamp {
  background-color: #a1b989;
  background-image: radial-gradient(ellipse at 30% 40%, rgba(126, 164, 106, 0.7) 0px, transparent 5px);
  background-size: 12px 12px;
}

.tile-city {
  background-color: #d5c9a8;
  background-image: 
    repeating-linear-gradient(45deg, transparent, transparent 3px, rgba(0, 0, 0, 0.3) 3px, rgba(0, 0, 0, 0.3) 4px),
    repeating-linear-gradient(135deg, transparent, transparent 3px, rgba(0, 0, 0, 0.3) 3px, rgba(0, 0, 0, 0.3) 4px);
  background-size: 8px 8px;
}

.not-passable {
  position: relative;
}

.not-passable::after {
  content: 'X';
  position: absolute;
  color: rgba(180, 30, 30, 0.5);
  font-size: 14px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
}

/* Decorações para os tiles */
.tile-decoration {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.forest-tree::after {
  content: '';
  position: absolute;
  top: 15%;
  left: 25%;
  width: 50%;
  height: 50%;
  background-color: #3e6b28;
  border-radius: 50%;
  box-shadow: 0 1px 1px rgba(0,0,0,0.2);
}

.mountain-peak::after {
  content: '';
  position: absolute;
  top: 20%;
  left: 30%;
  width: 40%;
  height: 40%;
  background-color: #8c7e68;
  clip-path: polygon(50% 0%, 100% 100%, 0% 100%);
}

.city-building::after {
  content: '';
  position: absolute;
  top: 20%;
  left: 30%;
  width: 40%;
  height: 60%;
  background-color: #555;
  box-shadow: 0 1px 1px rgba(0,0,0,0.3);
}

/* Adicionar coordenadas militares ao estilo anos 60/70 */
.map-grid::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    repeating-linear-gradient(0deg, transparent, transparent 23px, rgba(100, 100, 100, 0.2) 23px, rgba(100, 100, 100, 0.2) 24px),
    repeating-linear-gradient(90deg, transparent, transparent 23px, rgba(100, 100, 100, 0.2) 23px, rgba(100, 100, 100, 0.2) 24px);
  pointer-events: none;
  z-index: 5;
}

/* Responsividade */
@media (max-width: 768px) {
  .map-sidebar {
    width: 240px;
  }
}
</style> 