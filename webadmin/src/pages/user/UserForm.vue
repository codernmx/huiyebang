<template>
	<a-card :body-style="{padding: '24px 32px'}" :bordered="false">
		<a-form-model :model="row" :label-col="labelCol" :wrapper-col="wrapperCol" ref="ruleForm" :rules="rules">

			<a-form-model-item ref="username" label="用户名" prop="username" :wrapperCol="{span: 5, offset: 0}">
				<a-input v-model="row.username" @blur="() => {$refs.username.onFieldBlur();}" />
			</a-form-model-item>

			<a-form-model-item ref="nickname" label="昵称" prop="nickname" :wrapperCol="{span: 5, offset: 0}">
				<a-input v-model="row.nickname" @blur="() => {$refs.nickname.onFieldBlur();}" />
			</a-form-model-item>

			<a-form-model-item ref="password" label="密码" prop="password" :wrapperCol="{span: 5, offset: 0}">
				<a-input v-model="row.password" />
<!--				@blur="() => {$refs.password.onFieldBlur();}-->
			</a-form-model-item>

			<a-form-model-item ref="avatar" label="头像" prop="avatar">
				<a-upload name="file" list-type="picture-card" class="avatar-uploader" :show-upload-list="false"
					:action="FILE + '/public/upload'" :before-upload="beforeUpload"
					@change="handleChange">
					<img v-if="row.avatar" :src=" row.avatar" alt="avatar" />
					<div v-else>
						<a-icon :type="loading ? 'loading' : 'plus'" />
						<div class="ant-upload-text">
							上传头像
						</div>
					</div>
				</a-upload>

			</a-form-model-item>

			<a-form-model-item ref="sex" label="性别" prop="sex">
				<a-radio-group v-model="row.sex">
					<a-radio :value="0">男</a-radio>
					<a-radio :value="1">女</a-radio>
					<a-radio :value="2">未知</a-radio>
				</a-radio-group>
			</a-form-model-item>

			<a-form-model-item ref="phone" label="手机号码" prop="phone" :wrapperCol="{span: 5, offset: 0}">
				<a-input v-model="row.phone" @blur="() => {$refs.phone.onFieldBlur();}" />
			</a-form-model-item>

			<a-form-model-item ref="UserStatus" label="状态" prop="UserStatus" :wrapperCol="{span: 5, offset: 0}">
				<Common-Selector type="UserStatus" v-model="row.status"></Common-Selector>
			</a-form-model-item>

			<a-form-model-item ref="realname" label="真实姓名" prop="realname">
				<a-input v-model="row.realname" @blur="() => {$refs.realname.onFieldBlur();}" />
			</a-form-model-item>

			<a-form-model-item ref="birthday" label="生日" prop="birthday" :wrapperCol="{span: 5, offset: 0}">
				<a-date-picker v-model="row.birthday" show-time type="date" placeholder="" style="width: 100%;" />
			</a-form-model-item>

			<a-form-model-item ref="email" label="Email" prop="email">
				<a-input v-model="row.email" @blur="() => {$refs.email.onFieldBlur();}" />
			</a-form-model-item>

			<a-form-model-item ref="address" label="地址" prop="address">
				<a-input v-model="row.address" type="textarea" @blur="() => {$refs.address.onFieldBlur();}" />
			</a-form-model-item>

			<a-form-model-item ref="sumary" label="个人简介" prop="sumary">
				<a-input v-model="row.sumary" type="textarea" @blur="() => {$refs.sumary.onFieldBlur();}" />
			</a-form-model-item>

			<a-form-model-item ref="school" label="毕业院校" prop="school">
				<a-input v-model="row.school" @blur="() => {$refs.school.onFieldBlur();}" />
			</a-form-model-item>
			
			<a-form-model-item ref="group_id" label="用户组" prop="group_id" :wrapperCol="{span: 5, offset: 0}">
				<Query-Selector pageSize="99" :remote_func="ugroup_page" value_field="group_id" name_field="group_name"
					search_field="group_name" v-model="row.group_id"></Query-Selector>
			</a-form-model-item>

			<a-form-model-item style="margin-top: 24px" :wrapperCol="{span: 10, offset: 7}">
				<a-button @click="save" type="primary" style="margin-left: 8px">保存</a-button>
			</a-form-model-item>
		</a-form-model>
	</a-card>
</template>

<script>
	import { API } from '@/services'
	import { FILE,FILE2 } from '@/services/api.js'
	
	import CommonSelector from '@/components/input/CommonSelector'
	import QuerySelector from '@/components/input/QuerySelector'

	export default {
		name: 'BasicForm',
		components: {
			CommonSelector,
			QuerySelector
		},

		mounted() {
			this.init();
		},
		data() {
			return {
				FILE: FILE,
				labelCol: {
					span: 4
				},
				wrapperCol: {
					span: 10
				},
				uid: this.$route.query.uid,
				row: {},
				rules: {
					username: [{
							required: true,
							message: '请输入用户名',
							trigger: 'blur'
						}
						// { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' }
					],
					nickname: [{
							required: true,
							message: '请输入昵称',
							trigger: 'blur'
						}
						// { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' }
					],
					// password: [{
					// 		required: true,
					// 		message: '请输入密码',
					// 		trigger: 'blur'
					// 	}
					// 	// { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' }
					// ]
				},
				ugroup_page: API.ugroup_page,
				loading: false,
				imageUrl: ''
			}
		},
		computed: {
			desc() {
				return ''
			}
		},
		activated() {
			this.uid = this.$route.query.uid
			this.init()
		},
		methods: {
			init() {
				if (!this.uid) {
					this.row = {}
				} else {
					API.user_find({
						'uid': this.uid
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

					if (this.row.uid) {
						API.user_update(this.row).then((res) => {
							if (res.data.status == 0) {
								this.$message.success(res.data.msg)
								this.$router.go(-1);
							}
						})

					} else {
						API.user_add(this.row).then((res) => {
							if (res.data.status == 0) {
								this.$message.success(res.data.msg)
								this.$router.go(-1);
							}
						})
					}
				});
			},
			handleChange(info) {
				if (info.file.status === 'uploading') {
					this.loading = true;
					return;
				}
				if (info.file.status === 'done') {
					// Get this url from response in real world.
					// this.getBase64(info.file.originFileObj, imageUrl => {
						this.row.avatar = FILE2 + info.file.response.data.url || '';
					// 	this.loading = false;
					// });
				}
			},
			beforeUpload(file) {
				// const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
				// if (!isJpgOrPng) {}
				
				const isLt2M = file.size / 1024 / 1024 < 2;
				if (!isLt2M) {
					this.$message.error('图片最大不超过2M!');
				}
				// return isJpgOrPng && isLt2M;
				return isLt2M;
			},
			getBase64(img, callback) {
				const reader = new FileReader();
				reader.addEventListener('load', () => callback(reader.result));
				reader.readAsDataURL(img);
			}

		}
	}
</script>

<style scoped>

</style>
