import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../../../contexts/UserContext";
import Icon from "../../../../utils/Icon";
import axios from "axios";
import NotificationsContainer from "./NotificationsContainer/NotificationsContainer";

export default function HeaderControls() {
  const user = useContext(UserContext);

  const isAuthenticated = user.isAuthenticated;
  const [notificationsVisibility, setNotificationsVisibility] = useState(false);

  const toggleNotificationsVisibility = () => {
    if (notificationsVisibility) {
      setNotificationsVisibility(false);
    } else {
      setNotificationsVisibility(true);
      if (user.user.unreadNotifications > 0) {
        axios
          .post("/removeUnreadNotifications", { userId: user.user.userId })
          .then(() => {
            user.removeNotificationsNumber();
          });
      }
    }
  };

  return (
    <div id='headerControls' className="header-controls">
      <ul className="inline-list header-controls__list">
        <li>
          <Link to="/shop">Shop</Link>
        </li>
        <li>
          <Link to="/sell">
            <button title="Sell your clothes" className="primary-button">
              Sell
            </button>
          </Link>
        </li>
        {!isAuthenticated ? (
          <React.Fragment>
            <li>
              <Link title="Login for more abilities" to="/login">
                Login
              </Link>
            </li>
            <li>
              <Link title="Create an account" to="/signup">
                Signup
              </Link>
            </li>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <li>
              <Link title="Move to profile" to="/profile/settings">
                Profile
              </Link>
            </li>
            <li
              onClick={toggleNotificationsVisibility}
              id="notification-button"
            >
              <Icon name="notification" />
              <span className="notification-number">
                {user.user.unreadNotifications > 0
                  ? user.user.unreadNotifications
                  : null}
              </span>
            </li>
          </React.Fragment>
        )}
      </ul>
      {user.user !== null ? (
        <NotificationsContainer
          user={user}
          userId={user.user.userId}
          notificationsVisibility={notificationsVisibility}
          notifications={user.user.notifications}
          chats={user.user.chats}
        />
      ) : null}
    </div>
  );
}
