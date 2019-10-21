import React, {Fragment} from "react";
import { shallow } from "enzyme";
import PostComments from "./PostComments";

describe("PostComments", () => {
  it("Matches snapshot", () => {
    const wrapper = shallow(<PostComments />).debug();
    expect(wrapper).toMatchSnapshot();
  });

  it("post-comment-form contains textarea and button", () => {
    const props = {
        commentText:'text',
        addComment:()=>{},
        handleChange:()=>{}
    }
    const wrapper = shallow(<PostComments {...props}/>);
    expect(wrapper.findWhere(n=>n.hasClass('post-comment-form')).children().get(0).type).toBe('textarea');
    expect(wrapper.findWhere(n=>n.hasClass('post-comment-form')).children().get(1).type).toBe('button');

  });
});
