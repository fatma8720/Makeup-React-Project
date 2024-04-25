import React, { Component } from 'react';

class Button extends Component {
  render() {
    const { text, onClick } = this.props;
    return (
      <button className="btn btn-light text-dark" onClick={onClick}>
        {text}
      </button>
    );
  }
}

export default Button;
