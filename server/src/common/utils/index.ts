/*
 * @Author: cyy
 * @Date: 2021-09-28 16:05:35
 * @LastEditors: cyy
 * @LastEditTime: 2022-01-27 12:23:14
 * @Description: 
 */
import { createHash } from 'crypto'

// 密码加密
export const encodePass = (str) => {
  return createHash('md5').update(str).digest('hex')
}