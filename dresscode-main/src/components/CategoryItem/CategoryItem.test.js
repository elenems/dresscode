import { shallow } from "enzyme";
import React from "react";
import CategoryItem from "./CategoryItem";

describe("CategoryItem", () => {
  const props = {
    categoryName: "Shoes"
  };
  it("Matches snapshot", () => {
    const wrapper = shallow(<CategoryItem />).debug();
    expect(wrapper).toMatchSnapshot();
  });

  it("Shows category name in paragraph", () => {
    const wrapper = shallow(<CategoryItem {...props} />);
    expect(wrapper.find("p").text()).toBe(props.categoryName);
  });

  it("img has alt attribute", () => {
    const wrapper = shallow(<CategoryItem {...props} />);
    expect(wrapper.find('img').prop('alt')).toBe(props.categoryName)
  });
});
