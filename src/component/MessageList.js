import React, { Component } from "react";

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: []
    };
    this.messagesRef = this.props.firebase.database().ref("messages");
  }

  componentDidMount() {
    this.messagesRef.on("child_added", snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({ messages: this.state.messages.concat(message) });
    });
  }

  render() {
    return (
      <div>
        <ul>
          {this.state.messages.map(message => (
            <li key={message.key}>
              <div>{message.username}</div>
              <div>{message.content}</div>
              <div>{message.sentAt}</div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default MessageList;
