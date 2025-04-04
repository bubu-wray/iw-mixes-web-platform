import request from "@/api/request";
import {
	useDictStore
} from "@/stores/dict.ts";
import type {UserLoginVO, UserPasswordEditDto} from "@/types/types";


// 账号密码登录
export const loginByPasswordApi = (user: UserLoginVO) => {
    return request.post('/auth-service/login/password', user);
}

// 验证码登录
export const loginByVerificationCodeApi = (user: UserLoginVO) => {
    return request.post('/auth-service/login/verificationCode', user);
}

// 查询字典类型集合
export const getDictTypeList = () => {
    return request.get('/auth-service/dict/getDictTypeList');
}

// 查询所有数据字典集合
export const getAllDictList = () => {
    return request.get('/auth-service/dict/getAllDictList');
}

// 注册获取验证码
export const getVerificationCodeApi = (phoneNumber: string) => {
    return request.get('/auth-service/register/getVerificationCode?phoneNumber=' + phoneNumber);
}

// 用户根据操作行为获取验证码（例如验证码登录）
export const getVerificationCodeByActionApi = (action: number) => {
    return request.get('/auth-service/user/getVerificationCode?action=' + action);
}

// 修改密码
export const editPasswordApi = (passwordEditDto: UserPasswordEditDto) => {
    return request.post('/auth-service/user/editPassword', passwordEditDto);
}

// 刷新字典缓存
export const refreshDictCache = () => {
	const dictStore = useDictStore()
	
	// 加载字典类型
	getDictTypeList().then(res => {
		dictStore.setDictTypeArray(res.data)
	})

	// 加载所有数据字典
	getAllDictList().then(res => {
		dictStore.setDictDataArrayMap(res.data)
	})
}

export function logout() {
    return request({
        url: '/api/logout',
        method: 'get'
    })
}
