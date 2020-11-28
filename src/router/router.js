import VueRouter from 'vue-router'
const Login = () => import('../components/Login')
const Admin = () => import('../components/admin')
const Books = () => import('../components/admin/bookList/Books')
const Users = () => import('../components/admin/Users')
const AddBook = () => import('../components/admin/bookList/AddBook')
const routes = [
        { path: '/', redirect: '/login'},
        { path: "/login", component: Login },
        { path: '/admin', component: Admin , children: [
                {path: '/', redirect: '/books'},
                {path: '/books', component: Books},
                {path: '/users', component: Users},
                {path: '/addbook', component: AddBook},
                {path: '/editbook', component: AddBook}
            ]}
]
const router = new VueRouter({
    routes
})
router.beforeEach((to,from,next) => {
    let token = sessionStorage.getItem('token')
    if(to.path == '/login') return next()
    if(!token) {
        next('/login')
    }
    next()
})
export default router