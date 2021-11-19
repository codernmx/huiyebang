<template>
  <a-card :body-style="{padding: '24px 32px'}" :bordered="false">
    <a-form>
        
      <a-form-item hidden
        label="唯一id"
        :labelCol="{span: 7}"
        :wrapperCol="{span: 10}"
      >
        <a-input hidden v-model="row.user_id" />
      </a-form-item>

      <a-form-item 
        label="关联用户"
        :labelCol="{span: 7}"
        :wrapperCol="{span: 10}"
      >
        <a-input  v-model="row.uid" />
      </a-form-item>

      <a-form-item 
        label="用户名"
        :labelCol="{span: 7}"
        :wrapperCol="{span: 10}"
      >
        <a-input  v-model="row.user_name" />
      </a-form-item>

      <a-form-item 
        label="密码"
        :labelCol="{span: 7}"
        :wrapperCol="{span: 10}"
      >
        <a-input  v-model="row.passwd" />
      </a-form-item>

      <a-form-item 
        label="账户名"
        :labelCol="{span: 7}"
        :wrapperCol="{span: 10}"
      >
        <a-input  v-model="row.cpid" />
      </a-form-item>

      <a-form-item 
        label="校验秘钥"
        :labelCol="{span: 7}"
        :wrapperCol="{span: 10}"
      >
        <a-input  v-model="row.cpkey" />
      </a-form-item>

      <a-form-item 
        label="回调地址"
        :labelCol="{span: 7}"
        :wrapperCol="{span: 10}"
      >
        <a-input  v-model="row.callback_url" />
      </a-form-item>

      <a-form-item 
        label="备注"
        :labelCol="{span: 7}"
        :wrapperCol="{span: 10}"
      >
        <a-input  v-model="row.remark" />
      </a-form-item>

      <a-form-item 
        label="白名单地址"
        :labelCol="{span: 7}"
        :wrapperCol="{span: 10}"
      >
        <a-input  v-model="row.white_ip" />
      </a-form-item>

        <a-form-item style="margin-top: 24px" :wrapperCol="{span: 10, offset: 7}">
            <a-button @click="save" type="primary" style="margin-left: 8px">保存</a-button>
        </a-form-item>
    </a-form>
  </a-card>
</template>

<script>
import {API} from '@/services'
export default {
  name: 'BasicForm',
   mounted()  {
    this.init();
  },
  data () {
    return {
      user_id: this.$route.query.user_id,
      row:{}
    }
  },
    activated() {
      this.uid = this.$route.query.uid
      this.init()
    },
  methods: {
    init() {
      if (!this.user_id){
         this.row = {}
       }else {
          API.ecuser_find({'user_id':this.user_id}).then((res) =>{
            if(res.data.status == 0){
              this.row = res.data.data
            }
        })
        }
    },
    save() {
        if (this.row.user_id) {
            API.ecuser_update(this.row).then((res) => {
                if (res.data.status == 0) {
                    this.$message.success(res.data.msg)
                }
            })

        } else {
            API.ecuser_add(this.row).then((res) => {
                if (res.data.status == 0) {
                    this.$message.success(res.data.msg)
                }
            })

        }
    }
  }
}
</script>

<style scoped>

</style>