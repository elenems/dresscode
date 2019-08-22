import React, { Component } from "react";
import axios from "axios";
import { Link, withRouter } from "react-router-dom";
import ClothesItem from "../../ItemsList/ListItem/ListItem";
import Loader from "../../../utils/Loader";
import PropTypes from "prop-types";

class UserFavouritesContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clothes: null,
      isLoading: true,
      status: {
        message: "",
        color: "#000"
      }
    };
  }

  componentDidUpdate() {
    if (this.state.clothes === null) {
      axios
        .get(`getLikedClothes/?userId=${this.props.user.user.userId}`)
        .then(data => {
         
          this.setState({
            clothes: data.data.likedClothes,
            isLoading: false
          });
        });
    }
  }

  componentDidMount() {
    if (this.state.clothes === null && this.props.user.isAuthenticated) {
      axios
        .get(`getLikedClothes/?userId=${this.props.user.user.userId}`)
        .then(data => {
         
          this.setState({
            clothes: data.data.likedClothes,
            isLoading: false
          });
        });
    }
  }

  render() {
    return (
      <div className="profile-clothes">
        {this.state.status.message.length ? (
          <p style={{ color: "green" }} className="message">
            {this.state.status.message}
          </p>
        ) : null}

        <h2>Your favourites</h2>
        {this.state.isLoading ? (
          <Loader />
        ) : !this.state.clothes.length ? (
          <div className="clothes-block">
            <h4>You have no favourite items.</h4>
            <p style={{ marginTop: "10px" }}>
              Visit{" "}
              <Link className="underline" to="/shop">
                Shop
              </Link>{" "}
              page to find exclusive and unique clothes you may like.
            </p>
            <button className="primary-button primary-button--big">
              <Link to="/shop">Go to shop</Link>
            </button>
          </div>
        ) : (
          <div className="clothes-block grid-items-layout">
            {this.state.clothes.map(item => {
              return (
                <ClothesItem user={this.props.user} item={item} key={item.id} />
              );
            })}
          </div>
        )}
      </div>
    );
  }
}

UserFavouritesContainer.propTypes = {
  user: PropTypes.object.isRequired
};

export default withRouter(UserFavouritesContainer);
