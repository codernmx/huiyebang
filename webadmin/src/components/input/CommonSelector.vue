<template>

    <a-select v-model="comp" @change="toldparent" :remote-method="remoteMethod" placeholder="请选择">
        <a-select-option
                v-for="item in options1"
                :key="item.value" :value="item.value" >{{item.name}}
        </a-select-option>
    </a-select>
</template>

<script>
    import {API} from '@/services/index'

    export default {
        name: 'CommonSelector',
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
            label: String,
            type: String
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
            remoteMethod() {
                API.public_dict({type: this.type}).then(re => {
                    if (re.data.status==0) {
                        this.options1 = re.data.data;
                    }
                })
            }
        },
        created() {
            this.remoteMethod('');
        },
    }
</script>
