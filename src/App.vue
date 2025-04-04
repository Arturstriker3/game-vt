<template>
  <v-app>
    <v-main>
      <div class="welcome-screen">
        <v-container>
          <v-row justify="center">
            <v-col cols="12" md="6">
              <v-card class="pa-4 text-center">
                <v-card-title class="text-h4 font-weight-bold">
                  Armored Tactics
                </v-card-title>
                
                <v-card-text>
                  <p class="mb-4">
                    Bem-vindo ao projeto Armored Tactics. A pasta "game" foi limpa conforme solicitado.
                  </p>
                  <p>
                    A estrutura Vue com Vuetify foi mantida e está funcionando corretamente.
                  </p>
                </v-card-text>
                
                <v-card-actions class="justify-center">
                  <v-btn color="primary">
                    Iniciar
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
// Código limpo, mantendo apenas a estrutura básica
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  overflow: hidden;
}

#app {
  font-family: 'Roboto', sans-serif;
  height: 100vh;
  width: 100vw;
  background-color: #121212;
  color: #eaeaea;
}

.welcome-screen {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #1a2a3a 0%, #16213e 50%, #0f3460 100%);
}

.v-application {
  background-color: #121212 !important;
}
</style>
