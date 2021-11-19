<template>
      <a-card :bordered="false">
        <detail-list title="详情">

          <detail-list-item term="">{{row['group_id']}}</detail-list-item>
          <detail-list-item term="">{{row['group_name']}}</detail-list-item>

          
        </detail-list>
      </a-card>
</template>

<script>
import DetailList from '../../components/tool/DetailList'

const DetailListItem = DetailList.Item
import {API} from '@/services'

export default {
  name: 'detail',
  components: { DetailListItem, DetailList},
  mounted()  {
    this.init();
  },
  data () {
    return {
      group_id: this.$route.query.group_id,
      row:{}
    }
  },
  methods: {
    init() {
      API.ugroup_find({'group_id':this.group_id}).then((res) =>{
        if(res.data.status == 0){
          this.row = res.data.data
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
  .title {
    color: @title-color;
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 16px;
  }
</style>