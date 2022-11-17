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
              },
              {
                name:'charts',
                path: '/charts',
                component:()=>import('../views/homePage/charts')
              },
              {
                name:'singer',
                path: '/singer',
                component:()=>import('../views/homePage/singer')
              },
              {
                name:'latestMusic',
                path: '/latestMusic',
                component:()=>import('../views/homePage/latestMusic')
              }
            ]
          },
          {
            name:'songListDetail',
            path: '/songListDetail',
            component:()=>import('../views/songListDetail.vue'),
          },
          {
            name:'singerDetail',
            path: '/singerDetail',
            component:()=>import('../views/singerDetail.vue'),
          },
          {
            name:'albumDetail',
            path: '/albumDetail',
            component:()=>import('../views/albumDetail.vue'),
          },
          {
            name:'recentlyPlay',
            path: '/recentlyPlay',
            component:()=>import('../views/recentlyPlay.vue'),
          },
          {
            name:'myCollect',
            path: '/myCollect',
            component:()=>import('../views/myCollect.vue'),
          },
          {
            name:'dailyRecommend',
            path: '/dailyRecommend',
            component:()=>import('../views/dailyRecommend.vue'),
          },
          {
            name:'searchList',
            path: '/searchList',
            component:()=>import('../views/searchList.vue'),
          },
          {
            name:'personalFM',
            path: '/personalFM',
            component:()=>import('../views/personalFM.vue'),
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
router.beforeEach((to, from, next) => {
  let isLogin=JSON.parse(localStorage.getItem('isLogin'));
  if(to.name=='myCollect'||to.name=='dailyRecommend'||to.name=='personalFM')
  {
        if(isLogin)
        {
          next();
        }
  }else{
          next();
    }
})
export default router
