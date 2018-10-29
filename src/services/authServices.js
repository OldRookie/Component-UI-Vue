import { loginByUsername, logout, getUserInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'

class AuthService {
  loginByUsername(userInfo) {
    const username = userInfo.username.trim()
    return new Promise((resolve, reject) => {
      loginByUsername(username, userInfo.password).then(response => {
        const data = response.data
        setToken(response.data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  }

  // 获取用户信息
  GetUserInfo() {
    return new Promise((resolve, reject) => {
      getUserInfo(state.token).then(response => {
        if (!response.data) { // 由于mockjs 不支持自定义状态码只能这样hack
          reject('error')
        }
        const data = response.data

        if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
        } else {
          reject('getInfo: roles must be a non-null array !')
        }
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
  logOut({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  }

  // 前端 登出
  fedLogOut({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      removeToken()
      resolve()
    })
  }

  // 动态修改权限
  changeRoles(role) {
    return new Promise(resolve => {
      setToken(role)
      getUserInfo(role).then(response => {
        resolve()
      })
    })
  }
}
