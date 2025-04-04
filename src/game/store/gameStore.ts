import { defineStore } from 'pinia'

// Interfaces para tipagem
interface MapTile {
  type: string;      // grass, water, forest, mountain, swamp, road, etc.
  passable: boolean; // se unidades podem passar por cima
  x: number;
  y: number;
}

interface GameMap {
  name: string;
  description: string;
  width: number;
  height: number;
  tiles: MapTile[][];
}

interface GameState {
  currentScreen: 'mainMenu' | 'game' | 'credits';
  map: GameMap | null;
  selectedUnit: any | null;
  gameStarted: boolean;
}

// Definindo a store com opção de estado reativo
export const useGameStore = defineStore('game', {
  state: (): GameState => ({
    currentScreen: 'mainMenu',
    map: null,
    selectedUnit: null,
    gameStarted: false
  }),
  
  actions: {
    startNewGame() {
      this.gameStarted = true;
      this.currentScreen = 'game';
      this.loadMap('americanKriegsspiel');
      console.log('Game started, current screen:', this.currentScreen);
    },
    
    showCredits() {
      this.currentScreen = 'credits';
      console.log('Showing credits, current screen:', this.currentScreen);
    },
    
    returnToMainMenu() {
      this.currentScreen = 'mainMenu';
      console.log('Returned to main menu, current screen:', this.currentScreen);
    },
    
    loadMap(mapId: string) {
      // Aqui carregaríamos o mapa de um arquivo ou API
      // Por enquanto, vamos criar um mapa simples para demonstração
      
      const mapWidth = 30;
      const mapHeight = 20;
      
      // Inicializando o grid do mapa
      const mapTiles: MapTile[][] = [];
      
      for (let y = 0; y < mapHeight; y++) {
        const row: MapTile[] = [];
        for (let x = 0; x < mapWidth; x++) {
          // Lógica para determinar o tipo de terreno com base na posição
          let tileType = 'grass';
          let passable = true;
          
          // Criando alguns rios (água)
          if ((x === 10 || x === 11) && y > 5 && y < 15) {
            tileType = 'water';
            passable = false;
          }
          
          // Criando algumas florestas
          if ((x < 8 && y < 8) || (x > 20 && y > 12)) {
            tileType = 'forest';
            passable = true;
          }
          
          // Criando algumas montanhas
          if ((x > 15 && x < 20) && (y > 3 && y < 8)) {
            tileType = 'mountain';
            passable = false;
          }
          
          // Criando pântano
          if ((x > 18 && x < 25) && (y > 15 && y < 18)) {
            tileType = 'swamp';
            passable = true;
          }
          
          // Criando estradas
          if (((y === 10) && x > 5) || ((x === 15) && y > 5 && y < 15)) {
            tileType = 'road';
            passable = true;
          }
          
          // Criando cidade
          if ((x > 12 && x < 18) && (y > 10 && y < 15)) {
            tileType = 'city';
            passable = true;
          }
          
          row.push({
            type: tileType,
            passable,
            x,
            y
          });
        }
        mapTiles.push(row);
      }
      
      this.map = {
        name: 'American Kriegsspiel',
        description: 'Created from Plate 1, of The American Kriegsspiel, Livermore, 1882',
        width: mapWidth,
        height: mapHeight,
        tiles: mapTiles
      };
      
      console.log('Map loaded:', this.map.name);
    }
  }
}); 