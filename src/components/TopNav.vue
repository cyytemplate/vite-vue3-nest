<!--
 * @Author: cyy
 * @Date: 2022-01-27 12:15:58
 * @LastEditors: cyy
 * @LastEditTime: 2022-01-27 17:08:19
 * @Description: 
-->
<template lang="pug">
a-layout-header( :style="{ position: 'fixed', zIndex: 1, width: '100%' }")
  div.logo
  a-menu(v-if="user.token" v-model:selectedKeys="selectedKeys" theme="dark" mode="horizontal" :style="{ lineHeight: '64px' }")
    a-menu-item(key='1') nav 1
    a-menu-item(key='2') nav 2
    a-menu-item.right(key='9')
      span {{user.user.username}} 
      i.logout(@click="logout")
        LogoutOutlined
  
</template>
<script setup>
import { Layout, Menu } from 'ant-design-vue'
import { LogoutOutlined } from '@ant-design/icons-vue'
import { getCookie, clearCookie } from '@/lib/utils'
import { computed } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const selectedKeys = ['1']
const user = computed(() => {
  try {
    const userStr = getCookie('user')
    const cookie = JSON.parse(userStr)
    return cookie || {}
  } catch(e) {
    return {}
  }
})
const logout = () => {
  clearCookie('user')
  router.push({
    path: '/login'
  })
}
</script>
<style lang="less" scoped>
.logo {
  width: 120px;
  height: 31px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px 24px 16px 0;
  float: left;
}
:deep(.ant-menu) {
  .right {
    margin-left: auto;
  }

}
.logout {
  cursor: pointer;
  margin-left: 5px;
}
</style>