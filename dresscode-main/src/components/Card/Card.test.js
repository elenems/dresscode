import { shallow } from "enzyme";
import React from "react";
import Card from "./Card";

describe("Card", () => {
  const props = {
    link: "link",
    name: "name"
  };
  it("Matches snapshot", () => {
    const wrapper = shallow(<Card {...props} />).debug();
    expect(wrapper).toMatchSnapshot();
  });

  it("Has container with class card", () => {
    const wrapper = shallow(<Card {...props} />);
    expect(wrapper.findWhere(n => n.hasClass("card")).length).toBe(1);
  });

  it("Link has path delivered from props", () => {
    const wrapper = shallow(<Card {...props} />);
    expect(wrapper.find("Link").prop("to")).toBe(props.link);
  });
});
