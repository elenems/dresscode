import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import Loader from "../../utils/Loader";
import ClothesItem from "../ItemsList/ListItem/ListItem";
import WriteMessageContainer from "../WriteMessageContainer/WriteMessageContainer";
import PropTypes from "prop-types";

export class UserContainer extends Component {
  state = {
    user: null,
    message: "",
    isLoading: true,
    userClothes: []
  };
  componentDidMount() {
    axios
      .get(`/getUser?userId=${this.props.match.params.id}`)
      .then(data => {
        this.setState({
          isLoading: false,
          user: data.data
        });
      })
      .catch(e => {
        this.setState({
          isLoading: false,
          message: "Can't load user info"
        });
      });
    axios
      .get(`/getUserClothes?userId=${this.props.match.params.id}`)
      .then(data => {
        this.setState({
          userClothes: data.data.clothes
        });
      })
      .catch(e => {
        this.setState({ message: "Can't load user's clothes" });
      });
  }
  render() {
    return this.state.isLoading ? (
      <Loader />
    ) : (
      <div className="row">
        {this.state.message ? (
          <p className="message">{this.state.message}</p>
        ) : (
          <div className="user-info">
            <h2>
              {this.state.user.firstName} {this.state.user.lastName}
            </h2>
            <p>{this.state.user.email}</p>
            <p>Location: {this.state.user.location}</p>
            <WriteMessageContainer
              addedBy={this.state.user.userId}
              user={this.props.user}
            />
          </div>
        )}

        <div className="user-clothes-container">
          <h4>All user items</h4>
          <div className="user-clothes-list">
            {!this.state.userClothes.length
              ? null
              : this.state.userClothes.map(item => {
                  return (
                    <ClothesItem
                      key={item.id}
                      user={this.props.user}
                      item={item}
                    />
                  );
                })}
          </div>
        </div>
      </div>
    );
  }
}

UserContainer.propTypes = {
  user: PropTypes.object.isRequired
};

export default withRouter(UserContainer);
