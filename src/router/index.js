import Vue from 'vue'
import Router from 'vue-router'

import home from '../components/Home'
import about from '../components/About'
import top_page from '../components/Blogs/top'
import show from '../components/Blogs/show'

/* blogs */
import blogsIndex from '../components/Blogs/Index'
import blogsNew from '../components/Blogs/new'
//import blogsShow from '../components/Blogs/show'
import blogsEdit from '../components/Blogs/edit'

Vue.use(Router)
//
export default new Router({
    /* mode: 'history', */
    routes: [
        { path: '/', component: top_page },
        { path: '/show/:id', component: show },

        { path: '/home', component: home },
        { path: '/about', component: about },
//        { path: '/page2', component: page2 },
//        { path: '/page3', component: page3 },
        /* blogs */
        { path: '/blogs', component: blogsIndex },
        { path: '/blogs/new', component: blogsNew },
//        { path: '/blogs/show/:id', component: blogsShow },
        { path: '/blogs/edit/:id', component: blogsEdit },

    ]
})
