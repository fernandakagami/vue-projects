<script type="module">
import axios from "axios";

export default {
  data() {
    return {
      location: {},
      selectedLocation: '',
      checkin: '',
      checkout: ''
    }
  },
  created() {
    this.getLocation()
  },
  methods: {
    getLocation() {
      axios
        .get("http://localhost:3000/api/locations/")
        .then((res) => {
          this.location = res.data
        })
        .catch((error) => {
          console.log(error)
        })
    },
    selectLocation(e) {
      this.selectedLocation = e.target.value;
    },
    search() {
      this.$store.commit("changeLocation", this.selectedLocation)
      this.$store.commit("changeCheckin", this.checkin)
      this.$store.commit("changeCheckout", this.checkout)      
      this.$router.push({ 
        path: '/search'
      })
    }    
  }
}
</script>

<template>
  <header>
    <div class="backgroundImage">
      <div class="transbox">
        <div class="menuOne">
          <div>
            <p>phone: +44(555)290-333</p>
            <p>email: info@hotel.com</p>
            <p>address: 434, new york, ny, 10029</p>
          </div>
        </div>
        <div class="menuTwo">
          <img src="../assets/logo.png" alt="logo">
        </div>
      </div>
      <div class="info">
        <h1>Enjoy a exclusive experience</h1>
        <button type="submit" class="contact">Contact Us</button>
      </div>
    </div>
  </header>
  <main>
    <div>
      <h2>Make <strong>Reservation</strong></h2>
      <form @submit.prevent="search">
        <select name="selectedLocation" @change="selectLocation($event)">
          <option selected disabled>Select a location</option>
          <option value="newyork">{{ location[0].name }}</option>
          <option value="chicago">{{ location[1].name }}</option>
          <option value="charlottesville">{{ location[2].name }}</option>
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
  </main>
</template>

<style scoped>
header {
  width: 100%;
  height: 600px;
}

.backgroundImage {
  height: 600px;
  background-image: url('../assets/hotel.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  opacity: 0.9;
}

.transbox {
  width: 100%;
  height: 120px;
  background-color: rgba(140, 219, 255, 0.2);
}

.menuOne {
  display: block;
  height: 48px;
  border-bottom: 1px solid gray;
}

.menuOne div {
  width: 1200px;
  height: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.menuOne p {
  text-transform: uppercase;
  color: rgb(106, 200, 231);
  font-weight: 700;
  margin-right: 40px;
}

.menuTwo {
  height: 72px;
  width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.menuTwo img {
  width: 120px;
}

.info {
  height: 480px;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

h1 {
  text-transform: uppercase;
  color: white;
  font-size: 70px;
  text-shadow: 2px 2px 5px darkgray;
}

.contact {
  font-size: 30px;
  background-color: rgb(86, 191, 226);
  padding: 10px 60px;
  box-shadow: 4px 4px gray;
  border-radius: 5px;
  border: none;
  cursor: pointer;
}

.contact:hover {
  background-color: rgb(60, 183, 224);
  border: none;
}

.contact:active {
  background-color: rgb(60, 183, 224);
  box-shadow: 2px 2px gray;
  transform: translateY(2px);

}

main {
  max-width: 900px;
  margin: 50px auto 0;
}

h2 {
  margin-bottom: 40px;
  text-align: start;
}

strong {
  color: rgb(9, 107, 139);
}

form {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 15px;
}

select {
  font-size: 15px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid gray;
  color: #83898f;
}

.field label {
  margin-right: 10px;
}

.field input {
  font-size: 15px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #83898f;
  color: #83898f;
}

button {
  background-color: rgb(106, 200, 231);
  color: white;
  padding: 13px 30px;
  border: none;
  border-radius: 5px;
  font-size: 15px;
  cursor: pointer;
}
</style>
