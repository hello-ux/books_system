import Vue from 'vue'
let vm = new Vue
// 登录提交
export async function getLogin(url,params) {
    const {data: res } = await vm.$http.post(url,params)
    return res
}
// 获取侧边栏
export async function getAside(url) {
    const { data: res } = await vm.$http.get(url)
    return res
}
// 获取书籍列表
export async function getBooks(url,params) {
    const { data: res } = await vm.$http.get(url,{
        params: params
    })
    return res
}
// 查询关键字
export async function getSearch(url,params) {
    const {data: res } = await vm.$http.get(url,{
        params: params
    })
    return res
}
// 添加图书
export async function createBook(url,params) {
    const {data: res } = await vm.$http.post(url,params)
    return res
}
// 修改图书
export async function updateBook(url,params) {
    const {data: res } = await vm.$http.post(url,params)
    return res
}
// 删除图书
export async function deleteBookById(url,params) {
    const {data:res} = await vm.$http.delete(url,{
        params: params
    })
    return res
}
