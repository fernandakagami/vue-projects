<script>
import axios from "axios";

export default {
  data() {
    return {
      hotels: []
    }    
  },
  created() {
    this.getDataSearch()
  },
  methods: {
    getDataSearch() {
      axios
        //.get(`http://localhost:3000/api/locations/${this.$store.state.selectedLocation}/hotels?checkin=${this.$store.state.checkin}&checkout=${this.$store.state.checkout}`)
        .get(`http://localhost:3000/api/locations/newyork/hotels?checkin=2023-11-11&checkout=2023-11-23`)
        .then((res) => {          
          this.hotels = res.data 
          console.log(this.hotels[0])
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>

<template>
  <header>
    <div class="menuOne">
      <img src="../assets/logo.png" alt="logo">
    </div>
    <div class="menuTwo">
      <form @submit.prevent="search">
        <select name="selectedLocation">
          <option selected disabled>Select a location</option>
          <option value="newyork">01</option>
          <option value="chicago">02</option>
          <option value="charlottesville">03</option>
        </select>
        <div class="field">
          <label>Check-in</label>
          <input type="date" v-model="checkin" />
        </div>
        <div class="field">
          <label>Check-out</label>
          <input type="date" v-model="checkout" />
        </div>      
        <button type="submit" >Book now</button>
      </form>
    </div>
  </header>
  <main>
    <ul>
      <li>
        <div class="image-container">
          <img v-bind:src="'https://blog.websocorro.com.br/wp-content/uploads/2021/01/banner1.jpg'">          
        </div>        
        <div class="text-container">
          <div class="title-container">
            <h3>{{ this.hotels[0].name }}</h3>
            <div class="rating-container">
              <small class="rating-title">Rating:</small>
              <small class="rating-score">{{ this.hotels[0].guest_rating }}</small>
            </div>            
          </div>          
          <p>{{ this.hotels[0].description }}</p>
          <div class="button-container">
            <button type="button">{{ this.hotels[0].available ? 'Available' : 'Invailable' }}</button>
          </div>          
        </div>        
      </li>
    </ul>
  </main>
</template>

<style scoped>
header {
  background-color: rgb(153, 204, 221);
  height: 140px;
}

.menuOne {
  height: 70px;
  display: flex;
  align-items: center;
  width: 1200px;
  margin: 0 auto;
}

.menuOne img {
  height: 100px;
}

.menuTwo {
  height: 70px;
  display: flex;
  align-items: center;
}

form {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

select {
  font-size: 17px;
  padding: 7px 10px;
  margin-right: 10px;
  border-radius: 5px;
  border: none;
}

label {
  margin-right: 5px;
}

input {
  font-size: 17px;
  padding: 5px 10px;
  margin-right: 15px;
  border-radius: 5px;
  border: none;
}

button {
  font-size: 17px;
  padding: 6px 25px;
  border-radius: 5px;
  border: none;
  margin-left: 5px;
  cursor: pointer;
  background-color: #ffb700;
}

button:hover {
  background-color: #ffbd17;
}

button:active {
  background-color: rgb(192, 192, 192);
  color: white;
}

ul {
  max-width: 1200px;
  margin: 50px auto 0;
}

li {
  width: 900px;
  margin: 50px auto 0;
  border: 1px solid lightgray;
  list-style-type: none;
  padding: 10px;
  border-radius: 8px;
  display: flex;
  flex-direction: row;
}

.title-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.rating-container {
  display: flex;
  justify-content: center;
  align-items: center;  
}

.rating-title {
  font-size: 20px;
  margin-right: 10px;
}
.rating-score {    
  width: 30px;
  background-color: #ffb700;
  font-size: 20px;  
  color: white;
  font-weight: 400;
  border-radius: 5px;
  text-align: center;
}

.image-container {
  margin: auto 20px auto 0;  
}

.image-container img {
  width: 400px;  
  border-radius: 5px;
}

h3 {
  font-size: 30px;  
}

p {
text-align: justify;
}

.button-container {
  display: flex;
  justify-content: end;
  align-items: center;
  margin-top: 10px;
}

.button-container button {
  padding: 10px 50px;  
}
</style>
