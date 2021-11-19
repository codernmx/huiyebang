<template>
      <a-card :bordered="false">
        <detail-list title="详情">

          <detail-list-item term="用户名">{{row['username']}}</detail-list-item>
          <detail-list-item term="操作金额">{{row['money']}}</detail-list-item>
          <detail-list-item term="日志类型">{{row['type']}}</detail-list-item>
          <detail-list-item term="操作前金额">{{row['balance_before']}}</detail-list-item>
          <detail-list-item term="操作完成金额">{{row['balance_end']}}</detail-list-item>
          <detail-list-item term="操作原因">{{row['reason']}}</detail-list-item>

          
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
      lb_id: this.$route.query.lb_id,
      row:{}
    }
  },
  methods: {
    init() {
      API.logbalance_find({'lb_id':this.lb_id}).then((res) =>{
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