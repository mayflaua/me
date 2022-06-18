import { createRouter, createWebHistory } from 'vue-router'
import AppTools from '@/components/AppTools'
import AppGames from '@/components/AppGames'
import AppContact from '@/components/AppContact'
import AppSites from '@/components/AppSites'
import App404 from '@/components/App404'


const routes = [
  {
    name: 'tools',
    path: '/tools',
    component: AppTools
  },
  {
    name: 'games',
    path: '/games',
    component: AppGames
  },
  {
    name: 'sites',
    path: '/sites',
    component: AppSites
  },
  {
    name: 'contact',
    path: '/contact',
    component: AppContact
  },
  {
    path: '/:any(.*)',
    component: App404
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
