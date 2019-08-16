import React, { PropTypes } from "react";
import { Card } from "react-native-elements";
import {
	View,
	Image,
	Text,
	TouchableWithoutFeedback,
	Dimensions
} from "react-native";
import RoundButton from "../components/RoundButton";
import RoundPicker from "../components/RoundPicker";
import RoundInput from "../components/RoundInput";
import NavigationService from "../services/NavigationService";
import Icon from "../services/IconService";
import { urlResolve } from "../api/api";

const CartItem = ({ item, index, removeFromCart, updateCart }) => {
	let subtotal = parseFloat(item.purchase_price) * item.quantity;
	console.warn(item.quantity);
	return (
		<>
			<Card
				containerStyle={[
					{
						borderRadius: 20,
						overflow: "hidden",
						marginBottom: 5,
						borderWidth: 1,
						shodowColor: "black",
						shadowOpacity: 0.33,
						shadowOffset: { width: 5, height: 5 },
						backgroundColor: "white",
						elevation: 2
					}
				]}
			>
				<React.Fragment>
					<View style={{ flexDirection: "row" }}>
						<Image
							resizeMode="cover"
							style={{
								height: 100,
								width: 100,
								borderRadius: 10
							}}
							source={{ uri: urlResolve(item.image) }}
						/>
						<View style={{ flex: 1, padding: 15 }}>
							<Text
								style={{
									textDecorationLine: "underline",
									color: "#cccccc",
									fontSize: 16,
									marginTop: -15,
									marginBottom: 15
								}}
							>
								{item.parent}
							</Text>
							<Text
								numberOfLines={3}
								style={{ fontWeight: "bold", fontSize: 18 }}
							>
								{item.name}
							</Text>
						</View>
						<TouchableWithoutFeedback
							onPress={() => removeFromCart(index)}
						>
							<Icon name="cancel-circled" size={25} color="red" />
						</TouchableWithoutFeedback>
					</View>
					<View
						style={{
							flexDirection: "row",
							justifyContent: "flex-start",
							alignItems: "center"
						}}
					>
						<View
							style={{
								width: 200,
								borderBottomWidth: 1,
								borderColor: "#c4c4c4",
								paddingBottom: 15,
								marginTop: 15
							}}
						>
							<Text style={{ fontWeight: "bold", fontSize: 18 }}>
								Price
							</Text>
						</View>
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
									color: "#01a629",
									fontWeight: "bold",
									fontSize: 18
								}}
							>
								{item.purchase_price}
							</Text>
							<Text style={{ fontWeight: "100", fontSize: 18 }}>
								{" "}
								AED
							</Text>
						</View>
					</View>
				</React.Fragment>
			</Card>
		</>
	);
};

export default CartItem;
