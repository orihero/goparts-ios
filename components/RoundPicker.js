import React, { Component, PropTypes } from "react";
import { View, Dimensions, StyleSheet } from "react-native";
import Picker from "react-native-picker-select";
import Icon from "../services/IconService";

class RoundPicker extends Component {
	render() {
		let {
			selectedValue,
			disabled,
			data = [],
			onValueChange,
			width = Dimensions.get("window").width - 60,
			height = 60,
			placeholder = {
				label: "Show options",
				value: null,
				color: "#c5c5c5"
			}
		} = this.props;
		return (
			<Picker
				mode="dropdown"
				useNativeAndroidPickerStyle={false}
				textInputProps={{ underlineColorAndroid: "transparent" }}
				placeholder={placeholder}
				style={{
					inputIOS: {
						...pickerSelectStyles.inputIOS,
						borderColor:
							selectedValue !== undefined ? "green" : "#c5c5c5"
					},
					inputAndroid: {
						...pickerSelectStyles.inputAndroid,
						borderColor:
							selectedValue !== undefined ? "green" : "#c5c5c5"
					},
					placeholder: disabled ? { color: "red" } : {}
				}}
				{...{ onValueChange, disabled }}
				value={selectedValue}
				items={data}
				useNativeAndroidPickerStyle={false}
				Icon={
					disabled
						? null
						: () => (
								<Icon
									name="chevrondown"
									color={
										selectedValue === undefined
											? "black"
											: "green"
									}
									size={16}
									style={{ marginRight: 10, marginTop: 15 }}
								/>
						  )
				}
			/>
		);
	}
}

const pickerSelectStyles = StyleSheet.create({
	inputIOS: {
		fontSize: 16,
		paddingVertical: 12,
		paddingHorizontal: 15,
		borderWidth: 1,
		borderColor: "#c5c5c5",
		borderRadius: 30,
		color: "black",
		paddingRight: 30,
		paddingTop: 15,
		paddingBottom: 15,
		marginBottom: 15
	},
	inputAndroid: {
		paddingTop: 15,
		paddingBottom: 15,
		fontSize: 16,
		paddingHorizontal: 10,
		paddingVertical: 15,
		borderWidth: 0.5,
		borderColor: "#c5c5c5",
		borderRadius: 30,
		color: "black",
		paddingRight: 30,
		marginBottom: 15
	}
});

export default RoundPicker;
