import { defineStore } from 'pinia'

interface LoadingState {
  isLoading: boolean
}

export const useLoadingStore = defineStore('loading', {
  state: (): LoadingState => ({
    isLoading: false
  }),
  actions: {
    showLoading() {
      this.isLoading = true
    },
    hideLoading() {
      this.isLoading = false
    }
  }
})