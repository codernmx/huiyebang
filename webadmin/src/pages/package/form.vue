<template>
	<a-card :body-style="{padding: '24px 32px'}" :bordered="false">
			<a-form-model 
				:model="row" 
				:label-col="labelCol" 
				:wrapper-col="wrapperCol"
				ref="ruleForm"
				:rules="rules"
			>
			
				<a-form-model-item ref="username" label="套餐名称" prop="name" :wrapperCol="{span: 5, offset: 0}">
					<a-input v-model="row.name" @blur="() => {$refs.name.onFieldBlur();}" />
			    </a-form-model-item>
				
				<a-form-model-item ref="tea_commission" label="教师提成" prop="tea_commission" :wrapperCol="{span: 5, offset: 0}">
					<a-input v-model="row.tea_commission" @blur="() => {$refs.tea_commission.onFieldBlur();}" />
				</a-form-model-item>
				
				<a-form-model-item ref="price" label="套餐价格" prop="price" :wrapperCol="{span: 5, offset: 0}">
					<a-input v-model="row.price" @blur="() => {$refs.price.onFieldBlur();}" />
				</a-form-model-item>
				
				<a-form-model-item ref="status" label="是否启用" prop="status">
					<a-radio-group v-model="row.status">
					    <a-radio :value="1">启用</a-radio>
					    <a-radio :value="0">禁用</a-radio>
					 </a-radio-group>
				</a-form-model-item>
				
				<a-form-model-item ref="content" label="套餐说明" prop="content">
					<a-input v-model="row.content" type="textarea" @blur="() => {$refs.content.onFieldBlur();}" />
				</a-form-model-item>
				
				<a-form-model-item style="margin-top: 24px" :wrapperCol="{span: 10, offset: 7}">
					<a-button @click="save" type="primary" style="margin-left: 8px">保存</a-button>
				</a-form-model-item>
		</a-form-model>
	</a-card>
</template>

<script>
	import { API } from '@/services'

	export default {
		name: 'BasicForm',
		components: {},

		mounted() {
			this.init();
		},
		data() {
			return {
				labelCol: { span: 4 },
				wrapperCol: { span: 10 },
				csm_id: this.$route.query.csm_id,
				row: {},
				rules: {
					name: [
					  { required: true, message: '请输入套餐名称', trigger: 'blur' }
					  // { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' }
					],
					price: [
					  { required: true, message: '请输入套餐价格', trigger: 'blur' }
					  // { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' }
					]
				},
				ugroup_page: API.ugroup_page
			}
		},
		computed: {
			desc() {
				return ''
			}
		},
		activated() {
			this.csm_id = this.$route.query.csm_id
			this.init()
		},
		methods: {
			init() {
				if (!this.csm_id) {
					this.row = {}
				} else {
					API.compositionsetmenu_find({
						'csm_id': this.csm_id
					}).then((res) => {
						if (res.data.status == 0) {
							this.row = (res.data.data || {})
						}
					})
				}
			},
			save() {
				this.$refs.ruleForm.validate(valid => {
					if (!valid) return false

					if (this.row.csm_id) {
						API.compositionsetmenu_update(this.row).then((res) => {
							if (res.data.status == 0) {
								this.$message.success(res.data.msg)
								this.$router.go(-1);
							}
						})

					} else {
						API.compositionsetmenu_add(this.row).then((res) => {
							if (res.data.status == 0) {
								this.$message.success(res.data.msg)
								this.$router.go(-1);
							}
						})
					}
				});
			}
		}
	}
</script>

<style scoped>

</style>
