import axios from 'axios'
import Qs from 'qs'

let baseURL = '';

if (process.env.NODE_ENV === 'production') {
    baseURL = 'http://photo.fewsecond.cn';

} else {
    baseURL = 'http://photo.fewsecond.cn';
}

const defaultConfig = {
    url: '',
    baseURL: baseURL,
    method: 'POST',
    transformRequest: [
        function(data) {
            data = Qs.stringify(data)
            return data
        }
    ],
    transformResponse: [
        function(data) {
            return data
        }
    ],
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-Requested-With': 'XMLHttpRequest'
    },
    params: {},
    paramsSerializer: function(params) {
        return Qs.stringify(params)
    },
    data: {},
    timeout: 10000,
    retry: 3,
    retryDelay: 1000,
    withCredentials: true,
    responseType: 'json',
    maxContentLength: 2000,
    validateStatus: function(status) {
        return status >= 200 && status < 300 // default
    },
    maxRedirects: 5
}

const checkErrorMsg = error => {
    if (error && error.response) {
        switch (error.response.status) {
            case 400:
                error.message = '错误请求'
                break
            case 401:
                error.message = '未授权，请重新登录'
                break
            case 403:
                error.message = '拒绝访问'
                break
            case 404:
                error.message = '请求错误,未找到该资源'
                break
            case 405:
                error.message = '请求方法未允许'
                break
            case 408:
                error.message = '请求超时'
                break
            case 500:
                error.message = '服务器端出错'
                break
            case 501:
                error.message = '网络未实现'
                break
            case 502:
                error.message = '网络错误'
                break
            case 503:
                error.message = '服务不可用'
                break
            case 504:
                error.message = '网络超时'
                break
            case 505:
                error.message = 'http版本不支持该请求'
                break
            default:
                error.message = `连接错误${error.response.status}`
        }
        error.code = error.response.status
    } else {
        error.code = -1
        error.message = '连接到服务器失败'
    }
    return {
        errCode: error.code,
        errMsg: error.message
    }
}

const request = ({
                     type = 'rti',
                     url = '',
                     method = 'GET',
                     data = {},
                     header = {},
                     dataType = 'json',
                     withCredentials = false,
                     retry = 3,
                     retryDelay = 2000,
                     timeOut = 5000,
                     before = null,
                     after = null,
                     success = null,
                     fail = null
                 }) => {
    let config = {
        type,
        method,
        url,
        data,
        responseType: dataType,
        dataType,
        timeout: timeOut,
        headers: Object.assign(
            {},
            header || {}
        ),
        retry: retry,
        retryDelay,
        withCredentials,
        before,
        after,
        success,
        fail
    }
    let opts = Object.assign(defaultConfig, config || {})
    if (opts.headers['Content-Type'] === 'application/json') {
        opts.transformRequest = [
            function() {
                return opts.data
            }
        ]
    }

    if (!/https?:\/\//.test(opts.url)) {
        opts.url = baseURL.replace(/\/$/, '') + '/' + opts.url.replace(/^\//, '').replace(/\{version}/g, '')
    }
    if (method.toUpperCase() === 'GET' || method.toUpperCase() === 'DELETE') {
        opts.params = data || ''
    }
    if (method.toUpperCase() === 'POST' || method.toUpperCase() === 'PUT' || method.toUpperCase() === 'PATCH') {
        opts.params = ''
    }
    /**
     * 请求拦截器
     */
    axios.interceptors.request.use(
        opt => {
            if (opts.before && typeof opts.before === 'function') {
                opts.before()
            }
            return opt
        },
        err => {
            return Promise.reject(checkErrorMsg(err))
        }
    )

    /**
     * 响应拦截器
     */
    axios.interceptors.response.use(
        response => {
            console.log(234)
            if (opts.after && typeof opts.after === 'function') {
                opts.after()
            }
            return response
        },
        err => {
            if (!opts || !opts.retry) return Promise.reject(checkErrorMsg(err))
            // 设置重试次数变量
            opts.__retryCount = opts.__retryCount || 0
            if (opts.__retryCount >= opts.retry) {
                return Promise.reject(checkErrorMsg(err))
            }

            // 增加重试计数
            opts.__retryCount += 1
            let backoff = new Promise(function(resolve) {
                setTimeout(function() {
                    resolve()
                }, opts.retryDelay || 1)
            })
            return backoff.then(function() {
                return axios(opts)
            })
        }
    )

    return new Promise((resolve, reject) => {
        axios(opts)
            .then(res => {
                if (res.status >= 200 && res.status < 300) {
                    console.log(res)
                    console.log(typeof res)
                    if(typeof res == 'string'){
                        return resolve(res.data)
                    }else {
                        return resolve(res.data.data)
                    }
                }
                return resolve(checkErrorMsg(res.status))
            })
            .catch(err => {
                return reject(err)
            })
            .finally(() => {
                if (opts.finally && typeof opts.finally === 'function') {
                    return opts.finally()
                }
            })
    })
}

export default request;