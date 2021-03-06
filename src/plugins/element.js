import Vue from 'vue'
import {
    Button,
    Form,
    FormItem,
    Input,
    Message,
    Col,
    Row,
    Menu,
    Submenu,
    MenuItem,
    Card,
    Table,
    TableColumn,
    PageHeader,
    DatePicker,
    MessageBox,
    Pagination,
    Upload,
    Container,
    Header,
    Aside,
    Main
} from 'element-ui'
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Row)
Vue.use(Col)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(Card)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(PageHeader)
Vue.use(DatePicker)
Vue.use(Pagination)
Vue.use(Upload)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
