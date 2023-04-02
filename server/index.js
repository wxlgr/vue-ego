const express = require('express')
const app = express()
const port = 3005

// const router = require('./router')
const router = require('./router/index')


const cors=require("cors")
//后端解决跨域
app.use(cors())

app.use( express.urlencoded({extended: true}) )
app.use( express.json() )
//设置完毕之后，会在req对象上面新增一个req.body的一个对象


//挂载路由
app.use('/api', router)

app.use(express.static("static"))

app.listen(port, () => {
    console.log(`server running at ${port}`);
})