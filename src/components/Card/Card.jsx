import React from "react";
import "./Card.css";

export const Card = (props) => {
  return (
    <div className="card">
      <div className="container">
      {props.children}
      </div>
    </div>
  );
};
