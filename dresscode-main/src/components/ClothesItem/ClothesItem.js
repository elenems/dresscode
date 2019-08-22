import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import axios from "axios";
import Loader from "../../utils/Loader";
import HeartButton from "./HeartButton/HeartButton";
import Comments from "./Comments/Comments";
import WriteMessageContainer from "../WriteMessageContainer/WriteMessageContainer";
import PropTypes from "prop-types";

class ClothesItem extends Component {
  state = {
    clothesItem: null,
    isLoading: true,
    clothesUser: null,
    message: ""
  };
  componentDidMount() {
    window.scrollTo(0, 0);
    axios
      .get(`/getClothesItem?clothesId=${this.props.match.params.id}`)
      .then(data => {
        this.setState({
          clothesItem: data.data,
          isLoading: false
        });
        return data;
      })
      .then(data => {
        axios.get(`/getUser?userId=${data.data.addedBy}`).then(userData => {
          this.setState({
            clothesUser: userData.data
          });
        });
        axios.post("/incrementClothesView", {
          clothesId: this.state.clothesItem.id
        });
      })
      .catch(e => {
        this.setState({ isLoading: false });
      });
  }


  render() {
    return this.state.isLoading ? (
      <Loader />
    ) : (
      <div>
        <div className="clothes-item row">
          <div className="clothes-item-image">
            <img
              alt={this.state.clothesItem.title}
              src={this.state.clothesItem.image}
            />
          </div>

          <div className="clothes-item-description">
            <div className="clothes-item-description-top">
              <div>
                <h4>{this.state.clothesItem.title}</h4>
                <p>Brand: {this.state.clothesItem.brand}</p>
                <p>Size: {this.state.clothesItem.size}</p>
                <p>Condition: {this.state.clothesItem.condition}</p>
              </div>
              <div>
                <HeartButton
                  clothesId={this.state.clothesItem.id}
                  likesCount={this.state.clothesItem.likesCount}
                  user={this.props.user}
                />
              </div>
            </div>
            <div className="clothes-item-description-bottom">
              <p>
                <b>${this.state.clothesItem.price}</b>
              </p>
            </div>
            <div className="clothes-item-user-info">
              {this.state.clothesUser === null ? (
                <p>Can't load clothes' owner</p>
              ) : (
                <div>
                  <h6>Product owner</h6>
                  <div className="clothes-item-user-details">
                    <Link to={`/users/${this.state.clothesUser.id}`}>
                      {this.state.clothesUser.lastName}{" "}
                      {this.state.clothesUser.firstName}
                    </Link>
                    <span>Registered: {this.state.clothesUser.signUpDate}</span>
                  </div>
                  <WriteMessageContainer
                    addedBy={this.state.clothesItem.addedBy}
                    user={this.props.user}
                  />
                </div>
              )}
            </div>
            <div className="clothes-item-end">
              <h6>Description</h6>
              <p>{this.state.clothesItem.description}</p>
              <hr />
              <p>Post date: {this.state.clothesItem.date.slice(0, -4)}</p>
            </div>
          </div>
        </div>
        <Comments
          clothesTitle={this.state.clothesItem.title}
          clothesId={this.state.clothesItem.id}
          user={this.props.user}
          comments={this.state.clothesItem.comments}
        />
      </div>
    );
  }
}

ClothesItem.propTypes = {
  user: PropTypes.object.isRequired
};

export default withRouter(ClothesItem);
