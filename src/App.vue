<template>
  <el-tabs v-model="activeTab" class="demo-tabs">
    <el-tab-pane label="策略设置" name="strategy"><Strategy></Strategy></el-tab-pane>
    <el-tab-pane label="订单管理" name="order"><Order></Order></el-tab-pane>

  </el-tabs>

</template>

<script setup>
import {ref} from "vue";
import Order from '@/components/OrderComponent'
import Strategy from '@/components/strategyComponent'
const activeTab=ref('strategy')
</script>

<style>

</style>
