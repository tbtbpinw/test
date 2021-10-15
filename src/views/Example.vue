<template>
  <div>
    <el-row>
      <el-col :span="21"
        ><div class="grid-content bg-purple-blue">
          &nbsp;&nbsp;&nbsp;&nbsp;显示操作通知：
        </div>
      </el-col>
      <el-col :span="3"
        ><div class="grid-content bg-purple-blue2">
          <el-select v-model="userName" placeholder="请选择用户">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select></div
      ></el-col>
    </el-row>

    <el-row>
      <el-col :span="24"
        ><div class="grid-content bg-purple-white">
          <el-tabs v-model="activeName" @tab-click="handleTabClick">
              <el-tab-pane label="代办" name="backLog">
                <!-- <Backlog  @crea="createBacklog" @del="deleteBacklog" @fini="finishBacklog" ref="Backlog"/> -->
                <component
                  v-bind:is="currentTabComponent[0]"
                  @crea="createBacklog"
                  @del="deleteBacklog"
                  @fini="finishBacklog"
                  ref="Backlog"
                />
              </el-tab-pane>
              
              <el-tab-pane label="已办" name="alreadyBacklog">
                <component
                  v-bind:is="currentTabComponent[1]"
                  ref="Alreadybacklog"
                />
                <!-- <Alreadybacklog ref="Alreadybacklog"/> -->
              </el-tab-pane>
          </el-tabs>
        </div></el-col
      >
    </el-row>
  </div>
</template>
<style lang="less">
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-blue {
  background: #00bfff;
  height: 50px;
  line-height: 50px;
  color: white;
  text-align: left;
  font-size: 20px;
}
.bg-purple-blue2 {
  background: #00bfff;
  height: 50px;
  line-height: 50px;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
  border-radius: 0px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>

<script>
import Backlog from "@/components/Backlog.vue";
import Alreadybacklog from "@/components/Alreadybacklog.vue";

export default {
  components: { Backlog, Alreadybacklog },
  name: "Example",
  data() {
    return {
      currentTabComponent:['Backlog','Alreadybacklog'],
      message: "",
      activeName: "backLog",
      userName: "",
      tabRefresh: {
        backLog: true,
        alreadyBacklog: true
      },
      options: [
        {
          value: "user_A",
          label: "用户A"
        },
        {
          value: "user_B",
          label: "用户B"
        },
        {
          value: "user_C",
          label: "用户C"
        },
        {
          value: "user_D",
          label: "用户D"
        },
        {
          value: "user_E",
          label: "用户E"
        }
      ]
    };
  },
  watch: {
    userName: function() {
      this.$store.dispatch("change", this.userName);
      if (this.activeName === "backLog") {
        this.$refs.Backlog.refreshTable(false);
      } else if (this.activeName === "alreadyBacklog") {
        this.$refs.Alreadybacklog.refreshTable(true);
      }
    }
  },
  methods: {
    createBacklog() {
      this.$message({
        message: "新增了代办事项",
        duration: 5000
      });
    },
    deleteBacklog() {
      this.$message({
        message: "删除了代办事项",
        duration: 5000
      });
    },
    finishBacklog() {
      this.$message({
        message: "完成了代办事项",
        duration: 5000
      });
    },
    handleTabClick() {
      if (this.activeName === "backLog") {
        this.$refs.Backlog.refreshTable(false);
      } else if (this.activeName === "alreadyBacklog") {
        this.$refs.Alreadybacklog.refreshTable(true);
      }
    }
  }
};
</script>
