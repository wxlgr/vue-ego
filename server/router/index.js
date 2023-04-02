const express = require('express')
const router = express.Router()

// 数据库连接，提供sql执行功能
const sqlFn = require('../mysqlConnect')

// 引入各模块路由配置
const useLoginRouter = require('./login_register/useLogin')
const useProductRouter = require('./product/useProduct')
const useUploadRouter = require('./upload/useUpload')
const useParamRouter = require('./param/useParam')
const useContentRouter = require('./content/useContent')

// 记录
let routerModules = [
  useLoginRouter, useProductRouter,
  useUploadRouter, useParamRouter,
  useContentRouter
]
// 根据模块，分别对router这一总对象 配置
routerModules.forEach(useRouter => {
  useRouter(router, sqlFn)
})

// 导出
module.exports = router

