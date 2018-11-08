import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import errorLog from './modules/error-log'
import permission from './modules/permission'
import tagsView from './modules/tags-view'
import user from './modules/user'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    errorLog,
    permission,
    tagsView,
    user
  },
  getters
})

export default store
