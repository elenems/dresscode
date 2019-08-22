import React from "react";
import TextInput from "../../TextInput/TextInput";
import Select from "../../Select/Select";
import PropTypes from "prop-types";

const conditionOptions = [
  { value: "New", label: "New" },
  { value: "Perfect", label: "Perfect" },
  { value: "Good", label: "Good" },
  { value: "Average", label: "Average" },
  { value: "All", label: "All" }
];
function Filters(props) {
  return (
    <div className="filters">
      <div className="filter">
        <div className="input-block">
          <TextInput
            handleChange={props.handleChange}
            type="text"
            place="Clothes brand"
            value={props.filters.Brand}
            name="Brand"
          />
        </div>
        <div className="input-block">
          <Select
            label="Choose a condition"
            value={props.condition}
            handleChange={props.handleConditionChange}
            options={conditionOptions}
          />
        </div>
        <div className="input-block">
          <div className="multiple-filters-in-row">
            <TextInput
              handleChange={props.handleChange}
              type="text"
              place="$0"
              value={props.filters.PriceFrom}
              name="From"
            />
            <TextInput
              handleChange={props.handleChange}
              type="text"
              place="$500"
              value={props.filters.PriceTo}
              name="To"
            />
          </div>
        </div>
        <div className="input-block">
          <TextInput
            handleChange={props.handleChange}
            type="text"
            place="Clothes size"
            value={props.filters.Size}
            name="Size"
          />
        </div>
      </div>
    </div>
  );
}

Filters.propTypes = {
  handleChange: PropTypes.func.isRequired,
  filters: PropTypes.object.isRequired,
  handleConditionChange: PropTypes.func.isRequired,
  condition: PropTypes.object
};

export default React.memo(Filters);
