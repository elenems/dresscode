import React, { useState, useEffect } from "react";
import TextInput from "../../TextInput/TextInput";
import axios from "axios";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

function SettingsForm(props) {
  const [Firstname, setFirstname] = useState("");
  const [Lastname, setLastname] = useState("");
  const [Location, setLocation] = useState("");
  const [Email, setEmail] = useState("");
  const [errors, setErrors] = useState({
    firstNameError: "",
    lastNameError: "",
    locationError: ""
  });
  const [statusColor, setStatusColor] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (props.user.isAuthenticated) {
      setFirstname(props.user.user.firstName);
      setLastname(props.user.user.lastName);
      setEmail(props.user.user.email);
      setLocation(props.user.user.location);
    }
  }, [props.user.isAuthenticated]);

  const handleFirstNameChange = e => {
    setFirstname(e.target.value);
  };

  const handleLastNameChange = e => {
    setLastname(e.target.value);
  };

  const handleLocationChange = e => {
    setLocation(e.target.value);
  };

  const handleSignout = e => {
    props.user.unauthenticateUser(localStorage.getItem("token"));
    props.history.push("/");
  };

  const handleSubmit = e => {
    e.preventDefault();

    axios
      .post("/changeUserInfo", {
        userId: props.user.user.id,
        firstName: Firstname,
        lastName: Lastname,
        location: Location
      })
      .then(() => {
        setMessage("Profile updated successfuly");
        setTimeout(() => {
          setMessage("");
        }, 3000);
        setStatusColor("#19b719");
        setErrors({
          firstNameError: "",
          lastNameError: "",
          locationError: ""
        });
      })
      .catch(e => {
        setMessage("Error updating a profile");
        setTimeout(() => {
          setMessage("");
        }, 3000);
        setStatusColor("#de3650");
        setErrors({
          ...errors,
          ...e.response.data
        });
      });
  };

  return (
    <div>
      {message.length ? (
        <p style={{ color: statusColor }} className="message">
          {message}
        </p>
      ) : null}
      <h2>Edit your info</h2>
      <form className="edit-form">
        <TextInput
          required="false"
          name="Firstname"
          place="Firstname"
          value={Firstname}
          handleChange={handleFirstNameChange}
          type="text"
          error={errors.firstNameError}
        />

        <TextInput
          required="false"
          name="Lastname"
          place="Lastname"
          value={Lastname}
          handleChange={handleLastNameChange}
          type="text"
          error={errors.lastNameError}
        />

        <TextInput
          required="false"
          name="Location"
          place="Your location"
          value={Location}
          handleChange={handleLocationChange}
          type="text"
          error={errors.locationError}
        />
        <div>
          <span className="label-style">Email</span>
          <p className="disabled-input-text">{Email}</p>
        </div>
        <button
          className="primary-button primary-button--big"
          onClick={handleSubmit}
        >
          Edit
        </button>
        <button
          className="primary-button primary-button--big"
          onClick={handleSignout}
        >
          Signout
        </button>
      </form>
    </div>
  );
}

SettingsForm.propTypes = {
  user: PropTypes.object.isRequired
};

export default withRouter(SettingsForm);
