
import axios from '../utils/request'
import base from './base'
const api = {
  /**
   * 登录接口
   */
  login(params) {
    return axios.post(base.baseUrl + base.login, params)
  },

  /**
   * 注册接口
   */
  register(params) {
    return axios.post(base.baseUrl + base.register, params)
  },

  /**
   * 产品列表接口
   */

  getProductList(params) {
    return axios.get(base.baseUrl + base.productList, { params })
  },

  //  获取产品总数目
  getTotalProductNum(params) {
    return axios.get(base.baseUrl + base.totalPage, { params })
  },

  // 商品模糊搜索
  productsearch(params) {
    return axios.get(base.baseUrl + base.productsearch, { params })
  },
  // 类目查询
  getCategory(params) {
    return axios.get(base.baseUrl + base.category, { params })
  },
  // 图片文件上传
  upload(params) {
    return axios.post(base.baseUrl + base.upload, params)
  },
  // 商品添加
  insert(params) {
    return axios.get(base.baseUrl + base.insertItem, { params })
  },
  //删除添加
  delete(params) {
    return axios.get(base.baseUrl + base.deleteItem, { params })
  },
  //预更新
  preUpdateItem(params) {
    return axios.get(base.baseUrl + base.preUpdateItem, { params })
  },
  //修改
  updateTbItem(params) {
    return axios.get(base.baseUrl + base.updateTbItem, { params })
  },
  //规格参数获取
  selectItemParamAll(params) {
    return axios.get(base.baseUrl + base.selectItemParamAll, { params })
  },
  // 规格参数模糊搜索
  paramssearch(params) {
    return axios.get(base.baseUrl + base.paramssearch, { params })
  },
  // 规格参数添加
  insertItemParam(params){
    return axios.get(base.baseUrl + base.insertItemParam, { params })
  },
  // 规格参数删除
  deleteParams(params){
    return axios.get(base.baseUrl + base.paramsDelete, { params })
  },
  // 内容分类标题
  getContentTitle(params){
    return axios.get(base.baseUrl+base.contentTitle,{params})
  },
  // 内容分类删除
  deleteContent(params){
    return axios.get(base.baseUrl+base.contentDelete,{params})
  },
  // 内容分类添加
  addContent(params){
    return axios.get(base.baseUrl+base.contentAdd,{params})
  },
  // 内容分类列表
  getContentList(params){
    return axios.get(base.baseUrl+base.contentList,{params})
  }
}

export default api