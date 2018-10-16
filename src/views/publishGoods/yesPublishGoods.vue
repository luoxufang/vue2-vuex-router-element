<template>
  <div class="aaaa">
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			
			<el-form :inline="true">
				<span>商品名称：</span>
				<el-form-item>
						<el-input v-model="name" placeholder="" @keyup.enter.native="query()"></el-input>
				</el-form-item>
				<span class="demonstration">商品id：</span>
				<el-form-item>
						<el-input v-model="name" placeholder="" @keyup.enter.native="query()"></el-input>
				</el-form-item>
				<el-button type="primary" @click="query()">查询</el-button>
			</el-form>
			
			<el-tabs v-model="activeName" @tab-click="handleClick">
				<el-tab-pane label="全部" name="first"></el-tab-pane>
				<el-tab-pane label="活动" name="second"></el-tab-pane>
				<el-tab-pane label="生鲜" name="third"></el-tab-pane>
				<el-tab-pane label="零食" name="fourth"></el-tab-pane>
				<el-tab-pane label="日用百货" name="five"></el-tab-pane>
			</el-tabs>

			<!-- sortable -->
			<div style="text-align:left;margin-bottom:14px">
				<span style="margin:0px 16px 0 8px;;">全选</span>
				<el-button type="danger" size="mini" plain>取消发布</el-button>
			</div>
			<el-table :data="tableData" border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="class1" label="商品" ></el-table-column>
        <el-table-column prop="class2" label="商品类别" width="100"></el-table-column>
        <el-table-column prop="class3" label="商品价格" width="100"></el-table-column>
        <el-table-column prop="class4" label="分佣比例" width="100"></el-table-column>
        <el-table-column prop="class5" label="分享量" width="100"></el-table-column>
        <el-table-column prop="class6" label="开售时间" width="150"></el-table-column>
        <!-- <el-table-column prop="address" label="地址" :formatter="formatter"></el-table-column> -->
        <el-table-column label="操作" width="240">
            <template slot-scope="scope">
                <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">取消发布</el-button>
            </template>
        </el-table-column>
			</el-table>
			<div class="pagination" style="margin-top:24px;text-align:right;">
				<el-pagination @current-change="handleCurrentChange" layout="prev, pager, next" :total="1000"></el-pagination>
			</div>
		</el-col>
		<!-- 编辑弹出框 -->

    <!-- 删除提示框 -->
    <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
      <div class="del-dialog-cnt">是否确定取消发布？</div>
      <span slot="footer" class="dialog-footer">
          <el-button @click="delVisible = false">取 消</el-button>
          <el-button type="primary" @click="deleteRow">确 定</el-button>
      </span>
    </el-dialog>
	</div>
</template>
<script>
export default {
  data() {
    const item = {
      class1: "徐香猕猴桃",
      class2: "生鲜果蔬",
      class3: "10",
      class4: "1",
      class5: "1000",
      class6: "2016-05-02"
    };
    return {
      name: "",
      time: "",
      activeName: "first",
      url: "../../../static/vuetable.json",
      tableData: [],
      cur_page: 1,
      multipleSelection: [],
      select_cate: "",
      select_word: "",
      del_list: [],
      is_search: false,
      editVisible: false,
      delVisible: false,
      form: {
        name: "",
        date: "",
        address: ""
      },
      idx: -1,
      tableData: Array(10).fill(item)
    };
  },
  created() {
    // this.getData();
    console.log(this.url);
  },
  computed: {
    data() {
      return this.tableData.filter(d => {
        let is_del = false;
        for (let i = 0; i < this.del_list.length; i++) {
          if (d.name === this.del_list[i].name) {
            is_del = true;
            break;
          }
        }
        if (!is_del) {
          if (
            d.address.indexOf(this.select_cate) > -1 &&
            (d.name.indexOf(this.select_word) > -1 ||
              d.address.indexOf(this.select_word) > -1)
          ) {
            return d;
          }
        }
      });
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    // 分页导航
    handleCurrentChange(val) {
      this.cur_page = val;
      this.getData();
    },
    // 获取 easy-mock 的模拟数据
    getData() {
      // 开发环境使用 easy-mock 数据，正式环境使用 json 文件
      if (process.env.NODE_ENV === "development") {
        this.url =
          "http://blog.gdfengshuo.com/example/work/static/vuetable.json";
      }
      this.$axios
        .post(this.url, {
          page: this.cur_page
        })
        .then(res => {
          this.tableData = res.data.list;
        });
    },
    search() {
      this.is_search = true;
    },
    formatter(row, column) {
      return row.address;
    },
    filterTag(value, row) {
      return row.tag === value;
    },
    handleEdit(index, row) {
      //   this.idx = index;
      //   const item = this.tableData[index];
      //   this.form = {
      //     name: item.name,
      //     date: item.date,
      //     address: item.address
      //   };
      this.editVisible = true;
    },
    handleDelete(index, row) {
      this.idx = index;
      this.delVisible = true;
    },
    delAll() {
      const length = this.multipleSelection.length;
      let str = "";
      this.del_list = this.del_list.concat(this.multipleSelection);
      for (let i = 0; i < length; i++) {
        str += this.multipleSelection[i].name + " ";
      }
      this.$message.error("删除了" + str);
      this.multipleSelection = [];
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 保存编辑
    saveEdit() {
      this.$set(this.tableData, this.idx, this.form);
      this.editVisible = false;
      this.$message.success(`修改第 ${this.idx + 1} 行成功`);
    },
    // 确定删除
    deleteRow() {
      this.tableData.splice(this.idx, 1);
      this.$message.success("删除成功");
      this.delVisible = false;
    }
  }
};
</script>


<style lang="scss" scoped>
.demonstration {
  margin-left: 65px;
}
</style>
