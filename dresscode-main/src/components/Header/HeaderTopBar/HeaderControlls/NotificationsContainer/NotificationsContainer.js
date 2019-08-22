import React, { PureComponent } from "react";
import Notification from "./Notification/Notification";
import PropTypes from "prop-types";

class NotificationsContainer extends PureComponent {
  render() {
    const { notifications, chats } = this.props;
    const notificatiosList = [];
    for (let notification of notifications) {
      if (notification.isRead === false) {
        notificatiosList.push({
          link: `/clothes/${notification.clothesId}`,
          message: notification.commentText,
          notificationFrom: notification.commenterId,
          title: notification.clothesTitle,
          type: "comment",
          id: notification.id,
          userId: this.props.userId
        });
      }
    }

    for (let notification of chats) {
      if (notification.latestMessage.isRead === false) {
        notificatiosList.push({
          link: `/chat/${notification.chatId}`,
          message: notification.latestMessage.messageText,
          notificationFrom: notification.latestMessage.sender,
          title: "Message",
          type: "chat",
          id: notification.chatId,
          userId: this.props.userId
        });
      }
    }

    return !this.props.notificationsVisibility ? null : (
      <div className="notifications-list">
        {notificatiosList.length ? (
          notificatiosList.map((notification, i) => {
            return (
              <Notification
                user={this.props.user}
                key={i}
                notification={notification}
              />
            );
          })
        ) : (
          <p className="small-message">You have no notifications</p>
        )}
      </div>
    );
  }
}

NotificationsContainer.propTypes = {
  user: PropTypes.object.isRequired,
  notificationsVisibility: PropTypes.bool.isRequired,
  chats: PropTypes.array.isRequired,
  notifications: PropTypes.array.isRequired
};

export default NotificationsContainer;
