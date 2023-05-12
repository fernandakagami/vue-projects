import { createStore } from "vuex";
import axios from 'axios';
export default createStore({
    state: {
        selectedLocation: '',
        checkin: '',
        checkout: ''
    },
    mutations: {
        changeLocation(state, payload) {
            state.selectedLocation = payload
        },
        changeCheckin(state, payload) {
            state.checkin = payload
        },
        changeCheckout(state, payload) {
            state.checkout = payload
        }
    }
})



