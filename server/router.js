const express = require('express')
const router = express.Router()

const sqlFn = require('./mysqlConnect')
const jwt = require('jsonwebtoken')
const jwtSecret = require('./jwtSecret')

const url = require("url")
const fs = require("fs")
const path = require('path')

const multer = require("multer")

// 加密用
const bcrypt = require('bcryptjs')

// 登录
router.post('/login', (req, res) => {
    const { username, password } = req.body

    // 登录sql
    const sql = `select * from user where username=?`;

    sqlFn(sql, [username], result => {

        if (result.length > 0) {
            let pwdRight = bcrypt.compareSync(password, result[0].password)
            if (pwdRight) {
                // 密码正确
                // 返回token
                // 参数：内容，密钥
                const token = jwt.sign({
                    id: result[0].id,
                    username: result[0].username
                }, jwtSecret.secret)

                res.send({
                    status: 200,
                    msg: '登录成功',
                    token
                })
            }
        } else {
            // 用户不存在
            res.send({
                status: 400,
                msg: "用户名或密码错误"
            })
        }
    })
})


// 注册
router.post('/register', (req, res) => {
    const { username, password, email } = req.body
    sqlFn("select * from user where username = ?", [username], hasUser => {
        if (hasUser.length > 0) {
            res.send({
                status: 400,
                msg: "用户名已存在"
            })
        }
        else {
            // 注册
            // 加密后
            const pwd = bcrypt.hashSync(password)

            const sql = `insert into user values (null,?,?,?)`
            sqlFn(sql, [username, pwd, email], result => {
                if (result.affectedRows > 0) {
                    res.send({
                        status: 200,
                        msg: '注册成功'
                    })
                } else {
                    res.send({
                        status: 400,
                        msg: "注册失败"
                    })
                }
            })
        }
    })

})

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
    const search = url.parse(req.url, true).query.search
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


// module.exports = router