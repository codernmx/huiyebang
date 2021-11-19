<template>
	<a-card>
		<div :class="advanced ? 'search' : null">
			<a-form layout="horizontal">
				<div :class="advanced ? '': 'fold'" class="fold1">
					<a-row>
						<a-col :md="8" :sm="24">
							<a-form-item label="角色名" :labelCol="{span: 5}" :wrapperCol="{span: 18, offset: 1}">
								<a-input placeholder="请输入" v-model="query['role_name']" />
							</a-form-item>
						</a-col>
					</a-row>

				</div>
				<span style="float: right; margin-top: 3px;">
					<a-button type="primary" @click="init()">查询</a-button>
					<a-button style="margin-left: 8px" @click="query={},init()">重置</a-button>
					<a-button style="margin-left: 8px">
						<router-link :to="{path:'/admin/roleForm'}" key="0">新增</router-link>
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
			<standard-table :columns="columns" :rowKey="'role_id'" :pagination.sync="pagination" :dataSource="dataSource"
				:selectedRows.sync="selectedRows" @clear="onClear" @change="onChange"
				@selectedRowChange="onSelectChange">
				<div slot="description" slot-scope="{text}">
					{{text}}
				</div>
				<div slot="action" slot-scope="{text, record}">
					<a style="margin-right: 8px" @click="showModal(record)">
						<a-icon type="edit" />
						关联规则
					</a>
					
					<router-link :to="{path:'/admin/roleForm',query: { role_id: record.role_id}}" :key="record.role_id">
						<a-icon type="edit" />编辑
					</router-link>

					<a style="margin-right: 8px" @click="deleteUser({'role_id':record.role_id})">
						<a-icon type="delete" />
						删除
					</a>
				</div>
				<template slot="statusTitle">
					<a-icon @click.native="onStatusTitleClick" type="info-circle" />
				</template>
			</standard-table>
			
			<a-modal v-model="visible" :title="sortRow.role_name" on-ok="handleOk">
				<template slot="footer">
					<a-button key="back" @click="handleCancel">
					  取消
					</a-button>
					<a-button key="submit" type="primary" :loading="loading" @click="handleOk">
					  确定
					</a-button>
				</template>
				
				<template>
					<a-transfer
						:data-source="mockData"
						:titles="['所有规则', '角色规则']"
						:target-keys="targetKeys"
						:selected-keys="selectedKeys"
						:render="item => item.title"
						:disabled="disabled"
						@change="handleChange"
						@selectChange="handleSelectChange"
						@scroll="handleScroll"
					/>
				</template>
			
			</a-modal>
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
			title: 'role_id',
			dataIndex: 'role_id'
		},
		{
			title: '角色名称',
			dataIndex: 'role_name'
		},
		{
			title: '操作',
			width: 250,
			scopedSlots: {
				customRender: 'action'
			}
		}

	]

	const dataSource = []
	export default {
		name: 'Page',
		components: {
			StandardTable
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
				},
				
				loading: false,
				visible: false,
				sortRow: {},
				
				mockData: [],
				targetKeys: [],
				selectedKeys: [],
				disabled: false
			}
		},
		activated() {
			this.init()

		},
		authorize: {
			deleteRecord: 'delete'
		},
		methods: {
			handleChange(nextTargetKeys, direction, moveKeys) {
				this.targetKeys = nextTargetKeys;
			},
			handleSelectChange(sourceSelectedKeys, targetSelectedKeys) {
				this.selectedKeys = [...sourceSelectedKeys, ...targetSelectedKeys];
			},
			handleScroll(direction, e) {},
			showModal(row) {
				this.sortRow = row
				this.visible = true;
				
				API.rule_query().then(res => {
					if (res.data.status == 0) {
						let result = res.data.data || []
						let mockData = result.map(item => {
							return {
								key: item.rule_id,
								title: item.tips || ''
							}
						})
						
						this.mockData = mockData
					}
				})
				
				API.rolerule_query({'role_id': this.sortRow.role_id}).then(res => {
					if (res.data.status == 0) {
						let result = res.data.data || []
						let targetKeys = result.map(item => item.rule_id)
						this.targetKeys = targetKeys
					}
				})
			},
			handleOk(e) {
				this.loading = true
				
				API.rolerule_delete({'role_id': this.sortRow.role_id}).then(res => {
					if (res.data.status == 0) {
						API.rolerule_adds({'role_id': this.sortRow.role_id, rule_id: this.targetKeys}).then(res => {
							if (res.data.status == 0) {
								this.$message.success(res.data.msg)
								this.targetKeys = []
								this.selectedKeys = []
							}
							
							this.loading = false
							this.visible = false;
						})
					}
					
					this.loading = false
				})
			},
			handleCancel(e) {
				this.visible = false;
			},
			init() {
				this.query.pageSize = this.pagination.pageSize
				this.query.page = this.pagination.current
				API.role_page(this.query).then(res => {
					if (res.data.status == 0) {
						this.dataSource = res.data.data.list
						this.pagination.total = res.data.data.page.total
						this.pagination.current = res.data.data.page.page
					}
				})
			},
			deleteRecord(key) {
				this.dataSource = this.dataSource.filter(item => item.role_id !== key)
				this.selectedRows = this.selectedRows.filter(item => item.role_id !== key)
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
				API.role_update(data).then(res => {
					if (res.data.status == 0) {
						this.$message.success(res.data.msg)
					}
					this.init()
				})
			},
			deleteUser(data) {
				API.role_delete(data).then(res => {
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
	/deep/ .ant-modal-content {
		width: 800px; 
		height: auto;
	}
	
	/deep/ .ant-transfer-list{
		width: 350px;
		height: 400px;
	}
	
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
