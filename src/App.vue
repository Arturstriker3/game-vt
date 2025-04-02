<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <div class="min-h-screen flex flex-col items-center justify-center p-8 bg-gray-50 dark:bg-gray-900">
    <div class="flex justify-center space-x-8 mb-8">
      <a href="https://vite.dev" target="_blank">
        <img src="/vite.svg" class="h-24 p-6 transition-all duration-300 hover:drop-shadow-[0_0_2em_#646cffaa]" alt="Vite logo" />
      </a>
      <a href="https://vuejs.org/" target="_blank">
        <img src="./assets/vue.svg" class="h-24 p-6 transition-all duration-300 hover:drop-shadow-[0_0_2em_#42b883aa]" alt="Vue logo" />
      </a>
    </div>
    <HelloWorld msg="Vite + Vue + Tailwind CSS" />
  </div>
</template>
