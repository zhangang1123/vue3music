import { createRouter, createWebHashHistory  } from 'vue-router'
import centre from '../views/centre.vue';
import homePage from '../views/homePage/homePage';
import discoverMusic from '../views/homePage/discoverMusic';
import recommandBySelf from '../views/homePage/recommandBySelf';
const routes = [
  {
    name:'center',
    path: '/',
    component:centre,
    redirect:'/homePage',
    children: [
      {
        name:'homePage',
        path: '/homePage',
        component:homePage,
        redirect: '/discoverMusic',
        children: [
          {
            name:'discoverMusic',
            path: '/discoverMusic',
            component:discoverMusic,
            redirect: '/recommandBySelf',
            children: [
              {
                name:'recommandBySelf',
                path: '/recommandBySelf',
                component:recommandBySelf
              },
              {
                name:'songList',
                path: '/songList',
                component:()=>import('../views/homePage/songList.vue'),
              }
            ]
          },
          {
            name:'songListDetail',
            path: '/songListDetail',
            component:()=>import('../views/songListDetail.vue'),
          },
          {
            name:'recentlyPlay',
            path: '/recentlyPlay',
            component:()=>import('../views/recentlyPlay.vue'),
          }
        ]
      }
    ]
  },
  {
    name:'login',
    path: '/login',
    component:()=>import('../views/login')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
