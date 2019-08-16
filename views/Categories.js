import React, { Component } from "react";
import { FlatList, View, Text } from "react-native";
import CategoryItem from "./CategoryItem";
import Header from "../components/Header";
import Icon from "../services/IconService";
import { connect } from "react-redux";

class Categories extends Component {
	render() {
		let { products } = this.props;
		return (
			<React.Fragment>
				<FlatList
					showsVerticalScrollIndicator={false}
					data={products}
					keyExtractor={e => e.id}
					renderItem={CategoryItem}
				/>
			</React.Fragment>
		);
	}
}

const mapStateToProps = ({ products, categories, bodyTypes }) => {
	return {
		products,
		categories,
		bodyTypes
	};
};

export default connect(mapStateToProps)(Categories);
