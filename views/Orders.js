import React from "react";
import { View, Text, FlatList, ScrollView } from "react-native";
import Header from "../components/Header";
import OrderItem from "./OrderItem";
import { connect } from "react-redux";
import StorageService from "../services/StorageService";
import ListEmptyComponent from "../components/ListEmptyComponent";
import { populateOrders, populateRequests } from "../actions/thunk";
import RoundButton from "../components/RoundButton";
import { UnauthorizedScreen } from "./Account";
import { addToCart } from "../actions/actions";

class Orders extends React.Component {
	state = { loading: false, activeSections: [], refreshing: false };
	componentDidMount() {
		let { isAuthenticated } = this.props;
		let type = null;
		if (isAuthenticated) {
			let { user } = this.props.user;
			type = user.user_role;
			if (type === 0) {
				this.setState({ ...this.state, loading: true });
				this.props.dispatch(
					populateOrders(res => {
						console.warn(res.data);
						this.setState({ ...this.state, loading: false });
					})
				);
			}
			if (type === 1) {
				this.setState({ ...this.state, loading: true });
				this.props.dispatch(
					populateRequests(res => {
						this.setState({ ...this.state, loading: false });
					})
				);
			}
		}
	}

	updateOrders = func => {
		this.props.dispatch(populateOrders(func));
	};

	addToCart = product => {
		this.props.dispatch(addToCart({ ...product, quantity: 1 }));
	};

	render() {
		let { isAuthenticated } = this.props;
		if (!isAuthenticated) {
			return (
				<React.Fragment>
					<Header
						name="Your Requests"
						description="Seller suggestions"
					/>
					<UnauthorizedScreen />
				</React.Fragment>
			);
		}
		let { orders, cart } = this.props;
		let { loading, activeSections } = this.state;
		let { user } = this.props.user;
		let { update, updateOrders, addToCart } = this;
		let type = user.user_role;
		return (
			<View style={{ flex: 1 }}>
				<Header name="Your Requests" description="Seller suggestions" />
				{orders.length <= 0 && (
					<ListEmptyComponent
						{...{
							loading,
							hasData: orders.length <= 0
						}}
					/>
				)}
				{orders.length > 0 && (
					<ScrollView
						contentContainerStyle={{ paddingBottom: 30 }}
						style={{ paddingTop: 10, paddingBottom: 30 }}
					>
						{orders.map((item, index) => (
							<OrderItem
								{...{
									item,
									type,
									updateOrders,
									addToCart,
									cart
								}}
							/>
						))}
					</ScrollView>
				)}
			</View>
		);
	}
}

const mapStateToProps = ({ orders, user, cart }) => {
	let usr = user;
	if (Object.keys(user).length === 0) {
		usr = StorageService.getState();
		if (
			usr === null ||
			usr === "" ||
			usr === undefined ||
			Object.keys(usr).length === 0
		)
			return {
				isAuthenticated: false,
				user: {},
				orders,
				cart
			};
	}
	return {
		isAuthenticated: true,
		user: usr,
		orders,
		cart
	};
};

export default connect(mapStateToProps)(Orders);
