import React from "react";
import {
	View,
	TouchableWithoutFeedback,
	Dimensions,
	Animated
} from "react-native";
const width = Dimensions.get("window");

export class StaticTabBar extends React.Component {
	render() {
		const { tabs, renderIcon, navigation, onTabPress, value } = this.props;
		return (
			<View style={{ flexDirection: "row" }}>
				{tabs.map((route, key) => {
					const focused = key === navigation.state.index;
					const scene = { route, focused };
					return (
						<TouchableWithoutFeedback
							key={route.key}
							onPress={() => {
								onTabPress({ route });
								const tabWidth = width / tabs.length;
								Animated.spring(value, {
									toValue: -width + tabWidth * key,
									useNativeDriver: true
								}).start();
							}}
						>
							<View
								style={{
									flex: 1,
									justifyContent: "center",
									alignItems: "center",
									height: 64
								}}
							>
								{renderIcon(scene)}
							</View>
						</TouchableWithoutFeedback>
					);
				})}
			</View>
		);
	}
}

export default StaticTabBar;
