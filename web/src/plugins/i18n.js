import Vue from "vue"
import VueI18n from "vue-i18n"

import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
import ElementLocale from 'element-ui/lib/locale'

Vue.use(VueI18n)

const messages = {
    "en": {
        message: {
            product: "product",
            params: "params",
            content: "content",
            lang: "English",
            search: "search",
            user: "user",
            my: "my",
            logout: "logout",
        },
        ...enLocale
    },
    "zh-cn": {
        message: {
            product: "商品管理",
            params: "规格参数",
            content: "广告分类",
            lang: "中文",
            search: "搜索",
            user: "用户中心",
            my: "我的",
            logout: "退出登录"
        },
        ...zhLocale
    }
}

const i18n = new VueI18n({
    locale: "zh-cn", // 设置地区
    messages, // 设置地区信息
})

ElementLocale.i18n((key, value) => i18n.t(key, value))

export default i18n