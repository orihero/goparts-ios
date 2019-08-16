import React, { Component, PropTypes } from "react";
import { View, Text, Image, TouchableWithoutFeedback } from "react-native";
import NavigationService from "../services/NavigationService";

const ChatItem = ({ item }) => {
	return (
		<TouchableWithoutFeedback
			onPress={() => NavigationService.navigate("Chat", { user: item })}
		>
			<View
				style={{
					margin: 15,
					marginTop: 0,
					borderBottomWidth: 1,
					borderColor: "#afafaf",
					flexDirection: "row"
				}}
			>
				<View>
					<View
						style={{
							borderRadius: 60,
							justifyContent: "center",
							alignItems: "center",
							overflow: "hidden"
						}}
					>
						<Image
							source={{
								uri: item.photo
							}}
							style={{
								height: 60,
								width: 60,
								overflow: "hidden"
							}}
						/>
					</View>
					{item.online && (
						<View
							style={{
								justifyContent: "flex-end",
								alignItems: "flex-end"
							}}
						>
							<View
								style={{
									height: 16,
									width: 16,
									borderRadius: 10,
									backgroundColor: "#01a229",
									justifyContent: "center",
									alignItems: "center",
									marginTop: -30,
									marginRight: 4
								}}
							/>
						</View>
					)}
				</View>
				<View
					style={{
						padding: 15,
						paddingTop: 10,
						paddingLeft: 0,
						flex: 1,
						justifyContent: "space-between"
					}}
				>
					<Text
						numberOfLines={1}
						style={{
							fontSize: 18,
							fontWeight: "bold",
							marginBottom: 5
						}}
					>
						{item.name}
					</Text>
					<Text
						numberOfLines={1}
						style={{
							fontSize: 16,
							fontWeight: "400",
							color: "#afafaf"
						}}
					>
						{item.text}
					</Text>
				</View>
				<View
					style={{
						padding: 15,
						paddingTop: 10,
						alignItems: "flex-end"
					}}
				>
					<Text
						style={{
							fontWeight: "bold",
							color: "#afafaf",
							marginBottom: 5
						}}
					>
						{item.date}
					</Text>
					{item.newMessages > 0 && (
						<View
							style={{
								width: 24,
								height: 24,
								borderRadius: 12,
								justifyContent: "center",
								alignItems: "center",
								backgroundColor: "#ff1f1f"
							}}
						>
							<Text style={{ color: "white", fontWeight: "100" }}>
								{item.newMessages > 99 ? 99 : item.newMessages}
							</Text>
						</View>
					)}
				</View>
			</View>
		</TouchableWithoutFeedback>
	);
};

export default ChatItem;
