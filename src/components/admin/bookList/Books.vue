<template>
    <el-card>
        <el-row class="bookHead">
            <el-col :span="8">
                <el-input placeholder="请输入搜索内容" v-model="searchVal" @change="searchChange($event)"></el-input>

            </el-col>
            <el-col :span="4" class="addbtn"><el-button type="primary" @click="addBooks">添加图书</el-button></el-col>
        </el-row>
        <el-row>
            <el-col><el-button type="danger" v-if="showDeleteBtn" @click="deleteAll">全部删除</el-button></el-col>
        </el-row>
        <el-table
            style="width: 100%"
            :data="bookList.data"
            border
            stripe
            :highlight-current-row="true"
            @selection-change = 'selectChange'
        >
            <el-table-column
                    type="selection"
                    width="55"

            >
            </el-table-column>
            <el-table-column
                    label="序号"
                    type="index"
                    width="60"
            ></el-table-column>
            <el-table-column
                    label="书名"
                    prop="book_name"

            ></el-table-column>
            <el-table-column
                    label="作者"
                    prop="author"
                    width="160"
            ></el-table-column>
            <el-table-column
                    label="日期"
                    prop="createDate"
            ></el-table-column>
            <el-table-column
                    label="操作"
                class="caozuo"
            >
                <template v-slot="slotProps">
                    <el-button type="primary" icon="el-icon-edit" size="small" @click="editBook(slotProps)"></el-button>
                    <el-button type="danger" icon="el-icon-delete" size="small" @click="deleteBook(slotProps)"></el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
                :page-size="5"
                :page-sizes="[5, 8, 10]"
                :total="bookList.total"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                layout="total, sizes, prev, pager, next, jumper"
        ></el-pagination>
    </el-card>
</template>

<script>
    import {getBooks, getSearch,deleteBookById} from "../../../servers/getData";

    export default {
        name: "",
        data() {
            return {
                bookList: {
                    data: [],
                    total: 0,
                    pagesize: '',
                    pageNum: 1
                },
                multipleSelection: [],
                showDeleteBtn: false,
                searchVal: '', // 查询关键字

            }
        },
        created() {
            this.getBooks()
        },
        methods: {
            // 获取图书
            async getBooks() {
                const res = await getBooks('/books',{
                    pagesize: this.bookList.pagesize,
                    pageNum: this.bookList.pageNum
                })
                this.bookList.data = res.data
                this.bookList.total = res.total
                this.bookList.pagesize = res.pagesize
            },
            selectChange(val) {

                if(val.length > 0) {
                    this.showDeleteBtn = true
                }else {
                    this.showDeleteBtn = false
                }
                let arrId = []
                val.forEach(item => {
                    arrId.push(item._id)
                })
                this.multipleSelection = arrId

            },
            async searchChange(val) {
                const res = await getSearch('/searchval', {
                    searchval: val
                })
                console.log(res)
                this.bookList.data = res
            },
            addBooks() {
                this.$router.push('/addbook')
            },
            editBook(val) {
                this.$router.push({path: '/editbook', query: {id: val.row._id}})
            },
            deleteBook(val) {
              this.$confirm('此操作将永久删除该选项，是否继续？').then( async () => {
                        const res = await deleteBookById('/deletebook', {arrId: val.row._id})
                  this.$message.success(res.msg)
                  location.reload()
              }).catch(()=> {
                    this.$message.info('已取消')
              })

            },
            deleteAll() {
                this.$confirm('此操作将永久删除该选项，是否继续？').then( async () => {
                    const res = await deleteBookById('/deletebook', {arrId: this.multipleSelection})
                    this.$message.success(res.msg)
                    location.reload()
                }).catch(()=> {
                    this.$message.info('已取消')
                })
            },
           handleSizeChange(val) {
                this.bookList.pagesize = val
                this.getBooks()
            },
            handleCurrentChange(val) {
                console.log(val)
                this.bookList.pageNum = val
                this.getBooks()

            }
        }
    }
</script>

<style scoped lang="less">
    .el-card {
        margin: 20px;
        .bookHead {
            margin-bottom: 20px;
        }
        .addbtn {
            margin-left: 20px;
        }
        .el-table {
            margin-top: 10px;

        }
        .el-pagination {
            margin-top: 20px;
        }
    }
</style>