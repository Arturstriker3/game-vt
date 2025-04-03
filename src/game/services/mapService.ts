import type { GameMap, MapTile, Terrain } from '../interfaces/map';

// Predefined terrain types
export const TERRAIN_TYPES: Record<string, Terrain> = {
  PLAIN: {
    id: 1,
    name: 'Plain',
    movementCost: {
      infantry: 1,
      wheeled: 1,
      tracked: 1,
      helicopter: 1
    },
    coverValue: 0.1,
    visibility: 1,
    color: '#a0d6a0'
  },
  FOREST: {
    id: 2,
    name: 'Forest',
    movementCost: {
      infantry: 1.5,
      wheeled: 3,
      tracked: 2,
      helicopter: 1
    },
    coverValue: 0.7,
    visibility: 0.3,
    color: '#1b512a'
  },
  URBAN: {
    id: 3,
    name: 'Urban',
    movementCost: {
      infantry: 1,
      wheeled: 1.5,
      tracked: 1.5,
      helicopter: 1
    },
    coverValue: 0.8,
    visibility: 0.4,
    color: '#888888'
  },
  WATER: {
    id: 4,
    name: 'Water',
    movementCost: {
      infantry: 5,
      wheeled: 999, // Impassable
      tracked: 999, // Impassable
      helicopter: 1
    },
    coverValue: 0,
    visibility: 1,
    color: '#5599ff'
  },
  ROAD: {
    id: 5,
    name: 'Road',
    movementCost: {
      infantry: 0.8,
      wheeled: 0.5,
      tracked: 0.7,
      helicopter: 1
    },
    coverValue: 0,
    visibility: 1,
    color: '#996633'
  }
};

export class MapService {
  /**
   * Generates a random map with the provided dimensions
   */
  generateRandomMap(width: number, height: number, name: string): GameMap {
    const tiles: MapTile[][] = [];
    
    // Initialize tiles array
    for (let y = 0; y < height; y++) {
      tiles[y] = [];
      for (let x = 0; x < width; x++) {
        // Choose a random terrain, with higher probability for plains
        const terrainRoll = Math.random();
        let terrain;
        
        if (terrainRoll < 0.6) {
          terrain = TERRAIN_TYPES.PLAIN;
        } else if (terrainRoll < 0.75) {
          terrain = TERRAIN_TYPES.FOREST;
        } else if (terrainRoll < 0.85) {
          terrain = TERRAIN_TYPES.URBAN;
        } else if (terrainRoll < 0.95) {
          terrain = TERRAIN_TYPES.ROAD;
        } else {
          terrain = TERRAIN_TYPES.WATER;
        }
        
        // Generate random elevation (0-10)
        const elevation = Math.floor(Math.random() * 10);
        
        tiles[y][x] = {
          x,
          y,
          terrain,
          elevation,
          isOccupied: false
        };
      }
    }
    
    // Add more realistic patterns (rivers, roads, etc.)
    this.addRealismPatterns(tiles, width, height);
    
    return {
      width,
      height,
      tiles,
      name
    };
  }
  
  /**
   * Adds more realistic patterns to the map, such as rivers and roads
   */
  private addRealismPatterns(tiles: MapTile[][], width: number, height: number): void {
    // Add a river (water line)
    if (width > 10 && height > 10) {
      const riverStartX = Math.floor(Math.random() * width);
      let currentX = riverStartX;
      
      for (let y = 0; y < height; y++) {
        // The river meanders a bit
        currentX += Math.floor(Math.random() * 3) - 1;
        if (currentX < 0) currentX = 0;
        if (currentX >= width) currentX = width - 1;
        
        tiles[y][currentX].terrain = TERRAIN_TYPES.WATER;
        
        // Add some width to the river
        if (currentX > 0) {
          if (Math.random() < 0.5) {
            tiles[y][currentX - 1].terrain = TERRAIN_TYPES.WATER;
          }
        }
        if (currentX < width - 1) {
          if (Math.random() < 0.5) {
            tiles[y][currentX + 1].terrain = TERRAIN_TYPES.WATER;
          }
        }
      }
    }
    
    // Add a road
    const roadStartY = Math.floor(Math.random() * height);
    let currentY = roadStartY;
    
    for (let x = 0; x < width; x++) {
      // The road meanders a bit
      currentY += Math.floor(Math.random() * 3) - 1;
      if (currentY < 0) currentY = 0;
      if (currentY >= height) currentY = height - 1;
      
      tiles[currentY][x].terrain = TERRAIN_TYPES.ROAD;
    }
  }
  
  /**
   * Returns the movement cost for a unit to move to the tile
   */
  getMovementCost(tile: MapTile, unitType: string): number {
    return tile.terrain.movementCost[unitType] || 999;
  }
  
  /**
   * Checks if a tile can be occupied by a unit
   */
  canOccupy(tile: MapTile): boolean {
    return !tile.isOccupied && tile.terrain.id !== TERRAIN_TYPES.WATER.id;
  }
}

export const mapService = new MapService(); 