import React, { Component } from "react";
import axios from "axios";
import ChatMessage from "./ChatMessage/ChatMessage";
import { UserContext } from "../../../contexts/UserContext";
import WriteMessageContainer from "../../WriteMessageContainer/WriteMessageContainer";

export default class ChatContainer extends Component {
  state = {
    message: "",
    chat: null
  };

  componentDidMount() {
    const chatId = this.props.match.params.id;
    axios
      .get(`/getChat?chatId=${chatId}`)
      .then(data => {
        this.setState({
          chat: data.data
        });
      })
      .catch(e => {
        this.setState({
          message: "Error, loading the chat"
        });
      });
  }

  pushMessageToState = message => {
    this.setState({
      chat: {
        ...this.state.chat,
        messages: [...this.state.chat.messages, message]
      }
    });
  };

  render() {
    return (
      <UserContext.Consumer>
        {user => (
          <div className="profile-chat">
            {this.state.chat !== null && user.user !== null
              ? this.state.chat.messages.map(message => {
                  return (
                    <ChatMessage
                      userId={user.user.userId}
                      key={new Date() + Math.random()}
                      message={message}
                    />
                  );
                })
              : null}
            {user.user !== null && this.state.chat !== null ? (
              <WriteMessageContainer
                pushMessageToState={this.pushMessageToState}
                creator={this.state.chat.creator}
                addedBy={
                  this.state.chat.creator === user.user.userId
                    ? this.state.chat.consumer
                    : this.state.chat.creator
                }
                user={user}
              />
            ) : null}
          </div>
        )}
      </UserContext.Consumer>
    );
  }
}
