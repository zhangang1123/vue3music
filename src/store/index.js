import { createStore } from 'vuex'

export default createStore({
  state: {
    isLogin: JSON.parse(localStorage.getItem('isLogin'))||false,
    userInfo:JSON.parse(localStorage.getItem('userInfo'))||{},
  },
  mutations: {
    changeState(state,Info){
      state.userInfo=Info;
      localStorage.setItem('userInfo',JSON.stringify(Info));
      state.isLogin=true;
      localStorage.setItem('isLogin',JSON.stringify(state.isLogin))
    }
  },
  actions: {
  },
  modules: {
  }
})
