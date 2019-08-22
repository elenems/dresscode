import React, { PureComponent } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import Icon from "../../utils/Icon";
import PropTypes from "prop-types";

const res = {
  0: {
    items: 1
  },
  500: {
    items: 2
  },
  768:{
    items: 3
  },
  1024: {
    items: 4
  },
  1920: {
    items: 5
  }
};

class Slider extends PureComponent {
  state = {
    currentIndex: 0
  };

  onSlideChanged = e => this.setState({ currentIndex: e.item });

  slideNext = () =>
    this.setState({ currentIndex: this.state.currentIndex + 1 });

  slidePrev = () =>
    this.setState({ currentIndex: this.state.currentIndex - 1 });

  render() {
    return this.props.items.length ? (
      <div style={{ position: "relative" }}>
        <AliceCarousel
          items={this.props.items}
          buttonsDisabled={true}
          dotsDisabled={true}
          onSlideChanged={this.onSlideChanged}
          slideToIndex={this.state.currentIndex}
          responsive={res}
          mouseDragEnabled
        />
        <div className="alice-carousel__prev-btn">
          <button
            className="alice-carousel__prev-btn-wrapper"
            onClick={() => this.slidePrev()}
          >
            <Icon color="white" name="left-arrow" />
          </button>
        </div>

        <div className="alice-carousel__next-btn">
          <button
            className="alice-carousel__next-btn-wrapper"
            onClick={() => this.slideNext()}
          >
            <Icon color="white" name="right-arrow" />
          </button>
        </div>
      </div>
    ) : null;
  }
}

Slider.propTypes = {
  items: PropTypes.array
};

export default Slider;
