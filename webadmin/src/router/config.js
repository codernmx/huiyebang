import TabsView from '@/layouts/tabs/TabsView'
import BlankView from '@/layouts/BlankView'
import PageView from '@/layouts/PageView'

// 路由配置
const options = {
	routes: [{
			path: '/login',
			name: '登录页',
			component: () => import('@/pages/login')
		},
		{
			path: '*',
			name: '404',
			component: () => import('@/pages/exception/404'),
		},
		{
			path: '/403',
			name: '403',
			component: () => import('@/pages/exception/403'),
		},
		{
			path: '/',
			name: '首页',
			component: TabsView,
			redirect: '/login',
			children: [{
				path: 'user',
				name: '用户管理',
				meta: {
					icon: 'dashboard'
				},
				children: [
					{
						path: 'userList',
						name: '用户管理',
						component: () => import('@/pages/user/page'),
					}
				]
			}, {
				path: 'prodect',
				name: '作品列表',
				meta: {
					icon: 'dashboard'
				},
				children: [
					{
						path: 'correct',
						name: '批改管理',
						component: () => import('@/pages/prodect/page'),
					},
					{
						path: 'prodectList',
						name: '查看作品',
						component: () => import('@/pages/prodect/detail'),
					}
				]
			}, {
				path: 'collection',
				name: '收款管理',
				meta: {
					icon: 'dashboard'
				},
				children: [
					{
						path: 'collectionDetails',
						name: '收款明细',
						component: () => import('@/pages/prodect/page'),
					},
					{
						path: 'refundDetails',
						name: '退款明细',
						component: () => import('@/pages/prodect/page'),
					},
					{
						path: 'withdrawalList',
						name: '老师提现记录',
						component: () => import('@/pages/prodect/page'),
					}
				]
			}, {
				path: 'works',
				name: '名师作品',
				meta: {
					icon: 'dashboard'
				},
				children: [
					{
						path: 'worksTeachers',
						name: '收款明细',
						component: () => import('@/pages/prodect/page'),
					}
				]
			}, {
				path: 'package',
				name: '套餐管理',
				meta: {
					icon: 'dashboard'
				},
				children: [
					{
						path: 'packageList',
						name: '套餐管理',
						component: () => import('@/pages/prodect/page'),
					}
				]
			}, {
				path: 'admin',
				name: '权限管理',
				meta: {
					icon: 'dashboard'
				},
				children: [
					{
						path: 'role',
						name: '角色管理',
						component: () => import('@/pages/prodect/page'),
					},
					{
						path: 'userGroup',
						name: '用户组管理',
						component: () => import('@/pages/prodect/page'),
					},
					{
						path: 'rule',
						name: '规则管理',
						component: () => import('@/pages/prodect/page'),
					}
				]
			}]
		}
	]
}

export default options
