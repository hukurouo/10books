import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    is_twitter_link: false
  },
  mutations: {
    switch (state){
      state.is_twitter_link = !state.is_twitter_link
    }
  }
})
export default store