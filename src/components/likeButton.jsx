import React, { Component } from "react";

class LikeButton extends Component {
  getHeartIcon = liked => {
    if (liked) {
      return <i className="fa fa-heart" aria-hidden="true"></i>;
    } else {
      return <i className="fa fa-heart-o" aria-hidden="true"></i>;
    }
  };

  render() {
    return (
      <button className="btn btn-primary-outline" onClick={this.props.onClick}>
        {this.getHeartIcon(this.props.liked)}
      </button>
    );
  }
}

export default LikeButton;
