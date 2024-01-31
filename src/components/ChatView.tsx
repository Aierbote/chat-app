import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import { TMessage } from "../declarations";
import styled from "styled-components";

// to avoid ```Binding element 'inputEmail' implicitly has an 'any' type```
interface Props {
	children?: any;
	author: string;
}

const ChatView = ({ children, author }: Props) => {
	const [inputText, setInputText] = useState("");
	const [message, setMessage] = useState<TMessage>();

	const formattedDateTime = message?.date.toLocaleString("it-IT", {
		day: "2-digit",
		month: "2-digit",
		hour: "2-digit",
		minute: "2-digit",
	});

	const onChangeInput = useCallback((event: any) => {
		setInputText(event.target.value);
	}, []);

	const onClick = useCallback(
		(event: any) => {
			const newMessage: TMessage = {
				author: author,
				content: inputText,
				date: new Date(),
			};

			setMessage(newMessage);
			localStorage.setItem("messages", JSON.stringify(newMessage));
		},
		[inputText, author]
	);

	return (
		<>
			<ul>
				<li>
					<h5>[DD/MM 00:00] Author 1</h5>
					<p>Message 1</p>
				</li>
				<li>
					<h5>[DD/MM 00:00] Author 2</h5>
					<p>Message 2</p>
				</li>
				{message && (
					<li>
						<h5>
							[{formattedDateTime}] {message.author}
						</h5>
						<p>{message.content}</p>
					</li>
				)}
			</ul>
			<div>
				<input
					type="text"
					placeholder="Insert your message"
					value={inputText}
					onChange={onChangeInput}
				/>
				<button onClick={onClick} disabled={!inputText}>
					Send
				</button>
			</div>
		</>
	);
};

ChatView.propTypes = {
	children: PropTypes.node,
	author: PropTypes.string,
};

export default ChatView;
