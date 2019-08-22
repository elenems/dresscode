import React from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";

function Notification(props) {
  const {
    link,
    message,
    title,
    notificationFrom,
    type,
    id,
    userId
  } = props.notification;

  const moveFromNotification = () => {
    if (type === "comment") {
      props.user.setCommentRead(id);
      props.history.push(link);
      axios.post("/setNotificationRead", {
        userId,
        notificationId: id
      })
    } else if (type === "chat") {
      props.user.setMessageRead(id);
      props.history.push(link);
      axios.post("/setMessageRead", {
        userId,
        chatId: id
      })
    }
  };

  return (
    <div onClick={moveFromNotification} className="chat-message">
      <div className="chat-message-top">
        <span className="chat-message-messager">{notificationFrom}</span>
        <span>{title.length > 20 ? title.slice(0, 20) + " ..." : title}</span>
      </div>
      <div className="chat-message-container">
        <p className="chat-message-text">{message}</p>
      </div>
    </div>
  );
}

Notification.propTypes = {
  notification: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

export default withRouter(Notification);
