import React from "react";
import { shallow } from "enzyme";
import Slider from "./Slider";

describe("Slider", () => {
  let props;
  beforeEach(() => {
    props = {
      items: [{}]
    };
  });
  it("Mathces snapshot", () => {
    const wrapper = shallow(<Slider {...props} />).debug();
    expect(wrapper).toMatchSnapshot();
  });

  it("Changes index on slide change", () => {
    const e = {
      item: 1
    };
    const wrapper = shallow(<Slider {...props} />);
    wrapper.instance().onSlideChanged(e);
    expect(wrapper.state().currentIndex).toEqual(1);
  });

  it("Increments index on next slide", () => {
    const wrapper = shallow(<Slider {...props} />);
    wrapper.instance().slideNext();
    expect(wrapper.state().currentIndex).toBe(1);
  });

  it("Decrements index on prev slide", () => {
    const wrapper = shallow(<Slider {...props} />);
    wrapper.instance().slidePrev();
    expect(wrapper.state().currentIndex).toBe(-1);
  });

  it("Renders nothing if items missing", () => {
    props.items = [];
    const wrapper = shallow(<Slider {...props} />);
    expect(wrapper.get(0)).toBe(null);
  });

  it("Can clicks slidePrev", () => {
    const wrapper = shallow(<Slider {...props} />);
    const index = wrapper.state("currentIndex");
    wrapper
      .find(".alice-carousel__prev-btn")
      .children("button")
      .simulate("click");
    expect(wrapper.state("currentIndex")).toBe(index - 1);
  });

  it("Can clicks slideNext", () => {
    const wrapper = shallow(<Slider {...props} />);
    const index = wrapper.state("currentIndex");
    wrapper
      .find(".alice-carousel__next-btn")
      .children("button")
      .simulate("click");
    expect(wrapper.state("currentIndex")).toBe(index + 1);
  });
});
