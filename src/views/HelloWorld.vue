<template>
  <el-row class="container">
    <!-- <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
      <el-radio-button :label="false">展开</el-radio-button>
      <el-radio-button :label="true">收起</el-radio-button>
    </el-radio-group> -->
    <el-col :span="24" class="header">
			<el-col :span="10" class="logo" :class="collapsed?'logo-collapse-width':'logo-width'">
				{{collapsed?'':sysName}}
			</el-col>
			<!--<el-col :span="10">-->
			<!--<div class="tools" @click.prevent="collapse">-->
			<!--<i class="fa fa-align-justify"></i>-->
			<!--</div>-->
			<!--</el-col>-->
			<el-col :span="4" class="userinfo">
				<el-dropdown trigger="hover">
					<span class="el-dropdown-link userinfo-inner">
						<img :src="this.sysUserAvatar"/> {{sysUserName}}</span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item @click.native="modify">修改密码</el-dropdown-item>
						<el-dropdown-item divided  @click.native="logout">退出登录</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</el-col>
		</el-col>

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
    </el-menu>
    <div id="model" v-if="show"></div>
  </el-row>
</template>

<script>
  export default {
    data() {
      return {
        sysName: '商家管理后台',
        collapsed: false,
        sysUserName: '张三',
        sysUserAvatar: '../../assets/user.png',
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: '',
          username: '',
          password: '',
          password2: '',
          password3: '',
        },
        isCollapse: false,
        show:false
      };
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      //折叠导航栏
      collapse: function () {
        this.collapsed = !this.collapsed;
      }
    },
    mounted() {
      this.sysUserName = localStorage.getItem('ms_username') || '';
      this.sysUserAvatar = '../../static/user.png' || '';

      // if (user) {
      //   user = JSON.parse(ms_username);
      //   this.sysUserName = user.name || '';
      //   this.sysUserAvatar = user.avatar || '';
      // }
    }
  }
</script>

<style scoped lang="scss">
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 600px;
  margin-top: 60px;
}
.container {
	position: absolute;
	top: 0px;
	bottom: 0px;
	width: 100%;
	.header {
		height: 60px;
		line-height: 60px;
		// background: $color-primary;
		background:#20A0FF;
		color: #fff;
		.userinfo {
			text-align: right;
			padding-right: 35px;
			float: right;
			.userinfo-inner {
				cursor: pointer;
				color: #fff;
				img {
					width: 40px;
					height: 40px;
					border-radius: 20px;
					margin: 10px 0px 10px 10px;
					float: right;
				}
			}
		}
		.logo {
			//width:230px;
			height: 60px;
			font-size: 22px;
			padding-left: 20px;
			padding-right: 20px;
			// border-color: rgba(238, 241, 146, 0.3);
			// border-right-width: 1px;
			// border-right-style: solid;
			img {
				width: 40px;
				float: left;
				margin: 10px 10px 10px 18px;
			}
			.txt {
				color: #fff;
			}
		}
		.logo-width {
			width: 230px;
		}
		.logo-collapse-width {
			width: 60px
		}
		.tools {
			padding: 0px 23px;
			width: 14px;
			height: 60px;
			line-height: 60px;
			cursor: pointer;
		}
	}
}
#model {
  position: fixed;
  top: 0%;
  left: 0%;
  right: 0%;
  bottom: 0%;
  background: rgba(0, 0, 0, 0.3);
  z-index: 20;
}
</style>
