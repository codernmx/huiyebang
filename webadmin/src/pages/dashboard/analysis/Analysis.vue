<template>
  <div class="analysis">
    <a-row style="margin-top: 0" :gutter="[24, 24]">
      <a-col :sm="24" :md="12" :xl="6">
        <chart-card :loading="loading" title="订单总额" :total="'￥' + charge_amount_success">
          <a-tooltip title="成功的订单总额" slot="action">
            <a-icon type="info-circle-o" />
          </a-tooltip>
          <div>
<!--            <trend style="margin-right: 16px" :term="$t('wow')" :percent="12" :is-increase="true" :scale="0" />-->
<!--            <trend :term="$t('dod')" :target="100" :value="89" :scale="0" />-->
          </div>
          <div slot="footer">日均:<span> ￥{{charge_amount_success_avg}}</span></div>
        </chart-card>
      </a-col>
      <a-col :sm="24" :md="12" :xl="6">
        <chart-card :loading="loading" title="下单数量" :total="order_num">
          <a-tooltip title="已归档完成的单量" slot="action">
            <a-icon type="info-circle-o" />
          </a-tooltip>
          <div>
            <mini-area />
          </div>
          <div slot="footer">日均下单:<span> {{order_num_avg}}</span></div>
        </chart-card>
      </a-col>
      <a-col :sm="24" :md="12" :xl="6">
        <chart-card :loading="loading" title="成功订单" :total="order_num_succed">
          <a-tooltip :title="$t('introduce')" slot="action">
            <a-icon type="info-circle-o" />
          </a-tooltip>
          <div>
            <mini-bar />
          </div>
          <div slot="footer">日均成功: <span>{{avg_order_num_succed}}</span></div>
        </chart-card>
      </a-col>
      <a-col :sm="24" :md="12" :xl="6">
        <chart-card :loading="loading" title="失败金额" :total="'￥'+charge_amount_fail">
          <a-tooltip :title="$t('introduce')" slot="action">
            <a-icon type="info-circle-o" />
          </a-tooltip>
          <div>
            <mini-progress target="90" :percent="success_order_percent" color="#13C2C2" height="8px"/>
          </div>
          <div slot="footer" style="white-space: nowrap;overflow: hidden">
            <trend style="margin-right: 16px" term="订单成功率" :percent="success_order_percent" :is-increase="true" :scale="0" />
            <trend term="订单失败率" :target="100" :percent="fail_order_percent" :value="fail_order_percent" :scale="0" />
          </div>
        </chart-card>
      </a-col>
    </a-row>
    <a-card :loading="loading" style="margin-top: 24px;display:none;" :bordered="false" :body-style="{padding: '24px'}">
      <div class="salesCard">
        <a-tabs default-active-key="1" size="large" :tab-bar-style="{marginBottom: '24px', paddingLeft: '16px'}">
          <div class="extra-wrap" slot="tabBarExtraContent">
            <div class="extra-item">
              <a>{{$t('day')}}</a>
              <a>{{$t('week')}}</a>
              <a>{{$t('month')}}</a>
              <a>{{$t('year')}}</a>
            </div>
            <a-range-picker :style="{width: '256px'}"></a-range-picker>
          </div>
          <a-tab-pane loading="true" :tab="$t('sales')" key="1">
            <a-row>
              <a-col :xl="16" :lg="12" :md="12" :sm="24" :xs="24">
                <bar :title="$ta('stores|sales|trend', 'p')" />
              </a-col>
              <a-col :xl="8" :lg="12" :md="12" :sm="24" :xs="24">
                <ranking-list :title="$ta('stores|sales|ranking', 'p')" :list="rankList"/>
              </a-col>
            </a-row>
          </a-tab-pane>
          <a-tab-pane :tab="$t('visits')" key="2"><a-row>
            <a-col :xl="16" :lg="12" :md="12" :sm="24" :xs="24">
              <bar :title="$ta('visits|trend', 'p')" />
            </a-col>
            <a-col :xl="8" :lg="12" :md="12" :sm="24" :xs="24">
              <ranking-list :title="$ta('stores|visits|ranking', 'p')" :list="rankList"/>
            </a-col>
          </a-row></a-tab-pane>
        </a-tabs>
      </div>
    </a-card>
    <a-row style="margin: 0 -12px;display:none">
      <a-col style="padding: 0 12px" :xl="12" :lg="24" :md="24" :sm="24" :xs="24">
        <a-card :loading="loading" :bordered="false" style="margin-top: 24px" :title="$t('search')">
          <hot-search />
        </a-card>
      </a-col>
      <a-col style="padding: 0 12px" :xl="12" :lg="24" :md="24" :sm="24" :xs="24">
        <a-card :loading="loading" :bordered="false" style="margin-top: 24px;" :title="$t('proportion')">
          <sales-data />
          <a-radio-group slot="extra" style="margin: -12px 0">
            <a-radio-button value="a">{{$t('all')}}</a-radio-button>
            <a-radio-button value="b">{{$t('online')}}</a-radio-button>
            <a-radio-button value="c">{{$t('stores')}}</a-radio-button>
          </a-radio-group>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import ChartCard from '../../../components/card/ChartCard'
import MiniArea from '../../../components/chart/MiniArea'
import MiniBar from '../../../components/chart/MiniBar'
import MiniProgress from '../../../components/chart/MiniProgress'
import Bar from '../../../components/chart/Bar'
import RankingList from '../../../components/chart/RankingList'
import HotSearch from './HotSearch'
import SalesData from './SalesData'
import Trend from '../../../components/chart/Trend'
import {API} from "@/services";

const rankList = []

for (let i = 0; i < 8; i++) {
  rankList.push({
    name: '桃源村' + i + '号店',
    total: 1234.56 - i * 100
  })
}

export default {
  name: 'Analysis',
  i18n: require('./i18n'),
  data () {
    return {
      rankList,
      loading: true,
      charge_amount_success: 0,//所有成功的订单支付金额
      charge_amount_fail: 0,//所有失败的订单支付金额
      days: 0,//统计覆盖几天
      charge_amount_success_avg: 0,//平均日均
      order_num: 0,//下单数量
      order_num_succed: 0,//成功单量
      fail_order_percent: 0,//失败订单率
      success_order_percent: 0,//成功率
      order_num_avg: 0,//日均单量
      avg_order_num_succed: 0,//日均成功单量
    }
  },
  created() {
    this.init()
    setTimeout(() => this.loading = !this.loading, 1000)
  },
  methods: {
    init(){
      API.ecorderhis_analysis({}).then((res) =>{
        if(res.data.status == 0){
          this.charge_amount_success = res.data.data.num.charge_amount_success
          this.charge_amount_fail = res.data.data.num.charge_amount_fail
          this.days = res.data.data.num.days
          this.order_num = res.data.data.num.order_num
          this.order_num_succed = res.data.data.num.order_num_succed
          this.charge_amount_success_avg = res.data.data.num.charge_amount_success_avg
          this.fail_order_percent = res.data.data.num.fail_order_percent
          this.success_order_percent = res.data.data.num.success_order_percent
          this.order_num_avg = res.data.data.num.order_num_avg
          this.avg_order_num_succed = res.data.data.num.avg_order_num_succed
        }

      })


  }
  },

  components: {Trend, SalesData, HotSearch, RankingList, Bar, MiniProgress, MiniBar, MiniArea, ChartCard}
}
</script>

<style lang="less" scoped>
  .extra-wrap{
    .extra-item{
      display: inline-block;
      margin-right: 24px;
      a:not(:first-child){
        margin-left: 24px;
      }
    }
  }
  @media screen and (max-width: 992px){
    .extra-wrap .extra-item{
      display: none;
    }
  }
  @media screen and (max-width: 576px){
    .extra-wrap{
      display: none;
    }
  }

</style>
