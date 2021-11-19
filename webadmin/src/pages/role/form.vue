<template>
	<a-card :body-style="{padding: '24px 32px'}" :bordered="false">
			<a-form-model 
				:model="row" 
				:label-col="labelCol" 
				:wrapper-col="wrapperCol"
				ref="ruleForm"
				:rules="rules"
			>
			
				<a-form-model-item ref="role_name" label="角色名" prop="role_name" :wrapperCol="{span: 5, offset: 0}">
					<a-input v-model="row.role_name" @blur="() => {$refs.role_name.onFieldBlur();}" />
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
				role_id: this.$route.query.role_id,
				row: {},
				rules: {
					role_name: [
					  { required: true, message: '请输入角色名', trigger: 'blur' }
					  // { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' }
					]
				}
			}
		},
		computed: {
			desc() {
				return ''
			}
		},
		activated() {
			this.role_id = this.$route.query.role_id
			this.init()
		},
		methods: {
			init() {
				if (!this.role_id) {
					this.row = {}
				} else {
					API.role_find({
						'role_id': this.role_id
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

					if (this.row.role_id) {
						API.role_update(this.row).then((res) => {
							if (res.data.status == 0) {
								this.$message.success(res.data.msg)
								this.$router.go(-1);
							}
						})

					} else {
						API.role_add(this.row).then((res) => {
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
