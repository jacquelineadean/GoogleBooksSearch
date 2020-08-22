import React from "react";
import "./styles.css";

// This file exports both the List and ListItem components

export const List = ({ children }) => {
  return (
    <div className="list-overflow-container">
      <ul className="list-group">{children}</ul>
    </div>
  );
}

export const ListItem = props => (
  <li className="list-group-item">{props.children}</li>
)