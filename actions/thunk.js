import React from "react";
import api from "../api/api";
import {
	userRegistred,
	userLoggedIn,
	error,
	makesLoaded,
	modelsLoaded,
	yearsLoaded,
	productsLoaded,
	categoriesLoaded,
	modificationsLoaded,
	generationsLoaded,
	ordersLoaded,
	cartsLoaded,
	purchasesLoaded
} from "./actions";

export const loginAsync = (data, next, remember) => dispatch => {
	return api.auth
		.login(data)
		.then(res => {
			let user = res.data;
			if (res.status === 200) {
				user.user["password"] = data.password;
				dispatch(userLoggedIn(user));
			}
			next(res);
			return res;
		})
		.catch(res => {
			next(res);
			return dispatch(error(data));
		});
};

export const registerAsync = (data, next) => dispatch => {
	return api.auth
		.register(data)
		.then(res => {
			dispatch(
				userRegistred({
					token: res.data.toke,
					user: { ...data, avatar: "" }
				})
			);
			next(res);
			return res;
		})
		.catch(res => {
			next(res);
			return dispatch(error(res.data));
		});
};

export const populateMakes = (next = () => {}) => dispatch => {
	return api.product
		.getMakes()
		.then(res => {
			let makes = [];
			Object.keys(res.data).map(key =>
				makes.push({ label: res.data[key], value: res.data[key] })
			);
			dispatch(makesLoaded(makes));
			next(res);
			return res;
		})
		.catch(res => {
			next(res);
			return dispatch(error(res));
		});
};

export const populateModels = (make, next = () => {}) => dispatch => {
	return api.product
		.getModels(make)
		.then(res => {
			let models = [];
			for (var key in res.data) {
				models.push({ label: res.data[key], value: res.data[key] });
			}
			dispatch(modelsLoaded(models));
			next(res);
			return res;
		})
		.catch(res => {
			next(res);
			return dispatch(error(res));
		});
};

export const populateModifications = (
	make,
	model,
	next = () => {}
) => dispatch => {
	return api.product
		.getModifications(make, model)
		.then(res => {
			let years = [];
			for (var key in res.data.modification) {
				years.push({ label: key, value: key });
			}
			dispatch(modificationsLoaded(years));
			next(res);
			return res;
		})
		.catch(res => {
			next(res);
			return dispatch(error(res));
		});
};

export const populateExactYears = (
	make,
	model,
	modification,
	next = () => {}
) => dispatch => {
	return api.product
		.getExactYears(make, model, modification)
		.then(res => {
			let years = [];
			for (var key in res.data.year) {
				years.push({ label: key, value: key });
			}
			dispatch(yearsLoaded(years));
			next(res);
			return res;
		})
		.catch(res => {
			next(res);
			return dispatch(error(res));
		});
};

export const populateYears = (make, model, next = () => {}) => dispatch => {
	return api.product
		.getYears(make, model)
		.then(res => {
			let years = [];
			for (var key in res.data) {
				years.push({ label: key, value: key });
			}
			next(res);
			dispatch(generationsLoaded(years));
			return res;
		})
		.catch(res => {
			next(res);
			return dispatch(error(res));
		});
};

export const populateCategories = (next = () => {}) => dispatch => {
	return api.category
		.get()
		.then(res => {
			dispatch(categoriesLoaded(res.data.data));
			next(res);
			return res;
		})
		.catch(res => {
			next(res);
			return dispatch(error(res));
		});
};

export const populateProducts = (
	make,
	model,
	year,
	next = () => {}
) => dispatch => {
	return api.product
		.getProducts(make, model, year)
		.then(res => {
			dispatch(productsLoaded(res.data.products));
			next(res);
			return res;
		})
		.catch(res => {
			next(res);
			return dispatch(error(res));
		});
};

export const populateOrders = (next = () => {}) => dispatch => {
	return api.order
		.get()
		.then(res => {
			dispatch(ordersLoaded(res.data.query));
			next(res);
			return res;
		})
		.catch(res => {
			next(res);
			return dispatch(error(res));
		});
};

export const populateRequests = (next = () => {}) => dispatch => {
	return api.order
		.getRequests()
		.then(res => {
			dispatch(ordersLoaded(res.data.data));
			next(res);
			return res;
		})
		.catch(res => {
			next(res);
			return dispatch(error(res));
		});
};

export const populatePurchases = (next = () => {}) => dispatch => {
	return api.user
		.purchases()
		.then(res => {
			if (res.data.data) {
				dispatch(purchasesLoaded(res.data.data));
			} else {
				dispatch(purchasesLoaded([]));
			}
			next(res);
			return res;
		})
		.catch(res => {
			next(res);
			return dispatch(error(res));
		});
};

export const populateSoldProducts = (next = () => {}) => dispatch => {
	return api.user
		.sold()
		.then(res => {
			if (res.data.data) {
				dispatch(purchasesLoaded(res.data.data));
			} else {
				dispatch(purchasesLoaded([]));
			}
			next(res);
			return res;
		})
		.catch(res => {
			next(res);
			return dispatch(error(res));
		});
};

export const populateCart = (next = () => {}) => dispatch => {
	return api.cart
		.getCart()
		.then(res => {
			dispatch(cartsLoaded(res.data.data));
			next(res);
			return res;
		})
		.catch(res => {
			next(res);
			return dispatch(error(res));
		});
};
