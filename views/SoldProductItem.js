import React from "react";

import { View, Text } from "react-native";

const OrderHistoryItem = ({ item }) => {
	let color = "black";
	return (
		<View
			style={{
				margin: 15,
				marginBottom: 4,
				padding: 15,
				shadowOpacity: 0.2,
				shadowColor: "black",
				shadowOffset: { height: 0, width: 0 },
				backgroundColor: "white",
				borderRadius: 20,
				elevation: 5
			}}
		>
			<View
				style={{
					paddingBottom: 10,
					paddingTop: 10,
					borderBottomWidth: 1,
					borderColor: "black",
					flexDirection: "row"
				}}
			>
				<View
					style={{
						flex: 1,
						flexDirection: "row",
						justifyContent: "space-between"
					}}
				>
					<Text style={{ color, fontWeight: "200" }}>
						{item.purchase_date}
					</Text>
					<Text
						style={{
							color: "green",
							fontWeight: "bold",
							paddingRight: 10
						}}
					>
						#{item.id}
					</Text>
				</View>
				<View
					style={{
						flex: 1,
						flexDirection: "row",
						justifyContent: "space-between"
					}}
				>
					<Text style={{ color, fontWeight: "200" }}>{item.car}</Text>
				</View>
			</View>
			<View
				style={{
					paddingBottom: 10,
					paddingTop: 10,
					borderBottomWidth: 1,
					borderColor: "black",
					flexDirection: "row"
				}}
			>
				<View
					style={{
						flex: 1,
						flexDirection: "row",
						justifyContent: "space-between"
					}}
				>
					<Text style={{ color, fontWeight: "200" }}>Cash</Text>
					<Text />
				</View>
				<View
					style={{
						flex: 1,
						flexDirection: "row",
						justifyContent: "space-between"
					}}
				>
					<Text style={{ color, fontWeight: "bold" }}>Price</Text>
					<Text style={{ color, fontWeight: "bold" }}>
						{item.purchased_product.price} AED
					</Text>
				</View>
			</View>
			<View
				style={{
					flexDirection: "row",
					paddingTop: 10
				}}
			>
				<View
					style={{
						flex: 1,
						flexDirection: "row"
					}}
				>
					<Text style={{ color, fontWeight: "200" }}>
						Description{": "}
					</Text>
					<Text
						numberOfLines={1}
						style={{ color, fontWeight: "bold" }}
					>
						{item.purchased_product.product_description}
					</Text>
				</View>
			</View>
		</View>
	);
};

export default OrderHistoryItem;
