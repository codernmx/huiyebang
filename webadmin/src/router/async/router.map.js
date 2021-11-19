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
    user: {
        name: '用户管理',
        icon: 'table',
        component: view.page
    },
	userList: {
	    name: '用户管理',
	    component: () => import('@/pages/user/page')
	}, 
	UserForm: {
	    name: '用户新增',
	    component: () => import('@/pages/user/UserForm'),
		meta: {
			invisible: true
		}
	}, 
    prodect: {
        name: '作品列表',
        icon: 'table',
        component: view.page
    },
	prodectList: {
	    name: '学生作品',
	    component: () => import('@/pages/prodect/page')
	},
	prodectDetail: {
	    name: '作品详情',
	    component: () => import('@/pages/prodect/detail'),
		meta: {
			invisible: true
		}
	}, 
	prodectCorrect: {
	    name: '批改列表',
	    component: () => import('@/pages/prodectCorrect/page')
	},
	prodectCorrectDetail: {
	    name: '作品详情',
	    component: () => import('@/pages/prodectCorrect/detail'),
		meta: {
			invisible: true
		}
	}, 
	collection: {
	    name: '收款管理',
	    icon: 'table',
	    component: view.page
	},
	collectionDetails: {
	    name: '收款明细',
	    component: () => import('@/pages/detailed/page')
	},
	detailedDetail: {
	    name: '收款详情',
	    component: () => import('@/pages/detailed/detail'),
		meta: {
			invisible: true
		}
	}, 
	refundDetails: {
	    name: '退款明细',
	    component: () => import('@/pages/refund/page')
	},
	withdrawalList: {
	    name: '老师提现记录',
	    component: () => import('@/pages/withdrawal/page')
	},
	withdrawalDetail: {
	    name: '提现详情',
	    component: () => import('@/pages/withdrawal/detail'),
		meta: {
			invisible: true
		}
	}, 
	works: {
	    name: '名师作品',
	    icon: 'table',
	    component: view.page
	},
	worksTeachers: {
	    name: '名师作品',
	    component: () => import('@/pages/worksTeachers/page')
	},
	worksTeachersDetail: {
	    name: '作品详情',
	    component: () => import('@/pages/worksTeachers/detail'),
		meta: {
			invisible: true
		}
	}, 
	package: {
	    name: '套餐管理',
	    icon: 'table',
	    component: view.page
	},
	packageList: {
	    name: '套餐管理',
	    component: () => import('@/pages/package/page')
	},
	packageForm: {
	    name: '作品详情',
	    component: () => import('@/pages/package/form'),
		meta: {
			invisible: true
		}
	}, 
	admin: {
	    name: '权限管理',
	    icon: 'table',
	    component: view.page
	},
	role: {
	    name: '角色管理',
	    component: () => import('@/pages/role/page')
	},
	roleForm: {
	    name: '角色新增',
	    component: () => import('@/pages/role/form'),
		meta: {
			invisible: true
		}
	}, 
	userGroup: {
	    name: '用户组管理',
	    component: () => import('@/pages/ugroup/page')
	},
	ugroupForm: {
	    name: '用户组新增',
	    component: () => import('@/pages/ugroup/form'),
		meta: {
			invisible: true
		}
	}, 
	rule: {
	    name: '规则管理',
	    component: () => import('@/pages/rule/page')
	},
	ruleForm: {
	    name: '规则新增',
	    component: () => import('@/pages/rule/form'),
		meta: {
			invisible: true
		}
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
    }


}
export default routerMap

