<template>
  <div class="hello">
    <el-form :inline="true">
      <el-form-item label="名称">
        <el-input v-model="name" placeholder="名称"></el-input>
      </el-form-item>
      <el-form-item label="价格">
        <el-input v-model="price" placeholder="价格"></el-input>
      </el-form-item> 
      <el-button type="primary" @click="addUser">提交</el-button>
    </el-form>
    <h2>列表</h2>
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        header-align="center"
        label="id">
        <template scope="scope">
          <span style="margin-left: 10px">{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column
        header-align="center"
        label="name">
        <template scope="scope">
          <el-popover trigger="hover" placement="right">
            <p>name: {{ scope.row.name }}</p>
            <p>price: {{ scope.row.price }}</p>
            <p>creat_time: {{ scope.row.creat_time }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag>{{ scope.row.name }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        header-align="center"
        label="price">
        <template scope="scope">
          <span style="margin-left: 10px">{{ scope.row.price }}</span>
        </template>
      </el-table-column>
      <el-table-column
        header-align="center"
        label="creat_time">
        <template scope="scope">
          <span style="margin-left: 10px">{{ scope.row.creat_time }}</span>
        </template>
      </el-table-column>
      <el-table-column 
        header-align="center"
        label="操作">
        <template scope="scope">
          <el-button
            size="small"
            type="success"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="编辑信息" :visible.sync="dialogFormVisible" size="tiny">
      <el-form :model="form">
        <el-form-item label="name" :label-width="formLabelWidth">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="price" :label-width="formLabelWidth">
          <el-input v-model="form.price" auto-complete="off"></el-input>
          <!-- <el-select v-model="form.price" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select> -->
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editSubmit(form)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      name: '',
      price: '',
      tableData: [],
      dialogFormVisible: false,
      form: {},
      formLabelWidth: '60px'
    }
  },
  created(){
     this.$http.post('/api/user/userList', {})
      .then((response) => {
        console.log(response);
        if(response.status === 200){
          this.tableData = response.data;
        }
      })
      .catch(function (error) {
        console.log(error);
        this.$message.error('数据加载失败！');
      });
  },
  methods: {
    addUser() {
      var name = this.name;
      var price = this.price;
      this.$http.post('/api/user/addUser', {
        name: name,
        price: price
      })
      .then((response) => {
        console.log(response);
        if(response.status === 200){
          this.$message({
            message: '新增成功！',
            type: 'success'
          });
          this.userList();
        }
      })
      .catch(function (error) {
        console.log(error);
        this.$message.error('新增失败！');
      });
    },
    userList(){
      this.$http.post('/api/user/userList', {})
      .then((response) => {
        console.log(response);
        if(response.status === 200){
          this.tableData = response.data;
        }
      })
      .catch(function (error) {
        console.log(error);
        this.$message.error('数据加载失败！');
      });
    },
    handleEdit(index, row) {
      console.log(index, row);
       this.dialogFormVisible = true
       this.form = {
         name: row.name,
         price: row.price,
         id: row.id
       }
    },
    editSubmit(form){
      console.info(form)
     // form.creat_time = new Date()
      
      this.$http.post('/api/user/updateUserById', form)
      .then((response) => {
        console.log(response);
        if(response.status === 200){
          this.$message.success('修改成功！');
           this.userList();
           this.dialogFormVisible = false
        }
      })
      .catch(function (error) {
        console.log(error);
        this.$message.error('修改失败！');
      });
    },
    handleDelete(index, row) {
      console.log(index, row);
      this.$http.post('/api/user/delUserById', {id: row.id})
      .then((response) => {
        console.log(response);
        if(response.status === 200){
          this.$message.success('删除成功！');
           this.userList();
        }
      })
      .catch(function (error) {
        console.log(error);
        this.$message.error('删除失败！');
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
