import React from "react";
import firebase from "react-native-firebase";
import api from "../api/api";

function init() {
	const channel = new firebase.notifications.Android.Channel(
		"insider",
		"insider channel",
		firebase.notifications.Android.Importance.Max
	);
	firebase.notifications().android.createChannel(channel);
	checkPermission();
	createNotificationListeners();
}

const createNotificationListeners = async () => {
	firebase.notifications().onNotification(notification => {
		notification.android.setChannelId("insider").setSound("default");
		firebase.notifications().displayNotification(notification);
	});
};

const checkPermission = async () => {
	const enabled = await firebase.messaging().hasPermission();
	if (enabled) {
		getToken();
	} else {
		requestPermission();
	}
};
const getToken = async () => {
	let fcmToken = await firebase.messaging().getToken();
	api.auth.setToken(fcmToken).then(res => console.warn(res.data));
};
requestPermission = async () => {
	try {
		await firebase.messaging().requestPermission();
		getToken();
	} catch (error) {
		alert(
			"The app needs permission to send you status of your sold and purchased products!"
		);
	}
};

export default { init };
