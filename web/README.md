# 商城后台系统


## 安装依赖
`pnpm add axios jwt-decode vue-i18n wangeditor@4` 

`vue add element` 按需

## 项目描述
商城的后台管理系统，具有商品管理、规格参数管理、广告分类管理等。
其中包含用户中心、用户登录与注册。项目采用Vue技术栈

## 项目技术

1. 项目环境：Vue-Cli构建项目，后端使用express框架node实现
2. 项目技术点：
    - 项目网络请求集成Axios,同时对Axios进行封装，主要处理请求拦截和响应拦截及错误提示
    - 项目UI采用ElementUI,并且对ElementUI进行二次封装
    - 项目页面之间的管理采用Vou-Router路由管理，包含路由嵌套、路由导航、路由传参、路由权限管理等
    - 项目的全局状态，包含登录token、订单信息等采用VueX进行管理
    - 由于商品具有编辑功能，所以引入了富文本编辑器(wangEditor\UEditor)
3. 业务实现
    - 具体1业务实现……

## 项目页面结构

1. 商品管理:product
2. 规格参数:params
3. 内容分类管理:content
4. 用户登陆注册页面:login
5. 用户中心:ucenter

## 页面管理级别

    --login
    --layout
        --content
        --params
        --product
    --user

## 初始化css样式

1. `import "./assets/css/common.css"`

## 实现登录页面：login.vue

1. 用到的组件：el-card、el-tabs、el-form
2. 具体功能
    1. 登录
        1. 完成网路请求处理的封装
        2. 解决跨域问题
            1. 前端解决：proxy代理方案(开发环境的跨域解决方案)
            2. 后端解决
                CORS方案： `cnpm i --save cors`

    2. 注册
       



## 路由权限管理
    验证用户是否登录

## 用户登录的验证
1. Vuex管理用户登录状态
2. token 用户凭证
    前端发送用户名密码 -> 后台验证用户名密码是否成功(生成token) -> 返回token 用户凭证 -> 前台保存的是token用户凭证
    1. 安装生成token的依赖：`cnpm i --save jsonwebtoken`
3. 本地存储：localStorage

## 实现导航
1. 主导航
    1. 使用到的ElementUI组件
        1. NavMenu 导航菜单：el-menu 
            额外配置了一个router(变成路由形式)
        2. icon 图标
2. 顶部导航
    1. 使用到的ElementUI组件
        1. Badge 标记
        2. Dropdown 下拉菜单

    2. 用户名处理
        1. 解析token
            1. 安装依赖：`cnpm i --save jwt-decode`
        2. 用户名和token构成的对象存入vuex和localStorage(注意：转码)
             
    3. 退出登录处理
        1. 清除本地数据和vuex的数据，路由回到login页面


## 商品管理
1. 关于联合调试
    前端和后台的联合调试
    1. 字段
    2. 接口地址
    3. (backend/item/...)
2. 前后端开发各干各的，前端再没有拿到接口之前，只做UI的处理
3. 使用到的ElementUI组件
    1. Table表格

## 分页功能
1. 使用到的ElementUI组件
    1. Pagination 分页
2. 组件之间的数据交互
    1. 子父级：prop 自定义事件  
    2. 同级组件
        1. eventBus (事件总线)
        2. vuex

## 商品模糊搜索
1. form 表单阻止默认事件：@submit.native.prevent
2. 监听回车按键： @keyup.enter.native="onSubmit"

## 国际化处理
1. vue-i18参考文档地址:`https://kazupon.github.io/vue-i18n/zh/`
2. 安装依赖：`cnpm i --save vue-i18n`
3. 配合ElementUI进行语言环境切换
4. i18n 的使用方案和vuex与router相似

## 添加功能
1. 使用到的ElementUI组件
    1. dailog弹出框等 内嵌
    2. tree树形控件 懒加载、
    3. upload 上传组件
2. 主要功能
    1. tree的懒加载
    2. 上传图片
    3. 富文本编辑器
        1. wangEditor
3. 组件交互关系
    1. 子传父：自定义事件($emit)
    2. eventBus：同级关系的数据传递
        

## 删除功能
1. 弹窗提醒
2. 确认删除
3. 执行删除
4. 结果反馈

## 修改功能

1. 预更新：修改数据前，不能从本地读取当前数据，因为同时使用项目的不止一人。如果别人修改了，你看到的数据是被修改之前的数据，再修改就是覆盖了别人的修改。
2. wangEditor 加载方式的bug,不通过id引用，而用ref

## 规格参数-表格渲染
## 规格参数-模糊查询
## 规格参数-参数添加
## 规格参数-参数删除