import React from "react";
import { View, Text, ActivityIndicator, Dimensions } from "react-native";
import Colors from "../constants/Colors";

const { width, height } = Dimensions.get("window");

const ListEmptyComponent = ({ loading, hasData, searching, hasSearch }) => {
	if ((!loading && hasData) || (!loading && searching && hasSearch)) {
		return (
			<View
				style={{
					justifyContent: "center",
					alignItems: "center",
					width,
					height: height - 200
				}}
			>
				<Text
					style={{
						color: Colors.gray,
						fontSize: 18
					}}
				>
					No data
				</Text>
			</View>
		);
	} else
		return (
			<View
				style={{
					justifyContent: "center",
					alignItems: "center",
					width,
					height: height - 200
				}}
			>
				<ActivityIndicator size="large" />
			</View>
		);
};

export default ListEmptyComponent;
