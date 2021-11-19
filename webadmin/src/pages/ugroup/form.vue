<template>
	<a-card :body-style="{padding: '24px 32px'}" :bordered="false">
			<a-form-model 
				:model="row" 
				:label-col="labelCol" 
				:wrapper-col="wrapperCol"
				ref="ruleForm"
				:rules="rules"
			>
			
				<a-form-model-item ref="group_name" label="用户组名称" prop="group_name" :wrapperCol="{span: 5, offset: 0}">
					<a-input v-model="row.group_name" @blur="() => {$refs.group_name.onFieldBlur();}" />
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
				group_id: this.$route.query.group_id,
				row: {},
				rules: {
					group_name: [
					  { required: true, message: '请输入用户组名称', trigger: 'blur' }
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
			this.group_id = this.$route.query.group_id
			this.init()
		},
		methods: {
			init() {
				if (!this.group_id) {
					this.row = {}
				} else {
					API.ugroup_find({
						'group_id': this.group_id
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

					if (this.row.group_id) {
						API.ugroup_update(this.row).then((res) => {
							if (res.data.status == 0) {
								this.$message.success(res.data.msg)
								this.$router.go(-1);
							}
						})

					} else {
						API.ugroup_add(this.row).then((res) => {
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
