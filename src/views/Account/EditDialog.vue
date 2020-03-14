<template>
    <el-dialog
            :title="title"
            :visible.sync="visible"
            width="50%"
            :show-close="false"
            :before-close="disclaimerDialogSpace">
        <el-form v-if="visible == true" ref="saveForm" :model="entity" status-icon :rules="rules" label-width="180px">
            <el-form-item label='房屋编号：' prop="house_id">
                <el-input v-model.trim="entity.house_id" placeholder="请输入房屋编号"></el-input>
            </el-form-item>
            <el-form-item label='缴费时间：' prop="pay_time">
                <el-date-picker
                        v-model.trim="entity.pay_time"
                        type="date"
                        placeholder="选择日期"
                        format="yyyy 年 MM 月 dd 日"
                        value-format="yyyy-MM-dd">
                </el-date-picker>
            </el-form-item>
            <el-form-item label='缴费金额：' prop="pay_num">
                <el-input v-model.trim="entity.pay_num" placeholder="请输入缴费金额"></el-input>
            </el-form-item>
            <el-form-item label='支付方式：' prop="pay_type">
                <el-select v-model="entity.pay_type" placeholder="请选择">
                    <el-option
                            v-for="item in isarrearList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label='缴费人：' prop="master">
                <el-input v-model.trim="entity.master" placeholder="请输入缴费人姓名"></el-input>
            </el-form-item>
            <el-form-item label='费用说明：' prop="pay_desc">
                <el-input v-model.trim="entity.pay_desc" placeholder="请输入费用说明"></el-input>
            </el-form-item>
            <el-form-item label='备注：' prop="comments">
                <el-input v-model.trim="entity.comments" placeholder="请输入备注"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="onOK">确定</el-button>
      </span>
    </el-dialog>
</template>

<script>

    import {validateMobile} from '@/utils/validate'

    export default {
        name: "UserEditor",
        data() {
            return {
                visible: false,
                title: 'editorForm',
                entity: {},
                areaList: [],
                isarrearList:[
                    {
                        value: '0',
                        label: '现金支付'
                    },
                    {
                        value: '1',
                        label: '线上支付'
                    }
                ],
                isShow: true,
                mode: null,
                rules: {
                    house_id: [
                        {required: true, message: '请输入房屋编号', trigger: 'blur'}
                    ],
                    pay_num: [
                        {required: true, message: '请输入缴费金额', trigger: 'blur'}
                    ],
                },
            }
        },
        props: {},
        methods: {
            open(entity, areaList) {
                this.visible = true
                this.areaList = areaList
                this.entity = typeof entity === 'string' ? JSON.parse(entity) : entity
                if (this.entity.id) {
                    this.mode = 'EDIT'
                    this.isShow = false
                    this.title = "修改房屋信息"
                } else {
                    this.mode = 'NEW'
                    this.isShow = true
                    this.title = "新增房屋信息"
                }
            },
            getMode() {
                return this.mode
            },
            getEntity() {
                return this.entity
            },
            close() {
                this.visible = false
            },
            onOK() {
                this.$refs.saveForm.validate(valid => {
                    if (valid) {
                        if (isNaN(this.entity.pay_num)) {
                            this.$message('缴费金额只可输入数字')
                            return
                        }
                        this.$emit("onOK", this.entity)
                    }
                })

            },

            // dialog 外层空白处点击事件
            disclaimerDialogSpace(done) {
            },

        }
    }
</script>

<style scoped>

</style>
