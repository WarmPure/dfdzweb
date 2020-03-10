<template>
    <el-dialog
            :title="title"
            :visible.sync="visible"
            width="50%"
            :show-close="false"
            :before-close="disclaimerDialogSpace">
        <el-form v-if="visible == true" ref="saveForm" :model="entity" status-icon :rules="rules" label-width="180px">
            <el-form-item label='小区名：' prop="area_name">
                <el-input v-model.trim="entity.area_name" placeholder="请输入小区名"></el-input>
            </el-form-item>
            <el-form-item label='地址：' prop="address">
                <el-input v-model.trim="entity.address" placeholder="请输入地址"></el-input>
            </el-form-item>
            <el-form-item label='承接时间：' prop="join_time">
                <el-input v-model.trim="entity.join_time" placeholder="请输入账户号"></el-input>
            </el-form-item>
            <el-form-item label='楼体类型：' prop="type">
                <el-select v-model="entity.type">
                    <el-option v-for="item in accountType" :key="item.value" :label="item.name"
                               :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label='占地面积：' prop="footprint">
                <el-input v-model.trim="entity.footprint" placeholder="请输入占地面积"></el-input>
            </el-form-item>
            <el-form-item label='单元数：' prop="unit_num">
                <el-input v-model.trim="entity.unit_num" placeholder="请输入单元数"></el-input>
            </el-form-item>
            <el-form-item label='住户数：' prop="home_num">
                <el-input v-model.trim="entity.home_num" placeholder="请输入住户数"></el-input>
            </el-form-item>
            <el-form-item label='状态：' prop="status">
                <el-input v-model.trim="entity.status" placeholder="请输入状态"></el-input>
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
                isShow: true,
                mode: null,
                accountType: [
                    {value: 1, name: '无电梯'},
                    {value: 2, name: '有电梯'},
                    {value: 3, name: '混合'}
                ],
                rules: {
                    area_name: [
                        {required: true, message: '请输入小区名', trigger: 'blur'}
                    ],
                    address: [
                        {required: true, message: '请输入地址', trigger: 'blur'}
                    ]
                },
            }
        },
        props: {},
        methods: {
            open(entity) {
                this.visible = true
                this.entity = typeof entity === 'string' ? JSON.parse(entity) : entity
                if (this.entity.id) {
                    this.mode = 'EDIT'
                    this.isShow = false
                    this.title = "修改小区"
                } else {
                    this.mode = 'NEW'
                    this.isShow = true
                    this.title = "新增小区"
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
            // dialog 外层空白处点击事件
            disclaimerDialogSpace(done) {
            },

            onOK() {
                this.$refs.saveForm.validate(valid => {
                    if (valid) {
                        this.$emit("onOK", this.entity)
                    }
                })

            }
        }
    }
</script>

<style scoped>

</style>
