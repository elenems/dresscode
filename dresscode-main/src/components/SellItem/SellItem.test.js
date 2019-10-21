import React from "react";
import { shallow } from "enzyme";
import SellItem from "./SellItem";
import axios from 'axios';
describe("SellItem", () => {
  beforeAll(()=>{
    axios.defaults.baseURL =
    "https://europe-west2-dresscode-691e5.cloudfunctions.net/api";
  })
  const props = {
    user: {
      user: {
        userId: 'NMkib9WrLZBjSOFl6jSG'
      }
    }
  };

  it("Matches snapshot", () => {
    const wrapper = shallow(<SellItem {...props} />).debug();
    expect(wrapper).toMatchSnapshot();
  });

  it("Shows status info", () => {
    const wrapper = shallow(<SellItem {...props} />);
    wrapper.setState({
      statusInfo: "success",
      statusColor: "#fff"
    });
    expect(wrapper.find(".message").text()).toBe("success");
    expect(wrapper.find(".message").prop("style")).toEqual({
      color: "#fff"
    });
  });

  it("Changes condition", () => {
    const wrapper = shallow(<SellItem {...props} />);
    wrapper.instance().handleConditionChange("new");
    expect(wrapper.state("Condition")).toBe("new");
  });

  it("Changes category", () => {
    const wrapper = shallow(<SellItem {...props} />);
    wrapper.instance().handleCategoryChange("boots");
    expect(wrapper.state("Category")).toBe("boots");
  });

  it("Handles changes", () => {
    const event = {
      target: {
        id: "Size",
        value: "L"
      }
    };
    const wrapper = shallow(<SellItem {...props} />);
    wrapper.instance().handleChange(event);
    expect(wrapper.state("Size")).toBe("L");
  });

  it("Handles file change", () => {
    const event = {
      target: {
        files: [{ name: "image" }]
      }
    };
    const wrapper = shallow(<SellItem {...props} />);
    wrapper.instance().onChangeHandler(event);
    expect(wrapper.state("selectedFile")).toEqual({ name: "image" });
  });

  it("Handles onClick", () => {
    const mock = jest.fn();
    const event = {
      preventDefault: () => {
        mock();
      }
    };
    const wrapper = shallow(<SellItem {...props} />);
    wrapper.instance().onClickHandler(event);
    expect(mock).toHaveBeenCalled();
  });

  it("Adds file message if image is null", () => {
    const event = { preventDefault: () => {} };
    const wrapper = shallow(<SellItem {...props} />);
    wrapper.instance().onClickHandler(event);
    expect(wrapper.state("fileMessage")).toBe("Please choose a photo");
  });

  it("Add file message if image size is to big", () => {
    const event = { preventDefault: () => {} };
    const wrapper = shallow(<SellItem {...props} />);
    const file = {
      size: 3000123123123
    };
    wrapper.setState({
      selectedFile: file
    });
    wrapper.instance().onClickHandler(event);
    expect(wrapper.state("fileMessage")).toBe("File to big");
  });

  it("Add file message if image type is wrong", () => {
    const event = { preventDefault: () => {} };
    const wrapper = shallow(<SellItem {...props} />);
    const file = {
      size: 30001,
      type:'wrong type'
    };
    wrapper.setState({
      selectedFile: file
    });
    wrapper.instance().onClickHandler(event);
    expect(wrapper.state("fileMessage")).toBe("Upload image with jpg/png type");
  });

//   it("", async () => {
//     const event = { preventDefault: () => {} };
//     const wrapper = shallow(<SellItem {...props} />);
//     window.scrollTo=()=>{}
//     console.log(new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png', size:23 }))
//     wrapper.findWhere(n=>n.prop('type') === 'file').simulate('change', {
//         target: {
//            files: [
//             new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png', size:23 })
//            ]   
//         }
//       });
//     const data = await wrapper.instance().onClickHandler(event);
//     // expect(wrapper.state("fileMessage")).toBe("Upload image with jpg/png type");
//   });
});
