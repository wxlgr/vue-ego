// 规格参数 路由控制器


// 解析url
const url = require("url")

module.exports = function useParam(router, sqlFn) {
  /**
  * 规格参数
  */
  router.get("/backend/itemParam/selectItemParamAll", (req, res) => {
    const page = url.parse(req.url, true).query.page || 1
    const sql = `select * from params order by id desc limit ${page - 1},10;`
    sqlFn(sql, null, result => {
      if (result.length > 0) {
        res.send({ status: 200, result })
      } else {
        res.send({ status: 400, result, msg: "无数据" })
      }
    })
  })


  /**
  *规格参数模糊搜索
  */
  router.get("/params/search", (req, res) => {
    const search = url.parse(req.url, true).query.search

    const sql = "select * from params where concat(`id`,`itemCatId`,`paramData`) like '%" + search + "%'"
    sqlFn(sql, null, result => {
      if (result.length > 0) {
        res.send({
          status: 200,
          result
        })
      } else {
        res.send({
          status: 400,
          msg: "无数据"
        })
      }
    })
  })


  /**
  * 规格参数添加
  */

  router.get("/backend/itemParam/insertItemParam", (req, res) => {
    let itemCatId = url.parse(req.url, true).query.itemCatId
    let paramData = url.parse(req.url, true).query.paramData

    const sql = "insert into params values(null,?,?)"
    sqlFn(sql, [itemCatId, paramData], result => {
      if (result.affectedRows > 0) {
        res.send({
          status: 200,
          msg: "添加成功"
        })
      } else {
        res.send({
          status: 400,
          msg: "添加失败"
        })
      }
    })
  })

  /**
  * 规格参数删除
  */

  router.get("/params/delete", (req, res) => {
    let id = url.parse(req.url, true).query.id
    const sql = "delete from params where id = ?"
    sqlFn(sql, [id], result => {
      if (result.affectedRows > 0) {
        res.send({ status: 200, msg: "删除成功" })
      } else {
        res.send({ status: 500, msg: "删除失败" })
      }
    })
  })
}

