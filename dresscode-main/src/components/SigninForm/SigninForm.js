import React, { Component } from "react";
import TextInput from "../TextInput/TextInput";
import { withRouter } from "react-router-dom";
import Loader from "../../utils/Loader";
import axios from "axios";
import { UserContext } from "../../contexts/UserContext";
import PropTypes from "prop-types";

class SigninForm extends Component {
  state = {
    Email: "",
    Password: "",
    isLoading: false,
    errors: {
      emailError: "",
      passwordError: "",
      message: ""
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({
      isLoading: true
    });
    axios
      .post("/signIn", {
        email: this.state.Email,
        password: this.state.Password
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
    const { Email, Password } = this.state;

    const { passwordError, emailError } = this.state.errors;

    return this.state.isLoading ? (
      <div className="add-margin">
        <Loader />
      </div>
    ) : (
      <div className="form-container">
        <p className="text-center">Sign in to your profile</p>
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
            value={Password}
            place="Password"
            name="Password"
            type="password"
            error={passwordError}
          />

          {this.state.errors.message ? (
            <p>{this.state.errors.message}</p>
          ) : null}
          <button
            onClick={this.handleSubmit}
            className="primary-button primary-button--big"
          >
            Signin
          </button>
        </form>
      </div>
    );
  }
}

SigninForm.propTypes = {
  user: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default withRouter(
  React.forwardRef((props, ref) => (
    <UserContext.Consumer>
      {user => <SigninForm {...props} user={user} ref={ref} />}
    </UserContext.Consumer>
  ))
);
