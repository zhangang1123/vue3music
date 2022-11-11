import { createStore } from 'vuex'
import {getSongUrl} from '../api/playlist'
export default createStore({
  state: {
    isLogin: JSON.parse(localStorage.getItem('isLogin'))||false,
    userInfo:JSON.parse(localStorage.getItem('userInfo'))||{},
    isPlay:false,
    playlist:[],
    songPlaying:null,
  },
  mutations: {
    changeState(state,Info){
      state.userInfo=Info;
      localStorage.setItem('userInfo',JSON.stringify(Info));
      state.isLogin=true;
      localStorage.setItem('isLogin',JSON.stringify(state.isLogin))
    },
    playSong(state,songInfo){
      state.isPlay=true;
      state.songPlaying= songInfo;
    },
    changePlaylist(state,songlist){
      state.playlist=songlist;
    }
  },
  actions: {
    async changeSong({commit,state},{id,songInfo})
    {
        const res= await getSongUrl(id);
        songInfo.url=res.data.data[0].url;
        commit('playSong',songInfo);
    }
  },
  modules: {
  }
})
