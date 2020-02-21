import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
      addImageSrc(state, payload) {
          if (state.previewSrcList === undefined) {
              Vue.set(state, 'previewSrcList', [payload]);
          } else {
              state.previewSrcList.push(payload);
          }
      }
  },
  actions: {
  },
  modules: {
  }
})
