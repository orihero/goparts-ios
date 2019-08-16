import React, { Component, PropTypes } from "react";
import { View, Dimensions, Text } from "react-native";
import Header from "../components/Header";
import DefaultPicker from "../components/DefaultPicker";
import RoundButton from "../components/RoundButton";
import Icon from "../services/IconService";
import { connect } from "react-redux";
import {
    populateModels,
    populateYears,
    populateMakes,
    populateProducts,
    populateExactYears
} from "../actions/thunk";
import api from "../api/api";
import { yearsLoaded } from "../actions/actions";
import StorageService from "../services/StorageService";

let width = Dimensions.get("window").width - 30;

class Filter extends Component {
    state = {
        status: "idle",
        make: "",
        model: "",
        year: "",
        generation: "",
        error: ""
    };

    search = () => {
        this.setState({ status: "rotate" });
        let { make, year, model, generation } = this.state;
        if (!make || !year || !model) {
            this.setState({
                ...this.state,
                error: "Please select all fields!"
            });
            return;
        }
        this.props.dispatch(
            populateProducts(make, model, year, () => {
                this.setState({ status: "success" });
                setTimeout(() => {
                    this.props.navigation.navigate("LeaveOrder", {
                        make,
                        year,
                        model
                    });
                    setTimeout(
                        () =>
                            this.setState({
                                status: "idle",
                                make: "",
                                model: "",
                                year: ""
                            }),
                        100
                    );
                }, 100);
            })
        );
    };

    componentWillMount() {
        this.props.dispatch(populateMakes());
    }

    render() {
        let { make, year, model, generation, error } = this.state;
        let { makes, years, models, generations, user: parent } = this.props;
        let isAuthanticated = Object.keys(parent).length > 0;
        return (
            <React.Fragment>
                {isAuthanticated && (
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "center",
                            paddingTop: 15
                        }}
                    >
                        <Text style={{ fontSize: 18 }}>Welcome back </Text>
                        <Text style={{ fontSize: 18, color: "red" }}>
                            {parent.user.username}
                        </Text>
                    </View>
                )}
                <View
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    <DefaultPicker
                        placeholder="Select a Make"
                        selectedValue={make}
                        data={makes}
                        description="Car manufacturer"
                        onValueChange={(e, i) => {
                            this.setState({
                                ...this.state,
                                make: e,
                                error: ""
                            });
                            this.props.dispatch(populateModels(e));
                        }}
                        leftIcon={() => (
                            <Icon
                                name="selectmake"
                                size={30}
                                color={make === "" ? "black" : "green"}
                            />
                        )}
                        rightIcon={() => (
                            <Icon
                                name="chevron"
                                color="#c4c4c4"
                                size={20}
                                color={make === "" ? "black" : "green"}
                            />
                        )}
                    />
                    <View
                        style={{ backgroundColor: "#c4c4c4", height: 2, width }}
                    />
                    <DefaultPicker
                        data={models}
                        placeholder="Select a Model"
                        description="Car model"
                        onValueChange={(e, i) => {
                            this.setState({
                                ...this.state,
                                model: e,
                                error: ""
                            });
                            api.product
                                .getExactModifications(make, e)
                                .then(res => {
                                    let all = [];
                                    let obj = res.data.year;
                                    for (var el in obj) {
                                        all.push({ label: el, value: el });
                                    }
                                    this.props.dispatch(yearsLoaded(all));
                                });
                        }}
                        selectedValue={model}
                        leftIcon={() => (
                            <Icon
                                name="selectmodel"
                                size={24}
                                color={model === "" ? "black" : "green"}
                            />
                        )}
                        rightIcon={() => (
                            <Icon
                                name="chevron"
                                color="#c4c4c4"
                                size={20}
                                color={model === "" ? "black" : "green"}
                            />
                        )}
                    />

                    <View
                        style={{ backgroundColor: "#c4c4c4", height: 2, width }}
                    />

                    <DefaultPicker
                        data={years}
                        placeholder="Select a Year"
                        onValueChange={(e, i) => {
                            this.setState({
                                ...this.state,
                                year: e,
                                error: ""
                            });
                        }}
                        description="Year of production"
                        selectedValue={year}
                        leftIcon={() => (
                            <Icon
                                name="calendar"
                                size={28}
                                color={year === "" ? "black" : "green"}
                            />
                        )}
                        rightIcon={() => (
                            <Icon
                                name="chevron"
                                size={20}
                                color="#c4c4c4"
                                color={year === "" ? "black" : "green"}
                            />
                        )}
                    />
                    {!!error && (
                        <Text style={{ padding: 15, color: "red" }}>
                            {error}
                        </Text>
                    )}
                    <RoundButton
                        status={this.state.status}
                        fill
                        color="#03a127"
                        onPress={this.search}
                        text="Next"
                        animated
                        big
                    />
                </View>
            </React.Fragment>
        );
    }
}

const mapStateToProps = ({
    user,
    makes = [],
    models = [],
    years = [],
    generations = []
}) => {
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
                makes,
                models,
                years,
                generations,
                isAuthenticated: false,
                user: {}
            };
    }
    return {
        makes,
        models,
        years,
        generations,
        isAuthenticated: true,
        user: usr
    };
};

export default connect(mapStateToProps)(Filter);
