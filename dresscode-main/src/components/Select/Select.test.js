import React from "react";
import { shallow } from "enzyme";
import Select from "./Select";

describe("Select", () => {
  const props = {
    label: "condition",
    value: "new",
    handleChange: () => {},
    options: []
  };
  it("Matches snapshot", () => {
    const wrapper = shallow(<Select {...props} />).debug();
    expect(wrapper).toMatchSnapshot();
  });
});
