import React, { Component, PropTypes } from "react";
import {
	View,
	TextInput as Input,
	Dimensions,
	KeyboardAvoidingView
} from "react-native";
import { Card } from "react-native-elements";

class RoundInput extends Component {
	state = { focused: false, iconState: 0 };
	renderLeftIcon = () => {
		let { leftIcon: LeftIcon, small } = this.props;
		if (!LeftIcon || small) {
			return;
		}
		return <LeftIcon />;
	};
	renderRightIcon = () => {
		let {
			leftIcon: LeftIcon,
			rightIcon: RightIcon,
			successIcon: SuccessIcon,
			small
		} = this.props;
		let { focused, iconState } = this.state;
		if (!RightIcon || iconState === 0 || small) {
			return null;
		}
		if (iconState === 2) return <SuccessIcon />;
		return <RightIcon />;
	};
	validate = txt => {
		let { email } = this.props;
		let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if (email) return re.test(String(txt).toLowerCase());
		if (txt.length > 4) return true;
		else return false;
	};
	render() {
		let {
			leftIcon: LeftIcon,
			rightIcon: RightIcon,
			style,
			onTextChange = () => {},
			email,
			password,
			simple,
			small,
			value,
			placeholder,
			multiline,
			name,
			leftIconStyle,
			...rest
		} = this.props;
		let { renderLeftIcon, renderRightIcon, validate } = this;
		let { focused } = this.state;
		let width = Dimensions.get("window").width - 100;
		if (simple) {
			width = Dimensions.get("window").width - 30;
		}
		if (small) {
			width = 50;
		}
		let renderLeft = !small && LeftIcon;
		return (
			<React.Fragment>
				<Card
					containerStyle={[
						{
							backgroundColor: "white",
							flexDirection: "row",
							height: small ? 40 : 50,
							borderRadius: 30,
							padding: 0,
							width,
							alignItems: "center",
							justifyContent: "center"
						},
						multiline && {
							height: 120,
							borderColor: "#c5c5c5",
							borderWidth: 1,
							shadowOpacity: 0
						}
					]}
					wrapperStyle={{
						alignItems: "center",
						justifyContent: "center"
					}}
				>
					<View
						style={[
							{
								flexDirection: "row"
							},
							!small && {
								paddingLeft: 20,
								paddingRight: 20
							},
							small && {
								alignItems: "center",
								justifyContent: "center",
								paddingTop: 8
							},
							multiline && { paddingLeft: 0 }
						]}
					>
						{renderLeft && (
							<View
								style={{
									justifyContent: "center",
									alignItems: "center",
									marginTop: 0,
									width: simple ? 30 : 20,
									...leftIconStyle
								}}
							>
								{renderLeftIcon()}
							</View>
						)}
						<View
							style={[
								{
									borderBottomWidth:
										focused && !multiline && !small ? 1 : 0,
									borderBottomColor: "#069627",
									borderColor: "#069627"
								},
								!small && {
									paddingBottom: 0,
									paddingLeft: 15,
									paddingRight: 15
								},
								simple && {
									width: width - 80
								}
							]}
						>
							<Input
								placeholder={placeholder}
								value={value}
								onBlur={() => this.setState({ focused: false })}
								onFocus={() => this.setState({ focused: true })}
								{...rest}
								style={[
									style,
									{ width: simple ? width - 80 : 175 },
									small && { width: 40 }
								]}
								multiline={multiline}
								onChangeText={e => {
									if (!simple) {
										let valid = validate(e);
										this.setState({
											iconState: valid ? 2 : 1
										});
									}
									if (email || password) {
										onTextChange(
											email ? "email" : "password",
											e
										);
										return;
									}
									onTextChange(name, e);
								}}
								secureTextEntry={password ? true : false}
							/>
						</View>
						{!simple && (
							<View
								style={{
									alignItems: "flex-end",
									justifyContent: "center"
								}}
							>
								{renderRightIcon()}
							</View>
						)}
					</View>
				</Card>
			</React.Fragment>
		);
	}
}

export default RoundInput;
