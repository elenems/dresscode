import React, { Component } from "react";
import axios from "axios";
import { Link, withRouter } from "react-router-dom";
import ClothesItem from "../../ItemsList/ListItem/ListItem";
import Loader from "../../../utils/Loader";
import PropTypes from "prop-types";

class UserClothesContainer extends Component {
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
        .get(`getUserClothes/?userId=${this.props.user.user.userId}`)
        .then(data => {
          this.setState({
            clothes: data.data.clothes,
            isLoading: false
          });
        });
    }
  }

  componentDidMount() {
    if (this.state.clothes === null && this.props.user.isAuthenticated) {
      axios
        .get(`getUserClothes/?userId=${this.props.user.user.userId}`)
        .then(data => {
          this.setState({
            clothes: data.data.clothes,
            isLoading: false
          });
        });
    }
  }
  // #de3650  #19b719
  handleClick = id => {
    console.log(id);
    axios
      .post("/removeClothes", { clothesId: id })
      .then(data => {
        const newItems = this.state.clothes.filter(item => {
          return item.id !== id;
        });
        this.setState({
          status: {
            message: data.data.message,
            color: "#19b719"
          },
          clothes: newItems
        });
        setTimeout(() => {
          this.setState({
            status: { message: "", color: "#000" }
          });
        }, 2000);
      })
      .catch(e => {
        this.setState({
          status: {
            message: e.response.data.message,
            color: "#de3650"
          }
        });
        setTimeout(() => {
          this.setState({
            status: { message: "", color: "#000" }
          });
        }, 2000);
      });
  };

  render() {
    return (
      <div className="profile-clothes">
        {this.state.status.message.length ? (
          <p style={{ color: "green" }} className="message">
            {this.state.status.message}
          </p>
        ) : null}

        <h2>Your clothes</h2>
        {this.state.isLoading ? (
          <Loader />
        ) : !this.state.clothes ? (
          <div className="clothes-block">
            <h4>You have no items for sale.</h4>
            <p style={{ marginTop: "10px" }}>
              Visit our{" "}
              <Link className="underline" to="/sell">
                Sell
              </Link>{" "}
              page to post your items and turn your closet into cash!
            </p>
            <button className="primary-button primary-button--big">
              <Link to="/sell">Start selling</Link>
            </button>
          </div>
        ) : (
          <div className="clothes-block grid-items-layout">
            {this.state.clothes.map(item => {
              return (
                <div key={item.id}>
                  <ClothesItem user={this.props.user} item={item} />
                  <div className="items-list__bottom-section">
                    <span>Views: {item.views}</span>
                    <span>Likes: {item.likesCount}</span>
                  </div>
                  <button
                    onClick={() => {
                      this.handleClick(item.id);
                    }}
                    className="stretch primary-button primary-button--big"
                  >
                    delete
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }
}

UserClothesContainer.propTypes = {
  user: PropTypes.object.isRequired
};

export default withRouter(UserClothesContainer);
