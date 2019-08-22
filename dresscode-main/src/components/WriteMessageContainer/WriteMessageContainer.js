import React, { PureComponent } from "react";
import checkChatCreation from "../../utils/checkChatCreations";
import axios from "axios";
import PropTypes from "prop-types";

class WriteMessageContainer extends PureComponent {
  state = {
    isClickedMessage: false,
    postMessage: "",
    postMessageColor: "#000",
    messageText: ""
  };
  toggleMessage = () => {
    if (this.state.isClickedMessage) {
      this.setState({
        isClickedMessage: false,
        postMessage: ""
      });
    } else {
      this.setState({
        isClickedMessage: true
      });
    }
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  sendMessage = e => {
    e.preventDefault();
    if (this.state.messageText.length < 2) {
      this.setState({
        postMessage: "Write something",
        postMessageColor: "#de3650"
      });
    } else if (!this.props.user.isAuthenticated) {
      this.setState({
        postMessage: "You need to sign in to post a message",
        postMessageColor: "#de3650"
      });
    } else {
      const chats = this.props.user.user.chats;
      const sender = this.props.user.user.userId;
      const receiver = this.props.addedBy;
      const haveChatAlready = checkChatCreation(chats, sender, receiver);
      let createdBy = haveChatAlready ? haveChatAlready.creator : sender;
      if (this.props.creator) {
        createdBy = this.props.creator;
      }
      const postedAt = new Date().toUTCString();
      axios
        .post("/sendMessage", {
          from: this.props.user.user.userId,
          to: this.props.addedBy,
          message: this.state.messageText,
          createdBy,
          postedAt
        })
        .then(() => {
          if (this.props.pushMessageToState) {
            this.props.pushMessageToState({
              sender: this.props.user.user.userId,
              postedAt,
              messageText: this.state.messageText
            });
          }
          this.setState({
            postMessage: "Message sent",
            postMessageColor: "green",
            messageText: ""
          });
          setTimeout(() => {
            this.setState({ postMessage: "" });
          }, 3000);
        })
        .catch(e => {
          this.setState({
            postMessage: "Cant send the message",
            postMessageColor: "#de3650"
          });
          setTimeout(() => {
            this.setState({
              postMessage: ""
            });
          }, 2000);
        });
    }
  };

  render() {
    return (
      <div>
        <button
          onClick={this.toggleMessage}
          className="primary-button primary-button--big stretch"
        >
          Message
        </button>
        {this.state.isClickedMessage ? (
          <div className="write-message-container">
            <span className="label-style">Write a message</span>
            <textarea
              id="messageText"
              onChange={this.handleChange}
              value={this.state.messageText}
            />
            <button
              onClick={this.sendMessage}
              className="primary-button primary-button--big stretch"
            >
              Post
            </button>
            {this.state.postMessage.length ? (
              <p
                className="message"
                style={{ color: this.state.postMessageColor }}
              >
                {this.state.postMessage}
              </p>
            ) : null}
          </div>
         ) : null} 
      </div>
    );
  }
}

WriteMessageContainer.propTypes = {
  user: PropTypes.object.isRequired,
  pushMessageToState: PropTypes.func,
  addedBy: PropTypes.string.isRequired
};

export default WriteMessageContainer;
