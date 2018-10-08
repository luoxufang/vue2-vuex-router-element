<template>
<div class="container">
  <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
    <el-radio-button :label="false">展开</el-radio-button>
    <el-radio-button :label="true">收起</el-radio-button>
  </el-radio-group>
  <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span slot="title">用户管理</span>
      </template>
      <el-menu-item-group>
        <!-- <span slot="title">分组一</span> -->
        <el-menu-item index="1-1">会员管理</el-menu-item>
        <el-menu-item index="1-2">团长列表</el-menu-item>
        <el-menu-item index="1-3">未审核</el-menu-item>
        <el-menu-item index="1-4">黑名单列表</el-menu-item>
        <el-menu-item index="1-5">已拒绝团长</el-menu-item>
        <el-menu-item index="1-6">已关闭团长</el-menu-item>
        <el-menu-item index="1-7">打烊团长</el-menu-item>
      </el-menu-item-group>
      <!-- <el-menu-item-group title="分组2">
        <el-menu-item index="1-3">选项3</el-menu-item>
      </el-menu-item-group> -->
      <!-- <el-submenu index="1-4">
        <span slot="title">选项4</span>
        <el-menu-item index="1-4-1">选项1</el-menu-item>
      </el-submenu> -->
    </el-submenu>
    <el-menu-item index="2">
      <i class="el-icon-menu"></i>
      <span slot="title">商城管理</span>
    </el-menu-item>
    <!-- <el-menu-item index="3" disabled> -->
    <el-menu-item index="3">
      <i class="el-icon-document"></i>
      <span slot="title">订单管理</span>
    </el-menu-item>
    <el-menu-item index="4">
      <i class="el-icon-setting"></i>
      <span slot="title">营销功能</span>
    </el-menu-item>
    <el-menu-item index="5">
      <i class="el-icon-setting"></i>
      <span slot="title">财务管理</span>
    </el-menu-item>
    <el-menu-item index="6">
      <i class="el-icon-setting"></i>
      <span slot="title">数据统计</span>
    </el-menu-item>
    <el-menu-item index="7">
      <i class="el-icon-setting"></i>
      <span slot="title">物流管理</span>
    </el-menu-item>
    <el-menu-item index="8">
      <i class="el-icon-setting"></i>
      <span slot="title">流水记录</span>
    </el-menu-item>
    <el-menu-item index="9">
      <i class="el-icon-setting"></i>
      <span slot="title">售后工单</span>
    </el-menu-item>
    <el-menu-item index="10">
      <i class="el-icon-setting"></i>
      <span slot="title">系统设置</span>
    </el-menu-item>
  </el-menu>
</div>
</template>

<script>
  export default {
    data() {
      return {
        isCollapse: false
      };
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

<style>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
</style>
