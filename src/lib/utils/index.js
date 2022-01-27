/*
 * @Author: cyy
 * @Date: 2021-09-27 15:31:18
 * @LastEditors: cyy
 * @LastEditTime: 2022-01-27 16:30:01
 * @Description: 
 */
import dayjs from 'dayjs'

// 读取cookie
export const  getCookie = (name) => {
  const cookieReg = new RegExp("(^| )"+name+"=([^;]*)(;|$)");
  let metch = document.cookie.match(cookieReg)
  if(metch) {
    return decodeURIComponent(metch[2])
  } else {
    return null
  }
}

// 清除指定cookie
export const clearCookie = (k) => document.cookie = `${k}=;expires=${(new Date()).toString()}`

// 设置cookie
export const setCookie = (k, v, day) => document.cookie = `${k}=${v};expires=${dayjs().add(day, 'day').toString()}`