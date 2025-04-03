export interface Terrain {
  id: number;
  name: string;
  movementCost: Record<string, number>; // Movement cost by unit type
  coverValue: number; // Protection/cover value
  visibility: number; // Impact on visibility
  color: string; // Color for map rendering
}

export interface MapTile {
  x: number;
  y: number;
  terrain: Terrain;
  elevation: number;
  isOccupied: boolean;
  unitId?: string;
}

export interface GameMap {
  width: number;
  height: number;
  tiles: MapTile[][];
  name: string;
  description?: string;
} 