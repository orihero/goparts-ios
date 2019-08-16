import React, { Component, PropTypes } from "react";
import { View, Text, TouchableHighlight, Dimensions } from "react-native";
import Picker from "react-native-picker-select";

let { width } = Dimensions.get("window");
class DefaultSelect extends Component {
    render() {
        let {
            leftIcon: LeftIcon = () => {},
            rightIcon: RightIcon = () => {},
            name,
            description,
            data = [
                { label: "first", value: "first" },
                { label: "second", value: "second" }
            ],
            placeholder = "",
            selectedValue,
            onValueChange = () => {}
        } = this.props;
        return (
            <Picker
                placeholder={{ value: "", label: placeholder }}
                items={data}
                {...{ onValueChange }}
            >
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: width - 30,
                        padding: 15
                    }}
                >
                    <View style={{ alignItems: "center", flex: 0.2 }}>
                        <LeftIcon />
                    </View>
                    <View
                        style={{
                            justifyContent: "flex-start",
                            flex: 1,
                            marginLeft: 30
                        }}
                    >
                        <Text
                            style={{
                                color:
                                    selectedValue === "" ||
                                    placeholder === selectedValue
                                        ? "red"
                                        : "green",
                                fontSize: 18,
                                fontWeight: "bold"
                            }}
                        >
                            {selectedValue === "" ||
                            placeholder === selectedValue
                                ? placeholder
                                : selectedValue}
                        </Text>
                        <Text
                            style={{
                                fontWeight: "100",
                                fontSize: 14,
                                color: "#c4c4c4"
                            }}
                        >
                            {description}
                        </Text>
                    </View>
                    <TouchableHighlight
                        underlayColor="#fe0000"
                        style={{ padding: 5 }}
                    >
                        <RightIcon />
                    </TouchableHighlight>
                </View>
            </Picker>
        );
    }
}

export default DefaultSelect;
