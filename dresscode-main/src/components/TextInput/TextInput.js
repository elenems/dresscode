import React from "react";
import PropTypes from "prop-types";
function TextInput(props) {
  const { name, place, value, handleChange, type, error, required } = props;
  const inputStyle = error
    ? { borderColor: "#d0021b" }
    : { borderColor: "#b1b1b1" };
  return (
    <div className="input-container">
      {required === false ? (
        <label className="required" htmlFor={name}>
          {name}
        </label>
      ) : (
        <label htmlFor={name}>{name}</label>
      )}
      <input
        style={inputStyle}
        onChange={handleChange}
        id={name}
        type={type}
        value={value}
        placeholder={place}
      />
      {error ? <span className="error">{error}</span> : null}
    </div>
  );
}

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  place: PropTypes.string.isRequired,
  value: PropTypes.string,
  text: PropTypes.string,
  error: PropTypes.string,
  handleChange: PropTypes.func.isRequired
};

export default React.memo(TextInput);
