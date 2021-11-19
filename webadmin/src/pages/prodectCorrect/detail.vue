<template>
      <a-card :bordered="false">
        <detail-list title="详情">

          <detail-list-item term="作品名称">{{row['name']}}</detail-list-item>
          <!-- <detail-list-item term="作者">{{row['author']}}</detail-list-item> -->
          <detail-list-item term="作品简介">{{row['summary']}}</detail-list-item>
		   <detail-list-item term="批改教师">{{row['created_man']}}</detail-list-item>
          <detail-list-item term="作品图片">
			  <img class="pics-item" :src="row['pics']" />
		  </detail-list-item>
          <detail-list-item term="作品批语">{{row['comment']}}</detail-list-item>
          <detail-list-item term="附件">{{row['attachment']}}</detail-list-item>
          <detail-list-item term="批改时间">{{row['created_time']}}</detail-list-item>
		  
          
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
      cs_id: this.$route.query.cs_id,
      row:{}
    }
  },
  methods: {
    init() {
      API.compositioncorrection_find({'ct_id':this.ct_id}).then((res) =>{
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
  .pics-item{
	  width: 400px;
  }
</style>