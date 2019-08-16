import React, { Component } from "react";
import { StyleSheet, View, Animated, Text } from "react-native";
import DefaultText from "../components/DefaultText";
import Icon from "../services/IconService";
import RoundButton from "../components/RoundButton";

class Checkout extends Component {
	state = { name: "", phone: "", email: "" };
	blur = new Animated.Value(0);
	componentDidMount() {
		Animated.timing(this.blur, { toValue: 80, duration: 800 }).start();
	}
	componentWillUnmount() {
		Animated.timing(this.blur, { toValue: 0 }).start();
	}
	render() {
		let { name, phone, email } = this.state;
		return (
			<View style={{ flex: 1 }}>
				<View
					tint="light"
					intensity={this.blur}
					style={StyleSheet.absoluteFill}
				>
					<View
						style={{
							justifyContent: "flex-end",
							flex: 1
						}}
					>
						<View
							style={{
								padding: 15,
								backgroundColor: "white",
								alignItems: "center",
								borderRadius: 20,
								margin: 15
							}}
						>
							<DefaultText
								editable
								text={name}
								name="Name"
								icon={() => (
									<Icon
										name="login_"
										size={28}
										color="#c4c4c4"
									/>
								)}
								editIcon={() => (
									<Icon
										name="penciledit"
										size={18}
										color="#c4c4c4"
									/>
								)}
							/>
							<DefaultText
								text={phone}
								name="Phone"
								icon={() => (
									<Icon
										name="phone"
										size={28}
										color="#c4c4c4"
									/>
								)}
								editable
								editIcon={() => (
									<Icon
										name="penciledit"
										size={18}
										color="#c4c4c4"
									/>
								)}
							/>
							<DefaultText
								editable
								text={email}
								name="Email"
								icon={() => (
									<Icon
										name="e-mail"
										size={20}
										color="#c4c4c4"
									/>
								)}
								editIcon={() => (
									<Icon
										name="penciledit"
										size={18}
										color="#c4c4c4"
									/>
								)}
							/>
							<View style={{ flexDirection: "row" }}>
								<RoundButton
									color="red"
									text="Cancel"
									left
									icon={() => (
										<Icon
											name="cancel-circled"
											color="red"
										/>
									)}
								/>
								<RoundButton
									animated
									fill
									color="#01a629"
									text="Purchase"
									noMargin
								/>
							</View>
						</View>
					</View>
				</View>
			</View>
		);
	}
}

export default Checkout;
