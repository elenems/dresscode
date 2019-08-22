import React from "react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";

function Message(props) {
  const { chatId } = props.message;
  const { isRead, messageText, sender, postedAt } = props.message.latestMessage;
  const style = isRead
    ? { border: "none", background: "#fbfbfb" }
    : { border: "2px solid black", background: "#e6e6e6" };

  const moveToChat = e => {
    e.preventDefault();
    axios.post("/setMessageRead", {
      userId: props.user.user.userId,
      chatId
    });
    props.user.setMessageRead(chatId);
    props.history.push(`/chat/${chatId}`);
  };

  const removeChat = e => {
    axios
      .post("/removeUserChat", {
        chatId,
        userId: props.user.user.userId,
        userMessagerId: props.message.creator
      })
      .then(() => {
        props.user.removeChat(chatId);
      });
  };

  return (
    <div style={style} className="chat-message">
      {sender === props.user.user.userId ? (
        <div className="chat-message-top">
          <p className="chat-message-messager">From you</p>
          <span>{new Date(postedAt).toString().slice(0, 24)}</span>
        </div>
      ) : (
        <div className="chat-message-top">
          <Link className="chat-message-messager" to={`/users/${sender}`}>
            {sender}
          </Link>
          <span>{new Date(postedAt).toString().slice(0, 24)}</span>
        </div>
      )}
      <div className="chat-message-container">
        <Link onClick={moveToChat} to={`/chat/${chatId}`}>
          <p className="chat-message-text">{messageText}</p>
        </Link>
        <div>
          <button onClick={removeChat} className="primary-button">
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}

Message.propTypes = {
  message: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

export default withRouter(Message);
