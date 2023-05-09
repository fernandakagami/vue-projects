<script lang="ts">
export default {
  props: ['product']
}
</script>

<template>    
  <li>
    <img v-bind:src="product.image"/>
    <h2>{{ product.name }}</h2>
    <p>R$ {{ product.price.toFixed(2).toString().replace('.', ',') }}</p>
    <small>até {{ product.parcelamento[0] }}x de {{ product.parcelamento[1].toFixed(2).toString().replace('.', ',') }}</small>
    <a type="button">Comprar</a>
  </li>
</template>

<style scoped>
li {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 195px;
  cursor: pointer;
}

img {
  width: 100%;
  margin-bottom: 5px;
}

h2 {
  font-size: 14px;
  font-weight: 400;
  text-transform: uppercase;
}

p {
  font-weight: 700;
  font-size: 16px;
}

small {
  font-weight: 400;
  font-size: 16px;
  color: var(--vt-c-indigo);
}

a {
  background-color: var(--vt-c-black);
  color: var(--vt-c-white);
  width: 100%;
  text-align: center;
  padding: 3px 0;
  text-transform: uppercase;
  margin: 10px 0 30px 0;  
}
</style>
