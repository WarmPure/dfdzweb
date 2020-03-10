<template>
    <div class="app-container">
        <div class="search">
            <el-button type="primary" icon="el-icon-circle-plus" @click="openEditor({})">新增</el-button>
            <div style="display: inline-flex; float: right; Justify-content:center; align-items:center; margin-bottom: 10px">
                <div>选择小区</div>
                <el-select v-model="areaValue" @change="changeArea" clearable style="margin-left: 5px; margin-right: 20px">
                    <el-option v-for="item in areaList"
                               :key="item.id"
                               :label="item.area_name"
                               :value="item.id"></el-option>
                </el-select>

                <div>是否缴纳物业</div>
                <el-select v-model="payMoney" style="margin-left: 5px" @change="changeIsarrear">
                    <el-option v-for="item in payTypeList" :key="item.value" :label="item.label"
                               :value="item.value"></el-option>
                </el-select>
            </div>
        </div>
        <el-table
                v-loading="loading"
                :data="tableList"
                stripe
                style="width: 100%">
            <el-table-column
                    prop="house_id"
                    label="房屋编号"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="area.area_name"
                    label="缴纳时间"
                    width="140">
            </el-table-column>
            <el-table-column
                    prop="unit"
                    label="缴纳金额"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="master"
                    label="支付方式"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="master"
                    label="缴纳人"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="gate_num"
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

        private areaValue: string = ''
        private areaList: any = []

        private payMoney: string = ''
        private payTypeList: any = [
            {
                value: '',
                label: '全部'
            },
            {
                value: '0',
                label: '已缴纳'
            },
            {
                value: '1',
                label: '未缴纳'
            }
        ]

        private total: number = 0
        private tableList: any = []
        private loading: boolean = true
        private listQuery: any = {
            page: 1,
            limit: 20,
            areaId: '',
            isarrear: ''
        }

        private getAccountType(type): string {
            let resultStr: string = ''
            switch (type) {
                case 0:
                    resultStr = '已缴纳'
                    break
                case 1:
                    resultStr = '未缴纳'
                    break
            }
            return resultStr
        }

        private async fetch() {
            this.loading = true
            let result = await getHouseList(this.listQuery)
            this.loading = false
            if (result.status == 200) {
                // this.total = AccountModule.accounts.count
                this.tableList = result.data
            } else {
                this.$message.error(result.msg)
            }
        }

        private async getAreaList() {
            let resultAreaList = await getAreaList(this.listQuery)
            if (resultAreaList.status == 200) {
                // this.total = AccountModule.accounts.count
                this.areaList = resultAreaList.data
            } else {
                this.$message.error(resultAreaList.msg)
            }
        }

        private confirmDelete(house: any) {
            this.$confirm(`删除房屋编号：[${house.house_id}], 是否继续?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                let result = await deleteHouse(house)
                if (result.status == 200) {
                    console.log('deleteArea success')
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
                let result = await addHouse(entity)
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
                let result = await updateHouse(entity)
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

        private openBill(item: any) {

        }

        private async changeArea(val) {
            this.listQuery.areaId = val
            this.loading = true
            let result = await getHouseList(this.listQuery)
            this.loading = false
            if (result.status == 200) {
                // this.total = AccountModule.accounts.count
                this.tableList = result.data
            } else {
                this.$message.error(result.msg)
            }
        }

        private async changeIsarrear(val) {
            this.listQuery.isarrear = val
            this.loading = true
            let result = await getHouseList(this.listQuery)
            this.loading = false
            if (result.status == 200) {
                // this.total = AccountModule.accounts.count
                this.tableList = result.data
            } else {
                this.$message.error(result.msg)
            }
        }

        created() {
            this.fetch()
            this.getAreaList()
        }
    }
</script>

<style lang="scss" scoped>

</style>
