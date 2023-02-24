<template>
    <tr class="tr">
        <th class="th">
            <a class="button is-warning mr-1"  @click="$router.push(`/user-password-update/${index}`)">
                <span class="is-small">
                    <i class="fa-solid fa-lock"></i>
                </span>
            </a>
            <a class="button is-info mr-1" @click="$router.push(`/user-update/${index}`)">
                <span class="is-small">
                    <i class="fa-solid fa-pencil"></i>
                </span>
            </a>
            <a class="button is-danger" @click="deleteUser(users, index)">
                <span class="is-small">
                    <i class="fa-solid fa-x"></i>
                </span>
            </a>
        </th>
        <th class="th">{{ name }}</th>
        <th class="th">{{ email }}</th>
        <th class="th">{{ phone }}</th>
    </tr>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'UsersTable',
    props: {
        users: Array,  
        index: Number,      
        name: String,
        email: String,
        phone: String
    },
    methods: {
        deleteUser(users: any, index: any): void {
            users.splice(index, 1);
            localStorage.setItem('users', JSON.stringify(users));
        }
    }
})
</script>