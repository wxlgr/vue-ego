const base = {
    // 开发
    uploadAction: "http://localhost:3005/api/upload",
    // baseUrl:'/dev',//前端解决跨域时
    baseUrl: 'http://localhost:3005',//cors解决跨域时

    /* 生产
    */
    // baseUrl: 'https://ego.wuxingling.top',//cors解决跨域时
    // uploadAction: "https://ego.wuxingling.top/api/upload",

    login: '/api/login',
    register: '/api/register',
    
    productList: "/api/backend/item/selectTBItemAllByPage",
    totalPage: "/api/total",
    productsearch: "/api/product/search",
    category: "/api/backend/itemCategory/selectById",
    upload: '/api/upload',
    insertItem: "/api/backend/item/insertTbItem",
    deleteItem: "/api/backend/item/deletItemById",
    preUpdateItem: "/api/backend/item/preUpdateItemById",
    updateTbItem: "/api/backend/item/updateTbItem",
    selectItemParamAll: "/api/backend/itemParam/selectItemParamAll",
    paramssearch: "/api/params/search",
    // 规格参数添加
    insertItemParam: "/api/backend/itemParam/insertItemParam",
    paramsDelete: "/api/params/delete",
    contentTitle: "/api/content/title",
    contentDelete: "/api/content/delete",
    contentAdd: "/api/content/add",
    contentList: "/api/content/list",



};

export default base