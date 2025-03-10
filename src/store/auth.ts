import { defineStore } from 'pinia'

interface UserState {
  token: string | null
  userInfo: {
    username: string
  } | null
}

export const useAuthStore = defineStore('auth', {
  state: (): UserState => ({
    token: null,
    userInfo: null
  }),
  actions: {
    login(username: string, password: string): Promise<boolean> {
      return new Promise((resolve) => {
        // 模拟登录验证
        if (username === 'admin' && password === '123') {
          this.token = 'mock_token_' + Date.now()
          this.userInfo = {
            username
          }
          localStorage.setItem('token', this.token)
          resolve(true)
        } else {
          resolve(false)
        }
      })
    },
    logout() {
      this.token = null
      this.userInfo = null
      localStorage.removeItem('token')
    }
  },
  persist: true
})