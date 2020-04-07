import VueRouter from 'vue-router'
import Home from './Page/Home.vue'
import Detail from './Page/Detail.vue'

export default new VueRouter({
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/detail',
            name: 'Detail',
            component: Detail,
        },
        {
            path: '/detail/:id',
            name: 'Detail',
            component: Detail,
        }
    ],
    mode: 'history'
}) 