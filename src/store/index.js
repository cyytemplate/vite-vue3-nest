/*
 * @Author: cyy
 * @Date: 2021-09-29 18:37:30
 * @LastEditors: cyy
 * @LastEditTime: 2021-09-29 18:39:22
 * @Description: 
 */
import { createStore } from 'vuex'

const store = createStore({
  state () {
    return {
      query: {}
    }
  },
  mutations: {
    SET_QUERY (state, query) {
      state.query = query
    }
  },
  actions: {
    setQuery ({ commit }, query) {
      commit('SET_QUERY', query)
    }
  }
})
export default store
