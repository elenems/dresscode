import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function ChatMessage(props) {
  const style =
    props.userId === props.message.sender
      ? { background: "#f3f0f0" }
      : { background: "#fbfbfb" };
  return (
    <div style={style} className="chat-message">
      {props.userId === props.message.sender ? (
        <div className="chat-message-top">
          <p className="chat-message-messager">From you</p>
          <span>
            {new Date(props.message.postedAt).toString().slice(0, 24)}
          </span>
        </div>
      ) : (
        <div className="chat-message-top">
          <Link
            className="chat-message-messager"
            to={`/users/${props.message.sender}`}
          >
            {props.message.sender}
          </Link>
          <span>
            {new Date(props.message.postedAt).toString().slice(0, 24)}
          </span>
        </div>
      )}
      <div className="chat-message-container">
        <p className="chat-message-text">{props.message.messageText}</p>
      </div>
    </div>
  );
}

ChatMessage.propTypes = {
  userId: PropTypes.string.isRequired,
  message: PropTypes.object.isRequired
};

export default React.memo(ChatMessage);
