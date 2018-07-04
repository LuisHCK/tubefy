import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import Playlist from '@/pages/Playlist'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path:'/playlist/:id',
      name: 'Playlist',
      component: Playlist
    }
  ]
})
