<template>
      <a-card :bordered="false">
        <detail-list title="详情">

          <detail-list-item term="提现申请人">{{row['nickname']}}</detail-list-item>
          <detail-list-item term="申请提现金额">{{row['money']}}</detail-list-item>
          <detail-list-item term="提现账户信息">{{row['cash_account']}}</detail-list-item>
          <detail-list-item term="备注信息">{{row['remark']}}</detail-list-item>
          <detail-list-item term="提现状态">{{row['status_f']}}</detail-list-item>

          
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
      ac_id: this.$route.query.ac_id,
      row:{}
    }
  },
  methods: {
    init() {
      API.applycash_find({'ac_id':this.ac_id}).then((res) =>{
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