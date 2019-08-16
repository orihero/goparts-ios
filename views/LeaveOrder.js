import React, { Component } from "react";
import {
	ScrollView,
	View,
	TextInput,
	Dimensions,
	Text,
	KeyboardAvoidingView,
	TouchableWithoutFeedback,
	Alert,
	Platform
} from "react-native";
import RoundInput from "../components/RoundInput";
import DefaultPicker from "../components/DefaultPicker";
import MultiImagePicker from "../components/MultiImagePicker";
import {
	populateMakes,
	populateModels,
	populateYears,
	populateModifications,
	populateCategories,
	populateExactYears,
	populateOrders
} from "../actions/thunk";
import { userLoggedIn } from "../actions/actions";

import Icon from "../services/IconService";
import { connect } from "react-redux";
import Header from "../components/Header";
import RoundPicker from "../components/RoundPicker";
import RoundButton from "../components/RoundButton";
import api from "../api/api";
import StorageService from "../services/StorageService";
import NavigationService from "../services/NavigationService";
import { StackActions, NavigationActions } from "react-navigation";

let width = Dimensions.get("window").width - 30;

class PartSegment extends Component {
	state = { categoryIndex: null, subCategories: [] };
	renderSubcats = () => {
		if (!this.state.categoryIndex) {
			return <React.Fragment />;
		}
		if (!this.props.categories[this.state.categoryIndex].subCats) {
			return <React.Fragment />;
		}
		let subCats = this.props.categories[
			this.state.categoryIndex
		].subCats.map(e => ({
			label: e.title,
			value: e.id
		}));
		return (
			<RoundPicker
				placeholder={{
					label: "Select a SubCategory",
					value: null,
					color: "#c5c5c5"
				}}
				data={subCats}
				onValueChange={(e, i) => {
					this.props.onChange(this.props.index, "category_id", e);
				}}
			/>
		);
	};
	render() {
		let {
			photos,
			description,
			index,
			onChange,
			add,
			remove,
			categories,
			removePart
		} = this.props;
		let cats = categories.map(({ title, id }) => {
			return { label: title, value: id };
		});
		return (
			<View>
				<View style={{ flexDirection: "row", paddingTop: 10 }}>
					<View style={{ flex: 0.2 }} />
					<View style={{ flex: 0.6 }}>
						<Text
							style={{
								color: "#069627",
								fontWeight: "bold",
								fontSize: 24,
								textAlign: "center",
								marginBottom: 10
							}}
						>
							PART #{index + 1}
						</Text>
					</View>
					{index !== 0 && (
						<View
							style={{
								flex: 0.2,
								justifyContent: "center",
								alignItems: "flex-end",
								paddingRight: 15
							}}
						>
							<TouchableWithoutFeedback
								onPress={() => removePart(index)}
							>
								<Text style={{ color: "red" }}>Remove</Text>
							</TouchableWithoutFeedback>
						</View>
					)}
				</View>
				<RoundInput
					simple
					multiline
					numberOfLines={10}
					placeholder="Please write one part in one description box. To add another part press add another part below"
					onTextChange={(key, value) => onChange(index, key, value)}
					name="description"
				/>
				<Text
					style={{
						paddingLeft: 15,
						paddingRight: 15,
						fontSize: 18,
						fontWeight: "bold",
						paddingTop: 15
					}}
				>
					Images for part you described
				</Text>
				<MultiImagePicker
					{...{ photos, segmentIndex: index, add, remove }}
				/>
			</View>
		);
	}
}

class LeaveOrder extends Component {
	state = {
		segments: [{ photos: [], description: "", category: "", title: "" }],
		make: "",
		model: "",
		year: "",
		modification: "",
		options: [],
		car_id: "",
		transmission: "",
		engine: "",
		fueltype: "",
		drivetype: "",
		email: "",
		phone: "",
		name: "",
		status: "idle",
		importedfrom: ""
	};
	componentDidMount() {
		this.props.dispatch(populateMakes());
		this.props.dispatch(populateCategories());
		api.options.get().then(res => {
			let options = res.data.data;
			this.setState({ ...this.state, options });
		});
		let make = this.props.navigation.getParam("make");
		let model = this.props.navigation.getParam("model");
		let year = this.props.navigation.getParam("year");
		this.setState({
			...this.state,
			make,
			model,
			year
		});
		api.product.getCarId(make, model, year).then(res => {
			this.setState({
				...this.state,
				car_id: res
			});
		});
	}
	add = (index, el) => {
		let { segments } = this.state;
		segments[index].photos.push(el);
		this.setState({
			...this.state,
			segments
		});
	};
	removePart = index => {
		let { segments } = this.state;
		let newSegments = [
			...segments.slice(0, index),
			...segments.slice(index + 1, segments.length)
		];
		this.setState({ ...this.state, segments: newSegments });
	};
	sendRequest = () => {
		this.setState({ ...this.state, status: "rotate" });
		let {
			car_id,
			year,
			transmission,
			drivetype,
			fueltype,
			engine,
			modification,
			make: vendor,
			model: car,
			segments,
			email,
			phone,
			name,
			importedfrom: imported_from
		} = this.state;
		let queries = segments.map(({ description, photos }) => ({
			description,
			images: [...photos]
		}));
		let data = {
			QueryData: {
				car_id,
				car,
				year,
				vendor,
				transmission,
				drivetype,
				engine,
				fueltype,
				email,
				phone,
				name,
				imported_from
			},
			Query: [...queries]
		};

		let isAuthenticated = Object.keys(StorageService.getState()).length > 0;
		if (isAuthenticated) {
			api.order.makeRequest(car_id, data).then(res => {
				let name = data.QueryData.name;
				if (isAuthenticated) {
					name = StorageService.getState().user.username;
				}
				console.warn(res);
				Alert.alert(
					`Dear ${name}.`,
					`Thank you for leaving us order.\nYou will get best prices from more than 1000s used spare parts stories within 24 hours.\nYou will be notified to your email you have provided us.`,
					[{ text: "ok" }]
				);
				this.setState({
					segments: [
						{
							photos: [],
							description: "",
							category: "",
							title: ""
						}
					],
					make: "",
					model: "",
					year: "",
					modification: "",
					options: [],
					car_id: "",
					transmission: "",
					engine: "",
					fueltype: "",
					drivetype: "",
					email: "",
					phone: "",
					name: "",
					status: "idle"
				});
				this.props.dispatch(populateOrders());
				this.props.navigation.navigate("NotificationsTab", {
					reload: true
				});
			});
		} else {
			api.order.request(car_id, data).then(res => {
				let name = data.QueryData.name;
				if (isAuthenticated) {
					name = StorageService.getState().user.username;
				}
				console.warn("Not registred");
				console.warn(res.data);
				this.props.dispatch(
					userLoggedIn({
						token: res.data.token,
						user: {
							email,
							phone,
							username: name,
							user_role: 0,
							password: res.data.password,
							comission: 35
						}
					})
				);
				this.props.dispatch(
					populateOrders(() => {
						Alert.alert(
							`Dear ${name}.`,
							`Thank you for leaving us order.\nYou will get best prices from more than 1000s used spare parts stories within 24 hours.\nYou will be notified to your email you have provided us.`,
							[{ text: "ok" }]
						);
						this.setState({ ...this.state, status: "success" });
						setTimeout(() => {
							this.setState({
								segments: [
									{
										photos: [],
										description: "",
										category: "",
										title: ""
									}
								],
								make: "",
								model: "",
								year: "",
								modification: "",
								options: [],
								car_id: "",
								transmission: "",
								engine: "",
								fueltype: "",
								drivetype: "",
								email: "",
								phone: "",
								name: "",
								status: "idle"
							});
						}, 200);
					})
				);
				this.props.navigation.navigate("NotificationsTab", {
					reload: true
				});
			});
		}
	};
	remove = (segmentIndex, itemIndex) => {
		let { segments } = this.state;
		segments[segmentIndex].photos = [
			...segments[segmentIndex].photos.slice(0, itemIndex),
			...segments[segmentIndex].photos.slice(
				itemIndex + 1,
				segments[segmentIndex].photos.length - 1
			)
		];
		this.setState({ ...this.state, segments });
	};
	onChange = (index, key, value) => {
		let { segments } = this.state;
		segments[index][key] = value;
		this.setState({ ...this.state, segments });
	};
	render() {
		let {
			make,
			model,
			year,
			category,
			segments,
			modification,
			options,
			status
		} = this.state;
		let { makes, models, years, categories, modifications } = this.props;
		let { onChange, add, remove, removePart } = this;
		let isAuthenticated = Object.keys(StorageService.getState()).length > 0;
		return (
			<React.Fragment>
				<Header
					back
					name="Leave order"
					openDrawer={this.props.navigation.openDrawer}
				/>

				<KeyboardAvoidingView
					behavior={Platform.OS === "android" ? null : "padding"}
					enabled
					style={{ flex: 1 }}
				>
					<ScrollView
						showsVerticalScrollIndicator={false}
						style={{ backgroundColor: "white" }}
					>
						<View style={{ padding: 15, paddingBottom: 0 }}>
							<Text
								style={{
									color: "#069627",
									fontWeight: "bold",
									fontSize: 18,
									textAlign: "center",
									marginBottom: 15
								}}
							>
								Get prices from more than 1000s shops.
							</Text>
							<RoundPicker
								placeholder={{
									label: `${make} ${model} ${year}`,
									value: null,
									color: "red"
								}}
								selectedValue={""}
								data={[]}
								onValueChange={(e, i) => {}}
								disabled
							/>

							<TouchableWithoutFeedback
								onPress={() => this.props.navigation.goBack()}
							>
								<View
									style={{
										flexDirection: "row",
										justifyContent: "flex-end"
									}}
								>
									<Text
										style={{
											color: "green",
											fontSize: 16,
											marginBottom: 10,
											marginTop: -8
										}}
									>
										Change the car
									</Text>
								</View>
							</TouchableWithoutFeedback>
							{options.map(e => {
								return (
									<RoundPicker
										placeholder={{
											label: "Select " + e.name,
											value: null,
											color: "#c5c5c5"
										}}
										data={e.values.map(inner => ({
											label: inner.value,
											value: inner.value
										}))}
										onValueChange={(el, i) => {
											this.setState({
												...this.state,
												[e.name
													.toLowerCase()
													.replace(/\s/g, "")
													.substr(
														0,
														e.name.indexOf("'") ===
															-1
															? e.name.length
															: e.name.indexOf(
																	"'"
															  )
													)]: el
											});
										}}
									/>
								);
							})}
						</View>
						<RoundInput
							placeholder="Engine"
							simple
							name="engine"
							onTextChange={(key, value) =>
								this.setState({
									...this.state,
									[key]: value
								})
							}
							returnKeyType="done"
						/>
						{segments &&
							segments.length > 0 &&
							segments.map(({ photos, description }, index) => {
								return (
									<PartSegment
										{...{
											index,
											description,
											photos,
											onChange,
											add,
											remove,
											categories,
											removePart
										}}
									/>
								);
							})}
						<View
							style={{ alignItems: "center", paddingBottom: 15 }}
						>
							<RoundButton
								text="+ Add another part"
								color="#069627"
								animated
								noMargin
								onPress={() => {
									this.setState({
										...this.state,
										segments: [
											...segments,
											{ photos: [], description: "" }
										]
									});
								}}
							/>
						</View>
						{!isAuthenticated && (
							<React.Fragment>
								<Text
									style={{
										paddingLeft: 15,
										fontSize: 18,
										fontWeight: "bold"
									}}
								>
									Contacts
								</Text>
								<View
									style={{
										alignItems: "center",
										paddingBottom: 30
									}}
								>
									<RoundInput
										placeholder="Name"
										simple
										name="name"
										onTextChange={(key, value) =>
											this.setState({
												...this.state,
												[key]: value
											})
										}
									/>
									<RoundInput
										placeholder=""
										leftIcon={() => (
											<Text style={{ marginRight: -10 }}>
												(+971)
											</Text>
										)}
										simple
										name="phone"
										onTextChange={(key, value) =>
											this.setState({
												...this.state,
												[key]: value
											})
										}
										leftIconStyle={{
											width: 40,
											justifyContent: "center",
											alignItems: "flex-end"
										}}
										keyboardType="phone-pad"
										textContentType="telephoneNumber"
									/>
									<RoundInput
										placeholder="E-mail"
										simple
										name="email"
										onTextChange={(key, value) => {
											this.setState({
												...this.state,
												[key]: value
											});
										}}
										keyboardType="email-address"
										textContentType="emailAddress"
									/>
								</View>
							</React.Fragment>
						)}
						<View
							style={{ alignItems: "center", marginBottom: 30 }}
						>
							<RoundButton
								animated
								text="Leave order"
								noMargin
								fill
								status={status}
								color="#069627"
								onPress={this.sendRequest}
							/>
						</View>
					</ScrollView>
				</KeyboardAvoidingView>
			</React.Fragment>
		);
	}
}

const mapStateToProps = ({
	makes,
	models,
	years,
	categories,
	modifications,
	user
}) => ({
	makes,
	models,
	modifications,
	years,
	categories,
	isAuthenticated: Object.keys(user) > 0
});

export default connect(mapStateToProps)(LeaveOrder);
