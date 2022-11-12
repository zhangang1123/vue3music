import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/css/btn.css'
import './assets/css/global.css'
const app=createApp(App);
app.use(store).use(router).mount('#app');
app.directive('throttle', {
  mounted: (el, binding) => {
    let throttleTime = binding.value; // 节流时间
    if (!throttleTime) { // 用户若不设置节流时间，则默认2s
      throttleTime = 2000;
    }
    let timeout;
    el.addEventListener('click', (event) => {
      if(timeout)
      {
        event.stopImmediatePropagation();
      }
      if(!timeout)
      {
        timeout=setTimeout(()=>{
          timeout = null;
        },throttleTime)
      }
    }, true);
  },
});
app.directive('login',{
    mounted:(el)=>{
        el.addEventListener('click',(event)=>{
            if(!store.state.isLogin)
            {
                ElMessage({
                    message: '似乎没有登录',
                    type: 'warning',
                })
                event.stopImmediatePropagation();
            }
        },true);
    }
})
