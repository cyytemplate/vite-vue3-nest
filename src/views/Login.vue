<!--
 * @Author: cyy
 * @Date: 2021-09-23 12:45:11
 * @LastEditors: cyy
 * @LastEditTime: 2022-01-27 16:54:56
 * @Description: 
-->

<template lang="pug">
a-layout-content.login-box
  a-form.form(ref="formRef" :model="formState" @keyup.enter="onSubmit")
    a-form-item(name="username")
      a-input(v-model:value="formState.username" placeholder="用户名")
        template(#prefix)
          UserOutlined
    a-form-item(name="password")
      a-input(v-model:value="formState.password" placeholder="密码" type="password")
        template(#prefix)
          LockOutlined
    a-form-item
      a-button.submit(type="primary" @click="onSubmit")
        | LOGIN
</template>
<script setup>
import { Form, message } from 'ant-design-vue'
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'
import { ref, reactive } from 'vue'
import { login } from '../lib/apis/user'
import { useRouter, useRoute } from 'vue-router'
import { clearCookie, setCookie } from '../lib/utils'

clearCookie('user')
const formRef = ref(null)
const router = useRouter()
const route = useRoute()
const formState = reactive({
  username: null,
  password: undefined
});
const onSubmit = () => {
  const { username, password } = formState
  if (!username || !password) {
    message.error('请输入用户名和密码')
    return
  }
  login(formState).then(res => {
    if (res) {
      setCookie('user', JSON.stringify({
        token: res.token,
        user: res.user
      }))
      router.push({
        path: route.query.redirect || '/'
      })
    } else {
      message.error(res.msg)
    }
  })
}
</script>
<style lang="less" scoped>
.login-box{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
  .form {
    width: 290px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    :deep(.ant-input-affix-wrapper) {
      background-color: #F4F5F7;
      input {
        background-color: #F4F5F7;
        box-shadow: inset 0 0 0 1000px #f5f5f5!important;
      }
    }
    
    .submit {
      width: 100%;
      color: #fff;
      font-weight: bold;
    }
  }
}
</style>