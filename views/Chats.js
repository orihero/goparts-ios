import React, { Component, PropTypes } from "react";
import Header from "../components/Header";
import { FlatList } from "react-native";
import ChatItem from "./ChatItem";

class Chats extends Component {
	data = [
		{
			id: 1,
			photo:
				"https://www.shareicon.net/download/2016/05/24/770016_man_512x512.png",
			name: "James Gordan",
			text: "Hi!",
			date: "7:52 AM",
			online: true,
			newMessages: 3
		},
		{
			id: 2,
			photo:
				"https://banner2.kisspng.com/20180315/koe/kisspng-user-avatar-computer-software-flat-man-head-material-5aa9fc3a0eac76.7598580315210895940601.jpg",
			name: "Monica Belucci",
			text: "How are you",
			date: "7:52 AM",
			online: false,
			newMessages: 0
		},
		{
			id: 3,
			photo:
				"https://cdn4.iconfinder.com/data/icons/people-of-crime-and-protection/512/People_Crime_Protection_burglar_man-512.png",
			name: "Christina Alonso",
			text: "I would love to listen from you",
			date: "7:52 AM",
			online: true,
			newMessages: 10
		},
		{
			id: 4,
			photo:
				"https://www.shareicon.net/data/2016/08/18/810258_user_512x512.png",
			name: "Christina Aguilera",
			text: "I don`t want to write here",
			date: "7:52 AM",
			online: false,
			newMessages: 0
		},
		{
			id: 5,
			photo:
				"https://cdn0.iconfinder.com/data/icons/flat-vector-2/100/58-Spy-512.png",
			name: "Frank Lampard",
			text: "How is going to play dota 2?",
			date: "7:52 AM",
			online: false,
			newMessages: 0
		},
		{
			id: 0,
			photo:
				"https://cdn0.iconfinder.com/data/icons/flat-vector-2/100/58-Spy-512.png",
			name: "Sivio Morano",
			text: "Are you okey ?",
			date: "7:52 AM",
			online: false,
			newMessages: 0
		},
		{
			id: 7,
			photo:
				"https://cdn0.iconfinder.com/data/icons/flat-vector-2/100/58-Spy-512.png",
			name: "Miles Morales",
			text: "WTF?",
			date: "7:52 AM",
			online: false,
			newMessages: 0
		},
		{
			id: 6,
			photo:
				"https://cdn0.iconfinder.com/data/icons/flat-vector-2/100/58-Spy-512.png",
			name: "Bruce Lee",
			text: "Let us do it!",
			date: "7:52 AM",
			online: false,
			newMessages: 0
		},
		{
			id: 10,
			photo:
				"https://cdn0.iconfinder.com/data/icons/flat-vector-2/100/58-Spy-512.png",
			name: "Doctor Strange",
			text: "That`s how we do it!",
			date: "7:52 AM",
			online: false,
			newMessages: 0
		},
		{
			id: -1,
			photo:
				"https://cdn0.iconfinder.com/data/icons/flat-vector-2/100/58-Spy-512.png",
			name: "Tony Stark",
			text: "I am inevitable, Well I am Iron Man",
			date: "7:52 AM",
			online: false,
			newMessages: 0
		},
		{
			id: -2,
			photo:
				"https://cdn0.iconfinder.com/data/icons/flat-vector-2/100/58-Spy-512.png",
			name: "Bruce Wayne",
			text: "Teenagers are the worst!",
			date: "7:52 AM",
			online: true,
			newMessages: 0
		}
	];
	render() {
		return (
			<React.Fragment>
				<Header name="Messages" description="list of messages" />
				<FlatList
					style={{ paddingTop: 15, paddingBottom: 30 }}
					data={this.data}
					renderItem={ChatItem}
					keyExtractor={item => {
						return item.id.toString();
					}}
				/>
			</React.Fragment>
		);
	}
}

export default Chats;
