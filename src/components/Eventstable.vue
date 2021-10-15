<template>
  <div>
    <slot :countHigh=countHigh :countLow=countLow :countMedia=countMedia></slot>
    <el-table
      :data="tempTable"
      style="width: 100%"
      :row-class-name="tableRowClassName"
    >
      <el-table-column
        fixed
        prop="content"
        label="事项内容"
        width="800"
        v-if="show"
      >
      </el-table-column>
      <el-table-column prop="date" label="截止时间" width="400" v-if="show">
      </el-table-column>
      <el-table-column
        prop="finishTime"
        label="实际完成时间"
        width="400"
        v-if="showWhich === 'B'"
      >
      </el-table-column>
      <el-table-column prop="hurry" label="紧急程度" width="300" v-if="show">
      </el-table-column>

      <el-table-column
        label="操作"
        width="340"
        v-if="showWhich === 'A' && show"
      >
        <template slot-scope="scope">
          <el-button
            @click="deleteRow(scope.$index, tempTable)"
            type="text"
            size="small"
            >删除</el-button
          >
          <el-button
            @click="finishRow(scope.$index, tempTable)"
            type="text"
            size="small"
            >完成</el-button
          >
        </template>
      </el-table-column>
      <el-table-column
        style="backcolor:white"
        width="60"
        v-if="showWhich === 'A'"
      >
        <template slot="header">
          <el-button @click="show = !show" size="mini">+</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style>
.el-table .hurry-high {
  background: oldlace;
}

.el-table .hurry-low {
  background: #f0f9eb;
}
</style>

<script>
import moment from "moment";
export default {
  name: "Eventstable",
  props: {
    showWhich: String,
    comKey: Number
  },
  data() {
    return {
      show: true,
      tableData: this.$store.state.tableData,
      tempTable: []
    };
  },
  methods: {
    deleteRow(index, rows) {
      this.tableData.splice(
        this.tableData.findIndex(e => e.backLogId === rows[index].backLogId),
        1
      );
      this.$emit("del");
    },
    finishRow(index, rows) {
      this.tableData[
        this.tableData.findIndex(e => e.backLogId === rows[index].backLogId)
      ].hasFinish = true;
      this.tableData[
        this.tableData.findIndex(e => e.backLogId === rows[index].backLogId)
      ].finishTime = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");
      this.refreshTable(false);
      this.$emit("fini");
    },
    tableRowClassName({ row }) {
      if (row.hurry.text === "高") {
        return "hurry-high";
      } else if (row.hurry.text === "低") {
        return "hurry-low";
      }
    },
    refreshTable(isHasFinish) {
      this.tempTable = [];
      for (let item of this.tableData) {
        if (item.name === this.$store.state.userName && item.hasFinish === isHasFinish) {
          this.tempTable.push(item);
        }
      }
    }
  },
  computed: {
    countHigh: function(){
      let count = 0;
      for(let item of this.tempTable){
        if(item.hurry.text==="高"){
          count++;
        }
      }
      return count;
    },
    countMedia: function(){
      let count = 0;
      for(let item of this.tempTable){
        if(item.hurry.text==='中')
          count++;
      }
      return count;
    },
    countLow: function(){
      let count = 0;
      for(let item of this.tempTable){
        if(item.hurry.text==='低')
          count++;
      }
      return count;
    }
  },
  watch: {
    tableData: function() {
      this.refreshTable(false);
    }
  }
};
</script>
