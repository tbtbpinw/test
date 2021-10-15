<template>
  <div>
    <Eventstable
      showWhich="B"
      ref="Eventstable"
      ><template slot-scope="a">
      <p>统计</p>
      <el-tag type="success">{{a.countLow}}</el-tag>
      <el-tag type="info">{{a.countMedia}}</el-tag>
      <el-tag type="warning">{{a.countHigh}}</el-tag>
      </template>
    </Eventstable>
  </div>
</template>

<script>
import Eventstable from "@/components/Eventstable.vue";
export default {
  name: "Alreadybacklog",
  components: { Eventstable },
  data(){
    return{
      count: 0
    }
  },
  methods: {
    refreshTable(tag) {
      this.$refs.Eventstable.refreshTable(tag);
    }
  }
};
</script>
