<template>
    <main class="columns">
        <div class="box column is-three-fifths is-offset-one-fifth">
            <h2 class="title my-5">Cadastro de Usuário</h2>

            <form class="mx-5" @submit.prevent="createUser">
                <h5 class="subtitle mb-0">Dados para Login</h5>

                <div class="field">
                    <FieldForm labelName="E-mail" tag="email" inputType="email" v-model="inputEmail" inputPlaceholder="email@email.com" inputIcon="fas fa-envelope" />
                    <div v-if="v$.inputEmail.$error">{{ v$.inputEmail.$errors[0].$message }}</div>
                </div>

                <div class="columns is-desktop">
                    <div class="field column mb-0">
                        <FieldForm labelName="Senha" tag="password" inputType="password" v-model="inputPassword" inputIcon="fa-solid fa-lock" />
                        <div v-if="v$.inputPassword.$error">{{ v$.inputPassword.$errors[0].$message }}</div>
                    </div>

                    <div class="field column">
                        <FieldForm labelName="Confirme a Senha" tag="confirm-password" inputType="password" v-model="inputConfirmPassword" inputIcon="fa-solid fa-lock" />
                        <div v-if="v$.inputConfirmPassword.$error">{{ v$.inputConfirmPassword.$errors[0].$message }}</div>
                    </div>
                </div>
                
                <div class="field">
                    <FieldForm labelName="Nome Completo" tag="nome" inputType="text" v-model="inputName" inputIcon="fa-solid fa-user" />
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
                    <FieldForm labelName="CEP" tag="cep" inputType="text" v-model="inputCep" inputIcon="fa-solid fa-user" @blur="searchAddress"/>
                    <div v-if="v$.inputCep.$error">{{ v$.inputCep.$errors[0].$message }}</div>
                </div>

                <div class="field">
                    <FieldForm labelName="Logradouro" tag="address" inputType="text" v-model="inputAddress" inputIcon="fa-solid fa-user" />
                    <div v-if="v$.inputAddress.$error">{{ v$.inputAddress.$errors[0].$message }}</div>
                </div>

                <div class="columns is-desktop">
                    <div class="field column mb-0">
                        <FieldForm labelName="Número" tag="number" inputType="text" v-model="inputNumber" inputIcon="fa-solid fa-cake-candles" />
                        <div v-if="v$.inputNumber.$error">{{ v$.inputNumber.$errors[0].$message }}</div>
                    </div>

                    <div class="field column">
                        <FieldForm labelName="Complemento" tag="complement" inputType="text" v-model="inputComplement" inputIcon="fa-solid fa-mobile-screen-button" />
                    </div>
                </div>

                <div class="columns is-desktop">
                    <div class="field column mb-0">
                        <FieldForm labelName="Bairro" tag="district" inputType="text" v-model="inputDistrict" inputIcon="fa-solid fa-cake-candles" />
                        <div v-if="v$.inputDistrict.$error">{{ v$.inputDistrict.$errors[0].$message }}</div>
                    </div>

                    <div class="field column">
                        <FieldForm labelName="Cidade" tag="city" inputType="text" v-model="inputCity" inputIcon="fa-solid fa-mobile-screen-button" />
                        <div v-if="v$.inputCity.$error">{{ v$.inputCity.$errors[0].$message }}</div>
                    </div>
                </div>

                <div class="columns is-desktop">
                    <div class="field column mb-0">
                        <FieldForm labelName="Estado" tag="state" inputType="text" v-model="inputState" inputIcon="fa-solid fa-cake-candles" />
                        <div v-if="v$.inputState.$error">{{ v$.inputState.$errors[0].$message }}</div>
                    </div>

                    <div class="field column">
                        <FieldForm labelName="Código IBGE" tag="ibge" inputType="text" v-model="inputIbge" inputIcon="fa-solid fa-mobile-screen-button" />
                        <div v-if="v$.inputIbge.$error">{{ v$.inputIbge.$errors[0].$message }}</div>
                    </div>
                </div>

                <div>
                    <button class="button button-green" type="submit" >Enviar Formulário</button>
                </div>

            </form>
        </div>
    </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import FieldForm from '@/components/FieldForm.vue';
import { searchAddress } from '@/services/CepServices';
import { useVuelidate } from '@vuelidate/core';
import { helpers, required, email, minLength, sameAs, maxLength } from '@vuelidate/validators';
import { vMaska } from "maska";

const users = localStorage.getItem("users");
const usersJson = users ? JSON.parse(users) : [];

export default defineComponent({
    name: 'UserCreateView',    
    components: {
        FieldForm,
    },
    directives: { maska: vMaska },
    setup () {
        return { v$: useVuelidate() }
    },
    data() {         
        return {                        
            inputEmail: '',
            inputPassword: '',
            inputConfirmPassword: '',
            inputName: '',
            inputBirthday: '',
            inputPhone: '',
            inputCep: '',
            inputAddress: '',
            inputNumber: '',
            inputComplement: '',
            inputDistrict: '',
            inputCity: '',
            inputState: '',
            inputIbge: ''           
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

        function isUnique (inputEmail: string) {            
            let unique = true;            
            usersJson.forEach((user: any) => {               
                if (user.email === inputEmail) {
                    unique = false;                     
                }
            });
            return unique;
        }
        
        return {
            inputEmail: { 
                required: helpers.withMessage('Digite um email válido.', required),
                email: helpers.withMessage('Digite um email válido.', email),
                isUnique: helpers.withMessage('Digite um email válido.', isUnique),
            }, 
            inputPassword: { 
                required: helpers.withMessage('Digite uma senha válida.', required),
                minLength: helpers.withMessage('A senha deve ter pelo menos 6 caracteres.', minLength(6))
            },
            inputConfirmPassword: { 
                required: helpers.withMessage('Confirme a senha.', required),
                sameAs: helpers.withMessage('As senhas devem ser iguais', sameAs(this.inputPassword))
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
            },
            inputCep: {
                required: helpers.withMessage('Digite um telefone válido.', required),
                minLength: helpers.withMessage('CEP inválido.', minLength(9)),
                maxLength: helpers.withMessage('CEP inválido.', maxLength(9))
            },
            inputAddress: {
                required: helpers.withMessage('O campo deve ser preenchido com um logradouro válido.', required)                
            },
            inputNumber: {
                required: helpers.withMessage('O campo deve ser preenchido com um número de endereço válido.', required)
            },
            inputDistrict: {
                required: helpers.withMessage('O campo deve ser preenchido com um bairro válido.', required)                
            },
            inputCity: {
                required: helpers.withMessage('O campo deve ser preenchido com uma cidade válida.', required)
            },
            inputState: {
                required: helpers.withMessage('O campo deve ser preenchido com um estado válido.', required)                
            },
            inputIbge: {
                required: helpers.withMessage('O campo deve ser preenchido com um código IBGE válido.', required)
            },
        }
    },     
    methods: {
        async createUser() {
            const isFormCorrect = await this.v$.$validate()
            if (!isFormCorrect) return
            usersJson.push({
                'email': this.inputEmail,        
                'password': this.inputPassword,
                'name': this.inputName,
                'birthday': this.inputBirthday,
                'phone': this.inputPhone,
                'cep': this.inputCep,
                'address': this.inputAddress,
                'number': this.inputNumber,
                'complement': this.inputComplement,
                'district': this.inputDistrict,
                'city': this.inputCity,
                'state': this.inputState,
                'ibge': this.inputIbge
            })
            localStorage.setItem('users', JSON.stringify(usersJson));
            this.$router.push('/');
        },     
        searchAddress() {
            if (this.inputCep === '') {
                return
            }

            searchAddress(this.inputCep).then(response => {
                const address = response;
                console.log(address);
                this.inputAddress = address.logradouro;
                this.inputDistrict = address.bairro,
                this.inputCity = address.localidade,
                this.inputState = address.bairro,
                this.inputIbge = address.ibge                             
            })            
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
