import React, { Component, PropTypes, useState } from "react";
import {
	View,
	ScrollView,
	Image,
	Text,
	TouchableWithoutFeedback,
	Permissions,
	Platform
} from "react-native";
import Header from "../components/Header";
import Icon from "../services/IconService";
import DefaultText from "../components/DefaultText";
import { FontAwesome as FIcon } from "react-native-vector-icons";
import { CheckBox } from "react-native-elements";
import RoundButton from "../components/RoundButton";
import { connect } from "react-redux";
import NavigationService from "../services/NavigationService";
import api, { urlResolve } from "../api/api";
import ImagePicker from "react-native-image-crop-picker";
import { userLoggedIn, userLoggedOut, userEditing } from "../actions/actions";
import StorageService from "../services/StorageService";

// import ImagePicker from "react-native-image-picker";

const AccountInfo = ({ user: propParent, logout, dispatch }) => {
	let [parent, edit] = useState(propParent);
	let { user } = parent;
	let [isEditing, setIsEditing] = useState(false);
	editUser = () => {
		setIsEditing(false);
		api.user.update(parent).then(res => {
			dispatch(userLoggedIn(parent));
		});
	};
	changePhoto = async user => {
		setIsEditing(true);
		ImagePicker.openPicker({
			width: 300,
			height: 400,
			cropping: true
		}).then(image => {
			edit({
				...user,
				user: { ...user.user, avatar: image.path }
			});
		});
	};
	return (
		<ScrollView style={{ backgroundColor: "transparent" }}>
			<View
				style={{
					justifyContent: "center",
					alignItems: "center",
					paddingBottom: 30
				}}
			>
				<View>
					<View
						style={{
							borderWidth: 4,
							borderColor: "white",
							borderRadius: 60,
							justifyContent: "center",
							alignItems: "center",
							overflow: "hidden",
							backgroundColor: "#afafaf",
							marginTop: 15
						}}
					>
						<Image
							source={{
								uri:
									user && user.avatar
										? urlResolve(user.avatar)
										: ""
							}}
							style={{
								height: 100,
								width: 100,
								overflow: "hidden"
							}}
						/>
					</View>
					<View
						style={{
							justifyContent: "flex-end",
							alignItems: "flex-end"
						}}
					>
						<TouchableWithoutFeedback
							onPress={() => changePhoto(parent)}
						>
							<View
								style={{
									height: 30,
									width: 30,
									borderRadius: 15,
									backgroundColor: "#fc2828",
									justifyContent: "center",
									alignItems: "center",
									marginTop: -30,
									marginRight: 10
								}}
							>
								<Icon name="change-photo" color="white" />
							</View>
						</TouchableWithoutFeedback>
					</View>
				</View>
				<Text
					style={{
						marginTop: 15,
						fontWeight: "bold",
						fontSize: 18
					}}
				>
					{user.username}
				</Text>
				<View style={{ flexDirection: "row", padding: 15 }}>
					<DefaultText
						onChange={text => {
							if (!isEditing) {
								setIsEditing(true);
							}
							edit({
								...parent,
								user: { ...user, location: text }
							});
						}}
						style={{ flex: 1 }}
						text={user.location}
						name="City"
						icon={() => (
							<Icon name="location" size={28} color="#c4c4c4" />
						)}
					/>
					<DefaultText
						onChange={text => {
							if (!isEditing) {
								if (!isEditing) {
									setIsEditing(true);
								}
							}
							edit({
								...parent,
								user: { ...user, phone: text }
							});
						}}
						style={{ flex: 1 }}
						text={user.phone}
						name="Phone"
						icon={() => (
							<Icon name="phone-1" size={28} color="#c4c4c4" />
						)}
					/>
				</View>
				<View
					style={{
						borderRadius: 20,
						backgroundColor: "white",
						shodowColor: "#c4c4c4",
						shadowOpacity: 0.33,
						shadowRadius: 5,
						padding: 30,
						right: 0,
						left: 0,
						marginBottom: 0,
						elevation: 2
					}}
				>
					<DefaultText
						editable
						text={user.email}
						name="Email/Login"
						icon={() => (
							<Icon name="e-mail" size={20} color="#c4c4c4" />
						)}
						editIcon={() => (
							<Icon name="penciledit" size={18} color="#c4c4c4" />
						)}
						onChange={text => {
							if (!isEditing) {
								if (!isEditing) {
									setIsEditing(true);
								}
							}
							edit({
								...parent,
								user: { ...user, email: text }
							});
						}}
					/>
					<DefaultText
						onChange={text => {
							if (!isEditing) {
								if (!isEditing) {
									setIsEditing(true);
								}
							}
							edit({
								...parent,
								user: { ...user, password: text }
							});
						}}
						editable
						text={user.password}
						name="Password"
						icon={() => (
							<Icon name="password" size={28} color="#c4c4c4" />
						)}
						editIcon={() => (
							<Icon name="penciledit" size={18} color="#c4c4c4" />
						)}
					/>
					{user.user_role === 1 && (
						<DefaultText
							onChange={text => {
								if (!isEditing) {
									setIsEditing(true);
								}
								edit({
									...parent,
									user: { ...user, legal_info: text }
								});
							}}
							editable
							text={user.legal_info}
							name="Organization"
							icon={() => (
								<Icon
									name="organization"
									size={20}
									color="#c4c4c4"
								/>
							)}
							editIcon={() => (
								<Icon
									name="penciledit"
									size={18}
									color="#c4c4c4"
								/>
							)}
						/>
					)}
				</View>
				{isEditing && (
					<View style={{ flexDirection: "row", marginBottom: 0 }}>
						<RoundButton
							big
							animated
							color="#069327"
							text="Save Profile"
							onPress={editUser}
						/>
					</View>
				)}
				<RoundButton
					big
					fill
					animated
					color="#069327"
					text="Logout"
					onPress={() => logout()}
				/>
			</View>
		</ScrollView>
	);
};

let UnauthorizedScreen = () => {
	return (
		<View
			style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
		>
			<RoundButton
				large
				big
				fill
				color="#069327"
				text="Sign in"
				onPress={() => NavigationService.navigate("Login")}
			/>
			<Text style={{ color: "#afafaf", fontSize: 18, margin: 15 }}>
				Or
			</Text>
			<RoundButton
				large
				big
				fill
				color="#069327"
				text="Sign up"
				onPress={() => NavigationService.navigate("Register")}
			/>
		</View>
	);
};

class Account extends Component {
	state = { isEditing: false };
	renderContent = () => {
		let { isAuthenticated, user, dispatch } = this.props;
		let { isEditing } = this.state;
		let { changePhoto, edit } = this;
		if (!isAuthenticated) {
			return <UnauthorizedScreen />;
		}
		return (
			<AccountInfo
				{...{
					user,
					changePhoto,
					isEditing,
					logout: () => this.props.dispatch(userLoggedOut()),
					edit,
					dispatch
				}}
			/>
		);
	};

	componentDidMount() {
		this.getPermissionAsync();
		// api.user.getInfo().then(res => {
		// 	let { user: parent } = this.props;
		// 	console.warn(res.data);
		// 	this.props.dispatch(
		// 		userLoggedIn({
		// 			...res.data,
		// 			user: { ...res.data.user, password: parent.user.password },
		// 			token: parent.token
		// 		})
		// 	);
		// });
	}

	getPermissionAsync = async () => {
		if (Platform.OS !== "android") {
			const { status } = await Permissions.askAsync(
				Permissions.CAMERA_ROLL
			);
			if (status !== "granted") {
				alert(
					"Sorry, we need camera roll permissions to make this work!"
				);
			}
		}
	};

	edit = user => {
		this.props.dispatch(userEditing(user));
	};

	render() {
		return <React.Fragment>{this.renderContent()}</React.Fragment>;
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

export default connect(mapStateToProps)(Account);

export { UnauthorizedScreen };
