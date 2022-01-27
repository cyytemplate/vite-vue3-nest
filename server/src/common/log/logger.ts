/*
 * @Author: cyy
 * @Date: 2021-10-09 11:13:22
 * @LastEditors: cyy
 * @LastEditTime: 2022-01-27 12:50:12
 * @Description: 
 */
import { Injectable, Scope, Logger } from '@nestjs/common';

export class MyLogger extends Logger {
  constructor(name) {
    super('custom:' + name)
  }
  // 自定义log处理
  log(message: any) {
    if (typeof message === 'object') {
      return super.log('\n' + JSON.stringify(message, null, 2))
    }
    super.log(message)
  }
}