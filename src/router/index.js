import { createRouter, createWebHistory } from 'vue-router'
import AppTools from '@/components/AppTools'
import AppGames from '@/components/AppGames'
import AppContact from '@/components/AppContact'
import AppSites from '@/components/AppSites'
import App404 from '@/components/App404'
import AppMain from '@/components/AppMain'

import AppCalculator from '@/apps/AppCalculator'
import AppPassGen from '@/apps/AppPassGen'
import AppGrocery from '@/apps/AppGrocery'

import AppSnake from '@/apps/AppSnake'
import AppKitten from '@/apps/AppKitten'

import AppPortfolio from '@/apps/AppPortfolio'

import AppFormSent from '@/components/AppFormSent'


const routes = [
  {
    name: 'main',
    path: '/',
    component: AppMain,
    meta: {title: 'Главная'}
  },
  //////////////// TOOLS
  {
    name: 'tools',
    path: '/tools',
    component: AppTools,
    meta: {title: 'Инструменты'}
  },
  {
    name: "calculator",
    path: "/tools/calculator",
    component: AppCalculator,
    meta: {title: "Калькулятор"}
  },
  {
    name: "password-generator",
    path: "/tools/password-generator",
    component: AppPassGen,
    meta: {title: "Генератор паролей"}
  },
  {
    name: "grocery",
    path: "/tools/grocery",
    component: AppGrocery,
    meta: {title: "Список покупок"}
  },
    //////////////// GAMES
 
  {
    name: 'games',
    path: '/games',
    component: AppGames,
    meta: {title: 'Игры'}
  },
  {
    name: 'snake',
    path: '/games/snake',
    component: AppSnake,
    meta: {title: 'Змейка'}
  },
  {
    name: 'kitten',
    path: '/games/kitten',
    component: AppKitten,
    meta: {title: 'Котенок и огурцы'}
  },
    //////////////// SITES

  {
    name: 'sites',
    path: '/sites',
    component: AppSites,
    meta: {title: 'Сайты'}
  },
  {
    name: 'portfolio',
    path: '/sites/portfolio',
    component: AppPortfolio,
    meta: {title: 'Портфолио'}
  },
  {
    name: 'contact',
    path: '/contact',
    component: AppContact,
    meta: {title: 'Связаться'}
  },
  {
    name: 'sent',
    path: '/contact/sent',
    component: AppFormSent,
    meta: {title: 'Форма отправлена'}
  },
  {
    path: '/:any(.*)',
    component: App404,
    meta: {title: 'Страница не найдена'}
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})

export default router
