import axios from 'axios'
import { message } from 'ant-design-vue'

const BASE_URL = '/api/'

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  responseType: 'json'
})

// 带参数的接口请求支持
instance.interceptors.request.use(function (config) {
  const body = config.data
  const query = config.params
  // post、put请求从body里取参数，其他从URL query里取参数
  const params = ['post', 'put'].includes(config.method) ? body : query

  // url中参数变量替换，并删除body或query里的参数
  const url = config.url.replace(/:[^/]+/g, m => {
    const k = m.substring(1)
    const v = params[k]
    delete params[k]
    return v
  })

  return {
    ...config,
    url,
    body,
    query
  }
}, function (error) {
  return Promise.reject(error)
})
// 接口返回错误处理
instance.interceptors.response.use(function (res) {
  const data = res.data || { code: -1, msg: 'server error!' }
  if (data.code) {
    message.error(data.message || 'server error!')
    return null
  }
  return data.data
}, function (error, res) {
  message.error(error.message || 'server error!')
  return null
})

export default instance
