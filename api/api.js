import React from "react";
import axios from "axios";
import StorageService from "../services/StorageService";

//uavparts.u0717696.cp.regruhosting.ru

export const siteUrl = "http://goparts.ae";
export const url = siteUrl + "/api";
export const urlResolve = param => {
	if (!param) return;
	if (param.indexOf("file://") !== -1) return param;
	if (param.indexOf("data:image/jpeg;base64,") !== -1) return param;
	return siteUrl + param;
};

let getToken = () => {
	return StorageService.getState().token;
};

let packageData = data => {
	const form = new FormData();
	for (const key in data) {
		form.append(key, data[key]);
	}
	return form;
};

let formRequest = data => {
	let form = new FormData();
	for (var key in data) {
		for (var item in data[key]) {
			if (Array.isArray(data[key][item])) {
				data[key][item].map((e, i) => {
					if (!e) {
						return;
					}
					const uriParts = e.split(".");
					const fileType = uriParts[uriParts.length - 1];
					form.append(`${key}[${item}][${i}]`, {
						uri: e,
						name: `photo.${fileType}`,
						type: `image/${fileType}`
					});
				});
				continue;
			}
			form.append(`${key}[${item}]`, data[key][item]);
		}
	}
	return form;
};

let formData = data => {
	let form = new FormData();
	for (var key in data.QueryData) {
		form.append(`QueryData[${key}]`, data.QueryData[key]);
	}
	for (var i = 0; i < data.Query.length; i++) {
		for (var el = 0; el < data.Query[i].images.length; el++) {
			data.Query[i].images.map((e, index) => {
				const uriParts = e.split(".");
				const fileType = uriParts[uriParts.length - 1];
				form.append(`Query[${i}][images][${index}]`, {
					uri: e,
					name: `photo.${fileType}`,
					type: `image/${fileType}`
				});
			});
		}
		form.append(`Query[${i}][description]`, data.Query[i].description);
	}
	return form;
};

let formUpdate = credentials => {
	let form = new FormData();
	let data = credentials.user;
	for (var key in data) {
		if (key === "avatar") {
			if (data[key].indexOf("file://") === -1) continue;
			const uriParts = data[key].split(".");
			const fileType = uriParts[uriParts.length - 1];
			form.append(`${key}`, {
				uri: data[key],
				name: `photo.${fileType}`,
				type: `image/${fileType}`
			});
			continue;
		}
		form.append(`${key}`, data[key]);
	}
	console.warn(form);
	return form;
};

export default {
	auth: {
		login: credentials =>
			axios
				.post(url + "/auth/login", packageData(credentials))
				.then(res => res)
				.catch(({ response }) => response),
		register: credentials =>
			axios
				.post(url + "/auth/register", packageData(credentials))
				.then(res => res)
				.catch(({ response }) => response),
		setToken: token =>
			axios
				.post(
					url + "/profile/set-device",
					packageData({ device_id: token }),
					{
						headers: {
							Authorization: "Basic " + getToken()
						}
					}
				)
				.then(res => res)
				.catch(({ response }) => response)
	},
	user: {
		getInfo: () => {
			return axios
				.post(url + "/profile/info", null, {
					headers: {
						Authorization: "Basic " + getToken()
					}
				})
				.then(res => res)
				.catch(({ response }) => response);
		},
		update: credentials => {
			return axios
				.post(url + "/profile/update", formUpdate(credentials), {
					headers: {
						Authorization: "Basic " + getToken()
					}
				})
				.then(res => res)
				.catch(({ response }) => response);
		},
		purchases: () => {
			return axios
				.post(url + "/profile/purchase", null, {
					headers: {
						Authorization: "Basic " + getToken()
					}
				})
				.then(res => res)
				.catch(({ response }) => response);
		},
		sold: () => {
			return axios
				.post(url + "/store-query/purchased", null, {
					headers: {
						Authorization: "Basic " + getToken()
					}
				})
				.then(res => res)
				.catch(({ response }) => response);
		},
		checkout: data =>
			axios
				.post(`${url}/order/make`, data, {
					headers: {
						Authorization: "Basic " + getToken()
					}
				})
				.then(res => res)
				.catch(({ response }) => response),
		getCities: () =>
			axios
				.post(`${url}/cart/get-cities`, null, {
					headers: {
						Authorization: "Basic " + getToken()
					}
				})
				.then(res => res)
				.catch(({ response }) => response)
	},
	product: {
		getMakes: () =>
			axios
				.get(url + "/store-product/get-vendors")
				.then(res => res)
				.catch(({ response }) => response),
		getModels: make =>
			axios
				.get(url + "/store-product/get-cars?vendor=" + make)
				.then(res => res)
				.catch(({ response }) => response),
		getYears: (make, model) =>
			axios
				.get(
					url +
						"/store-product/get-modification?vendor=" +
						make +
						"&car=" +
						model
				)
				.then(res => res)
				.catch(({ response }) => response),
		getModifications: (make, model) =>
			axios
				.get(url + "/query/get-car?vendor=" + make + "&car=" + model)
				.then(res => res)
				.catch(({ response }) => response),
		getExactYears: (make, model, modification) =>
			axios
				.get(
					url +
						"/query/get-car?vendor=" +
						make +
						"&car=" +
						model +
						"&modification=" +
						modification
				)
				.then(res => res)
				.catch(({ response }) => response),
		getProducts: (make, model, year) =>
			axios
				.get(
					url +
						"/store-product/search?vendor=" +
						make +
						"&car=" +
						model +
						"&modification=" +
						year
				)
				.then(res => res)
				.catch(({ response }) => response),
		getCarId: (make, model, year) =>
			axios
				.get(
					url +
						"/query/get-car-id?vendor=" +
						make +
						"&car=" +
						model +
						"&year=" +
						year
				)
				.then(res => res.data.car_id)
				.catch(({ response }) => response),
		getExactModifications: (make, model) =>
			axios
				.get(url + "/query/get-car-id?vendor=" + make + "&car=" + model)
				.then(res => res)
				.catch(({ response }) => response)
	},
	category: {
		get: () =>
			axios
				.get(url + "/store-category")
				.then(res => res)
				.catch(({ response }) => response)
	},
	options: {
		get: () =>
			axios
				.get(url + "/store-option")
				.then(res => res)
				.catch(({ response }) => response)
	},
	order: {
		request: (car_id, credentials) =>
			axios
				.post(
					`${url}/query/create/?car_id=${car_id}`,
					formData(credentials)
				)
				.then(res => res)
				.catch(({ response }) => response),
		makeRequest: (car_id, credentials) =>
			axios
				.post(
					`${url}/my-query/create/?car_id=${car_id}`,
					formData(credentials),
					{
						headers: {
							Authorization: "Basic " + getToken()
						}
					}
				)
				.then(res => {
					console.warn(res);
					return res;
				})
				.catch(({ response }) => {
					console.warn(response);
					return response;
				}),
		get: () =>
			axios
				.get(`${url}/my-query`, {
					headers: {
						Authorization: "Basic " + getToken()
					}
				})
				.then(res => res)
				.catch(({ response }) => response),
		getRequests: () =>
			axios
				.get(`${url}/store-query`, {
					headers: {
						Authorization: "Basic " + getToken()
					}
				})
				.then(res => res)
				.catch(({ response }) => response),
		addProduct: credentials =>
			axios
				.post(
					`${url}/store-query/add-product`,
					formRequest(credentials),
					{
						headers: {
							Authorization: "Basic " + getToken(),
							"Content-Type": "application/x-www-form-urlencoded"
						}
					}
				)
				.then(res => res)
				.catch(({ response }) => response),
		updateProduct: credentials =>
			axios
				.post(
					`${url}/store-query/edit-product`,
					formRequest(credentials),
					{
						headers: {
							Authorization: "Basic " + getToken(),
							"Content-Type": "application/x-www-form-urlencoded"
						}
					}
				)
				.then(res => res)
				.catch(({ response }) => response)
	},
	cart: {
		getCart: () =>
			axios
				.post(`${url}/cart`, null, {
					headers: {
						Authorization: "Basic " + getToken()
					}
				})
				.then(res => res)
				.catch(({ response }) => response),
		addToCart: id =>
			axios
				.post(`${url}/cart/add`, packageData({ product_id: id }), {
					headers: {
						Authorization: "Basic " + getToken()
					}
				})
				.then(res => res)
				.catch(({ response }) => response),
		removeFromCart: id =>
			axios
				.post(
					`${url}/cart/delete`,
					packageData({ cart_product_id: id }),
					{
						headers: {
							Authorization: "Basic " + getToken()
						}
					}
				)
				.then(res => res)
				.catch(({ response }) => response),
		removeAll: () =>
			axios
				.post(`${url}/cart/clear`, null, {
					headers: {
						Authorization: "Basic " + getToken()
					}
				})
				.then(res => res)
				.catch(({ response }) => response)
	}
};
