<template>
      <a-card :bordered="false">
        <detail-list title="用户表详情">

          <detail-list-item term="唯一id">{{row['user_id']}}</detail-list-item>
          <detail-list-item term="关联用户">{{row['uid']}}</detail-list-item>
          <detail-list-item term="用户名">{{row['user_name']}}</detail-list-item>
          <detail-list-item term="密码">{{row['passwd']}}</detail-list-item>
          <detail-list-item term="账户名">{{row['cpid']}}</detail-list-item>
          <detail-list-item term="校验秘钥">{{row['cpkey']}}</detail-list-item>
          <detail-list-item term="回调地址">{{row['callback_url']}}</detail-list-item>
          <detail-list-item term="备注">{{row['remark']}}</detail-list-item>
          <detail-list-item term="白名单地址">{{row['white_ip']}}</detail-list-item>

          
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
      user_id: this.$route.query.user_id,
      row:{}
    }
  },
  methods: {
    init() {
      API.ecuser_find({'user_id':this.user_id}).then((res) =>{
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