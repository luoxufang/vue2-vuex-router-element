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
				<el-button type="danger" size="mini" plain>发布</el-button>
			</div>
			<el-table :data="tableData" border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
				<el-table-column type="selection" width="55"></el-table-column>
				<el-table-column prop="productName" label="商品" ></el-table-column>
				<el-table-column prop="class" label="商品类别" width="100"></el-table-column>
				<el-table-column prop="money" label="商品价格" width="100"></el-table-column>
				<el-table-column prop="money2" label="佣金" width="100"></el-table-column>
				<el-table-column prop="number" label="销量" width="100"></el-table-column>
				<el-table-column prop="time" label="上架时间" width="150"></el-table-column>
				<!-- <el-table-column prop="address" label="地址" :formatter="formatter"></el-table-column> -->
				<el-table-column label="操作" width="240">
					<template slot-scope="scope">
						<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
						<el-button size="small" @click="handleEdit(scope.$index, scope.row)">发布</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div class="pagination" style="margin-top:24px;text-align:right;">
				<el-pagination @current-change="handleCurrentChange" layout="prev, pager, next" :total="1000"></el-pagination>
			</div>
		</el-col>
		<!-- 编辑弹出框 -->
      <el-dialog title="编辑" :visible.sync="editVisible" width="60%">
          <el-form ref="form" :model="form" >
            <el-row>
              <el-col :span="12">
                <el-form-item label="">
                  <span>商品类目：</span>
                  <span>生鲜蔬菜</span>
                </el-form-item>
                <el-form-item label="">
                  <span>商品名称：</span>
                  <span>徐香猕猴桃</span>
                </el-form-item>
                <el-form-item label="">
                  <span>商品id：</span>
                  <span>123456789</span>
                </el-form-item>
                <el-form-item label="">
                  <span>发布时间：</span>
                  <el-date-picker
                    v-model="value4"
                    type="datetimerange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                  </el-date-picker>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-upload
                  class="avatar-uploader"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload">
                  <img v-if="imageUrl" :src="imageUrl" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-col>

            </el-row>
          </el-form>
    
          <span slot="footer" class="dialog-footer">
            <el-button @click="editVisible = false">取 消</el-button>
            <el-button type="primary" @click="saveEdit">保 存</el-button>
          </span>
      </el-dialog>

      <!-- 删除提示框 -->
      <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
          <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
          <span slot="footer" class="dialog-footer">
              <el-button @click="delVisible = false">取 消</el-button>
              <el-button type="primary" @click="deleteRow">确 定</el-button>
          </span>
      </el-dialog>
	</div>
</template>
<script>
import { baseURL, modifyUser} from '../../api/api';
export default {
  data() {
    const item = {
      productName: "徐香猕猴桃",
      class: "生鲜果蔬",
      money: "10",
      money2: "1",
      number: "1000",
      time: "2018-10-16"
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
      tableData: Array(10).fill(item),
      startTime: "",
      endTime: "",
      value4: "",
      // [new Date(2018, 10, 16, 20, 00), new Date(2018, 10, 17, 12, 00)]
      imageUrl: ""
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
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  }
};
</script>
<style lang="scss" scoped>
.demonstration {
  margin-left: 65px;
}

</style>
