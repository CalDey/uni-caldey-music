import {
	config
} from '@/config/config'
class UniHttp {
	/**
	 * @class UniHttp
	 * @method get
	 * @method post
	 * @method postForm
	 * @param {string} api - 要传入的接口地址
	 * @param {string} data - 要传入参数
	 * @return {Promise} 返回Promise对象
	 * @description uniapp.request的get方法
	 * @example 查看README.md
	 *
	 */
	loginPage = '' //登录页
	constructor(loginPage = '/pages/login/login') {
		this.loginPage = loginPage
	}

	get(api, data, loadingTxt) {
		let jsonHeader = {
			'content-type': 'application/json'
		}
		if (typeof config.header !== 'undefined') {
			jsonHeader = {
				'content-type': 'application/json',
				[config.header.name]: uni.getStorageSync(config.header.StorageName)
			}
		}
		if (typeof loadingTxt !== 'undefined') {
			uni.showLoading({
				title: loadingTxt
			})
		}
		return new Promise((resolve, reject) => {
			uni.request({
				url: api,
				method: 'GET',
				data,
				header: jsonHeader,
				success: (res) => {
					uni.hideLoading();
					if (res.statusCode === 200) {
						resolve(res.data);
					} else if (res.statusCode === 401) {
						// 登录过期或者无权限
						uni.clearStorageSync();
						uni.reLaunch({
							url: this.loginPage
						});
					} else if (res.statusCode >= 500) {
						uni.showToast({
							title: '服务器错误',
							icon: 'error',
							duration: 2000
						});
					}
				},
				fail(err) {
					uni.hideLoading();
					//请求失败 timeout 或者无网络等 域名错误等
					reject(err);
					uni.showToast({
						title: '无法连接到服务器',
						icon: 'error',
						duration: 2000
					});

				}
			});
		});
	}

	post(api, data, loadingTxt) {
		let jsonHeader = {
			'content-type': 'application/json'
		}
		if (typeof config.header !== 'undefined') {
			jsonHeader = {
				'content-type': 'application/json',
				[config.header.name]: uni.getStorageSync(config.header.StorageName)
			}
		}
		if (typeof loadingTxt !== 'undefined') {
			uni.showLoading({
				title: loadingTxt
			})
		}
		return new Promise((resolve, reject) => {
			uni.request({
				url: api,
				method: 'POST',
				data,
				header: jsonHeader,
				success: (res) => {

					uni.hideLoading();
					if (res.statusCode === 200) {
						resolve(res.data);
					} else if (res.statusCode === 401) {
						// 登录过期或者无权限
						uni.clearStorageSync();
						uni.reLaunch({
							url: this.loginPage
						});
					} else if (res.statusCode >= 500) {
						uni.showToast({
							title: '服务器错误',
							icon: 'error',
							duration: 2000
						});
					}
				},
				fail(err) {
					uni.hideLoading();
					//请求失败 timeout 或者无网络等 域名错误等
					reject(err);
					uni.showToast({
						title: '无法连接到服务器',
						icon: 'error',
						duration: 2000
					});

				}
			});
		});
	}

	postForm(api, data, loadingTxt) {
		let formHeader = {
			'content-type': 'application/x-www-form-urlencoded'
		}
		if (typeof config.header !== 'undefined') {
			formHeader = {
				'content-type': 'application/x-www-form-urlencoded',
				[config.header.name]: uni.getStorageSync(config.header.StorageName)
			}
		}
		if (typeof loadingTxt !== 'undefined') {
			uni.showLoading({
				title: loadingTxt
			})
		}
		return new Promise((resolve, reject) => {
			uni.request({
				url: api,
				method: 'POST',
				data,
				header: formHeader,
				success: (res) => {
					uni.hideLoading();
					if (res.statusCode === 200) {
						resolve(res.data);
					} else if (res.statusCode === 401) {
						// 登录过期
						uni.clearStorageSync();
						uni.reLaunch({
							url: this.loginPage
						});
					} else if (res.statusCode >= 500) {
						uni.showToast({
							title: '服务器错误',
							icon: 'error',
							duration: 2000
						});
					}
				},
				fail(err) {
					uni.hideLoading();
					//请求失败 timeout 或者无网络等 域名错误等
					reject(err);
					uni.showToast({
						title: '无法连接到服务器',
						icon: 'error',
						duration: 2000
					});

				}
			});
		});
	}
}

export default UniHttp;
