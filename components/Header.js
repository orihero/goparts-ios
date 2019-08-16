import React, { PropTypes } from "react";
import {
	View,
	Text,
	Dimensions,
	TouchableWithoutFeedback,
	StatusBar,
	Image
} from "react-native";
import Icon from "../services/IconService";
import NavigationService from "../services/NavigationService";

const { width } = Dimensions.get("window");

export class ListHeaderComponent extends React.Component {
	render() {
		return (
			<React.Fragment>
				<View
					style={{
						justifyContent: "space-between",
						flexDirection: "row",
						alignItems: "center",
						padding: 15,
						paddingTop: 5,
						marginBottom: 0,
						paddingBottom: 0
					}}
				>
					<View
						style={{
							borderRightWidth: 1,
							borderColor: "white",
							flexDirection: "row",
							paddingRight: 10
						}}
					>
						<Text style={{ color: "white", fontWeight: "bold" }}>
							Categories
						</Text>
						<View
							style={{
								justifyContent: "center",
								alignItems: "center",
								marginLeft: 5
							}}
						>
							<Icon name="chevrondown" size={6} color="white" />
						</View>
					</View>
					<View
						style={{
							borderRightWidth: 1,
							borderColor: "white",
							flexDirection: "row",
							marginLeft: -5,
							paddingRight: 10
						}}
					>
						<Text style={{ color: "white", fontWeight: "bold" }}>
							Body Type
						</Text>
						<View
							style={{
								justifyContent: "center",
								alignItems: "center",
								marginLeft: 5
							}}
						>
							<Icon name="chevrondown" size={6} color="white" />
						</View>
					</View>
					<View
						style={{
							flexDirection: "row",
							marginLeft: -5
						}}
					>
						<Text style={{ color: "white", fontWeight: "bold" }}>
							Filter
						</Text>
						<View
							style={{
								justifyContent: "center",
								alignItems: "center",
								marginLeft: 5
							}}
						>
							<Icon name="chevrondown" size={6} color="white" />
						</View>
					</View>
				</View>
			</React.Fragment>
		);
	}
}

export class Header extends React.Component {
	state = { marginTop: 0 };
	outsiderWidth = this.props.user ? 60 : 20;
	renderLeft = () => {
		let { user, openDrawer, noMenu } = this.props;
		if (!user) {
			if (noMenu) return null;
			return (
				<TouchableWithoutFeedback
					onPress={() => NavigationService.toggleDrawer()}
				>
					<View style={{ padding: 10 }}>
						<Icon size={14} name="burger" color="white" />
					</View>
				</TouchableWithoutFeedback>
			);
		}
		return (
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
							uri: user.photo
						}}
						style={{
							height: 60,
							width: 60,
							overflow: "hidden"
						}}
					/>
				</View>
				{user.online && (
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
		);
	};
	renderDescription = () => {
		let { user, description, clickable, descriptionPress } = this.props;
		let text = description;
		if (user) {
			text = user.online ? "Online" : "Last seen " + user.date;
		}
		if (clickable) {
			return (
				<TouchableWithoutFeedback
					onPress={() => NavigationService.navigate("LeaveOrder")}
				>
					<Text
						style={{
							color: "white",
							fontSize: 18,
							fontWeight: "bold",
							textDecorationLine: "underline",
							textDecorationStyle: "dotted",
							marginBottom: 0
						}}
					>
						{description}
					</Text>
				</TouchableWithoutFeedback>
			);
		}
		return (
			<Text
				style={{
					color: "white",
					fontSize: 18,
					fontWeight: "100"
				}}
			>
				{text}
			</Text>
		);
	};
	render() {
		let { marginTop } = this.state;
		let {
			name,
			description,
			back,
			main,
			white,
			midSize,
			user,
			clickable,
			noMenu
		} = this.props;
		return (
			<>
				<View style={{ backgroundColor: "#f5f5f5" }}>
					<View
						style={{
							backgroundColor: "#fd0f0f",
							padding: 15,
							paddingBottom: 0,
							paddingTop: 0,
							borderBottomEndRadius: main || midSize ? 0 : 50,
							height: clickable ? 110 : 80,
							paddingBottom: 5
						}}
						onLayout={({ nativeEvent }) => {
							this.setState({
								marginTop: nativeEvent.layout.height
							});
						}}
					>
						<View
							style={{
								justifyContent: "space-between",
								flexDirection: "row",
								marginTop: 10
							}}
						>
							{this.renderLeft()}
							<View
								style={{
									flex: 1,
									alignItems: "center"
								}}
							>
								<Text
									numberOfLines={1}
									style={{
										color: "white",
										fontSize: 19,
										fontWeight: "bold",
										marginBottom: 0
									}}
								>
									{!user ? name : user.name}
								</Text>
								{this.renderDescription()}
							</View>
							{back ? (
								<TouchableWithoutFeedback
									onPress={() => NavigationService.goBack()}
									style={{ justifyContent: "center" }}
								>
									<Icon
										size={20}
										name="left-arrow"
										color="white"
									/>
								</TouchableWithoutFeedback>
							) : (
								<View style={{ width: this.outsiderWidth }} />
							)}
						</View>
						{clickable && <ListHeaderComponent />}
					</View>
					{main && (
						<View
							style={{
								position: "absolute",
								borderBottomEndRadius: 100,
								backgroundColor: "#fd0f0f",
								height: 150,
								marginTop: marginTop,
								width
							}}
						/>
					)}
					{midSize && (
						<View
							style={{
								position: "absolute",
								borderBottomEndRadius: 60,
								backgroundColor: "#fd0f0f",
								height: 60,
								marginTop: marginTop,
								width
							}}
						/>
					)}
				</View>
			</>
		);
	}
}

export default Header;
