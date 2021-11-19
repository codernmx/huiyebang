import userService from './user'
import dataSource from './dataSource'
import {METHOD, request} from '@/utils/request'


export const ecorder_page = function (param) {
    return request('/ecorder/page', METHOD.GET, param)
};
export const ecorder_update = function (param) {
    return request('/ecorder/update', METHOD.POST, param)
};
let API = {
    public_dict: (param) => {
        return request('/public/dict', METHOD.GET, param)
    },
    ecorder_find: (param) => {
        return request('/ecorder/find', METHOD.GET, param)
    },
    ecorderhis_find: (param) => {
        return request('/ecorderhis/find', METHOD.GET, param)
    },
    ecorderhis_page: (param) => {
        return request('/ecorderhis/page', METHOD.GET, param)
    },
    ecorderhis_analysis: (param) => {
        return request('/ecorderhis/analysis', METHOD.GET, param)
    },


    user_find: (param) => {
        return request('/admin/user/find', METHOD.GET, param)
    },
    user_update: (param) => {
        return request('/admin/user/update', METHOD.POST, param)
    },
    user_page: (param) => {
        return request('/admin/user/page', METHOD.GET, param)
    },
    user_add: (param) => {
        return request('/admin/user/add', METHOD.POST, param)
    },
    user_delete: (param) => {
        return request('/admin/user/delete', METHOD.GET, param)
    },

    ugroup_find: (param) => {
        return request('/admin/ugroup/find', METHOD.GET, param)
    },
    ugroup_update: (param) => {
        return request('/admin/ugroup/update', METHOD.POST, param)
    },
    ugroup_page: (param) => {
        return request('/admin/ugroup/page', METHOD.GET, param)
    },
    ugroup_add: (param) => {
        return request('/admin/ugroup/add', METHOD.POST, param)
    },
    ugroup_delete: (param) => {
        return request('/admin/ugroup/delete', METHOD.GET, param)
    },


    role_page: (param) => {
        return request('/admin/role/page', METHOD.GET, param)
    },
    role_add: (param) => {
        return request('/admin/role/add', METHOD.POST, param)
    },
    role_find: (param) => {
        return request('/admin/role/find', METHOD.GET, param)
    },
    role_update: (param) => {
        return request('/admin/role/update', METHOD.POST, param)
    },
	role_delete: (param) => {
        return request('/admin/role/delete', METHOD.GET, param)
    },
	role_query: (param) => {
	    return request('/admin/role/query', METHOD.GET, param)
	},
	
	rule_page: (param) => {
	    return request('/admin/rule/page', METHOD.GET, param)
	},
	rule_add: (param) => {
	    return request('/admin/rule/add', METHOD.POST, param)
	},
	rule_find: (param) => {
	    return request('/admin/rule/find', METHOD.GET, param)
	},
	rule_update: (param) => {
	    return request('/admin/rule/update', METHOD.POST, param)
	},
	rule_query: (param) => {
	    return request('/admin/rule/query', METHOD.GET, param)
	},
	rule_delete: (param) => {
	    return request('/admin/rule/delete', METHOD.GET, param)
	},

    rolerule_query: (param) => {
        return request('/admin/rolerule/query', METHOD.GET, param)
    },
	rolerule_delete: (param) => {
	    return request('/admin/rolerule/delete', METHOD.GET, param)
	},
	rolerule_adds: (param) => {
	    return request('/admin/rolerule/adds', METHOD.POST, param)
	},
	
	rolegroup_query: (param) => {
	    return request('/admin/rolegroup/query', METHOD.GET, param)
	},
	rolegroup_delete: (param) => {
	    return request('/admin/rolegroup/delete', METHOD.GET, param)
	},
	rolegroup_adds: (param) => {
	    return request('/admin/rolegroup/adds', METHOD.POST, param)
	},

    compositionstudent_page: (param) => {
        return request('/admin/compositionstudent/page', METHOD.GET, param)
    },
    compositionstudent_find: (param) => {
        return request('/admin/compositionstudent/find', METHOD.GET, param)
    },
	
    compositioncorrection_page: (param) => {
        return request('/admin/compositioncorrection/page', METHOD.GET, param)
    },
    compositioncorrection_find: (param) => {
        return request('/admin/compositioncorrection/find', METHOD.GET, param)
    },

    compositionteacher_page: (param) => {
        return request('/admin/compositionteacher/page', METHOD.GET, param)
    },
    compositionteacher_find: (param) => {
        return request('/admin/compositionteacher/find', METHOD.GET, param)
    },
    compositionteacher_update: (param) => {
        return request('/admin/compositionteacher/update', METHOD.POST, param)
    },
	
	applycash_page: (param) => {
	    return request('/admin/applycash/page', METHOD.GET, param)
	},
    applycash_find: (param) => {
        return request('/admin/applycash/find', METHOD.GET, param)
    },
	applycash_update: (param) => {
	    return request('/admin/applycash/update', METHOD.POST, param)
	},
	
    logbalance_page: (param) => {
        return request('/admin/logbalance/page', METHOD.GET, param)
    },
	logbalance_find: (param) => {
	    return request('/admin/logbalance/find', METHOD.GET, param)
	},
	
    compositionsetmenu_page: (param) => {
        return request('/admin/compositionsetmenu/page', METHOD.GET, param)
    },
	compositionsetmenu_find: (param) => {
	    return request('/admin/compositionsetmenu/find', METHOD.GET, param)
	},
    compositionsetmenu_update: (param) => {
        return request('/admin/compositionsetmenu/update', METHOD.POST, param)
    },
    compositionsetmenu_add: (param) => {
        return request('/admin/compositionsetmenu/add', METHOD.POST, param)
    },
    compositionsetmenu_delete: (param) => {
        return request('/admin/compositionsetmenu/delete', METHOD.GET, param)
    }
    
}

export {
    userService,
    dataSource,
    API
}
