// 内容分类 路由控制器


// 解析url
const url = require("url")

module.exports = function useContent(router, sqlFn) {
  /**
 * 内容分类
 */
  router.get("/content/title", (req, res) => {
    const sql = "select * from content"
    sqlFn(sql, null, result => {
      if (result.length > 0) {
        res.send({
          status: 200,
          result
        })
      } else {
        res.send({
          status: 400,
          result,
          msg: "暂无数据"
        })
      }
    })
  })

  /**
  * 内容分类删除
  */

  router.get("/content/delete", (req, res) => {
    let pid = url.parse(req.url, true).query.pid
    const sql = "delete from content where pid = ?"
    sqlFn(sql, [pid], result => {
      if (result.affectedRows > 0) {
        res.send({ status: 200, msg: "删除成功" })
      } else {
        res.send({ status: 500, msg: "删除失败" })
      }
    })
  })

  /**
  * 内容分类新增
  */
  router.get("/content/add", (req, res) => {
    let name = url.parse(req.url, true).query.name
    let pid = Math.floor(Math.random() * 1000).toString()
    let id = Math.floor(Math.random() * 1000).toString()
    const sql = "insert into content values (?,?,?);"
    sqlFn(sql, [id, name, pid], result => {
      if (result.affectedRows > 0) {
        res.send({ status: 200, msg: "添加成功" })
      } else {
        res.send({ status: 500, msg: "添加失败" })
      }
    })
  })

  /**
  * 内容分类列表
  */
  router.get("/content/list", (req, res) => {
    let pid = url.parse(req.url, true).query.pid

    const sql = "select * from  contentinfo where pid= ?;"
    sqlFn(sql, [pid], result => {
      if (result.length > 0) {
        res.send({ status: 200, result })
      } else {
        res.send({ status: 500, msg: "暂无数据" })
      }
    })
  })
}

