<template>
  <nav>    
    <router-link to="/">Lista de Usuários</router-link> |
    <router-link to="/user-create">Criar Usuário</router-link>
  </nav>
  <router-view/>
</template>

<style>
#app {
  font-family: 'Inter', sans-serif;   
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #141414;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #12e066;
}
</style>
