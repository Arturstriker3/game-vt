<script setup lang="ts">
import MapScreen from './game/screens/MapScreen.vue';
</script>

<template>
  <div class="app-container">
    <header class="game-header">
      <h1>Armored Tactics</h1>
      <div class="header-controls">
        <button class="header-btn">New Game</button>
        <button class="header-btn">Options</button>
      </div>
    </header>
    
    <main class="main-content">
      <MapScreen />
    </main>
    
    <footer class="game-footer">
      <p>Armored Tactics - Based on Armored Brigade © 2023</p>
    </footer>
  </div>
</template>

<style>
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #121212;
  color: #eaeaea;
}

#app {
  height: 100vh;
}

.app-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.game-header {
  background-color: #222;
  padding: 0.5rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid #444;
}

.game-header h1 {
  margin: 0;
  color: #4c8;
  text-shadow: 0 0 10px rgba(0, 255, 128, 0.3);
}

.header-controls {
  display: flex;
  gap: 0.5rem;
}

.header-btn {
  background-color: #333;
  color: #eaeaea;
  border: 1px solid #555;
  padding: 0.4rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
}

.header-btn:hover {
  background-color: #444;
  border-color: #777;
}

.main-content {
  flex: 1;
  overflow: auto;
}

.game-footer {
  background-color: #222;
  padding: 0.5rem;
  text-align: center;
  font-size: 0.8rem;
  color: #888;
  border-top: 1px solid #444;
}
</style>
