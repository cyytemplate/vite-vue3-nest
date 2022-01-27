<template lang="pug">
a-layout
  TopNav
  a-layout.main
    router-view
</template>

<script setup>
import { Layout } from 'ant-design-vue'
import TopNav from './components/TopNav.vue'
</script>
<style lang="less" scoped>
.main {
  padding: 80px 20px;
  &>:deep(main) {
    background-color: #fff;
  }
}
</style>
