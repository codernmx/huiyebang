<template>
	<a-card>
		<div :class="advanced ? 'search' : null">
			<a-form layout="horizontal">
				<div :class="advanced ? '': 'fold'" class="fold1">
					<a-row>
						<a-col :md="8" :sm="24">
							<a-form-item label="用户名" :labelCol="{span: 5}" :wrapperCol="{span: 18, offset: 1}">
								<a-input placeholder="请输入" v-model="query['username']" />
							</a-form-item>
						</a-col>
						<a-col :md="8" :sm="24">
							<a-form-item label="用户状态" :labelCol="{span: 5}" :wrapperCol="{span: 18, offset: 1}"> 
								<Common-Selector type="UserStatus" v-model="query.status"></Common-Selector>
							</a-form-item>
						</a-col>
					</a-row>

				</div>
				<span style="float: right; margin-top: 3px;">
					<a-button type="primary" @click="init()">查询</a-button>
					<a-button style="margin-left: 8px" @click="query={},init()">重置</a-button>
					<a-button style="margin-left: 8px">
						<router-link :to="{path:'/user/UserForm'}" key="0">新增</router-link>
					</a-button>
					<a @click=" toggleAdvanced" style="margin-left: 8px">
						{{advanced ? '收起' : '展开'}}
						<a-icon :type="advanced ? 'up' : 'down'" />
					</a>
				</span>
			</a-form>
		</div>
		<div>
			<!-- <a-space class="operator">
			   <a-button @click="addNew" type="primary">新建</a-button>
			   <a-button>批量操作</a-button>
			   <a-dropdown>
				   <a-menu @click="handleMenuClick" slot="overlay">
					   <a-menu-item key="delete">删除</a-menu-item>
					   <a-menu-item key="audit">审批</a-menu-item>
				   </a-menu>
				   <a-button>
					    更多操作
					   <a-icon type="down"/>
				   </a-button>
				</a-dropdown>
		    </a-space> -->
			<standard-table :columns="columns" :rowKey="'uid'" :pagination.sync="pagination" :dataSource="dataSource"
				:selectedRows.sync="selectedRows" @clear="onClear" @change="onChange"
				@selectedRowChange="onSelectChange">
				<div slot="description" slot-scope="{text}">
					{{text}}
				</div>
				<div slot="action" slot-scope="{text, record}">
					<template v-if="record.status == -1">
						<a style="margin-right: 8px" @click="updateUser({'uid':record.uid,'status':1})">
							<a-icon type="edit" />
							启用
						</a>
					</template>
					<template v-if="record.status == 1">
						<a style="margin-right: 8px" @click="updateUser({'uid':record.uid,'status':-1})">
							<a-icon type="edit" />
							停用
						</a>
					</template>
					<router-link :to="{path:'/user/UserForm',query: { uid: record.uid}}" :key="record.uid">
						<a-icon type="edit" />编辑
					</router-link>

					<a style="margin-right: 8px" @click="deleteUser({'uid':record.uid})">
						<a-icon type="delete" />
						删除
					</a>
				</div>
				<template slot="statusTitle">
					<a-icon @click.native="onStatusTitleClick" type="info-circle" />
				</template>
			</standard-table>
		</div>
	</a-card>
</template>

<script>
	import StandardTable from '@/components/table/StandardTable'
	import CommonSelector from '@/components/input/CommonSelector'
	import {
		API
	} from "@/services";

	const columns = [{
			title: 'uid',
			dataIndex: 'uid'
		},
		{
			title: '用户名',
			dataIndex: 'username'
		},
		{
			title: '昵称',
			dataIndex: 'nickname'
		}
	]

	const dataSource = []
	export default {
		name: 'Page',
		components: {
			StandardTable,
			CommonSelector
		},
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
		activated() {
			// this.init()
		},
		authorize: {
			deleteRecord: 'delete'
		},
		methods: {
			init() {
				this.query.pageSize = this.pagination.pageSize
				this.query.page = this.pagination.current
				API.user_page(this.query).then(res => {
					if (res.data.status == 0) {
						this.dataSource = res.data.data.list
						this.pagination.total = res.data.data.page.total
						this.pagination.current = res.data.data.page.page
					}
				})
			},
			deleteRecord(key) {
				this.dataSource = this.dataSource.filter(item => item.uid !== key)
				this.selectedRows = this.selectedRows.filter(item => item.uid !== key)
			},
			toggleAdvanced() {
				this.advanced = !this.advanced
			},
			remove() {
				this.dataSource = this.dataSource.filter(item => this.selectedRows.findIndex(row => row.key === item
					.key) === -1)
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
			updateUser(data) {
				API.user_update(data).then(res => {
					if (res.data.status == 0) {
						this.$message.success(res.data.msg)
					}
					this.init()
				})
			},
			deleteUser(data) {
				API.user_delete(data).then(res => {
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
		// margin-bottom: 54px;
	}

	.fold {
		width: calc(100% - 216px);
		display: inline-block;
	}

	.fold1{
		width: calc(100% - 300px);
		display: inline-block;
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
