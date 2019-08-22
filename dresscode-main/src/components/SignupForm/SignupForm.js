import React, { Component } from "react";
import TextInput from "../TextInput/TextInput";
import { withRouter } from "react-router-dom";
import Loader from "../../utils/Loader";
import axios from "axios";
import { UserContext } from "../../contexts/UserContext";
import PropTypes from "prop-types";

class SignupForm extends Component {
  state = {
    Email: "",
    Password: "",
    ConfirmPassword: "",
    FirstName: "",
    LastName: "",
    isLoading: false,
    errors: {
      firstNameError: "",
      lastNameError: "",
      emailError: "",
      passwordError: "",
      confirmPasswordError: "",
      message: ""
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({
      isLoading: true
    });
    axios
      .post("/signUp", {
        email: this.state.Email,
        password: this.state.Password,
        confirmPassword: this.state.ConfirmPassword,
        firstName: this.state.FirstName,
        lastName: this.state.LastName
      })
      .then(data => {
        localStorage.setItem("token", data.data.token);
        this.props.user.authenticateUser(data.data.token);
        this.props.history.push("/");
      })
      .catch(e => {
        this.setState({
          errors: e.response.data
        });

        if (e.response.data.message) {
          this.setState({
            message: e.response.data.message
          });
        }

        this.setState({
          isLoading: false
        });
      });
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };
  render() {
    const {
      Email,
      Password,
      ConfirmPassword,
      FirstName,
      LastName
    } = this.state;
    const {
      firstNameError,
      confirmPasswordError,
      lastNameError,
      passwordError,
      emailError
    } = this.state.errors;
    return this.state.isLoading ? (
      <div className="add-margin">
        <Loader />
      </div>
    ) : (
      <div className="form-container row">
        <p className="text-center">
          If you don’t have an account we’ll create one for you.
        </p>
        <form className="auth-form">
          <TextInput
            handleChange={this.handleChange}
            value={Email}
            place="Email adress"
            name="Email"
            type="text"
            error={emailError}
          />

          <TextInput
            handleChange={this.handleChange}
            value={FirstName}
            place="First name"
            name="FirstName"
            type="text"
            error={firstNameError}
          />

          <TextInput
            handleChange={this.handleChange}
            value={LastName}
            place="Last name"
            name="LastName"
            type="text"
            error={lastNameError}
          />

          <TextInput
            handleChange={this.handleChange}
            value={Password}
            place="Password"
            name="Password"
            type="password"
            error={passwordError}
          />

          <TextInput
            handleChange={this.handleChange}
            value={ConfirmPassword}
            place="Confirm password"
            name="ConfirmPassword"
            type="password"
            error={confirmPasswordError}
          />
          {this.state.errors.message ? (
            <p>{this.state.errors.message}</p>
          ) : null}
          <button
            onClick={this.handleSubmit}
            className="primary-button primary-button--big"
          >
            Signup
          </button>
          <p className="register-info">
            By creating an account,
            <br />I accept Dresscode's <strong>
              Terms of Services
            </strong> and <strong>Privacy Policy.</strong>
          </p>
        </form>
      </div>
    );
  }
}

SignupForm.propTypes = {
  user: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default withRouter(
  React.forwardRef((props, ref) => (
    <UserContext.Consumer>
      {user => <SignupForm {...props} user={user} ref={ref} />}
    </UserContext.Consumer>
  ))
);
