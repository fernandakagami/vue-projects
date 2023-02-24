<template>
  <main class="box mx-5">
    <h2 class="title">Lista de Usuários</h2>
    <table class="table is-hoverable is-fullwidth">
      <thead class="thead">
        <tr class="tr">
          <th class="th is-1">Ações</th>
          <th class="th is-4">Nome</th>
          <th class="th is-4">E-mail</th>
          <th class="th is-3">Telefone</th>
        </tr>
      </thead>
      <tbody class="tbody" >        
        <UserRow v-for="(user, index) in usersJson" :key="index" :name="user.name" :email="user.email" :phone="user.phone" :users="usersJson" :index="index" />
      </tbody>
    </table>


  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import UserRow from '@/components/UserRow.vue'; // @ is an alias to /src

export default defineComponent({
  name: 'UsersListView',
  components: {
    UserRow
  },
  data() {
    const usersSaved = localStorage.getItem("users");       
    return {
      usersJson: usersSaved ? JSON.parse(usersSaved) : []
    }
  }    
});
</script>
