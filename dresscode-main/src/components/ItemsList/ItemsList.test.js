import { shallow } from "enzyme";
import React from "react";
import ItemsList from "./ItemsList";
import Slider from "../Slider/Slider";

describe("ItemsList", () => {
  const apiLink = "https://europe-west2-dresscode-691e5.cloudfunctions.net/api";
  const props = {
    limit: 5,
    fetchLink: `${apiLink}/getPopularClothes`,
    user: {}
  };

  it("Matches snapshot", () => {
    const wrapper = shallow(<ItemsList {...props} />).debug();
    expect(wrapper).toMatchSnapshot();
  });

  it("Renders atleast one Item if state has items", () => {
    const wrapper = shallow(<ItemsList {...props} />);
    wrapper.setState({
      items: [{ id: 1 }]
    });
    expect(wrapper.find(Slider).prop("items").length).toBeGreaterThan(0);
  });

  it("Sets received data from server", async () => {
    const wrapper = shallow(<ItemsList {...props} />);
    await wrapper.instance().componentDidMount();
    expect(wrapper.state("items").length).toBeGreaterThan(0);
  });
});
