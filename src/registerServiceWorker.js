/* eslint-disable no-console */

import { register } from 'register-service-worker'

if (process.env.NODE_ENV === 'production') {
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready () {
      console.log(
        '应用程序由服务工作线程从缓存中提供服务.\n' +
        '详情请访问 https://goo.gl/AFskqB'
      )
    },
    registered () {
      console.log('服务线程已注册。')
    },
    cached () {
      console.log('内容已缓存以供脱机使用。')
    },
    updatefound () {
      console.log('新内容正在下载中。')
    },
    updated () {
      console.log('新内容可用;请刷新。')
    },
    offline () {
      console.log('没有找到互联网连接。App离线运行。')
    },
    error (error) {
      console.error('服务线程注册错误:', error)
    }
  })
}
