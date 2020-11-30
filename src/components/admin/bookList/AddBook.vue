<template>
    <div class="container">
        <el-row>
            <el-card>
                <el-page-header :content="bookId?'编辑图书': '添加图书 '" class="addHeader"></el-page-header>
            </el-card>
        </el-row>
        <el-row class="addContent">
            <el-form
                    label-position="top"
                    :rules="bookRules"
                    :model="bookForm"
            >
                <el-form-item label="图书名称" prop="book_name">
                    <el-input placeholder="请输入图书名称" v-model="bookForm.book_name"></el-input>
                </el-form-item>
                <el-form-item label="图书封面">
                    <el-upload
                        :action="urlLoad"
                        :on-success="uploadImg"
                    >
                        <el-button size="small" type="primary">点击上传</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
                </el-form-item>
                <el-form-item label="作者" prop="author">
                    <el-input placeholder="请输入作者" v-model="bookForm.author"></el-input>
                </el-form-item>
                <el-form-item label="创建时间">
                    <el-date-picker type="date" value-format="yyyy-MM-dd" v-model="bookForm.createDate"></el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" v-if="!bookId" @click="addBook">提交</el-button>
                    <el-button type="primary" v-if="bookId" @click="editBook">更改</el-button>
                </el-form-item>
            </el-form>
        </el-row>
    </div>
</template>

<script>
    import {createBook,getBooks,updateBook} from "../../../servers/getData";

    export default {
        name: "",
        props: ["id"],
        data() {
            return {
                urlLoad: 'http://127.0.0.1:8999/api/upload',
                bookId: '',
                imgPath: '',
                bookForm: {
                  book_name: '',
                  author: '',
                  createDate: '',

                },
                bookRules: {
                    book_name: [
                        {required: true, message: '请输入图书名称', trigger: 'blur'},
                        {min: 1, max: 12, message: '限制1到12个字之间', trigger: 'blur'}
                    ],
                    author: [
                        {required: true, message: '请输入图书作者', trigger: 'blur'},
                        {min: 2, max: 6, message: '限制2到16个字之间', trigger: 'blur'}
                    ]
                }
            }
        },
        async created() {
            if(this.$route.query.id) {
                console.log(this.$route.query.id)
                this.bookId = this.$route.query.id
                const res = await getBooks('/books',{
                    id: this.bookId
                })
                this.bookForm.book_name = res[0].book_name
                this.bookForm.author = res[0].author
                this.bookForm.createDate = res[0].createDate
            }

        },
        methods: {
            async addBook() {
               const res = await createBook('/addbooks', {
                   book_name: this.bookForm.book_name,
                   author: this.bookForm.author,
                   createDate: this.bookForm.createDate,
                   imgPath: this.imgPath
               })
                this.$message.success(res.msg)
                this.$router.push('/books')
            },
            async editBook() {
                const res = await updateBook('/updatebook',{
                    id: this.bookId,
                    book_name: this.bookForm.book_name,
                    author: this.bookForm.author,
                    createDate: this.bookForm.createDate,
                    imgPath: this.imgPath
                })
                this.$message.success(res.msg)
                this.bookId = ''
                this.$router.push('/books')
            },
            //图片上传
            uploadImg(file) {
                console.log(file)
                this.imgPath = file
            }
        }
    }
</script>
<style scoped lang="less">
        .container {
            .addContent {
                padding: 20px;
            }

        }
</style>