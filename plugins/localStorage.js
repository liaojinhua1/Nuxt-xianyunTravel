import createPersistedState from 'vuex-persistedstate'

export default ({store}) => {
  window.onNuxtReady(() => {
    createPersistedState({
        // 存在本地的键名---有默认值
        key: "store", // 读取本地存储的数据到store     
    })(store)
  })
}