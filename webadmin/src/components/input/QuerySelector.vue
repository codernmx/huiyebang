<template>
<!--:remote-method="remoteMethod"-->
    <a-select
            show-search
            v-model="comp" @change="toldparent"
              @search="handleSearch"
              placeholder="请选择">
        <a-select-option
                v-for="item in options1"
                :key="item.value" :value="item.value">{{item.name}}
        </a-select-option>
    </a-select>
</template>

<script>

    export default {
        name: 'QuerySelector',
        data() {
            return {
                selected: {},
                loading: false,
                value9: '',
                options1: []
            }
        },
        props: {
            value: {
                type: String,
                default: () => {
                    return ''
                }
            },
            remote_func: Function,
            search_field: String,
            value_field: String,
            name_field: String,
            pageSize: {
                value: {
                    type: String,
                    default: () => {
                        return ''
                    }
                },
            }
        },
            computed: {
                comp: {
                    get: function () {
                        return this.value
                    },
                    set: function () {
                    }
                }
            },

            methods: {
                toldparent(res) {
                    this.$emit('update:value', res)
                    this.$emit('input', res)
                },
                remoteMethod(searchvalue) {

                    var query = {}
                    if (searchvalue){
                        query[this.search_field] = searchvalue
                    }
                    this.remote_func(query).then(re => {
                        this.options1 = []
                        if (re.data.status == 0 && re.data.data.list) {
                            for (let i = 0; i < re.data.data.list.length; i++) {
                                this.options1.push({
                                    name: re.data.data.list[i][this.name_field],
                                    value: re.data.data.list[i][this.value_field]
                                })
                            }

                        }
                    })
                },
                handleSearch(value) {
                    console.log(value)
                    this.remoteMethod(value)
                }
            },
            created() {
            console.log(this.remote_func)
                this.remoteMethod(null);
            }
        }
</script>
