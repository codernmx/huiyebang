<template>
	<a-card>
		<div :class="advanced ? 'search' : null">
			<a-form layout="horizontal">
				<div :class="advanced ? '': 'fold'" class="fold1">
					<a-row>
						<a-col :md="8" :sm="24">
							<a-form-item label="作品名称" :labelCol="{span: 5}" :wrapperCol="{span: 18, offset: 1}">
								<a-input placeholder="请输入" v-model="query['name']" />
							</a-form-item>
						</a-col>
						<a-col :md="8" :sm="24">
							<a-form-item label="作品状态" :labelCol="{span: 5}" :wrapperCol="{span: 18, offset: 1}"> 
								<Common-Selector type="UserStatus" v-model="query.status"></Common-Selector>
							</a-form-item>
						</a-col>
					</a-row>

				</div>
				<span style="float: right; margin-top: 3px;">
					<a-button type="primary" @click="init()">查询</a-button>
					<a-button style="margin-left: 8px" @click="query={},init()">重置</a-button>
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
			<standard-table :columns="columns" :rowKey="'ct_id'" :pagination.sync="pagination" :dataSource="dataSource"
				:selectedRows.sync="selectedRows" @clear="onClear" @change="onChange"
				@selectedRowChange="onSelectChange"
			>
				<div slot="cardimageslot" slot-scope="{text}">
					<img style="width:60px;" :src="text" />
				</div>
				
				<div slot="action" slot-scope="{text, record}">
					<template v-if="record.is_recommend != 1">
						<a style="margin-right: 8px" @click="comupdate({'ct_id':record.ct_id, 'is_recommend': 1})">
							<a-icon type="edit" />
							推荐
						</a>
					</template>
					
					<a style="margin-right: 8px" @click="showModal(record)">
						<a-icon type="edit" />
						排序
					</a>
					
					<template v-if="record.is_recommend != 0">
						<a style="margin-right: 8px" @click="comupdate({'ct_id':record.ct_id, 'is_recommend': 0})">
							<a-icon type="edit" />
							下架
						</a>
					</template>
					
					<router-link :to="{path:'/works/worksTeachersDetail',query: { ct_id: record.ct_id}}" :key="record.ct_id">
						<a-icon type="edit" />查看详情
					</router-link>
				</div>
				<template slot="statusTitle">
					<a-icon @click.native="onStatusTitleClick" type="info-circle" />
				</template>
			</standard-table>
			
			
			<a-modal v-model="visible" :title="sortRow.name + '排序'" on-ok="handleOk">
				<template slot="footer">
					<a-button key="back" @click="handleCancel">
					  取消
					</a-button>
					<a-button key="submit" type="primary" :loading="loading" @click="handleOk">
					  确定
					</a-button>
				</template>
				
				<template>
				  <a-input v-model="inputVal" placeholder="输入数字 > 0" />
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

	const columns = [
		{
			title: '作品名称',
			dataIndex: 'name'
		},
		{
			title: '作品图片',
			dataIndex: 'pics',
			scopedSlots: { customRender: 'cardimageslot' }
		},
		{
			title: '作者',
			dataIndex: 'uid'
		},
		{
			title: '作品简介',
			dataIndex: 'summary'
		},
		{
			title: '上传时间',
			dataIndex: 'created_time'
		},
		{
			title: '操作',
			width: 300,
			scopedSlots: {
				customRender: 'action'
			}
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
				},
				loading: false,
				visible: false,
				sortRow: {},
				inputVal: ''
			}
		},
		activated() {
			this.init()
		},
		authorize: {
			deleteRecord: 'delete'
		},
		methods: {
			showModal(row) {
				this.sortRow = row
				this.visible = true;
			},
			handleOk(e) {
				if(!parseInt(this.inputVal || 0)) return false
				
				this.loading = true;
				API.compositionteacher_update({'ct_id': this.sortRow.ct_id, 'is_recommend': parseInt(this.inputVal)}).then(res => {
					if (res.data.status == 0) {
						this.$message.success(res.data.msg)
						this.inputVal = '';
					}
					
					this.visible = false;
					this.loading = false;
					this.init()
				})
			},
			handleCancel(e) {
				this.visible = false;
			},
			init() {
				this.query.pageSize = this.pagination.pageSize
				this.query.page = this.pagination.current
				API.compositionteacher_page(this.query).then(res => {
					if (res.data.status == 0) {
						this.dataSource = res.data.data.list
						this.pagination.total = res.data.data.page.total
						this.pagination.current = res.data.data.page.page
					}
				})
			},
			deleteRecord(key) {
				this.dataSource = this.dataSource.filter(item => item.ct_id !== key)
				this.selectedRows = this.selectedRows.filter(item => item.ct_id !== key)
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
			comupdate(data) {
				API.compositionteacher_update(data).then(res => {
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
