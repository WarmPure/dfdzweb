<template>
    <el-dialog
            :title="title"
            :visible.sync="visible"
            width="50%"
            :show-close="false"
            :before-close="disclaimerDialogSpace">
        <el-form v-if="visible == true" ref="saveForm" :model="entity" status-icon :rules="rules" label-width="180px">
            <el-form-item label='房屋编号：' prop="house_id">
                <el-input v-model.trim="entity.house_id" placeholder="请输入房屋编号(唯一)"></el-input>
            </el-form-item>
            <el-form-item label='小区：' prop="area_id">
                <el-select v-model="entity.area_id" placeholder="请选择小区">
                    <el-option
                            v-for="item in areaList"
                            :key="item.id"
                            :label="item.area_name"
                            :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label='单元：' prop="unit">
                <el-input v-model.trim="entity.unit" placeholder="请输入第几单元"></el-input>
            </el-form-item>
            <el-form-item label='门牌号：' prop="gate_num">
                <el-input v-model.trim="entity.gate_num" placeholder="请输入门牌号"></el-input>
            </el-form-item>
            <el-form-item label='住宅面积：' prop="footprint">
                <el-input v-model.trim="entity.footprint" placeholder="请输入住宅面积"></el-input>
            </el-form-item>
            <el-form-item label='当前户主：' prop="master">
                <el-input v-model.trim="entity.master" placeholder="请输入当前户主姓名"></el-input>
            </el-form-item>
            <el-form-item label='是否缴纳物业：' prop="isarrear">
                <el-select v-model="entity.isarrear">
                    <el-option
                            v-for="item in isarrearList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
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
                    {value: 0, label: '已缴纳'},
                    {value: 1, label: '未缴纳'}
                ],
                isShow: true,
                mode: null,
                accountType: [
                    {value: 1, name: '核心户'},
                    {value: 2, name: '互联网户'},
                    {value: 3, name: '保证金户'}
                ],
                rules: {
                    house_id: [
                        {required: true, message: '请输入房屋编号(唯一)', trigger: 'blur'}
                    ],
                    area_id: [
                        {required: true, message: '请选择所属小区', trigger: 'blur'}
                    ]
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
