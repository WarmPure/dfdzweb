<template>
    <div class="app-container">
        <div class="search">
            <el-button type="primary" icon="el-icon-circle-plus" @click="openEditor({})">新增</el-button>
            <!--<el-button type="primary" icon="el-icon-s-finance" style="float: right" @click="openTransfer()">转账</el-button>-->
        </div>
        <el-table
                v-loading="loading"
                :data="tableList"
                stripe
                style="width: 100%">
            <el-table-column
                    prop="area_name"
                    label="小区名"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="address"
                    label="地址"
                    width="200">
            </el-table-column>
            <el-table-column
                    prop="join_time"
                    label="承接时间"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="type"
                    label="楼体类型"
                    width="120">
                <template scope="scoped">
                    {{getAccountType(scoped.row.type)}}
                </template>
            </el-table-column>
            <el-table-column
                    prop="footprint"
                    label="占地面积"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="unit_num"
                    label="单元数"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="home_num"
                    label="住户数"
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

        private total: number = 0
        private tableList: any = []
        private loading: boolean = true
        private listQuery: any = {
            page: 1,
            limit: 20,
        }

        private getAccountType(type): string {
            let resultStr: string = ''
            switch (type) {
                case 1:
                    resultStr = '无电梯'
                    break
                case 2:
                    resultStr = '有电梯'
                    break
                case 3:
                    resultStr = '混合'
                    break
            }
            return resultStr
        }

        private async fetch() {
            this.loading = true
            let result = await getAreaList(this.listQuery)
            // await ProjectsModule.GetProjects(this.listQuery)
            // this.total = ProjectsModule.projects.count
            // this.tableList = ProjectsModule.projects.data
            this.loading = false
            if (result.status == 200) {
                // this.total = AccountModule.accounts.count
                this.tableList = result.data
            } else {
                // this.$message.error(result.msg)
            }
        }

        private confirmDelete(area: any) {
            this.$confirm(`删除该小区：[${area.area_name}], 是否继续?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                let result = await deleteArea(area)
                if (result.status == 200) {
                    console.log('deleteArea success')
                } else {
                    // this.$message.error(result.msg)
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
                let result = await addArea(entity)
                if (result.status == 200) {
                    console.log('addArea success')
                } else {
                    this.$message.error(result.msg)
                }
                this.$message.success('新增成功')
                this.$refs.editor.close()
                this.fetch()
            } else {
                console.log(entity);
                let result = await updateArea(entity)
                if (result.status == 200) {
                    console.log('updateArea success')
                } else {
                    this.$message.error(result.msg)
                }
                this.$message.success('修改成功')
                this.$refs.editor.close()
                this.fetch()
            }
        }

        // 打开用户信息编辑器
        private openEditor(item: any) {
            this.$refs.editor.open(item)
        }

        created() {
            this.fetch()
        }
    }
</script>

<style lang="scss" scoped>

</style>
