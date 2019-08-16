import React, { Component, PropTypes } from "react";
import { View, Text, ScrollView, KeyboardAvoidingView } from "react-native";
import RoundInput from "../components/RoundInput";
import Header from "../components/Header";
import RoundButton from "../components/RoundButton";
import Icon from "../services/IconService";
import { CheckBox } from "react-native-elements";
import { registerAsync } from "../actions/thunk";
import { connect } from "react-redux";
import NavigationService from "../services/NavigationService";
import { ordersLoaded } from "../actions/actions";
import NotificationService from "../services/NotificationService";

class Register extends Component {
	constructor(props) {
		super(props);
	}
	state = {
		agree: true,
		status: "idle",
		seller: true,
		username: "",
		location: "",
		phone: "",
		legal_info: "",
		email: "",
		password: ""
	};
	onRegister = () => {
		this.setState({ status: "rotate" });
		let {
			phone,
			email,
			password,
			legal_info,
			username,
			location,
			seller
		} = this.state;
		let user = {
			phone,
			email,
			password,
			legal_info,
			location,
			role: seller ? 1 : 0,
			username
		};
		this.props.dispatch(ordersLoaded([]));
		this.props.dispatch(
			registerAsync({ ...user }, () => {
				this.setState({ ...this.state, status: "success" });
				NotificationService.init();
				alert(
					"Your request has been sent to our admins." +
						" You will be contacted soon! Thans for cooperation"
				);
				setTimeout(() => NavigationService.goBack(), 100);
			})
		);
	};
	render() {
		return (
			<React.Fragment>
				<Header
					name="Choose Registration type"
					back
					description="Customer or seller?"
				/>
				<KeyboardAvoidingView
					behavior={Platform.OS === "android" ? null : "padding"}
					enabled
					style={{
						marginBottom: Platform.OS === "android" ? 80 : 120
					}}
				>
					<ScrollView showsVerticalScrollIndicator={false}>
						<View
							style={{
								alignItems: "center",
								padding: 15,
								paddingTop: 30
							}}
						>
							<Icon name="seller" size={50} color="#c4c4c4" />
							<CheckBox
								checked={this.state.seller}
								containerStyle={{
									backgroundColor: "white",
									borderWidth: 0,
									padding: 0,
									margin: 0,
									justifyContent: "flex-start",
									marginTop: 15,
									marginBottom: 15
								}}
								checkedColor="green"
								iconType="material-community"
								checkedIcon="circle-slice-8"
								title="Seller"
								uncheckedIcon="checkbox-blank-circle-outline"
								textStyle={{
									color: "black",
									fontWeight: "bold",
									fontSize: 18
								}}
								onPress={() =>
									this.setState({
										...this.state,
										seller: true
									})
								}
							/>
							<Text style={{ fontWeight: "100", width: 200 }}>
								Sell your entire inventory of used auto parts.
								Broadcast your inventory and let us take care of
								all payment and customer support.
							</Text>
						</View>
						<View style={{ alignItems: "center", padding: 15 }}>
							<Icon name="customer" size={50} color="#c4c4c4" />
							<CheckBox
								checked={!this.state.seller}
								containerStyle={{
									backgroundColor: "white",
									borderWidth: 0,
									padding: 0,
									margin: 0,
									justifyContent: "flex-start",
									marginTop: 15,
									marginBottom: 15
								}}
								checkedColor="green"
								iconType="material-community"
								checkedIcon="circle-slice-8"
								title="Customer"
								uncheckedIcon="checkbox-blank-circle-outline"
								textStyle={{
									color: "black",
									fontWeight: "bold",
									fontSize: 18
								}}
								onPress={() =>
									this.setState({
										...this.state,
										seller: false
									})
								}
							/>
							<Text style={{ fontWeight: "100", width: 300 }}>
								We offer large selection of high quality parts
								at competitive prices, and all our parts are
								available for purchase online instantly. We take
								full responsibility for logistics, so we can
								guarantee timely delivery
							</Text>
						</View>
						<RoundInput
							onTextChange={(key, val) => {
								this.setState({ ...this.setState, [key]: val });
							}}
							leftIcon={() => (
								<Icon
									name="nameofcompany"
									size={24}
									color="#c4c4c4"
								/>
							)}
							simple
							placeholder="Company Name"
							name="legal_info"
						/>
						<RoundInput
							onTextChange={(key, val) =>
								this.setState({ ...this.setState, [key]: val })
							}
							leftIcon={() => (
								<Icon
									name="location"
									size={24}
									color="#c4c4c4"
								/>
							)}
							simple
							placeholder="City"
							name="location"
						/>
						<RoundInput
							onTextChange={(key, val) =>
								this.setState({ ...this.setState, [key]: val })
							}
							leftIcon={() => (
								<Icon
									name="phone-1"
									size={24}
									color="#c4c4c4"
								/>
							)}
							simple
							placeholder="Phone"
							name="phone"
							keyboardType="phone-pad"
							textContentType="telephoneNumber"
						/>
						<RoundInput
							onTextChange={(key, val) =>
								this.setState({ ...this.setState, [key]: val })
							}
							leftIcon={() => (
								<Icon name="login_" size={24} color="#c4c4c4" />
							)}
							simple
							placeholder="Login"
							name="username"
						/>
						<RoundInput
							onTextChange={(key, val) =>
								this.setState({ ...this.setState, [key]: val })
							}
							leftIcon={() => (
								<Icon name="e-mail" size={24} color="#c4c4c4" />
							)}
							simple
							placeholder="Email"
							name="email"
							keyboardType="email-address"
							textContentType="emailAddress"
						/>
						<RoundInput
							onTextChange={(key, val) =>
								this.setState({ ...this.setState, [key]: val })
							}
							leftIcon={() => (
								<Icon
									name="password"
									size={24}
									color="#c4c4c4"
								/>
							)}
							name="password"
							simple
							password
							placeholder="Password"
							textContentType="newPassword"
						/>
						<View
							style={{
								flexDirection: "row",
								padding: 30,
								justifyContent: "center",
								alignItems: "center"
							}}
						>
							<View
								style={{
									backgroundColor: "#c4c4c4",
									height: 2,
									width: 60,
									alignItems: "center",
									justifyContent: "center",
									marginTop: 30
								}}
							/>
							<View
								style={{
									alignItems: "center",
									justifyContent: "center"
								}}
							>
								<CheckBox
									checked={this.state.agree}
									containerStyle={{
										backgroundColor: "white",
										borderWidth: 0,
										padding: 0,
										margin: 0,
										justifyContent: "flex-start"
									}}
									checkedColor="green"
									iconType="material-community"
									checkedIcon="check-circle"
									uncheckedIcon="checkbox-blank-circle-outline"
									textStyle={{
										color: "black",
										fontWeight: "bold",
										fontSize: 18
									}}
									onPress={() => {
										this.setState({
											agree: !this.state.agree,
											status: !this.state.agree
												? "idle"
												: "disabled"
										});
									}}
								/>
								<View style={{ flexDirection: "column" }}>
									<View
										style={{
											flexDirection: "row",
											justifyContent: "center"
										}}
									>
										<Text>I do </Text>
										<Text
											style={{
												color: "red",
												fontWeight: "bold"
											}}
										>
											Accept{" "}
										</Text>
										<Text>the </Text>
										<Text
											style={{
												color: "red",
												fontWeight: "bold"
											}}
										>
											Terms{" "}
										</Text>
									</View>
									<View style={{ flexDirection: "row" }}>
										<Text
											style={{
												color: "red",
												fontWeight: "bold"
											}}
										>
											{" "}
											and Conditions{" "}
										</Text>
										<Text>of the Site</Text>
									</View>
								</View>
							</View>
							<View
								style={{
									backgroundColor: "#c4c4c4",
									height: 2,
									width: 60,
									alignItems: "center",
									justifyContent: "center",
									marginTop: 30
								}}
							/>
						</View>
						<View
							style={{
								alignItems: "center",
								justifyContent: "center",
								marginBottom: 30
							}}
						>
							<RoundButton
								status={this.state.status}
								onPress={this.onRegister}
								big
								animated
								fill
								color="#069327"
								text="Sign up"
								disabledIcon={() => (
									<Icon
										name="right-arrow"
										color="red"
										size={18}
									/>
								)}
							/>
						</View>
					</ScrollView>
				</KeyboardAvoidingView>
			</React.Fragment>
		);
	}
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(Register);
