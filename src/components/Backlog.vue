<<template>
  <div>
    <el-form
      :model="backlogForm"
      status-icon
      :rules="rules"
      ref="backlogForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-row>
        <el-form-item label="代办分类">
          <el-col :span="8"
            ><div class="grid-content">
              <!-- <el-select v-model="value" placeholder="请选择分类"> -->
              <el-select
                v-model="backlogForm.selectValue"
                placeholder="请选择分类"
              >
                <el-option
                  v-for="item in backlogForm.options"
                  :key="item.selectValue"
                  :label="item.label"
                  :value="item.selectValue"
                >
                </el-option>
              </el-select></div
          ></el-col>
        </el-form-item>
      </el-row>

      <el-row>
        <el-form-item label="截止时间">
          <el-col :span="2"
            ><div class="grid-content">
              <el-date-picker
                v-model="backlogForm.date"
                type="date"
                placeholder="选择日期"
              >
              </el-date-picker></div
          ></el-col>
        </el-form-item>
      </el-row>

      <el-row>
        <el-form-item label="紧急程度" >
          <el-col :span="10"
            ><div class="grid-content">
              <el-radio-group v-model="backlogForm.radio" >
                <el-radio
                  v-for="radioItem in backlogForm.radios"
                  v-bind:key="radioItem.id"
                  v-bind:value="radioItem"
                  v-bind:label="radioItem"
                  >{{ radioItem.text }}</el-radio
                >
              </el-radio-group>
            </div></el-col
          >
        </el-form-item>
      </el-row>

      <el-row>
        <el-form-item label="代办内容">
          <el-col :span="8"
            ><div class="grid-content">
              <el-input type="textarea" :rows="2" v-model="backlogForm.textarea">
              </el-input></div
          ></el-col>
        </el-form-item>
      </el-row>
      <el-row>
        <el-col :span="6">
          <div class="grid-content ">
            <el-button type="primary" @click="submitForm('backlogForm')"
              >创建</el-button
            >
            <el-button @click="cleanForm()">取消</el-button>
          </div>
        </el-col>
      </el-row>
    </el-form>
    <Eventstable showWhich = 'A' @del="deleteBacklog" @fini="finishBacklog" ref="Eventstable"/>
  </div>
</template>

<style lang="less">
.el-select {
  float: left;
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.backlogLabel {
  line-height: 30px;
}
.el-radio-group {
  float: left;
  padding-top: 15px;
}
.el-button {
  margin-bottom: 10px;
}
</style>

<script>
import moment from "moment"
import Eventstable from "@/components/Eventstable.vue";
export default {
  name: "Backlog",
  components: { Eventstable },
  data() {
    return {
      count: 0,
      backlogForm: {
        radios: [
          {
            id: 1,
            text: "高"
          },
          {
            id: 2,
            text: "中"
          },
          {
            id: 3,
            text: "低"
          }
        ],
        textarea: "",
        date: '',
        radio: "",
        options: [
          {
            selectValue: "A",
            label: "A"
          },
          {
            selectValue: "B",
            label: "B"
          },
          {
            selectValue: "C",
            label: "C"
          },
          {
            selectValue: "D",
            label: "D"
          },
          {
            selectValue: "E",
            label: "E"
          }
        ],
        selectValue: ""
      },
      rules: {

      },
    };
  },
  methods: {
    submitForm() {
      this.$store.dispatch('changeId');
      this.$store.dispatch("addItem", {backLogId:this.$store.state.backLogId,name:this.$store.state.userName,content:this.backlogForm.textarea,date:moment(this.backlogForm.date).format("YYYY-MM-DD"),hurry:this.backlogForm.radio,hasFinish:false});
      this.$emit("crea");
    },
    deleteBacklog(){
      this.$emit("del");
    },
    finishBacklog(){
      this.$emit("fini");
    },
    refreshTable(tag){
      this.$refs.Eventstable.refreshTable(tag);
    },
    cleanForm(){
       this.backlogForm.textarea = '';
       this.backlogForm.date = '';
       this.backlogForm.selectValue = '';
       this.backlogForm.radio = '';
    }
  }
};
</script>
