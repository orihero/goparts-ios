import React from "react";
import Gradient from "react-native-linear-gradient";
import {
	View,
	Dimensions,
	Animated,
	StyleSheet,
	TouchableWithoutFeedback
} from "react-native";
import Svg, { Path } from "react-native-svg";
import * as shape from "d3-shape";
import StaticTabbar from "./StaticTabBar";
import { connect } from "react-redux";
import StorageService from "../services/StorageService";

const { width } = Dimensions.get("window");
const height = 64;
const AnimatedSvg = Animated.createAnimatedComponent(Svg);

export class TabBarComponent extends React.Component {
	value = new Animated.Value(-width);
	values = [];
	constructor(props) {
		super(props);
		const { navigation } = this.props;
		const tabWidth = width / navigation.state.routes.length;
		this.value.setValue(-width + tabWidth * navigation.state.index);
		this.values = navigation.state.routes.map(
			(tab, index) =>
				new Animated.Value(index === navigation.state.index ? 1 : 0)
		);
	}
	componentDidUpdate(prevProps, prevState) {
		const tabWidth = width / this.props.navigation.state.routes.length;
		let { values, value } = this;
		let key = this.props.navigation.state.index;
		let activeValue = values[this.props.navigation.state.index];
		values.map((a, i) => {
			a.setValue(0);
		});
		Animated.parallel([
			Animated.spring(activeValue, {
				toValue: 1,
				useNativeDriver: true
			}),
			Animated.spring(value, {
				toValue: -width + tabWidth * key,
				useNativeDriver: true
			})
		]).start();
	}
	render() {
		const { value, values } = this;
		const { navigation, renderIcon, onTabPress } = this.props;
		const { state } = navigation;
		const tabWidth = width / state.routes.length;
		let normalTabWidth = width / 5;
		const tab = shape
			.line()
			.x(d => d.x)
			.y(d => d.y)
			.curve(shape.curveBasis)([
			{ x: width - 15, y: 0 },
			{ x: width, y: 0 },
			{ x: width + 10, y: 10 },
			{ x: width + 25, y: height / 2 },
			{ x: width + normalTabWidth - 25, y: height / 2 },
			{ x: width + normalTabWidth - 10, y: 10 },
			{ x: width + normalTabWidth, y: 0 },
			{ x: width + normalTabWidth + 15, y: 0 }
		]);
		const left = shape
			.line()
			.x(d => d.x)
			.y(d => d.y)([{ x: 0, y: 0 }, { x: width, y: 0 }]);
		const right = shape
			.line()
			.x(d => d.x)
			.y(d => d.y)([
			{ x: width + tabWidth, y: 0 },
			{ x: width * 2.5, y: 0 },
			{ x: width * 2.5, y: height },
			{ x: 0, y: height },
			{ x: 0, y: 0 }
		]);

		const d = `${left} ${tab} ${right}`;
		return (
			<View style={{ width, height }}>
				<AnimatedSvg
					{...{ height }}
					width={width * 2.5}
					style={{
						transform: [
							{
								translateX: Animated.add(
									tabWidth === normalTabWidth
										? 0
										: normalTabWidth / 3,
									value
								)
							}
						],
						backgroundColor: "white"
					}}
				>
					<Path {...{ d }} fill="black" />
				</AnimatedSvg>
				<Gradient
					style={{
						position: "relative",
						right: 0,
						left: 0,
						top: -104,
						height: 40,
						transform: [{ rotate: "180deg" }]
					}}
					colors={["white", "#ffffff00"]}
				/>
				<View style={StyleSheet.absoluteFill}>
					<View style={{ flexDirection: "row" }}>
						{state.routes.map((route, key) => {
							const focused = key === navigation.state.index;
							const scene = { route, focused };
							const activeValue = values[key];
							const translateY = activeValue.interpolate({
								inputRange: [0, 1],
								outputRange: [32, 0]
							});
							const reverseOpacity = activeValue.interpolate({
								inputRange: [0, 1],
								outputRange: [1, 0]
							});
							return (
								<React.Fragment {...{ key }}>
									<TouchableWithoutFeedback
										key={route.key}
										onPress={() => {
											onTabPress({ route });
										}}
									>
										<Animated.View
											style={{
												flex: 1,
												justifyContent: "center",
												alignItems: "center",
												height: 64,
												opacity: reverseOpacity
											}}
										>
											{renderIcon(scene)}
										</Animated.View>
									</TouchableWithoutFeedback>

									{focused && (
										<Animated.View
											style={{
												position: "absolute",
												width: tabWidth,
												left: tabWidth * key,
												height: 64,
												top: -30,
												justifyContent: "center",
												alignItems: "center",
												transform: [{ translateY }],
												opacity: activeValue
											}}
										>
											<View
												style={{
													justifyContent: "center",
													alignItems: "center",
													width: 45,
													height: 45,
													borderRadius: 25,
													backgroundColor: "red"
												}}
											>
												{renderIcon(scene)}
											</View>
										</Animated.View>
									)}
								</React.Fragment>
							);
						})}
					</View>
				</View>
			</View>
		);
	}
}

const mapStateToProps = ({ user }) => {
	let usr = user;
	if (Object.keys(user).length === 0) {
		usr = StorageService.getState();
		if (
			usr === null ||
			usr === "" ||
			usr === undefined ||
			Object.keys(usr).length === 0
		)
			return {
				isAuthenticated: false,
				user: {}
			};
	}
	return {
		isAuthenticated: true,
		user: usr
	};
};

export default connect(mapStateToProps)(TabBarComponent);
