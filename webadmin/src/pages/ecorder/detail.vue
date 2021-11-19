<template>
      <a-card :bordered="false">
        <detail-list title="订单详情">

          <detail-list-item term="订单号">{{row['order_id']}}</detail-list-item>
          <detail-list-item term="订单类型:">{{row['order_type']}}</detail-list-item>
          <detail-list-item term="提交人">{{row['cpid']}}</detail-list-item>
          <detail-list-item term="用户端 订单号">{{row['customer_order_no']}}</detail-list-item>
          <detail-list-item term="创建时间">{{row['create_time_f']}}</detail-list-item>
          <detail-list-item term="购买数量">{{row['buy_num']}}</detail-list-item>
          <detail-list-item term="订单价格">{{row['order_price']}}</detail-list-item>
          <detail-list-item term="充值金额">{{row['charge_amount']}}</detail-list-item>
          <detail-list-item term="订单状态">{{row['order_state_f']}}</detail-list-item>
          <detail-list-item term="完成时间">{{row['finish_time_f']}}</detail-list-item>
          <detail-list-item term="通知状态">{{row['notify_state_f']}}</detail-list-item>
          <detail-list-item term="备注">{{row['remark']}}</detail-list-item>
          <detail-list-item term="订单携带信息">{{row['extra_data']}}</detail-list-item>
          <detail-list-item term="是否退款">{{row['is_refund']}}</detail-list-item>
          <detail-list-item term="充值号码">{{row['charge_account']}}</detail-list-item>
          <detail-list-item term="下发到各终端时间">{{row['send_time']}}</detail-list-item>
          <detail-list-item term="外部系统id 对端充值系统的订单号">{{row['outer_order_id']}}</detail-list-item>
          <detail-list-item term="前端处理设备id">{{row['handle_terminal']}}</detail-list-item>
          <detail-list-item term="前端处理设备">{{row['handle_terminal_f']}}</detail-list-item>
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
      order_id: this.$route.query.order_id,
      row:{}
    }
  },
  methods: {
    init() {
      API.ecorder_find({'order_id':this.order_id}).then((res) =>{
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