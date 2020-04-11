import axios from 'axios'
import qs from 'qs';

let baseURL = '';

if (process.env.NODE_ENV === 'production') {
    baseURL = 'http://photo.fewsecond.cn';

} else {
    baseURL = 'http://photo.fewsecond.cn';
}

const service = axios.create({
    baseURL: baseURL, // api的base_url
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    transformRequest: [function (data) {
        data = qs.stringify(data);
        return data;
    }],
});
// 添加请求拦截器
service.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
service.interceptors.response.use(function (response) {
    if (response.status >= 200) {
        console.log(response.data.data)
        let data = JSON.stringify(response.data.data) != "{}" ? response.data.data : response.data
        return data
    } else {
        return Promise.reject(response.data.message);
    }
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

export default service;
