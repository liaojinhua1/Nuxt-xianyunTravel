// 暴露仓库
// 飞机模块
export const state = () => ({
    // 采用接口返回的数据结构  
     // history 搜索历史记录,需要存的数据是数组,因为需要进行前添加，数组中才可以存放一个个对象     
     history:[],
    //  总价格
     allPrice : 0
})
// 同步修改state的数据
export const mutations = {
    // 自定义一个函数，修改name属性
    // mutations函数的第一个参数必须是state，state就是上面的state对象
    setHistory(state,data){
        state.history.unshift(data)
    },
    // 存储总价格
    setAllPrice(state,price){
        state.allPrice = price
    }
    
}