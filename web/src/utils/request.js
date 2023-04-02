import axios from "axios";
import qs from 'qs';

const errorHandle = (status, info) => {
    switch (status) {
        case 400: console.log("语义有误");
            break;
        case 401: console.log("服务器认证失败");
            break;
        case 403: console.log("服务器拒绝访问");
            break;
        case 404: console.log("地址错误");
            break;
        case 500: console.log("服务器遇到意外");
            break;
        case 502: console.log("服务器无响应");
            break;
        default: console.log(info);
            break;
    }
}

const instance = axios.create({
    timeout: 5000
})

//请求拦截
instance.interceptors.request.use(
    config => {
        if (config.method.toLocaleLowerCase === 'post') {
            config.data = qs.stringify(config.data)
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

//响应拦截
instance.interceptors.response.use(
    response => response.status === 200 ?
        Promise.resolve(response) : Promise.reject(response),
    error => {
        const {response} =error
        errorHandle(response.status,response.info)
    }
)

export  default instance