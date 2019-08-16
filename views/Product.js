import React, { Component } from "react";
import {
	View,
	ScrollView,
	TouchableWithoutFeedback,
	TouchableHighlight,
	Image,
	Text,
	FlatList
} from "react-native";
import { Card } from "react-native-elements";
import RoundButton from "../components/RoundButton";
import RoundPicker from "../components/RoundPicker";
import Icon from "../services/IconService";
import CategoryItem from "./CategoryItem";
import { connect } from "react-redux";
import { urlResolve } from "../api/api";

class Product extends Component {
	state = { imageIndex: 0 };

	render() {
		let { products } = this.props;
		let { navigation } = this.props;
		let item = navigation.getParam("item");
		return (
			<React.Fragment>
				<ScrollView
					contentContainerStyle={{ paddingBottom: 30 }}
					style={{ backgroundColor: "#f5f5f5" }}
				>
					{item.photos && item.photos.length > 0 && (
						<Card
							containerStyle={{
								borderRadius: 20,
								overflow: "hidden",
								marginBottom: 5,
								borderWidth: 0,
								shadowColor: "black",
								shadowOpacity: 0.6,
								borderRadius: 5,
								justifyContent: "center",
								elevation: 2
							}}
							wrapperStyle={{
								justifyContent: "center",
								alignItems: "center"
							}}
						>
							<ScrollView
								style={{ width: 300 }}
								horizontal
								pagingEnabled
								showsHorizontalScrollIndicator={false}
								showsVerticalScrollIndicator={false}
								ref={ref => (this.photoScroll = ref)}
								onMomentumScrollEnd={e =>
									this.setState({
										...this.state,
										imageIndex: parseInt(
											e.nativeEvent.contentOffset.x / 300
										)
									})
								}
							>
								{item.photos &&
									item.photos.map((el, index) => {
										return (
											<TouchableWithoutFeedback
												onPress={() =>
													this.props.navigation.navigate(
														"ImageView",
														{
															imageIndex: index,
															images: item.photos
														}
													)
												}
											>
												<Image
													style={{
														height: 300,
														width: 300,
														borderRadius: 10
													}}
													source={{
														uri: urlResolve(el)
													}}
													resizeMode="cover"
												/>
											</TouchableWithoutFeedback>
										);
									})}
							</ScrollView>
							<TouchableHighlight
								underlayColor="#fe0000"
								onPress={() => {
									let imageIndex = this.state.imageIndex - 1;
									if (imageIndex < 0) return;
									this.setState({ imageIndex }, () => {
										this.photoScroll.scrollTo({
											x: imageIndex * 300
										});
									});
								}}
								style={{
									borderRadius: 8,
									shodowColor: "black",
									shadowOpacity: 0.33,
									elevation: 2,
									shadowOffset: { width: 5, height: 5 },
									backgroundColor: "white",
									justifyContent: "center",
									alignItems: "center",
									width: 50,
									height: 50,
									position: "absolute",
									marginTop: 150,
									left: 15
								}}
							>
								<Icon name="left-arrow" />
							</TouchableHighlight>
							<TouchableHighlight
								underlayColor="#fe0000"
								onPress={() => {
									let imageIndex = this.state.imageIndex + 1;
									if (imageIndex > item.photos.length - 1)
										return;
									this.setState({ imageIndex }, () => {
										this.photoScroll.scrollTo({
											x: imageIndex * 300
										});
									});
								}}
								style={{
									borderRadius: 8,
									shodowColor: "black",
									shadowOpacity: 0.33,
									elevation: 2,
									shadowOffset: { width: 5, height: 5 },
									backgroundColor: "white",
									justifyContent: "center",
									alignItems: "center",
									width: 50,
									height: 50,
									marginTop: 150,
									right: 15,
									position: "absolute"
								}}
							>
								<Icon name="right-arrow" />
							</TouchableHighlight>
						</Card>
					)}
					<Card
						containerStyle={{
							borderRadius: 20,
							overflow: "hidden",
							marginBottom: 5,
							borderWidth: 0,
							shadowColor: "black",
							shadowOpacity: 0.6,
							borderRadius: 5,
							elevation: 5
						}}
					>
						<View
							style={{
								justifyContent: "space-between",
								flexDirection: "row"
							}}
						>
							<View
								style={{
									flexDirection: "row",
									alignItems: "flex-end",
									marginBottom: 15
								}}
							>
								<Text
									style={{
										color: "#01a629",
										fontWeight: "bold",
										fontSize: 30
									}}
								>
									{item.purchase_price}
								</Text>
								<View
									style={{
										justifyContent: "flex-end",
										marginBottom: 5
									}}
								>
									<Text
										style={{
											fontWeight: "100",
											fontSize: 18
										}}
									>
										AED
									</Text>
								</View>
							</View>
						</View>
						<View style={{ flexDirection: "row" }}>
							<View style={{ flex: 1 }}>
								<Text
									style={{
										fontWeight: "bold",
										fontSize: 18,
										marginBottom: 15
									}}
								>
									Car ID:
								</Text>
								<Text
									style={{
										fontWeight: "bold",
										fontSize: 18,
										marginBottom: 15
									}}
								>
									Date of addition:
								</Text>
								<Text
									style={{
										fontWeight: "bold",
										fontSize: 18,
										marginBottom: 15
									}}
								>
									Type of car:
								</Text>
							</View>
							<View style={{ flex: 1 }}>
								<Text
									style={{
										fontWeight: "100",
										fontSize: 18,
										marginBottom: 15
									}}
								>
									{item.id}
								</Text>
								<Text
									style={{
										fontWeight: "100",
										fontSize: 18,
										marginBottom: 15
									}}
								>
									{item.date}
								</Text>
								<Text
									style={{
										fontWeight: "100",
										fontSize: 18,
										marginBottom: 15
									}}
								>
									{item.typeOfCar}
								</Text>
							</View>
						</View>
						<RoundButton
							text="Add to Cart"
							color="#00a829"
							icon={() => (
								<Icon
									name="shoppingcart"
									size={18}
									color="white"
								/>
							)}
							fill
							wide
							style={{ marginBottom: 15, height: 60 }}
						/>
						<RoundButton
							color="#fe0000"
							text="Buy Now"
							wide
							style={{ marginBottom: 15, height: 60 }}
						/>
					</Card>
					<Card
						containerStyle={{
							borderRadius: 20,
							overflow: "hidden",
							marginBottom: 5,
							borderWidth: 0,
							shadowColor: "black",
							shadowOpacity: 0.6,
							borderRadius: 5,
							elevation: 5
						}}
					>
						<Text style={{ fontSize: 18, fontWeight: "bold" }}>
							Description
						</Text>
						<Text>{item.description}</Text>
					</Card>
				</ScrollView>
			</React.Fragment>
		);
	}
}

const mapStateToProps = ({ products }) => ({ products });

export default connect(mapStateToProps)(Product);

// <FlatList
// 						horizontal
// 						showsHorizontalScrollIndicator={false}
// 						data={products}
// 						keyExtractor={e => e.id}
// 						renderItem={({ item }) => (
// 							<CategoryItem {...{ item }} horizontal />
// 						)}
// 					/>
