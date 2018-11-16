<template>
  <div class="app-container">
    <el-card class="box-card">
      <el-form ref="form" :model="form" label-width="80px">
        <el-row :span="24" :gutter="20">
          <el-col :span="12">
            <el-form-item label="用户名">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="状态">
              <el-select style="width: 100%;" v-model="form.status" placeholder="请选择状态">
                <el-option label="草稿" value="Draft"></el-option>
                <el-option label="发布" value="Published"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :span="24">
          <el-col :span="12">
            <el-form-item label="创建时间">
              <el-col :span="11">
                <el-date-picker type="date" placeholder="选择日期" v-model="form.startDate" style="width: 100%;"></el-date-picker>
              </el-col>
              <el-col class="line" style="text-align: center;" :span="1">-</el-col>
              <el-col :span="11">
                <el-time-picker type="fixed-time" placeholder="选择时间" v-model="form.endDate" style="width: 100%;">
                </el-time-picker>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="是否正式用户" label-width="100px">
              <el-switch v-model="form.isFormal"></el-switch>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :span="24" :gutter="20">
          <el-col :span="8">
            <el-form-item label="用户类型">
              <el-checkbox-group v-model="form.type">
                <el-checkbox label="工程师" name="type"></el-checkbox>
                <el-checkbox label="律师" name="type"></el-checkbox>
                <el-checkbox label="教师" name="type"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="区域">
              <el-radio-group v-model="form.region">
                <el-radio label="北京"></el-radio>
                <el-radio label="深圳"></el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item>
          <el-row :gutter="20">
            <el-col :span="6" :offset="10">
              <el-button type="primary">查询</el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
    </el-card>

    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%">
      <template v-for="(columnItem,index) in columnInfos()">
        <el-table-column align="center" :label="columnItem.label" :min-width="columnItem.minWidth" :width="columnItem.width?columnItem.width:false" :key="index">
          <template slot-scope="scope">
            <template v-if="columnItem.propName=='status'">
              <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
            </template>
            <template v-else-if="columnItem.propName=='createDate'">
              <span>{{ scope.row.createDate | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
            </template>
            <template v-else>
              <span>{{ scope.row[columnItem.propName] }}</span>
            </template>
          </template>
        </el-table-column>
      </template>

      <el-table-column align="center" label="Actions" min-width="100">
        <template slot-scope="scope">
          <router-link :to="'/system/user/edit/'+scope.row.id">
            <el-button type="primary" size="small" icon="el-icon-edit">Edit</el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" :total="total" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    </div>
  </div>
</template>

<script>
import { fetchList } from "@/api/user";
import user from "@/store/modules/identity-info";
import columnInfo from "@/store/entity/column-info";

export default {
  name: "UserList",
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "info",
        deleted: "danger"
      };
      return statusMap[status];
    }
  },
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20
      },
      columnInfos: () => {
        let columnArr = [];
        let propToName = {
          id: "ID",
          userName: "User Name",
          email: "EMail",
          acount: "Acount",
          status: "Status",
          createDate: "Create Date"
        };

        for (const key in propToName) {
          let item = new columnInfo();
          columnArr.push(item);
          item.propName = key;
          item.label = propToName[key];
          item.minWidth = 100;
          if ("id" == key) {
            item.width = 80;
          }
        }

        return columnArr;
      },
      form: {
        name: "",
        status: "",
        startDate: "",
        endDate: "",
        isFormal: false,
        type: [],
        region: "",
        desc: ""
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.listLoading = true;
      fetchList({...this.listLoading,...this.form}).then(response => {
        this.list = response.data.items;
        this.total = response.data.total;
        this.listLoading = false;
      });
    },
    handleSizeChange(val) {
      this.listQuery.limit = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.page = val;
      this.getList();
    },
    search(){

    }
  }
};
</script>

<style scoped>
.edit-input {
  padding-right: 100px;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}

.app-container >>> .el-form-item__label {
  padding: 0 15px 0 0;
}

.app-container >>> .box-card {
  margin-bottom: 15px;
}
</style>
