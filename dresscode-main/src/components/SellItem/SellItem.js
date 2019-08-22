import React, { Component } from "react";
import axios from "axios";
import TextInput from "../TextInput/TextInput";
import Select from "../Select/Select";
import PropTypes from "prop-types";

const conditionOptions = [
  { value: "New", label: "New" },
  { value: "Perfect", label: "Perfect" },
  { value: "Good", label: "Good" },
  { value: "Average", label: "Average" }
];

const categoryOptions = [
  { value: "Tops", label: "Tops" },
  { value: "Bottoms", label: "Bottoms" },
  { value: "Outwear", label: "Outwear" },
  { value: "Boots", label: "Boots" },
  { value: "Sneakers", label: "Sneakers" },
  { value: "Hats", label: "Hats" },
  { value: "Accessories", label: "Accessories" }
];
const MAX_FILE_SIZE = 3000 * 1048; // 3MB
// description, price, category, title, condition, | brand, views, addedDate, likes, addedBy, comments
class SellItem extends Component {
  state = {
    Price: "0",
    Condition: { value: "New", label: "New" },
    Description: "",
    Category: { value: "Tops", label: "Tops" },
    Title: "",
    Brand: "",
    Size: "",
    fileMessage: "",
    statusInfo: "",
    statusColor: "",
    selectedFile: null,
    errors: {
      titleError: "",
      brandError: "",
      conditionError: "",
      categoryError: ""
    }
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  onChangeHandler = event => {
    this.setState({
      selectedFile: event.target.files[0],
      message: ""
    });
  };

  onClickHandler = e => {
    e.preventDefault();
    if (this.state.selectedFile === null) {
      this.setState({
        fileMessage: "Please choose a photo"
      });
    } else {
      this.setState({
        fileMessage: ""
      });
      if (this.state.selectedFile.size > MAX_FILE_SIZE) {
        this.setState({ fileMessage: "File to big" });
      } else if (
        this.state.selectedFile.type === "image/jpeg" ||
        this.state.selectedFile === "image/png"
      ) {
        const data = new FormData();
        data.append("file", this.state.selectedFile);
        const {
          Title,
          Brand,
          Description,
          Price,
          Condition,
          Category,
          Size
        } = this.state;
        const link = `/addClothes?title=${Title}&addedBy=${
          this.props.user.user.userId
        }&size=${Size}&brand=${Brand}&description=${Description}&price=${Price}&condition=${
          Condition.value
        }&category=${Category.value}`;
        axios
          .post(link, data)
          .then(data => {
            window.scrollTo({
              top: 0,
              left: 0,
              behavior: "smooth"
            });
            this.setState({
              fileMessage: "",
              statusColor: "#19b719",
              statusInfo: "Successfuly added. You are free to add a new one.",
              Price: "0",
              Condition: { value: "new", label: "New" },
              Description: "",
              Category: { value: "tops", label: "Tops" },
              Title: "",
              Brand: "",
              Size: "",
              selectedFile: null,
              errors: {
                titleError: "",
                brandError: "",
                conditionError: "",
                categoryError: ""
              }
            });
            document.getElementById("sell-form").reset();
            setTimeout(() => {
              this.setState({ statusInfo: "" });
            }, 3000);
          })
          .catch(e => {
            window.scrollTo({
              top: 0,
              left: 0,
              behavior: "smooth"
            });
            this.setState({
              errors: e.response.data.errors,
              statusColor: "#de3650",
              statusInfo: "Error adding new clothes"
            });
            setTimeout(() => {
              this.setState({ statusInfo: "" });
            }, 3000);
          });
      } else {
        this.setState({ fileMessage: "Upload image with jpg/png type" });
      }
    }
  };

  handleCategoryChange = selectedOption => {
    this.setState({ Category: selectedOption });
  };

  handleConditionChange = selectedOption => {
    this.setState({ Condition: selectedOption });
  };

  render() {
    return (
      <div className="sell-item-block row">
        <div className="module">
          {this.state.statusInfo ? (
            <p className="message" style={{ color: this.state.statusColor }}>
              {this.state.statusInfo}
            </p>
          ) : null}
          <h1 className="text-center">Add a new listing</h1>
          <form id="sell-form" className="sell-form">
            <TextInput
              handleChange={this.handleChange}
              value={this.state.Title}
              place="Clothes title"
              name="Title"
              type="text"
              error={this.state.errors.titleError}
            />

            <TextInput
              handleChange={this.handleChange}
              value={this.state.Brand}
              place="Enter clothes brand"
              name="Brand"
              type="text"
              error={this.state.errors.brandError}
            />

            <TextInput
              handleChange={this.handleChange}
              value={this.state.Price}
              place="Enter price $"
              name="Price"
              type="text"
              error=""
            />

            <TextInput
              handleChange={this.handleChange}
              value={this.state.Size}
              place="Enter size"
              name="Size"
              type="text"
              error=""
            />

            <div className="input-container">
              <Select
                label="Clothes condition"
                value={this.state.Condition}
                handleChange={this.handleConditionChange}
                options={conditionOptions}
              />
            </div>

            <div className="input-container">
              <Select
                label="Choose a category"
                value={this.state.Category}
                handleChange={this.handleCategoryChange}
                options={categoryOptions}
              />
            </div>

            <div className="input-container">
              <textarea
                onChange={this.handleChange}
                value={this.state.Description}
                id="Description"
                placeholder="Description"
              />
            </div>

            <div className="input-container">
              <span className="label">Choose a photo</span>
              <input type="file" name="file" onChange={this.onChangeHandler} />
              <p style={{ color: "red" }}>{this.state.fileMessage}</p>
            </div>

            <button
              onClick={this.onClickHandler}
              className="primary-button primary-button--big"
            >
              Add
            </button>
          </form>
        </div>
      </div>
    );
  }
}

SellItem.propTypes = {
  user: PropTypes.object
};

export default SellItem;
