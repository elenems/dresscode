import { shallow } from "enzyme";
import React from "react";
import ChatMessage from "./ChatMessage";

describe("ChatMessage", () => {
  const props = {
    userId: "reveiver",
    message: {
      sender: "sender",
      postedAt: "10-10-2019",
      messageText: "Message text"
    }
  };
  it("Matches snapshot", () => {
    const wrapper = shallow(<ChatMessage {...props} />).debug();
    expect(wrapper).toMatchSnapshot();
  });

  it("Shows from you message if sender equals userId", () => {
    props.userId = "sender";
    const wrapper = shallow(<ChatMessage {...props} />);
    expect(wrapper.find(".chat-message-messager").text()).toBe("From you");
  });

  it("Shows message", () => {
    const wrapper = shallow(<ChatMessage {...props} />);
    expect(wrapper.find("p.chat-message-text").text()).toBe(
      props.message.messageText
    );
  });
});
