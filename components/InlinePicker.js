import React, { Component, PropTypes } from "react";
import { View, Text } from "react-native";
import Picker from "react-native-picker-select";

class InlinePicker extends Component {
	render() {
		let {
			icon: Icon,
			selectedValue,
			placeholder = { label: "Select", value: "default" },
			color,
			data = [
				{ label: "first", value: "first" },
				{ label: "second", value: "second" }
			],
			style,
			onValueChange
		} = this.props;
		return (
			<Picker
				items={data}
				placeholder={placeholder}
				onValueChange={onValueChange}
			>
				<View
					style={[
						{
							flexDirection: "row",
							justifyContent: "space-between",
							paddingRight: 30
						},
						style
					]}
				>
					<Text
						style={{
							fontWeight: "bold",
							color,
							fontSize: 18,
							width: 220
						}}
					>
						{!selectedValue
							? placeholder.label
							: selectedValue.label}
					</Text>
					<View style={{ justifyContent: "center" }}>
						<Icon />
					</View>
				</View>
			</Picker>
		);
	}
}

export default InlinePicker;
