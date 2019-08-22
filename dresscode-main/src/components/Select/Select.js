import ReactSelect from "react-select";
import React from "react";
import PropTypes from "prop-types";

function Select(props) {
  return (
    <div className="select">
      <span className="label-style">{props.label}</span>
      <ReactSelect
        value={props.value}
        onChange={props.handleChange}
        options={props.options}
      />
    </div>
  );
}

Select.propTypes = {
  handleChange: PropTypes.func.isRequired,
  options: PropTypes.array,
  label: PropTypes.string
};

export default React.memo(Select);
