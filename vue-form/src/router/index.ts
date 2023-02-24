import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import UsersListView from '../views/UsersListView.vue'
import UserCreateView from '../views/UserCreateView.vue'
import UserUpdateView from '../views/UserUpdateView.vue'
import UserPasswordUpdateView from '../views/UserPasswordUpdateView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'list',   
    component: UsersListView
  },
  {
    path: '/user-create',
    name: 'user-create',
    component: UserCreateView
  },
  {
    path: '/user-password-update/:index',
    name: 'user-password-update',
    component: UserPasswordUpdateView
  },
  {
    path: '/user-update/:index',
    name: 'user-update',
    component: UserUpdateView
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
