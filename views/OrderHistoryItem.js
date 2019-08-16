import React from "react";

import { View, Text } from "react-native";

const OrderHistoryItem = ({ item }) => {
	let paymentStatus = item.paid === 1 ? "Paid" : "";
	let color = item.paid === 1 ? "green" : "#110c11";
	let status = "";
	switch (item.status) {
		case 1:
			status = "New";
			break;
		case 2:
			status = "Accepted";
			break;
		case 3:
			status = "Delivered";
			break;
		case 4:
			status = "Picked up";
			break;
		case 5:
			status = "Not picked up";
			break;
		case 6:
			status = "Returned";
			break;
		default:
			status = "Undefined";
			break;
	}
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
				borderRadius: 20
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
						{item.created_at}
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
					<Text style={{ color, fontWeight: "200" }}>
						{item.paymentStatus}
					</Text>
					<Text style={{ color, fontWeight: "200" }}>{status}</Text>
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
					<Text style={{ color, fontWeight: "bold" }}>Delivery</Text>
					<Text style={{ color, fontWeight: "bold" }}>
						{item.total_price} AED
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
						flexDirection: "row",
						justifyContent: "space-between"
					}}
				>
					<Text style={{ color, fontWeight: "200" }}>
						{item.city}
					</Text>
					<Text />
				</View>
				<View
					style={{
						flex: 1,
						flexDirection: "row",
						justifyContent: "space-between"
					}}
				>
					<Text style={{ color, fontWeight: "bold" }}>
						Total price
					</Text>
					<Text style={{ color, fontWeight: "bold" }}>
						{item.total_price} AED
					</Text>
				</View>
			</View>
		</View>
	);
};

export default OrderHistoryItem;
