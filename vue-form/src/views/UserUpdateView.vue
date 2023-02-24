<template>
    <main class="columns">
        <div class="box column is-three-fifths is-offset-one-fifth">
            <h2 class="title my-5">Atualização de Usuário</h2>

            <form class="mx-5" @submit.prevent="updateUser">
                <h5 class="subtitle mb-0">Dados para Login</h5>

                <div class="field">
                    <FieldForm labelName="E-mail" tag="email" inputType="email" v-model="inputEmail" inputIcon="fas fa-envelope" />
                    <div v-if="v$.inputEmail.$error">{{ v$.inputEmail.$errors[0].$message }}</div>
                </div>

                <div class="field">
                    <FieldForm labelName="Nome" tag="nome" inputType="text" v-model="inputName" inputIcon="fa-solid fa-user" />
                    <div v-if="v$.inputName.$error">{{ v$.inputName.$errors[0].$message }}</div>
                </div>

                <div class="columns is-desktop">
                    <div class="field column mb-0">
                        <FieldForm labelName="Data-de-Nascimento" tag="birthday" inputType="text" v-model="inputBirthday" inputIcon="fa-solid fa-cake-candles" maskType="##/##/####" />
                        <div v-if="v$.inputBirthday.$error">{{ v$.inputBirthday.$errors[0].$message }}</div>
                    </div>

                    <div class="field column">
                        <FieldForm labelName="Telefone" tag="phone" inputType="text" v-model="inputPhone" inputIcon="fa-solid fa-mobile-screen-button" maskType="(##)#####-####" />
                        <div v-if="v$.inputPhone.$error">{{ v$.inputPhone.$errors[0].$message }}</div>
                    </div>
                </div>

                <div class="field">
                    <FieldForm labelName="CEP" tag="cep" inputType="text" v-model="inputCep" inputIcon="fa-solid fa-user" isDisabled />                    
                </div>

                <div class="field">
                    <FieldForm labelName="Logradouro" tag="address" inputType="text" v-model="inputAddress" inputIcon="fa-solid fa-user" isDisabled />                    
                </div>

                <div class="columns is-desktop">
                    <div class="field column mb-0">
                        <FieldForm labelName="Número" tag="number" inputType="text" v-model="inputNumber" inputIcon="fa-solid fa-cake-candles" isDisabled />                        
                    </div>

                    <div class="field column">
                        <FieldForm labelName="Complemento" tag="complement" inputType="text" v-model="inputComplement" inputIcon="fa-solid fa-mobile-screen-button" isDisabled />
                    </div>
                </div>

                <div class="columns is-desktop">
                    <div class="field column mb-0">
                        <FieldForm labelName="Bairro" tag="district" inputType="text" v-model="inputDistrict" inputIcon="fa-solid fa-cake-candles" isDisabled />
                    </div>

                    <div class="field column">
                        <FieldForm labelName="Cidade" tag="city" inputType="text" v-model="inputCity" inputIcon="fa-solid fa-mobile-screen-button" isDisabled />
                    </div>
                </div>

                <div class="columns is-desktop">
                    <div class="field column mb-0">
                        <FieldForm labelName="Estado" tag="state" inputType="text" v-model="inputState" inputIcon="fa-solid fa-cake-candles" isDisabled />
                    </div>

                    <div class="field column">
                        <FieldForm labelName="Código IBGE" tag="ibge" inputType="text" v-model="inputIbge" inputIcon="fa-solid fa-mobile-screen-button" isDisabled />
                    </div>
                </div>

                <div>
                    <button class="button button-green" type="submit" >Atualizar Usuário</button>
                </div>

            </form>
        </div>
    </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import FieldForm from '@/components/FieldForm.vue';
import { useVuelidate } from '@vuelidate/core';
import { helpers, required, email, minLength, maxLength } from '@vuelidate/validators';
import { vMaska } from "maska";

const users = localStorage.getItem("users");
const usersJson = users ? JSON.parse(users) : [];

export default defineComponent({
    name: 'UserUpdateView',    
    components: {
        FieldForm,
    },
    directives: { maska: vMaska },
    setup () {
        return { v$: useVuelidate() }
    },
    data() {          
        const index = parseInt(this.$route.params.index[0]);                
        return {                        
            inputEmail: usersJson[index].email,            
            inputName: usersJson[index].name,
            inputBirthday: usersJson[index].birthday,
            inputPhone: usersJson[index].phone,
            inputCep: usersJson[index].cep,
            inputAddress: usersJson[index].address,
            inputNumber: usersJson[index].number,
            inputComplement: usersJson[index].complement,
            inputDistrict: usersJson[index].district,
            inputCity: usersJson[index].city,
            inputState: usersJson[index].state,
            inputIbge: usersJson[index].ibge,
            isDisabled: true
        }
    },
    validations () {
        const age = (inputBirthday: string): boolean => {
            const splited = inputBirthday.split('/');
            const swaped: any = [splited[1], splited[0], splited[2]];
            const birthDate = new Date(swaped);
            const today = new Date();    
            let age = today.getFullYear() - birthDate.getFullYear();         
            const month = today.getMonth() - birthDate.getMonth();
            if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            if (age < 16) {
                return false
            } 
            return true
        };

        const i = parseInt(this.$route.params.index[0]);   
        function emailValidation (inputEmail: string) {                  
            let valid = true;              
            if (usersJson[i].email === inputEmail) {                
                return valid;
            }       
            usersJson.forEach((user: any) => {               
                if (user.email === inputEmail) {
                    valid = false;                     
                }
            });
            return valid;
        }
        
        return {
            inputEmail: { 
                required: helpers.withMessage('Digite um email válido.', required),
                email: helpers.withMessage('Digite um email válido.', email),
                isUnique: helpers.withMessage('Digite um email válido.', emailValidation),
            },             
            inputName: { 
                required: helpers.withMessage('Digite seu nome completo.', required),
                minLength: helpers.withMessage('O campo deve ser preenchido com o nome completo.', minLength(2))
            },
            inputBirthday: { 
                required: helpers.withMessage('Digite uma data de nascimento válida.', required),
                calculateAge: helpers.withMessage('Você deve ter mais de 16 anos.', age)
            },
            inputPhone: {
                required: helpers.withMessage('Digite um telefone válido.', required),
                minLength: helpers.withMessage('O campo deve ser preenchido com um telefone válido.', minLength(14)),
                maxLength: helpers.withMessage('O campo deve ser preenchido com um telefone válido.', maxLength(14))
            }
        }
    },    
    methods: {
        async updateUser() {
            const isFormCorrect = await this.v$.$validate()
            if (!isFormCorrect) return
            const index = parseInt(this.$route.params.index[0]);
            usersJson[index].email = this.inputEmail,
            usersJson[index].name = this.inputName,
            usersJson[index].birthday = this.inputBirthday,
            usersJson[index].phone = this.inputPhone,
            localStorage.setItem('users', JSON.stringify(usersJson));
            this.$router.push('/');
        }
    }
})
</script>

<style scoped>
.button-green {
    background-color: #12e066;
    color: white;
    border: none;
}

.button-green:hover {
    background-color: #16cc5f;
    color: white;
    border: none;
}

.button-green:active {
    background-color: black;
    color: white;
}
</style>