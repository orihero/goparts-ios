import React, { PropTypes } from "react";
import { Card } from "react-native-elements";
import {
	View,
	Image,
	Text,
	TouchableWithoutFeedback,
	Dimensions
} from "react-native";
import Icon from "../services/IconService";
import RoundButton from "../components/RoundButton";
import NavigationService from "../services/NavigationService";
import { urlResolve } from "../api/api";

const CategoryItem = ({
	item,
	horizontal,
	onCartPress,
	noMargin,
	addToCart = () => {},
	isInCart
}) => {
	console.warn(isInCart);
	return (
		<TouchableWithoutFeedback
			onPress={() => {
				NavigationService.navigate("Product", { item });
			}}
		>
			<Card
				containerStyle={[
					{
						borderRadius: 20,
						overflow: "hidden",
						marginBottom: 5,
						borderWidth: 1,
						backgroundColor: "white"
					},
					horizontal && {
						width: Dimensions.get("window").width - 45,
						marginBottom: 30,
						marginRight: 0
					},
					noMargin && { width: Dimensions.get("window").width - 40 }
				]}
				wrapperStyle={{ margin: 0, padding: 0 }}
			>
				<React.Fragment>
					<View style={{ flexDirection: "row" }}>
						<TouchableWithoutFeedback
							onPress={() =>
								NavigationService.navigate("ImageView", {
									imageIndex: 0,
									images: item.photos
								})
							}
						>
							<Image
								resizeMode="cover"
								style={{
									height: 100,
									width: 100,
									borderRadius: 10
								}}
								source={{ uri: urlResolve(item.image) }}
							/>
						</TouchableWithoutFeedback>
						<View style={{ padding: 15 }}>
							<Text
								style={{
									textDecorationLine: "underline",
									color: "#cccccc",
									fontSize: 16,
									marginTop: -15,
									marginBottom: 15
								}}
							>
								{item.car_vendor}
							</Text>
							<Text
								numberOfLines={3}
								style={{ fontWeight: "bold", fontSize: 18 }}
							>
								{item.name}
							</Text>
						</View>
					</View>
					<View
						style={{
							flexDirection: "row",
							justifyContent: "space-between"
						}}
					>
						<View
							style={{
								flexDirection: "row",
								alignItems: "center",
								justifyContent: "flex-start"
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
								AED
							</Text>
						</View>
						<View
							style={{
								flexDirection: "row",
								justifyContent: "flex-end",
								alignItems: "flex-end"
							}}
						>
							<RoundButton
								text="Buy now"
								color="#fe0000"
								onPress={() => {
									if (!isInCart) addToCart(item);
									NavigationService.navigate("Cart", {
										item
									});
								}}
							/>
							<RoundButton
								status={isInCart ? "disabled" : "idle"}
								onPress={() => {
									addToCart(item);
								}}
								style={{ marginLeft: 15 }}
								color="#01a529"
								fill
								icon={() =>
									isInCart ? (
										<Icon
											name="ok"
											size={18}
											color="white"
										/>
									) : (
										<Icon
											name="shoppingcart"
											size={18}
											color="white"
										/>
									)
								}
							/>
						</View>
					</View>
				</React.Fragment>
			</Card>
		</TouchableWithoutFeedback>
	);
};

export default CategoryItem;
