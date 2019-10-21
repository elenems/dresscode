import { shallow } from "enzyme";
import React from "react";
import { UserContainer } from "./UserContainer";
import Loader from "../../utils/Loader";
// ItemsList/ListItem/ListItem";
import ClothesItem from '../ItemsList/ListItem/ListItem';
describe("UserContainer", () => {
  const props = {
    user: {
      firstName: "Bill",
      lastName: "Johnson"
    },
    match: {
      params: {
        id: 1
      }
    }
  };
  it("Matches snapshot", () => {
    const wrapper = shallow(<UserContainer {...props} />).debug();
    expect(wrapper).toMatchSnapshot();
  });

  it("Show loader while laoding", () => {
    const wrapper = shallow(<UserContainer {...props} />);
    expect(wrapper.find(Loader).length).toBe(1);
  });

  it("Shows message", () => {
    const wrapper = shallow(<UserContainer {...props} />);
    wrapper.setState({ isLoading: false, message: "message" });
    expect(wrapper.find(".message").text()).toBe("message");
  });

  it("Shows user info if no message", () => {
    const wrapper = shallow(<UserContainer {...props} />);
    wrapper.setState({
      isLoading: false,
      user: { firstName: "bill", lastName: "Johnson", userId:"ids" }
    });
    expect(wrapper.find(".user-info").length).toBe(1);
  });

  it("Shows ClothesItem", ()=>{
    const wrapper = shallow(<UserContainer {...props} />);
    wrapper.setState({
        isLoading: false,
        user: { firstName: "bill", lastName: "Johnson", userId:"ids" },
        userClothes:[{id:1}]
      });
      expect(wrapper.find(ClothesItem).length).toBe(1)
  })
});
