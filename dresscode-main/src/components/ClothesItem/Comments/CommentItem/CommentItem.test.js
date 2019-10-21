import { shallow } from "enzyme";
import React from "react";
import CommentItem from "./CommentItem";

describe("CommentItem", () => {
  const props = {
    comment: {
      commenterId: "19wa28asd182s",
      commenterLastName: "Bill",
      commenterName: "Loid",
      commentText: "Give me some text",
      postedAt: "20-10-2019"
    }
  };
  it("Matches snapshot", () => {
    const wrapper = shallow(<CommentItem {...props} />).debug();
    expect(wrapper).toMatchSnapshot();
  });
});
