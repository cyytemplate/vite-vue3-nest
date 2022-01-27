import Api from './baseApi'
// 登录
export const login = (body) => Api.post('/user/login', body)

