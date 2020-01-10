// 使用axios的拦截器拦截页面的所有请求错误，并弹出对应的提示。

import {Message} from "element-ui";

export default (nuxt) => {
    // 拦截axios的错误
    nuxt.$axios.onError(res => {
        // response是js原生Error对象的属性
        const {statusCode, message} = res.response.data;

        if(statusCode === 400){
            // Message相当于this.$message
            Message.error(message)
        }    
        if(statusCode === 401){
            Message.error("登录过期，跳转到登录页")
            nuxt.redirect(200,"/user/login")
        }

    })
}
