import React from "react";
import PropTypes from "prop-types";

const getHeartIcon = liked => {
  if (liked) {
    return <i className="fa fa-heart" aria-hidden="true"></i>;
  } else {
    return <i className="fa fa-heart-o" aria-hidden="true"></i>;
  }
};

const LikeButton = ({ onClick, liked }) => {
  return (
    <button className="btn btn-primary-outline" onClick={onClick}>
      {getHeartIcon(liked)}
    </button>
  );
};

LikeButton.propTypes = {
  liked: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
};

export default LikeButton;
