import React, { Component, PropTypes } from "react";
import { FlatList, ScrollView, View, Text } from "react-native";
import Header from "../components/Header";
import CartItem from "./CartItem";
import RoundButton from "../components/RoundButton";
import Feather from "react-native-vector-icons/Feather";
import InlinePicker from "../components/InlinePicker";
import Icon from "../services/IconService";
import { connect } from "react-redux";
import { populateCart, populatePurchases } from "../actions/thunk";
import { removeFromCart, cartLoaded, clearCart } from "../actions/actions";
import { UnauthorizedScreen } from "./Account";
import StorageService from "../services/StorageService";
import Colors from "../constants/Colors";
import NavigationService from "../services/NavigationService";
import api from "../api/api";

class Cart extends Component {
	state = {
		status: "idle",
		location: "",
		cities: [],
		city: -1,
		stock: -1,
		stocks: []
	};
	componentDidMount() {
		this.props.dispatch(populateCart());
		api.user.getCities().then(res => {
			this.setState({
				...this.state,
				cities: res.data.data.map(e => ({
					...e,
					label: e.city_name,
					value: e.city_name
				}))
			});
		});
	}

	updateCart = (index, value) => {
		let { cart } = this.props;
		cart[index] = value;
		this.props.dispatch(cartLoaded(cart));
	};

	_removeFromCart = index => {
		this.props.dispatch(removeFromCart(index));
	};
	_clearCart = () => {
		this.props.dispatch(clearCart());
	};
	checkout = () => {
		let { user: parent, cart } = this.props;
		let { user } = parent;
		if (this.state.city < 0 && user.comission >= 35) {
			alert("Choose Pick up location and Delivery!");
			return;
		}
		this.setState({ ...this.state, status: "rotate" });

		let form = new FormData();
		form.append("User[username]", user.username);
		form.append("User[email]", user.email);
		form.append("User[phone]", user.phone);
		cart.map((e, index) => {
			form.append(`CartProduct[${index}][product_id]`, e.product_id);
			form.append(`CartProduct[${index}][name]`, e.name);
			form.append(
				`CartProduct[${index}][price]`,
				parseFloat(e.purchase_price)
			);
		});
		if (user.comission >= 35) {
			form.append(
				"Location",
				this.state.cities[this.state.city].city_name
			);
			form.append("city_id", this.state.cities[this.state.city].id);
			form.append("stock_id", this.state.stocks[this.state.stock].id);
		}

		let total = 0;
		cart.map(e => (total += parseFloat(e.purchase_price)));

		form.append("TotalPrice", total);
		api.user.checkout(form).then(res => {
			this.props.dispatch(populatePurchases());
			this.props.dispatch(cartLoaded([]));
			this.setState({ ...this.state, status: "idle" });
			this.props.navigation.navigate("OrderHistory");
		});
	};
	render() {
		let { cart, user, isAuthenticated } = this.props;
		if (!isAuthenticated) {
			return <UnauthorizedScreen />;
		}
		console.warn(user);
		let { updateCart, _removeFromCart, _clearCart } = this;
		if (cart.length <= 0) {
			return (
				<View
					style={{
						flex: 1,
						alignItems: "center",
						justifyContent: "center"
					}}
				>
					<Text style={{ color: Colors.gray, fontSize: 18 }}>
						Cart is empty
					</Text>
				</View>
			);
		}
		let total = 0;
		cart.map(e => (total += parseFloat(e.purchase_price)));
		return (
			<React.Fragment>
				<ScrollView showsVerticalScrollIndicator={false}>
					<FlatList
						showsVerticalScrollIndicator={false}
						data={cart}
						renderItem={({ item, index }) => (
							<CartItem
								{...{
									item,
									updateCart,
									removeFromCart: _removeFromCart,
									index
								}}
							/>
						)}
						keyExtractor={el => el.id.toString()}
					/>
					{cart.length > 0 && (
						<React.Fragment>
							<View
								style={{
									flexDirection: "row",
									padding: 15,
									justifyContent: "space-around",
									alignItems: "center"
								}}
							>
								<RoundButton
									onPress={() => {
										NavigationService.navigate(
											"NotificationsTab"
										);
									}}
									medium
									big
									thin
									color="#c4c4c4"
									text="Requests"
									left
									icon={() => (
										<Feather
											style={{ marginRight: 5 }}
											color="#c4c4c4"
											name="arrow-left"
											size={18}
										/>
									)}
								/>
								<RoundButton
									medium
									big
									color="red"
									text="Clear cart"
									icon={() => (
										<Feather
											color="red"
											size={18}
											name="x-circle"
										/>
									)}
									onPress={() => {
										_clearCart();
									}}
								/>
							</View>
							<View
								style={{
									flexDirection: "row",
									padding: 15,
									flexWrap: "wrap"
								}}
							>
								<Text
									style={{
										fontWeight: "100",
										color: "#c4c4c4",
										fontSize: 16
									}}
								>
									By clicking on Checkout you
								</Text>
								<Text
									style={{
										fontWeight: "bold",
										color: "red",
										fontSize: 16
									}}
								>
									{" "}
									confirm{" "}
								</Text>
								<Text
									style={{
										fontWeight: "100",
										color: "#c4c4c4",
										fontSize: 16
									}}
								>
									the offer and
								</Text>
								<Text
									style={{
										fontWeight: "bold",
										color: "red",
										fontSize: 16
									}}
								>
									{" "}
									privacy policy{" "}
								</Text>
							</View>
							<View
								style={{
									backgroundColor: "#f5f5f5",
									borderRadius: 30,
									padding: 15,
									margin: 15
								}}
							>
								<View
									style={{
										flexDirection: "row",
										marginBottom: 30,
										margin: 15,
										marginLeft: 0,
										justifyContent: "space-between",
										alignItems: "center"
									}}
								>
									<Text
										style={{
											fontWeight: "bold",
											fontSize: 30
										}}
									>
										Payment
									</Text>
								</View>
								<View
									style={{
										flexDirection: "row",
										marginTop: 15,
										marginBottom: 15
									}}
								>
									<Text
										style={{
											marginRight: 10,
											fontSize: 18
										}}
									>
										Delivery
									</Text>
									<Text
										style={{
											fontWeight: "bold",
											fontSize: 18
										}}
									>
										{user.user.username}
									</Text>
								</View>
								{user.user.comission > 25 ? (
									<React.Fragment>
										<InlinePicker
											data={this.state.cities}
											color="#01a229"
											placeholder={{
												label: "Pick up location",
												value: -1
											}}
											icon={() => (
												<Icon
													name="chevron"
													size={18}
													color="#01a229"
												/>
											)}
											selectedValue={
												this.state.cities[
													this.state.city
												]
											}
											style={{ marginBottom: 15 }}
											onValueChange={(el, index) => {
												this.setState({
													...this.state,
													city: index - 1,
													stocks:
														index - 1 >= 0
															? this.state.cities[
																	index - 1
															  ].stocks.map(
																	e => ({
																		label:
																			e.name,
																		value:
																			e.name,
																		...e
																	})
															  )
															: [],
													stock: -1
												});
											}}
										/>
										<InlinePicker
											data={
												this.state.city !== -1
													? this.state.stocks
													: []
											}
											color="#01a229"
											placeholder={{
												label: "Delivery",
												value: -1
											}}
											selectedValue={
												this.state.stock !== -1 && {
													label: this.state.stocks[
														this.state.stock
													].name,
													value: this.state.stocks[
														this.state.stock
													].name
												}
											}
											onValueChange={(e, index) => {
												this.setState({
													...this.state,
													stock: index - 1
												});
											}}
											icon={() => (
												<Icon
													name="chevron"
													size={18}
													color="#01a229"
												/>
											)}
										/>
									</React.Fragment>
								) : (
									<React.Fragment>
										<Text
											style={{
												color: "#01a229",
												fontSize: 18
											}}
										>
											Free delivery
										</Text>
									</React.Fragment>
								)}
								<View
									style={{
										flex: 1,
										paddingBottom: 15,
										marginTop: 15,
										flexDirection: "row"
									}}
								>
									<Text
										style={{
											fontWeight: "bold",
											fontSize: 18
										}}
									>
										Total
									</Text>
									<View
										style={{
											flex: 1,
											flexDirection: "row",
											alignItems: "center",
											justifyContent: "flex-end"
										}}
									>
										<Text
											style={{
												fontWeight: "bold",
												fontSize: 22
											}}
										>
											{total}
										</Text>
										<Text
											style={{
												fontWeight: "100",
												fontSize: 18
											}}
										>
											AED
										</Text>
									</View>
								</View>
								<View
									style={{
										flexDirection: "row",
										justifyContent: "center"
									}}
								>
									<RoundButton
										status={this.state.status}
										big
										large
										fill
										animated
										color="#01a229"
										text="Checkout"
										onPress={this.checkout}
									/>
								</View>
							</View>
						</React.Fragment>
					)}
				</ScrollView>
			</React.Fragment>
		);
	}
}

const mapStateToProps = ({ user, cart }) => {
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
				cart
			};
	}
	return {
		isAuthenticated: true,
		user: usr,
		cart
	};
};

export default connect(mapStateToProps)(Cart);
