import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import './style.css'

const routes = [
  { path: '/', name: 'dashboard', component: () => import('./views/DashboardView.vue') },
  { path: '/formula', name: 'formula', component: () => import('./views/FormulaView.vue') },
  { path: '/accounts', name: 'accounts', component: () => import('./views/AccountsView.vue') },
  { path: '/calc', name: 'calc', component: () => import('./views/CalcView.vue') },
  { path: '/tiers', name: 'tiers', component: () => import('./views/TiersView.vue') },
  { path: '/rules', name: 'rules', component: () => import('./views/RulesView.vue') },
  { path: '/notes', name: 'notes', component: () => import('./views/BookNotesView.vue') },
  { path: '/track', name: 'track', component: () => import('./views/TrackView.vue') },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0, behavior: 'smooth' }
  }
})

const app = createApp(App)
app.use(router)
app.mount('#app')
