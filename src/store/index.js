import { createStore } from 'vuex'
import {getSongUrl} from '../api/playlist'
export default createStore({
  state: {
    isLogin: JSON.parse(localStorage.getItem('isLogin'))||false,
    userInfo:JSON.parse(localStorage.getItem('userInfo'))||{},
    isPlay:false,
    playlist:[],
    songPlaying:null,
    historylist:JSON.parse(sessionStorage.getItem('historylist'))||[],
    currentTime:0,
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
      for(let item of state.historylist)
      {
        if(item.id==songInfo.id)
        {
          return;
        }
      }
      state.historylist.push(songInfo);
      sessionStorage.setItem('historylist',JSON.stringify(state.historylist));
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
