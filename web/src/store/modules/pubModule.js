export default {
    namespaced: true,
    state: {
        // 搜索关键字
        search:""
    }, 
    mutations:{
        setSearch(state,search){
            state.search=search
        }
    }
}