import React from "react";
import { View, Clipboard } from "react-native";
import NavigationService from "./services/NavigationService";
import AppRouter from "./router/AppRouter";
import logo from "./assets/images/logo.png";
import mainIcon from "./assets/images/Main_icon.png";
import Fontello from "./assets/fonts/fontello.ttf";
import configureStore from "./store/configureStore";
import { Provider } from "react-redux";
import StorageService from "./services/StorageService";
import NotificationService from "./services/NotificationService";
const store = configureStore();
import firebase from "react-native-firebase";
import api from "./api/api";

export default class App extends React.Component {
	state = { isLoading: true };
	async componentDidMount() {
		await StorageService.initialize();
		NotificationService.init();
		this.setState({ isLoading: false });
	}

	componentWillUnmount() {
		StorageService.saveChanges();
	}

	render() {
		if (this.state.isLoading) {
			return <View />;
		}
		return (
			<Provider store={store}>
				<AppRouter />
			</Provider>
		);
	}
}
