<script setup lang="ts">
import { RouterView } from 'vue-router'
import logo from './assets/images/robo.png'
import bag from './assets/images/sacola.png'
</script>

<template>
  <header>
    <div class="header-container">
      <div class="content-left">
        <img :src="logo" />
        <h1>Robot Store</h1>      
      </div>
      <div class="content-right">
        <img :src="bag" />
      </div>      
    </div>
  </header>

  <RouterView />

  <footer>
    <p>Fernanda - 2023</p>
  </footer>
</template>

<style scoped>
header {     
  border-bottom: 1px solid var(--vt-c-black-mute);  
}
.header-container {
  display: flex;
  justify-content: space-between;
  max-width: 1200px;   
  margin: 0 auto;
  padding: 10px 0;
}
.content-left {  
  display: flex;
  align-items: center;
}

.content-left img {  
  width: 40px;
  height: 40px;
  margin-right: 10px;
}

.content-left h1 {
  font-weight: 900;
}

.content-right {  
  display: flex;
  align-items: center;
}
.content-right img {
  width: 30px;
  align-items: center;
}

footer {
  width: 100%;
  background-color: var(--vt-c-black);
  padding: 5px 0;
  text-align: center;
  color: white;  
}
</style>