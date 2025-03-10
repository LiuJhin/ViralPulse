import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'

const store = createPinia()

// 配置持久化插件
store.use(createPersistedState({
  storage: localStorage,
  key: id => `viralpulse_${id}` // 自定义存储的key
}))

export default store

// 定义通用的Store类型
export type Store<Id extends string, S, G, A> = {
  id: Id
  state: () => S
  getters?: G
  actions?: A
}