import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Filters from "./Filters/Filters";
import axios from "axios";
import Loader from "../../utils/Loader";
import ListItem from "../ItemsList/ListItem/ListItem";
import { UserContext } from "../../contexts/UserContext";

class ShopContainer extends Component {
  state = {
    clothes: false,
    isLoading: true,
    category: "",
    title: null,
    filters: {
      Size: "",
      From: "",
      To: "",
      Brand: ""
    },
    Condition: { value: "All", label: "Select" }
  };
  handleConditionChange = selectedOption => {
    this.setState({ Condition: selectedOption }, () => this.handleSubmit());
  };

  handleFiltersChange = e => {
    this.setState({
      filters: {
        ...this.state.filters,
        [e.target.id]: e.target.value
      }
    });
  };

  handleSubmit = () => {
    this.getClothesFromQuery();
  };

  getClothesFromQuery = () => {
    this.setState({
      isLoading: true
    });
    axios
      .post("/getClothesFromQuery", {
        from: this.state.filters.From,
        to: this.state.filters.To,
        category: this.state.category,
        brand: this.state.filters.Brand,
        title: this.state.title,
        size: this.state.filters.Size,
        condition: this.state.Condition.value
      })
      .then(data => {
        this.setState(
          {
            clothes: data.data.clothes,
            isLoading: false
          },
          () => {
            window.scrollTo({
              top: 0,
              left: 0,
              behavior: "smooth"
            });
          }
        );
      })
      .catch(e => {
        this.setState({ isLoading: false });
      });
  };

  componentDidMount() {
    window.setTitle = title => {
      this.setState(
        {
          title
        },
        () => {
          this.getClothesFromQuery();
        }
      );
    };

    window.setCategory = category => {
      this.setState(
        {
          category
        },
        () => {
          this.getClothesFromQuery();
        }
      );
    };

    document
      .getElementById("Brand")
      .addEventListener("focusout", () => this.handleSubmit());
    document
      .getElementById("To")
      .addEventListener("focusout", () => this.handleSubmit());
    document
      .getElementById("Size")
      .addEventListener("focusout", () => this.handleSubmit());
    document
      .getElementById("From")
      .addEventListener("focusout", () => this.handleSubmit());

    if (!this.props.location.search) {
      this.setState({ category: "all" }, this.getClothesFromQuery());
    } else {
      const search = this.props.location.search;
      const category = search.match(/category=\w+/)[0].slice(9);
      let title = search.match(/title=[\w\d% ]+/);
      if (title) {
        title = title[0].slice(6);
        title = title.replace(/%20/g, " ");
      }
      this.setState(
        {
          category,
          title
        },
        () => {
          this.getClothesFromQuery();
        }
      );
    }
  }

  render() {
    return (
      <div className="shop-container row">
        <Filters
          handleConditionChange={this.handleConditionChange}
          condition={this.state.Condition}
          handleChange={this.handleFiltersChange}
          filters={this.state.filters}
        />
        {this.state.isLoading ? (
          <Loader />
        ) : (
          <UserContext.Consumer>
            {user => (
              <div className="shop-items">
                {this.state.clothes.length ? (
                  this.state.clothes.map(item => {
                    return <ListItem key={item.id} user={user} item={item} />;
                  })
                ) : (
                  <p>Can't find clothes with selected fields.</p>
                )}
              </div>
            )}
          </UserContext.Consumer>
        )}
        <div />
      </div>
    );
  }
}

export default withRouter(ShopContainer);
