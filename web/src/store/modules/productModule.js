export default {
    namespaced: true,
    state: {
        page:1,
        pageSize:5
    }, 
    mutations:{
        setPage(state,page){
            state.page=page
        },
        setPageSize(state,pageSize){
            state.pageSize=pageSize
        }
    }
}