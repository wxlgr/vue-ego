
// 登录、注册相关 路由控制器

// 生成token
const jwt = require('jsonwebtoken')
const jwtSecret = require('../../jwtSecret')

// 加密用
const bcrypt = require('bcryptjs')

module.exports = function useLogin(router, sqlFn) {
    // 登录
    router.post('/login', (req, res) => {
        const { username, password } = req.body

        // 登录sql
        const sql = `select * from user where username=?`;

        sqlFn(sql, [username], result => {

            let pwdRight = false
            if (result.length > 0) {
                pwdRight = bcrypt.compareSync(password, result[0].password)
            }
            if (pwdRight) {
                // 密码正确，返回token
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
            } else {
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
}

