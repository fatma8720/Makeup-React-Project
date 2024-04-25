import React, { Component } from "react";
import PropTypes from "prop-types";
import "../Pages/PageWithClassComponent.css";

class ProgressBar extends Component {
  render() {
    const { skill, bgcolor, progress, height } = this.props;

    const containerStyles = {
      height: height,
      backgroundColor: "#e0e0e0",
      borderRadius: 10,
      margin: 10,
      display: "flex",
      alignItems: "center", // Align items vertically center
    };

    const fillerStyles = {
      height: "100%",
      width: `${progress}%`,
      backgroundColor: bgcolor,
      borderRadius: "inherit",
      textAlign: "right",
    };

    return (
      <div className="progress-bar" style={containerStyles}>
        <span
          className="skill-name"
          style={{ marginRight: "10px", paddingLeft: "10px" }}
        >
          {skill}
        </span>
        <div className="filler" style={fillerStyles}></div>
      </div>
    );
  }
}

ProgressBar.propTypes = {
  skill: PropTypes.string.isRequired,
  bgcolor: PropTypes.string.isRequired,
  progress: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

export default ProgressBar;
