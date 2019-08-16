import React, { Component, PropTypes } from "react";
import Header from "../components/Header";
//<FlatList data={messages} keyExtractor={e=>e.id} renderItem={}/>
class Chat extends Component {
	render() {
		let user = this.props.navigation.getParam("user");
		return (
			<>
				<Header {...{ user }} back />
			</>
		);
	}
}

export default Chat;
