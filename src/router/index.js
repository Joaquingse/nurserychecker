import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MenuView from '../views/MenuView.vue'
import ChildrenView from '../views/ChildrenView.vue'
import InOutView from '../views/InOutView.vue'
import EventView from '../views/EventView.vue'
import ProfileView from '../views/ProfileView.vue'
import WorkersWiev from '../views/WorkersWiev.vue'
import NurseriesView from '../views/NurseriesView.vue'
import AddNewUserView from '../views/AddNewUserView.vue'
import AddChildView from '../views/AddChildView.vue'
import ChildEditView from '../views/ChildEditView.vue'
import SearchInOutView from '../views/SearchInOutView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/menu',
      name: 'menu',
      component: MenuView
    },
    {
      path: '/children',
      name: 'children',
      component: ChildrenView
    },
    {
      path: '/inout',
      name: 'inout',
      component: InOutView
    },
    {
      path: '/events',
      name: 'events',
      component: EventView
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView
    },
    {
      path: '/workers',
      name: 'workers',
      component: WorkersWiev
    },
    {
      path: '/adduser',
      name: 'adduser',
      component: AddNewUserView
    },
    {
      path: '/addchild',
      name: 'addchild',
      component: AddChildView
    },
    {
      path: '/editchild/:kid',
      name: 'editchild',
      component: ChildEditView,
      props: true,
    },
    {
      path: '/nurseries',
      name: 'nurseries',
      component: NurseriesView
    },
    {
      path: '/search',
      name: 'search',
      component: SearchInOutView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
