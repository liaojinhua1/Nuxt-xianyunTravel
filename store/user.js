// 暴露仓库
// 用户管理
export const state = {
        // 采用接口返回的数据结构        
            name:"123" 
}

// 同步修改state
export const mutations = {
    setName(state,data){
        state.name = data
    }
}
export const actions = {
// 登录
// 发送验证码

// 注册
registe(){
    this.$axios({
        url: "/captchas",
        methods: "POST",
        tel: this.registeForm.username
      }).then(res => {
        // 发送验证码成功后
       return res
        
      })
    }
}     