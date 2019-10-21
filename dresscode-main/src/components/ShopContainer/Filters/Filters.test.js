import { shallow } from "enzyme";
import React from "react";
import Filters from "./Filters";
import TextInput from "../../TextInput/TextInput";
import Select from "../../Select/Select";

describe("Filters", () => {
  const props = {
    filters: {
      Brand: "Adidas"
    }
  };
  it("Matches snapshot", () => {
    const wrapper = shallow(<Filters {...props} />).debug();
    expect(wrapper).toMatchSnapshot();
  });

  it("Renders 4 TextInputs", () => {
    const wrapper = shallow(<Filters {...props} />);
    expect(wrapper.find(TextInput).length).toBe(4);
  });

  it("Renders 1 Select", () => {
    const wrapper = shallow(<Filters {...props} />);
    expect(wrapper.find(Select).length).toBe(1);
  });
});
