import React from "react";
import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import {
	user,
	error,
	makes,
	models,
	years,
	products,
	categories,
	modifications,
	generations,
	orders,
	cart,
	purchases
} from "../reducers/reducers";

const configureStore = () =>
	createStore(
		combineReducers({
			user,
			error,
			makes,
			years,
			models,
			products,
			categories,
			modifications,
			generations,
			orders,
			cart,
			purchases
		}),
		applyMiddleware(thunk)
	);

export default configureStore;
