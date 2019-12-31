// 引入element-ui
import { MessageBox } from 'element-ui';
// 暴露仓库
// 用户管理
export const state = {
        // 采用接口返回的数据结构  
         // 登录后的数据，包含token和user对象     
        usreInfo:{}
}
// 同步修改state的数据
export const mutations = {
    // 自定义一个函数，修改name属性
    // mutations函数的第一个参数必须是state，state就是上面的state对象
    setUserinfo(state,data){
        state.usreInfo = data
    }
}
// 异步修改state的数据，存放公共的请求函数，并且该函数可能会修改state的数据（不一定要修改）
export const actions = {
    // 登录
    login(store,data){
        return this.$axios({
            url:'/accounts/login',
            method:'POST',
            data
        }).then(res=>{
            // console.log(res.data);
            // 登录成功后,调用mutations中的方法,修改uerInfo的值
            store.commit('setUserinfo', res.data)
            // 返回上一个页面
            this.$router.back()
            // 如果成功返回true以便做出相应判断
            return true
        })
    },

 
    // 发送验证码
    sendCaptcha(store,data){
        this.$axios({
            url: "/captchas",
            methods: "POST",
            data:{
                tel:data
            }
        }).then(res =>{
            
            // console.log(res.data);
            // 发送验证码成功后，把res.data.code 结构出来
            // const {code} = res.data
            // 把验证码模拟出来，用弹框显示出来
            // MessageBox.confirm(`模拟手机验证码为:${code}`, "提示", {
            // confirmButtonText: "确定",
            // showCancelButton: false,
            // type: "warning"
            // });
        })
    },

    // 注册
    registe(store,data){
        this.$axios({
            url: "/accounts/register",
            method: "POST",
            data
          }).then(res => {
            // console.log(res.data);
            // 注册成功后,调用mutations中的方法,修改uerInfo的值
            store.commit('setUserinfo', res.data)
            // store.commit('setUserinfo', res.data)
            // 登录成功后返回上一页
            this.$router.back()
            // 如果成功返回true以便做出相应判断
            return true
          });
    }
         
}     