import React, { Component } from 'react';
function Card(props) {
    return (
      <div className="card" style={{ width: "18rem" }}>
      <img src={props.logo} className="card-img-top" alt={props.name} />
      <div className="card-body">
        <h5 className="card-title">{props.name}</h5>
        <p className="card-text">{props.desc}</p>
        <p className="card-text">{props.num}</p>
      </div>
    </div>
    );
  }
  
export default Card;
