import React from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import {
	createAppContainer,
	createBottomTabNavigator,
	createDrawerNavigator,
	createStackNavigator,
	BottomTabBar
} from "react-navigation";
import Categories from "../views/Categories";
import Product from "../views/Product";
import Filter from "../views/Filter";
import CustomTabBar from "../components/TabBar";
import Header from "../components/Header";
import RoundPicker from "../components/RoundPicker";
import Account from "../views/Account";
import Login from "../views/Login";
import Cart from "../views/Cart";
import Register from "../views/Register";
import Chats from "../views/Chats";
import Chat from "../views/Chat";
import Orders from "../views/Orders";
import LeaveOrder from "../views/LeaveOrder";
import Checkout from "../views/Checkout";
import OrderHistory from "../views/OrderHistory";
import ImageView from "../views/ImageView";
import NavigationService from "../services/NavigationService";

import { connect } from "react-redux";

import StorageService from "../services/StorageService";

import DrawerContent from "../components/DrawerContent";

import Icon from "../services/IconService";

const accountStack = createStackNavigator(
	{
		Account: {
			screen: Account,
			navigationOptions: {
				header: ({ navigation }) => (
					<Header
						name="General information"
						description="Personal settings"
						openDrawer={navigation.openDrawer}
					/>
				)
			}
		},
		Login: {
			screen: Login,
			navigationOptions: {
				header: null
			}
		},
		Register: {
			screen: Register,
			navigationOptions: {
				header: null
			}
		}
	},
	{}
);

const categoryStack = createStackNavigator(
	{
		Filter: {
			screen: Filter,
			navigationOptions: {
				header: ({ navigation }) => (
					<Header
						name="Goparts.ae"
						description="Get the Best Prices"
						openDrawer={navigation.openDrawer}
					/>
				)
			}
		},
		Categories: {
			screen: Categories,
			navigationOptions: {
				header: ({ navigation }) => (
					<Header
						clickable
						back
						name="Categories"
						description="Leave order"
						openDrawer={navigation.openDrawer}
					/>
				)
			}
		},
		Cart: {
			screen: Cart,
			navigationOptions: {
				header: ({ navigation }) => (
					<Header
						name="Shopping cart"
						description="Check all your products"
						openDrawer={navigation.openDrawer}
						back
					/>
				)
			}
		},
		Product: {
			screen: Product,
			navigationOptions: {
				header: ({ navigation }) => (
					<Header
						name="Product info"
						description="Read all about the product"
						back
						openDrawer={navigation.openDrawer}
					/>
				)
			}
		},
		LeaveOrder: {
			screen: LeaveOrder,
			navigationOptions: {
				header: null
			}
		}
	},
	{}
);

const ChatsStack = createStackNavigator(
	{
		OrderHistory: {
			screen: OrderHistory,
			navigationOptions: {
				header: ({ navigation }) => (
					<Header
						name="Order history"
						description="All purchase information"
						back
					/>
				)
			}
		}
	},
	{}
);

let notificationsStack = createStackNavigator(
	{
		Notifications: {
			screen: Orders,
			navigationOptions: {
				header: null
			}
		},
		Product: {
			screen: Product,
			navigationOptions: {
				header: ({ navigation }) => (
					<Header
						name="Product info"
						description="Read all about the product"
						back
						openDrawer={navigation.openDrawer}
					/>
				)
			}
		}
	},
	{}
);

let cartStack = createStackNavigator({
	Cart: {
		screen: Cart,
		navigationOptions: {
			header: ({ navigation }) => (
				<Header
					name="Shopping cart"
					description="Check all your products"
					openDrawer={navigation.openDrawer}
					back
				/>
			)
		}
	}
});

const AppNavigator = createBottomTabNavigator(
	{
		NotificationsTab: {
			screen: notificationsStack,
			navigationOptions: {
				tabBarIcon: () => {
					return <Icon name="bell" size={20} color="white" />;
				}
			}
		},
		FavouriteTab: {
			screen: cartStack,
			navigationOptions: {
				tabBarIcon: () => {
					return <Icon name="shoppingcart" size={20} color="white" />;
				}
			}
		},
		CategoriesTab: {
			screen: categoryStack,
			navigationOptions: {
				tabBarIcon: () => {
					return <Icon name="plus_ad" size={20} color="white" />;
				}
			}
		},
		ChatTab: {
			screen: ChatsStack,
			navigationOptions: {
				tabBarIcon: () => {
					return <Icon name="history-(2)" size={20} color="white" />;
				}
			}
		},
		AccountTab: {
			screen: accountStack,
			navigationOptions: {
				tabBarIcon: () => {
					return <Icon name="user-thin" size={20} color="white" />;
				}
			}
		}
	},
	{
		tabBarComponent: CustomTabBar,
		initialRouteName: "CategoriesTab"
	}
);

const MainStack = createDrawerNavigator(
	{
		Main: {
			screen: AppNavigator,
			navigationOptions: {
				header: null
			}
		}
	},
	{
		initialRouteName: "Main",
		contentComponent: DrawerContent,
		drawerWidth: 300
	}
);

const MainWithModel = createStackNavigator(
	{
		MainStack,
		Checkout,
		ImageView
	},
	{
		headerMode: "none",
		mode: "modal",
		transparentCard: true,
		cardStyle: {
			backgroundColor: "transparent",
			opacity: 1
		}
	}
);

const SellerTab = createBottomTabNavigator(
	{
		ChatTab: {
			screen: ChatsStack,
			navigationOptions: {
				tabBarIcon: () => {
					return <Icon name="history-(2)" size={20} color="white" />;
				}
			}
		},
		NotificationsTab: {
			screen: notificationsStack,
			navigationOptions: {
				tabBarIcon: () => {
					return <Icon name="bell" size={20} color="white" />;
				}
			}
		},
		AccountTab: {
			screen: accountStack,
			navigationOptions: {
				tabBarIcon: () => {
					return <Icon name="user-thin" size={20} color="white" />;
				}
			}
		}
	},
	{
		tabBarComponent: CustomTabBar,
		initialRouteName: "NotificationsTab"
	}
);

let SellerModalStack = createStackNavigator(
	{
		SellerTab,
		ImageView
	},
	{
		headerMode: "none",
		mode: "modal",
		transparentCard: true,
		cardStyle: {
			backgroundColor: "transparent",
			opacity: 1
		}
	}
);

class AppRouter extends React.Component {
	render() {
		let { user: parent } = this.props;
		parent = StorageService.getState();
		let isAuthenticated = Object.keys(parent).length > 0;
		let Comp = createAppContainer(MainWithModel);
		if (isAuthenticated && parent.user.user_role === 1)
			Comp = createAppContainer(SellerModalStack);
		return (
			<Comp
				ref={navigatorRef => {
					NavigationService.setTopLevelNavigator(navigatorRef);
				}}
			/>
		);
	}
}

const mapStateToProps = ({ user }) => ({ user });

export default connect(mapStateToProps)(AppRouter);
