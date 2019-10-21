import { shallow } from "enzyme";
import React from "react";
import TextInput from "./TextInput";

describe("TextInput", () => {
  const props = {
    name: "title",
    place: "title",
    value: "",
    handleChange: () => {},
    type: "text",
    error: "",
    required: true
  };
  it("Matches snapshot", () => {
    const wrapper = shallow(<TextInput {...props} />).debug();
    expect(wrapper).toMatchSnapshot();
  });

  it("Shows error on provided error", () => {
    props.error = "Error";
    const wrapper = shallow(<TextInput {...props} />);
    expect(wrapper.find(".error").text()).toBe("Error");
  });

  it("Shows label if required", () => {
    props.required = false;
    const wrapper = shallow(<TextInput {...props} />);
    expect(
      wrapper.contains(
        <label className="required" htmlFor={props.name}>
          {props.name}
        </label>
      )
    ).toBe(true);
  });
});
