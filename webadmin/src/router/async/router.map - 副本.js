// 视图组件
const view = {
    tabs: () => import('@/layouts/tabs'),
    blank: () => import('@/layouts/BlankView'),
    page: () => import('@/layouts/PageView')
}

// 路由组件注册
const routerMap = {
    login: {
        authority: '*',
        path: '/login',
        component: () => import('@/pages/login')
    },
    root: {
        path: '/',
        name: '首页',
        redirect: '/login',
        component: view.tabs
    },
    dashboard: {
        name: 'Dashboard',
        component: view.blank
    },
    workplace: {
        name: '工作台',
        component: () => import('@/pages/dashboard/workplace')
    },
    analysis: {
        name: '分析页',
        component: () => import('@/pages/dashboard/analysis')
    },
    form: {
        name: '表单页',
        icon: 'form',
        component: view.page
    },
    basicForm: {
        path: 'basic',
        name: '基础表单',
        component: () => import('@/pages/form/basic')
    },
    stepForm: {
        path: 'step',
        name: '分步表单',
        component: () => import('@/pages/form/step')
    },
    advanceForm: {
        path: 'advance',
        name: '高级表单',
        component: () => import('@/pages/form/advance')
    },
    list: {
        name: '列表页',
        icon: 'table',
        component: view.page
    },
    queryList: {
        path: 'query',
        name: '查询表格',
        component: () => import('@/pages/list/QueryList')
    },
    primaryList: {
        path: 'primary',
        name: '标准列表',
        component: () => import('@/pages/list/StandardList')
    },
    cardList: {
        path: 'card',
        name: '卡片列表',
        component: () => import('@/pages/list/CardList')
    },
    searchList: {
        path: 'search',
        name: '搜索列表',
        component: () => import('@/pages/list/search/SearchLayout')
    },
    article: {
        name: '文章',
        component: () => import('@/pages/list/search/ArticleList')
    },
    application: {
        name: '应用',
        component: () => import('@/pages/list/search/ApplicationList')
    },
    project: {
        name: '项目',
        component: () => import('@/pages/list/search/ProjectList')
    },
    details: {
        name: '详情页',
        icon: 'profile',
        component: view.blank
    },
    basicDetails: {
        path: 'basic',
        name: '基础详情页',
        component: () => import('@/pages/detail/BasicDetail')
    },
    advanceDetails: {
        path: 'advance',
        name: '高级详情页',
        component: () => import('@/pages/detail/AdvancedDetail')
    },
    result: {
        name: '结果页',
        icon: 'check-circle-o',
        component: view.page
    },
    success: {
        name: '成功',
        component: () => import('@/pages/result/Success')
    },
    error: {
        name: '失败',
        component: () => import('@/pages/result/Error')
    },
    exception: {
        name: '异常页',
        icon: 'warning',
        component: view.blank
    },
    exp403: {
        authority: '*',
        name: 'exp403',
        path: '403',
        component: () => import('@/pages/exception/403')
    },
    exp404: {
        name: 'exp404',
        path: '404',
        component: () => import('@/pages/exception/404')
    },
    exp500: {
        name: 'exp500',
        path: '500',
        component: () => import('@/pages/exception/500')
    },
    components: {
        name: '小组件',
        icon: 'appstore-o',
        component: view.page
    },
    taskCard: {
        name: '任务卡片',
        component: () => import('@/pages/components/TaskCard')
    },
    palette: {
        name: '颜色复选框',
        component: () => import('@/pages/components/Palette')
    },
    //以下是新增
    ecorder: {
        name: '订单信息',
        icon: 'table',
        component: view.page
    },
    EcorderPage: {
        name: '订单列表',
        component: () => import('@/pages/ecorder/page')
    },
    EcorderDetail: {
                        path:'/ecorder/EcorderDetail',
        name: '订单详情',
        component: () => import('@/pages/ecorder/detail')
    },
    //定义
    EcOrderHisPage: {
        name: '归档订单',
        component: () => import('@/pages/ecorder/ecorderhis/page')
    },
    EcOrderHisDetail: {
        path:'/ecorderhis/EcOrderHisDetail',
        invisible: true,
        name: '历史归档订单详情',
        component: () => import('@/pages/ecorder/ecorderhis/detail')
    },




    user: {
        name: '用户管理',
        icon: 'table',
        component: view.page
    },

    UserPage: {
        name: '用户管理',
        component: () => import('@/pages/user/page')
    },

    UserForm: {
        path:'/user/UserForm',
        invisible: true,
        name: '用户编辑',
        component: () => import('@/pages/user/UserForm')
    },



    UgroupPage: {
        name: '用户组管理',
        component: () => import('@/pages/ugroup/page')
    },
    UgroupForm: {
        path:'/ugroup/UgroupForm',
        invisible: true,
        name: '编辑',
        component: () => import('@/pages/ugroup/UgroupForm')
    },
    UgroupDetail: {
        path:'/ugroup/UgroupDetail',
        invisible: true,
        name: '详情',
        component: () => import('@/pages/ugroup/detail')
    },



    //定义
    EcUserPage: {
        name: '下游账号',
        component: () => import('@/pages/ecuser/page')
    },
    EcUserForm: {
        path:'/ecuser/EcUserForm',
        invisible: true,
        name: '下游账号编辑',
        component: () => import('@/pages/ecuser/EcUserForm')
    },
    EcUserDetail: {
        path:'/ecuser/EcUserDetail',
        invisible: true,
        name: '下游账号详情',
        component: () => import('@/pages/ecuser/detail')
    },


}
export default routerMap

