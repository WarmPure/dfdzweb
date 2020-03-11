<template>
    <div class="app-container">
        <div class="search">
            <el-button type="primary" icon="el-icon-circle-plus" @click="openEditor({})">新增账单</el-button>
            <div style="display: inline-flex; float: right; Justify-content:center; align-items:center; margin-bottom: 10px">
                <el-input
                        style="width: 240px; margin-right: 20px"
                        placeholder="输入房屋编号"
                        v-model="listQuery.house_id"
                        clearable
                        @clear="fetch()">
                </el-input>
                <el-button type="primary" style="margin-left: 10px" @click="fetch()">查询</el-button>
            </div>
        </div>
        <el-table
                v-loading="loading"
                :data="tableList"
                stripe
                style="width: 100%">
            <el-table-column
                    prop="id"
                    label="账单编号"
                    width="100">
            </el-table-column>
            <el-table-column
                    prop="house_id"
                    label="房屋编号"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="pay_time"
                    label="缴费时间"
                    width="140">
            </el-table-column>
            <el-table-column
                    prop="pay_num"
                    label="缴费金额"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="pay_type"
                    label="支付方式"
                    width="120">
                <template scope="scoped">
                    {{getPayType(scoped.row.pay_type)}}
                </template>
            </el-table-column>
            <el-table-column
                    prop="master"
                    label="缴费人"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="pay_desc"
                    label="费用说明"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="comments"
                    label="备注"
                    width="220">
            </el-table-column>
            <el-table-column label="操作">
                <template scope="scoped">
                    <el-button type="text"
                               size="small"
                               @click="openEditor(JSON.stringify(scoped.row))">
                        <i class="el-icon-edit"></i>
                        修改
                    </el-button>
                    <el-button type="text"
                               size="small"
                               @click="confirmDelete(scoped.row)">
                        <i class="el-icon-delete-solid"></i>
                        删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <pagination
                v-show="total>0"
                :total="total"
                :page.sync="listQuery.page"
                :limit.sync="listQuery.limit"
                @pagination="fetch"
        />
        <Editor ref="editor" @onOK="saveEntity"></Editor>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator'
    import Pagination from '@/components/Pagination/index.vue'
    import Editor from './EditDialog.vue'
    import {addArea, deleteArea, getAreaList, updateArea} from "../../api/area/area";
    import {addHouse, deleteHouse, getHouseList, updateHouse} from "../../api/house/house";
    import {addPayBill, deletePayBill, getPayBillList, updatePayBill} from "@/api/paybill/paybill";

    @Component({
        name: 'IndexVue',
        components: {
            Pagination,
            Editor
        }
    })

    export default class IndexVue extends Vue {

        $refs: any = {
            editor: HTMLFormElement
        }

        private areaList: any = []

        private total: number = 0
        private tableList: any = []
        private loading: boolean = true
        private listQuery: any = {
            page: 1,
            limit: 20,
            house_id: ''
        }

        private async fetch() {
            this.loading = true
            let result = await getPayBillList(this.listQuery)
            this.loading = false
            if (result.status == 200) {
                // this.total = AccountModule.accounts.count
                this.tableList = result.data
            } else {
                this.$message.error(result.msg)
            }
        }

        private confirmDelete(house: any) {
            this.$confirm(`删除账单编号：[${house.id}], 是否继续?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                let result = await deletePayBill(house)
                if (result.status == 200) {
                    console.log('delete success')
                } else {
                    this.$message.error(result.msg)
                }
                this.fetch()
            }).catch(() => {
            });
        }

        //修改用户信息
        private async saveEntity() {
            let entity = this.$refs.editor.getEntity()
            let mode = this.$refs.editor.getMode()
            if (mode == 'NEW') {
                entity.status = 1
                let result = await addPayBill(entity)
                if (result.status == 200) {
                    console.log('addArea success')
                } else {
                    // this.$message.error(result.msg)
                }
                this.$message.success('新增成功')
                this.$refs.editor.close()
                this.fetch()
            } else {
                console.log(entity);
                let result = await updatePayBill(entity)
                if (result.status == 200) {
                    console.log('updateArea success')
                } else {
                    // this.$message.error(result.msg)
                }
                this.$message.success('修改成功')
                this.$refs.editor.close()
                this.fetch()
            }
        }

        // 打开用户信息编辑器
        private openEditor(item: any) {
            this.$refs.editor.open(item, this.areaList)
        }

        private getPayType(type): string {
            let resultStr: string = ''
            switch (type) {
                case 0:
                    resultStr = '现金支付'
                    break
                case 1:
                    resultStr = '线上支付'
                    break
            }
            return resultStr
        }

        created() {
            this.fetch()
        }
    }
</script>

<style lang="scss" scoped>

</style>
