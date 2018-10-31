import { loginByUsername, logout, getUserInfo } from '@/api/login'
import store from '@/store'
import { getToken, setToken, removeToken } from '@/utils/auth'

function signIn(userInfo) {
  const username = userInfo.username.trim()
  //store.commit('user/SET_TOKEN', 'check')
  return new Promise((resolve, reject) => {
    loginByUsername(username, userInfo.password)
      .then(response => {
        const data = response.data
        store.commit('user/SET_TOKEN', data.token)
        // let _store = store
        setToken(response.data.token)
        setUserInfo().then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      }).catch(error => {
        reject(error)
      })
  })
}

// 设置用户信息
function setUserInfo() {
  //store.commit('user/SET_ROLES','test')
  return new Promise((resolve, reject) => {
    // let _store = store
    getUserInfo(store.state.user.token).then(response => {
      if (!response.data) { // 由于mockjs 不支持自定义状态码只能这样hack
        reject('error')
      }
      const data = response.data
      if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
        store.commit('user/SET_ROLES', data.roles)
      } else {
        reject('getInfo: roles must be a non-null array !')
      }

      store.commit('user/SET_NAME', data.name)
      store.commit('user/SET_AVATAR', data.avatar)
      store.commit('user/SET_INTRODUCTION', data.introduction)
      resolve(response)
    }).catch(error => {
      reject(error)
    })
  })
}

// 第三方验证登录
// LoginByThirdparty({ commit, state }, code) {
//   return new Promise((resolve, reject) => {
//     commit('SET_CODE', code)
//     loginByThirdparty(state.status, state.email, state.code).then(response => {
//       commit('SET_TOKEN', response.data.token)
//       setToken(response.data.token)
//       resolve()
//     }).catch(error => {
//       reject(error)
//     })
//   })
// },

// 登出
function singOut() {
  return new Promise((resolve, reject) => {
    logout(store.user.token).then(() => {
      store.user.commit('SET_TOKEN', '')
      store.user.commit('SET_ROLES', [])
      removeToken()
      resolve()
    }).catch(error => {
      reject(error)
    })
  })
}

// 前端 登出
function fedLogOut({ commit }) {
  return new Promise(resolve => {
    store.user.commit('SET_TOKEN', '')
    removeToken()
    resolve()
  })
}

// 动态修改权限
function syncRoles() {
  return new Promise(resolve => {
    getUserInfo(store.token).then(response => {
      const data = response.data
      store.user.commit('SET_ROLES', data.roles)
      store.user.commit('SET_NAME', data.name)
      store.user.commit('SET_AVATAR', data.avatar)
      store.user.commit('SET_INTRODUCTION', data.introduction)
      store.user.dispatch('GenerateRoutes', data) // 动态修改权限后 重绘侧边菜单
      resolve()
    })
  })
}

export { signIn , singOut, syncRoles }