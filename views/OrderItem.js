import React from "react";
import {
    Animated,
    Image,
    Text,
    TouchableWithoutFeedback,
    View,
    TextInput
} from "react-native";
import Icon from "../services/IconService";
import RoundButton from "../components/RoundButton";
import api, { urlResolve } from "../api/api";
import MultiImagePicker from "../components/MultiImagePicker";
import CategoryItem from "./CategoryItem";
import NavigationService from "../services/NavigationService";

class OrderItem extends React.Component {
    state = {
        collapsed: true,
        minHeight: 0,
        maxHeight: 0,
        photos: [],
        price: 0,
        description: "",
        status: "idle",
        requestStatus: "",
        edited: false
    };
    toggle = () => {
        this.setState({ collapsed: !this.state.collapsed });
    };

    add = el => {
        this.setState({ ...this.state, photos: [...this.state.photos, el] });
    };

    componentDidMount() {
        let { product } = this.props.item;
        if (product) {
            let photos = [];
            if (product.product_images) {
                photos = product.product_images.map(e => urlResolve(e.link));
            }
            this.setState({
                ...this.state,
                photos,
                price: product.price.toString(),
                description: product.description
            });
        }
    }

    remove = index => {
        this.setState({
            ...this.state,
            photos: [
                ...this.state.photos.slice(0, index),
                ...this.state.photos.slice(index + 1, this.state.photos.length)
            ]
        });
    };

    request = () => {
        this.setState({ ...this.state, status: "rotate" });
        let { item } = this.props;
        let { price, photos, description, status, edited } = this.state;
        let { product, requests } = item;
        let data = {
            Product: { price, description },
            Query: {
                images: [...photos]
            },
            SellerQuery: {
                query_id: item.query_id,
                car_id: item.query.car_id
            }
        };
        if (!product && !edited)
            api.order.addProduct(data).then(res => {
                this.setState({
                    ...this.state,
                    status: "success",
                    requestStatus: "Your request has been sent!"
                });
                this.props.updateOrders(() => {
                    setTimeout(() => {
                        this.setState({
                            ...this.state,
                            status: "idle",
                            edited: true
                        });
                    }, 200);
                });
            });
        else {
            api.order.updateProduct(data).then(res => {
                this.setState({
                    ...this.state,
                    status: "success",
                    requestStatus: "Your request has been updated!"
                });
                this.props.updateOrders(() => {
                    setTimeout(() => {
                        this.setState({ ...this.state, status: "idle" });
                    }, 200);
                });
            });
        }
    };

    render() {
        let { item: parent, type, addToCart } = this.props;
        let item = parent;
        let status = item.status;
        let product = null;
        if (type === 1) {
            item = parent.query;
            status = parent.status;
            product = parent.product;
        }
        let { requests } = item;
        let { photos, price, description, requestStatus, edited } = this.state;
        let { add, remove, request } = this;
        return (
            <Animated.View
                style={[
                    {
                        backgroundColor: status !== 0 ? "#eefaf4" : "white",
                        borderRadius: 30,
                        shadowColor: "black",
                        shadowOpacity: 0.1,
                        shadowOffset: { height: 5 },
                        flex: 1,
                        marginTop: 5,
                        marginBottom: 5,
                        margin: 15,
                        elevation: 5
                    }
                ]}
            >
                <View style={{ flexDirection: "row", padding: 15 }}>
                    <View>
                        <TouchableWithoutFeedback
                            onPress={() => {
                                NavigationService.navigate("ImageView", {
                                    images: item.query_images.map(e => e.link),
                                    imageIndex: 0
                                });
                            }}
                        >
                            <Image
                                source={{
                                    uri: urlResolve(item.query_images[0].link)
                                }}
                                style={{
                                    height: 120,
                                    width: 80,
                                    borderRadius: 20
                                }}
                            />
                        </TouchableWithoutFeedback>
                        {(status !== 0 || edited) && (
                            <View
                                style={{
                                    borderRadius: 15,
                                    height: 30,
                                    width: 30,
                                    backgroundColor: "#00904c",
                                    position: "absolute",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    marginLeft: 60
                                }}
                            >
                                <Icon name="ok" size={12} color="white" />
                            </View>
                        )}
                    </View>
                    <View style={{ paddingLeft: 15, flex: 1 }}>
                        <View
                            style={{
                                flexDirection: "row",
                                borderBottomWidth: 1,
                                borderColor: "#cbcbcb"
                            }}
                        >
                            <View
                                style={{
                                    flex: 1,
                                    justifyContent: "space-around",
                                    flexDirection: "row"
                                }}
                            >
                                <Text
                                    style={{ color: "#afafaf", fontSize: 12 }}
                                >
                                    {item.created_at &&
                                        item.created_at.split(" ")[0]}
                                </Text>
                                <Text
                                    style={{ fontWeight: "bold", fontSize: 12 }}
                                >
                                    {item.created_at &&
                                        item.created_at.split(" ")[1]}
                                </Text>
                            </View>
                            <Text
                                style={{
                                    fontWeight: "bold",
                                    color: "green",
                                    fontSize: 14
                                }}
                            >
                                # {type === 1 ? parent.id : item.id}
                            </Text>
                        </View>
                        <View style={{ flexDirection: "row", flex: 1 }}>
                            <View
                                style={{
                                    flex: 1,
                                    justifyContent: "space-between",
                                    paddingTop: 10
                                }}
                            >
                                <Text
                                    numberOfLines={1}
                                    style={{ fontWeight: "bold", fontSize: 14 }}
                                >
                                    {`${item.vendor} ${item.car} ${
                                        item.modification
                                    }`}
                                </Text>
                                <Text
                                    numberOfLines={2}
                                    style={{ fontWeight: "400", fontSize: 14 }}
                                >
                                    {item.description}
                                </Text>
                                <Text
                                    numberOfLines={1}
                                    style={{ fontWeight: "400", fontSize: 14 }}
                                >
                                    {item.fuel_type}
                                </Text>
                            </View>
                            <View
                                style={{
                                    justifyContent: "center",
                                    alignItems: "center",
                                    paddingLeft: 10
                                }}
                            >
                                <TouchableWithoutFeedback
                                    onPress={() => this.toggle()}
                                >
                                    <View
                                        style={{
                                            height: 30,
                                            width: 30,
                                            borderRadius: 18,
                                            borderColor: "#00904c",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            borderWidth: 0.5
                                        }}
                                    >
                                        <Icon
                                            name="chevrondown"
                                            size={6}
                                            color="#00904c"
                                        />
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                        </View>
                    </View>
                </View>
                {!this.state.collapsed && (
                    <Animated.View>
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-evenly",
                                padding: 15
                            }}
                        >
                            <View style={{ alignItems: "center" }}>
                                <Text style={{ fontWeight: "bold" }}>
                                    Imported
                                </Text>
                                <Text style={{ fontWeight: "bold" }}>
                                    {item.imported_from}
                                </Text>
                            </View>
                            <View style={{ flex: 1, alignItems: "center" }}>
                                <Text style={{ fontWeight: "bold" }}>
                                    Transmission
                                </Text>
                                <Text style={{ fontWeight: "bold" }}>
                                    {item.transmission}
                                </Text>
                            </View>
                            <View style={{ alignItems: "center", flex: 1 }}>
                                <Text style={{ fontWeight: "bold" }}>
                                    Drive type
                                </Text>
                                <Text style={{ fontWeight: "bold" }}>
                                    {item.drivetype}
                                </Text>
                            </View>
                            <View style={{ alignItems: "center" }}>
                                <Text style={{ fontWeight: "bold" }}>Year</Text>
                                <Text style={{ fontWeight: "bold" }}>
                                    {item.year}
                                </Text>
                            </View>
                        </View>
                        {type === 1 && (
                            <View style={{ padding: 15 }}>
                                <Text style={{ fontWeight: "bold" }}>
                                    Competitor prices
                                </Text>
                                <View
                                    style={{
                                        flexDirection: "row",
                                        justifyContent: "space-around"
                                    }}
                                >
                                    {parent.request_prices ? (
                                        <React.Fragment>
                                            <Text style={{ color: "#00904c" }}>
                                                1) {parent.request_prices["0"]}
                                            </Text>
                                            <Text style={{ color: "#00904c" }}>
                                                2) {parent.request_prices["1"]}
                                            </Text>
                                            <Text style={{ color: "#00904c" }}>
                                                3) {parent.request_prices["2"]}
                                            </Text>
                                        </React.Fragment>
                                    ) : (
                                        <Text
                                            style={{
                                                color: "#00904c",
                                                paddingTop: 10,
                                                paddingBottom: 10
                                            }}
                                        >
                                            No competitors be the first to
                                            propose price
                                        </Text>
                                    )}
                                </View>
                                <Text style={{ fontWeight: "bold" }}>
                                    My price
                                </Text>
                                <View
                                    style={{
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                        paddingTop: 10
                                    }}
                                >
                                    <View style={{ flexDirection: "row" }}>
                                        <TextInput
                                            placeholder="Type here ..."
                                            value={price}
                                            style={{
                                                width: 100,
                                                borderBottomWidth: 1,
                                                borderColor: "#00904c"
                                            }}
                                            onChangeText={text =>
                                                this.setState({
                                                    ...this.state,
                                                    price: text
                                                })
                                            }
                                        />
                                        <Text
                                            style={{
                                                color: "#00904c",
                                                fontWeight: "bold"
                                            }}
                                        >
                                            AED
                                        </Text>
                                    </View>
                                    <Icon
                                        name="penciledit"
                                        color="#afafaf"
                                        size={18}
                                    />
                                </View>
                                <Text
                                    style={{
                                        fontWeight: "bold",
                                        paddingTop: 10
                                    }}
                                >
                                    Description
                                </Text>
                                <TextInput
                                    value={description}
                                    onChangeText={text =>
                                        this.setState({
                                            ...this.state,
                                            description: text
                                        })
                                    }
                                    style={{
                                        borderRadius: 20,
                                        borderWidth: 1,
                                        borderColor: "#00904c",
                                        left: 0,
                                        right: 0,
                                        height: 80,
                                        marginTop: 10,
                                        paddingLeft: 10
                                    }}
                                    placeholder="Type here ..."
                                    multiline={true}
                                />
                                <Text style={{ paddingTop: 10 }}>
                                    Upload your images for this part
                                </Text>
                                <MultiImagePicker
                                    {...{ photos, add, remove, single: true }}
                                />
                                {!!requestStatus && (
                                    <Text
                                        style={{
                                            textAlign: "center",
                                            color: "red"
                                        }}
                                    >
                                        {requestStatus}
                                    </Text>
                                )}
                                <View
                                    style={{
                                        flexDirection: "row",
                                        justifyContent: "center"
                                    }}
                                >
                                    <RoundButton
                                        fill
                                        onPress={request}
                                        animated
                                        status={this.state.status}
                                        text={
                                            product || edited
                                                ? "Update"
                                                : "Send request"
                                        }
                                        color={"#00904c"}
                                        icon={() => (
                                            <Icon
                                                name={"left-arrow"}
                                                color={"white"}
                                                style={{
                                                    transform: [
                                                        { rotate: "180deg" }
                                                    ]
                                                }}
                                            />
                                        )}
                                    />
                                </View>
                            </View>
                        )}
                        {type === 0 && (
                            <View
                                style={{
                                    paddingTop: 15,
                                    alignItems: "center",
                                    paddingBottom: 15
                                }}
                            >
                                {requests &&
                                    requests.map((el, key) => {
                                        if (key > 2) return null;
                                        let { cart } = this.props;
                                        let isInCart = false;
                                        if (cart && cart.length > 0) {
                                            let inCart = cart.find(
                                                e => el.id === e.id
                                            );
                                            if (
                                                inCart &&
                                                Object.keys(inCart).length > 0
                                            )
                                                isInCart = true;
                                        }
                                        return (
                                            <CategoryItem
                                                {...{
                                                    item: {
                                                        id: el.id,
                                                        image:
                                                            el.product_images &&
                                                            el.product_images[0]
                                                                .link,
                                                        car_vendor: item.vendor,
                                                        name: `${
                                                            el.product_description
                                                        } for ${item.vendor} ${
                                                            item.car
                                                        } ${item.modification}`,
                                                        purchase_price:
                                                            el.product_price,
                                                        photos:
                                                            el.product_images &&
                                                            el.product_images.map(
                                                                e => e.link
                                                            ),
                                                        description:
                                                            el.product_description,
                                                        date: item.created_at,
                                                        typeOfCar: `${
                                                            item.vendor
                                                        } ${item.car} ${
                                                            item.modification
                                                        }`,
                                                        product_id:
                                                            el.product_id
                                                    },
                                                    key,
                                                    noMargin: true,
                                                    addToCart,
                                                    isInCart
                                                }}
                                            />
                                        );
                                    })}
                            </View>
                        )}
                    </Animated.View>
                )}
            </Animated.View>
        );
    }
}

export default OrderItem;
