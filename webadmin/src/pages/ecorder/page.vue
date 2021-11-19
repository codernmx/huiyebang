<template>
    <a-card>
        <div :class="advanced ? 'search' : null">
            <a-form layout="horizontal">
                <div :class="advanced ? null: 'fold'">
                    <a-row>
                        <a-col :md="8" :sm="24">
                            <a-form-item
                                    label="订单号"
                                    :labelCol="{span: 5}"
                                    :wrapperCol="{span: 18, offset: 1}"
                            >
                                <a-input placeholder="请输入" v-model="query['order_id']"/>
                            </a-form-item>
                        </a-col>
                        <a-col :md="8" :sm="24">
                            <a-form-item
                                    label="订单状态"
                                    :labelCol="{span: 5}"
                                    :wrapperCol="{span: 18, offset: 1}"
                            >
                                <Common-Selector type="orderState" v-model="query.order_state"></Common-Selector>
                            </a-form-item>
                        </a-col>
                        <a-col :md="8" :sm="24">
                            <a-form-item
                                    label="回调状态"
                                    :labelCol="{span: 5}"
                                    :wrapperCol="{span: 18, offset: 1}"
                            >
                                <Common-Selector type="OrderNotifyState" v-model="query.notify_state"></Common-Selector>
                            </a-form-item>
                        </a-col>
                    </a-row>
                           <a-row v-if="advanced">
                        <a-col :md="8" :sm="24">
                            <a-form-item
                                    label="充值号码"
                                    :labelCol="{span: 5}"
                                    :wrapperCol="{span: 18, offset: 1}"
                            >
                                <a-input placeholder="请输入" v-model="query['charge_account']"/>
                            </a-form-item>
                        </a-col>
                        <a-col :md="8" :sm="24">
                            <a-form-item
                                    label="处理设备id"
                                    :labelCol="{span: 5}"
                                    :wrapperCol="{span: 18, offset: 1}"
                            >
                                 <Common-Selector type="OrderHandleTerminal" v-model="query.handle_terminal"></Common-Selector>
                            </a-form-item>
                        </a-col>
                    </a-row>

                </div>
                <span style="float: right; margin-top: 3px;">
          <a-button type="primary" @click="init()">查询</a-button>
          <a-button style="margin-left: 8px" @click="query={},init()">重置</a-button>
          <a @click="toggleAdvanced" style="margin-left: 8px">
            {{advanced ? '收起' : '展开'}}
            <a-icon :type="advanced ? 'up' : 'down'"/>
          </a>
        </span>
            </a-form>
        </div>
        <div>
            <!--            <a-space class="operator">-->
            <!--                <a-button @click="addNew" type="primary">新建</a-button>-->
            <!--                <a-button>批量操作</a-button>-->
            <!--                <a-dropdown>-->
            <!--                    <a-menu @click="handleMenuClick" slot="overlay">-->
            <!--                        <a-menu-item key="delete">删除</a-menu-item>-->
            <!--                        <a-menu-item key="audit">审批</a-menu-item>-->
            <!--                    </a-menu>-->
            <!--                    <a-button>-->
            <!--                        更多操作-->
            <!--                        <a-icon type="down"/>-->
            <!--                    </a-button>-->
            <!--                </a-dropdown>-->
            <!--            </a-space>-->
            <standard-table
                    :columns="columns"
                    :rowKey="'order_id'"
                    :pagination.sync="pagination"
                    :dataSource="dataSource"
                    :selectedRows.sync="selectedRows"
                    @clear="onClear"
                    @change="onChange"
                    @selectedRowChange="onSelectChange"
            >
                <div slot="description" slot-scope="{text}">
                    {{text}}
                </div>
                <div slot="action" slot-scope="{text, record}">
                    <a style="margin-right: 8px" @click="updateOrder({'order_id':record.order_id,'order_state':3})">
                        <a-icon type="edit"/>
                        失败
                    </a>
                    <a style="margin-right: 8px" @click="updateOrder({'order_id':record.order_id,'order_state':2})">
                        <a-icon type="edit"/>
                        成功
                    </a>
                    <a style="margin-right: 8px" @click="updateOrder({'order_id':record.order_id,'order_state':1})">
                        <a-icon type="edit"/>
                        重处理
                    </a>
                    <a style="margin-right: 8px" @click="updateOrder({'order_id':record.order_id,'notify_state':0})">
                        <a-icon type="edit"/>
                        回调
                    </a>
                    <router-link :to="{path:'/ecorder/EcorderDetail',query: {order_id: record.order_id}}">详情
                    </router-link>
                </div>
                <template slot="statusTitle">
                    <a-icon @click.native="onStatusTitleClick" type="info-circle"/>
                </template>
            </standard-table>
        </div>
    </a-card>
</template>

<script>
    import StandardTable from '@/components/table/StandardTable'
    import CommonSelector from '@/components/input/CommonSelector'
    import {ecorder_page, ecorder_update} from "@/services";

    const columns = [
        {
            title: '订单编号',
            dataIndex: 'order_id'
        },
        {
            title: '订单类型',
            dataIndex: 'order_type',
            scopedSlots: {customRender: 'description'}
        },
        {
            title: '下游账号',
            dataIndex: 'cpid',
        },
        {
            title: '下游订单号',
            dataIndex: 'customer_order_no',
            width: 200
        },
        {
            title: '充值金额',
            dataIndex: 'charge_amount',
        },
        {
            title: '充值账号',
            dataIndex: 'charge_account',
        },
        {
            title: '订单状态',
            dataIndex: 'order_state_f',
            width: 80
        },
        {
            title: '回调状态',
            dataIndex: 'notify_state_f',
            width: 80
        },
        {
            title: '上游订单',
            dataIndex: 'outer_order_id',
        },
        {
            title: '创建时间',
            dataIndex: 'create_time_f',
        },
        {
            title: '完成时间',
            dataIndex: 'finish_time_f',
        },
        {
            dataIndex: 'status',
            needTotal: true,
            slots: {title: 'statusTitle'}
        },
        {
            title: '操作',
            scopedSlots: {customRender: 'action'},
            width: 160
        }
    ]

    const dataSource = []
    export default {
        name: 'Page',
        components: {StandardTable, CommonSelector},
        data() {
            return {
                advanced: true,
                columns: columns,
                dataSource: dataSource,
                selectedRows: [],
                query: {},
                pagination: {
                    current: 1,
                    pageSize: 30,
                    total: 0,
                    showSizeChanger: true,
                    showLessItems: true,
                    showQuickJumper: true

                }
            }
        },
        mounted() {
            this.init()

        },
        authorize: {
            deleteRecord: 'delete'
        },
        methods: {
            init() {
                this.query.pageSize = this.pagination.pageSize
                this.query.page = this.pagination.current
                ecorder_page(this.query).then(res => {
                    if (res.data.status == 0) {
                        this.dataSource = res.data.data.list
                        this.pagination.total = res.data.data.page.total
                        this.pagination.current = res.data.data.page.page
                    }
                })
            },
            deleteRecord(key) {
                this.dataSource = this.dataSource.filter(item => item.order_id !== key)
                this.selectedRows = this.selectedRows.filter(item => item.order_id !== key)
            },
            toggleAdvanced() {
                this.advanced = !this.advanced
            },
            remove() {
                this.dataSource = this.dataSource.filter(item => this.selectedRows.findIndex(row => row.key === item.key) === -1)
                this.selectedRows = []
            },
            onClear() {
                this.$message.info('您清空了勾选的所有行')
            },
            onStatusTitleClick() {
                this.$message.info('你点击了状态栏表头')
            },
            onChange(pagination) {
                console.log("onchange", this.pagination, pagination, this.selectedRows)
                this.pagination = pagination
                this.init()
            },
            onSelectChange() {
                this.$message.info('选中行改变了')

            },

            handleMenuClick(e) {
                if (e.key === 'delete') {
                    this.remove()
                }
            },
            updateOrder(data) {
                ecorder_update(data).then(res => {
                    if (res.data.status == 0) {
                        this.$message.success(res.data.msg)
                    }
                    this.init()
                })
            }
        }
    }
</script>

<style lang="less" scoped>
    .search {
        margin-bottom: 54px;
    }

    .fold {
        width: calc(100% - 216px);
        display: inline-block
    }

    .operator {
        margin-bottom: 18px;
    }

    @media screen and (max-width: 900px) {
        .fold {
            width: 100%;
        }
    }
</style>
