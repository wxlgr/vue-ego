// 商品相关 路由控制器


// 解析url
const url = require("url")

module.exports = function useLogin(router, sqlFn) {
  /**
 * 获取商品列表
 */
  router.get("/backend/item/selectTBItemAllByPage", (req, res) => {
    // 接口参数 page,pageSize,
    let { page, pageSize } = url.parse(req.url, true).query
    //   默认值1，5
    page = page || 1
    pageSize = pageSize || 5
    // const sql = "select * from project order by id desc limit 10 offset " + (page - 1) * 10
    const sql = `select * from project order by id desc limit ${(page - 1) * pageSize},${pageSize}`
    sqlFn(sql, null, result => {
      if (result.length > 0) {
        res.send({
          status: 200,
          result
        })
      }
      else {
        res.send({
          status: 400,
          result,
          msg: "读取数据失败"
        })
      }
    })
  })

  /**
  * 返回分页数据总条数
  */
  router.get("/total", (req, res) => {
    const sql = "select count(*) as totalNum from project where id";
    sqlFn(sql, null, result => {
      if (result.length > 0) {
        res.send({
          status: 200,
          result
        })
      } else {
        res.send({
          status: 400,
          msg: "数据不存在"
        })
      }
    })
  })

  /**
  *商品模糊搜索
  */
  router.get("/product/search", (req, res) => {
    const search = url.parse(req.url, true).query.search

    const sql = "select * from project where concat(`title`,`sellPoint`,`descs`) like '%" + search + "%'"
    sqlFn(sql, null, result => {
      if (result.length > 0) {
        res.send({
          status: 200,
          result
        })
      } else {
        res.send({
          status: 400,
          msg: "暂无数据"
        })
      }
    })
  })

  /**
  *商品类目
  */
  router.get("/backend/itemCategory/selectById", (req, res) => {
    const id = url.parse(req.url, true).query.id || 1

    const sql = "select * from category where id = ?"
    sqlFn(sql, [id], result => {
      if (result.length > 0) {
        res.send({
          status: 200,
          result
        })
      } else {
        res.send({
          status: 400,
          msg: "暂无数据"
        })
      }
    })
  })


  /**
 * 商品添加
 */
  router.get("/backend/item/insertTbItem", (req, res) => {
    var title = url.parse(req.url, true).query.title || "";
    var cid = url.parse(req.url, true).query.cid || "";
    var sellPoint = url.parse(req.url, true).query.sellPoint || "";
    var price = url.parse(req.url, true).query.price || "";
    var num = url.parse(req.url, true).query.num || "";
    var desc = url.parse(req.url, true).query.desc || "";
    var image = url.parse(req.url, true).query.image || "";
    const sql = "insert into project values (null,?,?,?,?,?,?,'',1,'','',?)";
    var arr = [title, image, sellPoint, price, cid, num, desc];
    sqlFn(sql, arr, result => {
      if (result.affectedRows > 0) {
        res.send({
          status: 200,
          msg: "添加成功"
        })
      } else {
        res.send({
          status: 500,
          msg: "添加失败"
        })
      }
    })
  })

  /**
  * 商品删除
  */

  router.get("/backend/item/deletItemById", (req, res) => {
    let id = url.parse(req.url, true).query.id
    const sql = "delete from project where id=?"
    sqlFn(sql, [id], result => {
      if (result.affectedRows > 0) {
        res.send({ status: 200, msg: "删除成功" })
      } else {
        res.send({ status: 500, msg: "删除失败" })
      }
    })
  })

  /**
  * 预更新：先查出来
  */

  router.get("/backend/item/preUpdateItemById", (req, res) => {
    let id = url.parse(req.url, true).query.id
    const sql = "select * from project where id=?"
    sqlFn(sql, [id], result => {
      if (result.length > 0) {
        res.send({ status: 200, result: result[0] })
      } else {
        res.send({ status: 500, msg: "预更新失败" })
      }
    })
  })

  /**
  * 修改商品
  */
  router.get("/backend/item/updateTbItem", (req, res) => {
    var id = url.parse(req.url, true).query.id;
    var title = url.parse(req.url, true).query.title || "";
    var sellPoint = url.parse(req.url, true).query.sellPoint || "";
    var price = url.parse(req.url, true).query.price || "";
    var num = url.parse(req.url, true).query.num || "";
    var desc = url.parse(req.url, true).query.desc || "";
    var image = url.parse(req.url, true).query.image || "";
    var cid = url.parse(req.url, true).query.cid;
    var sql = "update project set title=?,sellPoint=?,cid=?,price=?,num=?,descs=?,image=? where id=?";
    var arr = [title, sellPoint, cid, price, num, desc, image, id];
    sqlFn(sql, arr, result => {
      if (result.affectedRows > 0) {
        res.send({
          status: 200,
          msg: "修改成功"
        })
      } else {
        res.send({
          status: 500,
          msg: "修改失败"
        })
      }
    })
  })
}

