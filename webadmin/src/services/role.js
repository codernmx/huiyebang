import {
	ADMIN
} from '@/services/api'
import {
	request,
	METHOD,
	removeAuthorization
} from '@/utils/request'

/**
 * 角色管理-新增
 * @param role_name 角色名
 * @returns {Promise<AxiosResponse<T>>}
 */
export async function roleAdd(param) {
	return request(ADMIN, METHOD.POST, param)
}

/**
 * 角色管理-新增
 * @param role_name 角色名
 * @returns {Promise<AxiosResponse<T>>}
 */
export async function rolePage(param) {
	return request(ADMIN, METHOD.POST, param)
}


export default {
	roleAdd
}
