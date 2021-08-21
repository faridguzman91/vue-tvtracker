import Vue from 'vue'
import Router from 'vue-router'
import subs from '@/components/subs'

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        component: subs
    }]
})