<template>
    <div class="aaaa">
      <el-row>
        <el-col :span="12"><h1>培训内容</h1></el-col>
        <el-col :span="12" style="text-align:right;"><el-button type="primary" style="margin:16px 20px 0 0;" @click="handleEdit()">发布培训内容</el-button></el-col>
      </el-row>
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-tabs v-model="activeName" @tab-click="handleClick">
				<el-tab-pane label="未发布" name="first"></el-tab-pane>
				<el-tab-pane label="已发布" name="second"></el-tab-pane>
			</el-tabs>

			<!-- sortable -->
			<div style="text-align:left;margin-bottom:14px">
				<span style="margin:0px 16px 0 8px;;">全选</span>
				<el-button type="danger" size="mini" plain>删除</el-button>
        <el-button type="danger" size="mini" plain>上架</el-button>
			</div>
			<el-table :data="tableData" border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="class1" label="培训内容" ></el-table-column>
          <el-table-column prop="class2" label="浏览量" width="100"></el-table-column>
          <el-table-column prop="class3" label="修改时间" width="200"></el-table-column>
          <el-table-column label="操作" width="340">
              <template slot-scope="scope">
                  <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                  <el-button size="small" @click="handleEdit(scope.$index, scope.row)">发布</el-button>
                  <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
              <el-form-item label="">
                <span class="" style="float:left;">主图：</span>
                <div class="" style="float:left;">
                  <el-upload
                    class="avatar-uploader"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar" style="width:100px;height:100px;">
                    <i v-else class="el-icon-plus avatar-uploader-icon" style="width:100px;height:100px;line-height: 100px;"></i>
                  </el-upload>
                </div>

              </el-form-item>
            
              <el-form-item label="">
                <el-row>
                  <el-col :span="12">
                    <div class="grid-content bg-purple">
                      <span style="float:left;">标题：</span>
                      <el-input v-model="name" placeholder="" style="width:80%;" @keyup.enter.native="query()"></el-input>
                    </div>
                  </el-col>

                  <el-col :span="12">
                    <div class="grid-content bg-purple" style="margin-left:60px;">
                      <span>发布时间：</span>
                      <el-date-picker
                        v-model="value1"
                        type="date"
                        placeholder="选择日期">
                      </el-date-picker>
                    </div>
                  </el-col>

                </el-row>
              </el-form-item>

              <el-form-item label="">
                <span>培训内容：</span>
                <quill-editor ref="myTextEditor" v-model="content" :options="editorOption"></quill-editor>
                <!-- <el-date-picker
                  v-model="value4"
                  type="datetimerange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
                </el-date-picker> -->
              </el-form-item>

            </el-row>

          </el-form>
    
          <span slot="footer" class="dialog-footer">
            <el-button @click="editVisible = false">取 消</el-button>
            <el-button type="primary" @click="saveEdit">保 存</el-button>
          </span>
      </el-dialog>
    </div>
</template>
<script>
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
import { quillEditor } from 'vue-quill-editor';
export default {
  data() {
    const item = {
      class1: "如何进行群运营",
      class2: "10000",
      class3: "2018.10.28",
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
      imageUrl: "",
      content: '',
      editorOption: {
        placeholder: 'Hello World',
      },
      value1: '',
    };
  },
  components: {
      quillEditor
  },
  methods: {
    onEditorChange({ editor, html, text }) {
        this.content = html;
    },
    submit(){
        console.log(this.content);
        this.$message.success('提交成功！');
    },
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

</style>