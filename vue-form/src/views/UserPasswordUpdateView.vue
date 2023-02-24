<template>
    <main class="columns">
        <div class="box column is-three-fifths is-offset-one-fifth">
            <h2 class="title my-5">Atualizar Senha</h2>

            <form class="mx-5" @submit.prevent="updatePasswordUser">                

                <div class="columns is-desktop">
                    <div class="field column mb-0">
                        <FieldForm labelName="Senha" tag="password" inputType="password" v-model="inputPassword" inputIcon="fa-solid fa-cake-candles" />
                        <div v-if="v$.inputPassword.$error">{{ v$.inputPassword.$errors[0].$message }}</div>
                    </div>

                    <div class="field column">
                        <FieldForm labelName="Confirmar Senha" tag="confirm-password" inputType="password" v-model="inputConfirmPassword" inputIcon="fa-solid fa-mobile-screen-button" />
                        <div v-if="v$.inputConfirmPassword.$error">{{ v$.inputConfirmPassword.$errors[0].$message }}</div>
                    </div>
                </div>

                <div>
                    <button class="button button-green" type="submit" >Atualizar Senha</button>
                </div>

            </form>
        </div>
    </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import FieldForm from '@/components/FieldForm.vue';
import { useVuelidate } from '@vuelidate/core';
import { helpers, required, minLength, sameAs } from '@vuelidate/validators';

const users = localStorage.getItem("users");
const usersJson = users ? JSON.parse(users) : [];

export default defineComponent({
    name: 'UserPasswordUpdateView',    
    components: {
        FieldForm,
    },
    setup () {
        return { v$: useVuelidate() }
    },
    data() {        
        return {            
            inputPassword: '',
            inputConfirmPassword: ''
        }
    },
    validations () {
        return {            
            inputPassword: { 
                required: helpers.withMessage('Digite uma senha válida.', required),
                minLength: helpers.withMessage('A senha deve ter pelo menos 6 caracteres.', minLength(6))
            },
            inputConfirmPassword: { 
                required: helpers.withMessage('Confirme a senha.', required),
                sameAs: helpers.withMessage('As senhas devem ser iguais', sameAs(this.inputPassword))
            },            
        }
    },  
    methods: {
        async updatePasswordUser() {
            const isFormCorrect = await this.v$.$validate()
            if (!isFormCorrect) return
            const id = parseInt(this.$route.params.index[0]);
            usersJson[id].password = this.inputPassword,            
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