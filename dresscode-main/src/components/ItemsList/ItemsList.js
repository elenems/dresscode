import React, { Component } from "react";
import axios from "axios";
import ListItem from "./ListItem/ListItem";
import PropTypes from "prop-types";
import Slider from "../Slider/Slider";
export default class ItemsList extends Component {
  state = {
    items: []
  };

  componentDidMount() {
    const { limit, fetchLink } = this.props;
    axios
      .get(`${fetchLink}?limit=${limit}`)
      .then(data => {
        this.setState({ items: data.data.items });
      })
  }

  render() {
    const items = this.state.items.map(item => {
      return <ListItem user={this.props.user} key={item.id} item={item} />;
    });

    return (
      <div className="items-list">
        <Slider items={items} />
      </div>
    );
  }
}

ItemsList.propTypes = {
  limit: PropTypes.number.isRequired,
  fetchLink: PropTypes.string.isRequired
};
