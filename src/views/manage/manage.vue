<template>
    <div class="aaaa">
        <h1>团长管理</h1>
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true">
				<span>团长姓名：</span>
				<el-form-item>
						<el-input v-model="name" placeholder="" @keyup.enter.native="query()"></el-input>
				</el-form-item>
				<span class="demonstration">团长电话：</span>
				<el-form-item>
						<el-input v-model="name" placeholder="" @keyup.enter.native="query()"></el-input>
				</el-form-item>
				<el-button type="primary" @click="query()">查询</el-button>
			</el-form>
            <!--  -->
			<el-tabs v-model="activeName" @tab-click="handleClick">
				<el-tab-pane label="当日" name="first"></el-tab-pane>
				<el-tab-pane label="过去一周" name="second"></el-tab-pane>
                <el-tab-pane label="过去一月" name="third"></el-tab-pane>
                <el-tab-pane label="近三个月" name="fourth"></el-tab-pane>
			</el-tabs>

			<!-- sortable -->
			<div style="text-align:left;margin-bottom:14px">
				<span style="margin:0px 16px 0 8px;;">全选</span>
				<el-button type="danger" size="mini" plain>删除</el-button>
                <el-button type="danger" size="mini" plain>上架</el-button>
			</div>
			<el-table :data="tableData" border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="class1" label="姓名" width="100"></el-table-column>
          <el-table-column prop="class2" label="电话" width="180"></el-table-column>
          <el-table-column prop="class3" label="小区" ></el-table-column>
          <el-table-column prop="class4" label="分享量" width="100"></el-table-column>
          <!-- <el-table-column prop="address" label="地址" :formatter="formatter"></el-table-column> -->
          <el-table-column prop="class5" label="最近登入时间" width="240"></el-table-column>
			</el-table>
			<div class="pagination" style="margin-top:24px;text-align:right;">
				<el-pagination @current-change="handleCurrentChange" layout="prev, pager, next" :total="1000"></el-pagination>
			</div>
		</el-col>
    </div>
</template>
<script>
export default {
  data() {
    const item = {
      class1: "李进山",
      class2: "13100510237",
      class3: "龙岗茂业城",
      class4: "2000",
      class5:'2018.10.16'
    };
    return {
      activeName: "first",
      tableData: Array(10).fill(item),
      name:""
    };
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    // 分页导航
    handleCurrentChange(val) {
      this.cur_page = val;
      this.getData();
    }
  }
};
</script>


<style lang="scss" scoped>
</style>