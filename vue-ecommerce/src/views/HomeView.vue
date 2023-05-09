<script lang="ts">
import HomeItensList from '../components/HomeItensList.vue';
import axios from "axios";

export default {
  components: {
    HomeItensList
  },
  data() {
    return {
      products: {}
    }
  },
  created() {
    this.getProducts()
  },
  methods: {
    getProducts() {
      axios
        .get("http://localhost:3000/products")
        .then((res) => {
          this.products = res.data
        })
        .catch((error) => {
          console.log(error)
        });
    }
  }
}
</script>

<template>
  <main>
    <div>
      <h2>Blusas</h2>
      <nav>
        <div>
          <h3>Cores</h3>
          <ul>
            <li>Amarelo</li>
            <li>Azul</li>
            <li>Branco</li>
            <li>Cinza</li>
            <li>Laranja</li>
          </ul>
        </div>
        <div>
          <h3>Tamanhos</h3>
          <ul>
            <li>P</li>
            <li>M</li>
            <li>G</li>
            <li>GG</li>
            <li>U</li>
            <li>36</li>
            <li>38</li>
            <li>40</li>
            <li>36</li>
            <li>38</li>
            <li>40</li>
          </ul>
        </div>
        <div>
          <h3>Faixa de Preço</h3>
          <ul>
            <li>de R$0 até R$50</li>
            <li>de R$50 até R$150</li>
            <li>de R$151 até R$300</li>
            <li>de R$301 até R$500</li>
            <li>a partir de R$500</li>
          </ul>
        </div>
      </nav>
    </div>
    <div>
      <select>
        <option selected disabled>Ordenar por:</option>
        <option value="moreRecent">Mais recente</option>
        <option value="smallPrice">Menor preço</option>
        <option value="biggerPrice">Maior preço</option>
      </select>
      <ul>        
        <HomeItensList v-for="product in products" :product="product"/>        
      </ul>
    </div>
  </main>
</template>

<style scoped>
main {
  max-width: 1200px;   
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 3fr;
}

ul {
  list-style-type: none;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}
</style>