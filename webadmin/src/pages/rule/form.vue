<template>
	<a-card :body-style="{padding: '24px 32px'}" :bordered="false">
			<a-form-model 
				:model="row" 
				:label-col="labelCol" 
				:wrapper-col="wrapperCol"
				ref="ruleForm"
				:rules="rules"
			>
			
				<a-form-model-item ref="tips" label="规则名称" prop="tips" :wrapperCol="{span: 5, offset: 0}">
					<a-input v-model="row.tips" @blur="() => {$refs.tips.onFieldBlur();}" />
			    </a-form-model-item>
				
				<a-form-model-item ref="rule_hash" label="规则" prop="rule_hash" :wrapperCol="{span: 5, offset: 0}">
					<a-input v-model="row.rule_hash" @blur="() => {$refs.rule_hash.onFieldBlur();}" />
				</a-form-model-item>
				<a-form-model-item ref="type" label="类型" prop="type" :wrapperCol="{span: 5, offset: 0}">
					<a-select
						v-model="row.type" 
						placeholder="请选择"
					>
					    <a-select-option
					            v-for="item in typeDict"
					            :key="item.value" :value="item.value">{{item.name}}
					    </a-select-option>
					</a-select>
				</a-form-model-item>
				
				<a-form-model-item style="margin-top: 24px" :wrapperCol="{span: 10, offset: 7}">
					<a-button @click="save" type="primary" style="margin-left: 8px">保存</a-button>
				</a-form-model-item>
		</a-form-model>
	</a-card>
</template>

<script>
	import { API } from '@/services'
	import QuerySelector from '@/components/input/QuerySelector'

	export default {
		name: 'BasicForm',
		components: {
			// QuerySelector
		},
		mounted() {
			this.init();
		},
		data() {
			return {
				labelCol: { span: 4 },
				wrapperCol: { span: 10 },
				rule_id: this.$route.query.rule_id,
				row: {},
				rules: {
					tips: [
					  { required: true, message: '请输入规则名称', trigger: 'blur' }
					  // { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' }
					]
				},
				typeDict: []
			}
		},
		computed: {
			desc() {
				return ''
			}
		},
		activated() {
			this.rule_id = this.$route.query.rule_id
			this.init()
		},
		mounted() {
			this.dict()
		},
		methods: {
			dict() {
				API.public_dict({
					'type': 'rule_type'
				}).then((res) => {
					if (res.data.status == 0) {
						this.typeDict = (res.data.data || [])
					}
				})
			},
			init() {
				if (!this.rule_id) {
					this.row = {}
				} else {
					API.rule_find({
						'rule_id': this.rule_id
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

					if (this.row.rule_id) {
						API.rule_update(this.row).then((res) => {
							if (res.data.status == 0) {
								this.$message.success(res.data.msg)
								this.$router.go(-1);
							}
						})

					} else {
						API.rule_add(this.row).then((res) => {
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
