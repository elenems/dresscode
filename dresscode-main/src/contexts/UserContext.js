import React, { Component, createContext } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";

export const UserContext = createContext();

export default class UserContextProvider extends Component {
  state = {
    user: null,
    isAuthenticated: false
  };
  authenticateUser = token => {
    const decodedToken = jwtDecode(token);
    if (decodedToken.email) {
      axios.get(`getUser?userId=${decodedToken.email}`).then(data => {
        this.setState({
          isAuthenticated: true,
          user: data.data
        });
      });
    }
  };

  unauthenticateUser = () => {
    localStorage.removeItem("token");
    this.setState({
      isAuthenticated: false,
      user: null
    });
  };

  removeNotificationsNumber = () => {
    this.setState({
      user: {
        ...this.state.user,
        unreadNotifications: 0
      }
    });
  };

  checkIsLiked = id => {
    if (this.state.isAuthenticated) {
      if (
        this.state.user.likes.find(like => {
          return id === like;
        })
      ) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  removeChat = id => {
    const newChats = this.state.user.chats.filter(chat => {
      return id !== chat.chatId;
    });
    this.setState({
      user: {
        ...this.state.user,
        chats: newChats
      }
    });
  };

  setMessageRead = id => {
    let index = null;
    const chats = this.state.user.chats;
    for (let i = 0; i < chats.length; i++) {
      if (chats[i]["chatId"] === id) {
        index = i;
        break;
      }
    }
    if (index !== null) {
      chats[index]["latestMessage"]["isRead"] = true;
      this.setState({
        user: {
          ...this.state.user,
          chats
        }
      });
    }
  };

  setCommentRead = id => {
    const notifications = this.state.user.notifications;
    let index = null;
    for (let i = 0; i < notifications.length; i++) {
      if (notifications[i].id === id) {
        index = i;
        break;
      }
    }

    if (index !== null) {
      notifications[index]["isRead"] = true;
      this.setState({
        user: {
          ...this.state.user,
          notifications
        }
      });
    }
  };

  unlikeClothes = id => {
    const newLikes = this.state.user.likes.filter(like => {
      return like !== id;
    });
    this.setState({
      user: {
        ...this.state.user,
        likes: newLikes
      }
    });
  };

  likeClothes = id => {
    this.setState({
      user: {
        ...this.state.user,
        likes: [...this.state.user.likes, id]
      }
    });
  };

  render() {
    return (
      <UserContext.Provider
        value={{
          user: this.state.user,
          authenticateUser: this.authenticateUser,
          isAuthenticated: this.state.isAuthenticated,
          unauthenticateUser: this.unauthenticateUser,
          likeClothes: this.likeClothes,
          unlikeClothes: this.unlikeClothes,
          checkIsLiked: this.checkIsLiked,
          removeChat: this.removeChat,
          setMessageRead: this.setMessageRead,
          removeNotificationsNumber: this.removeNotificationsNumber,
          setCommentRead: this.setCommentRead
        }}
      >
        {this.props.children}
      </UserContext.Provider>
    );
  }
}
