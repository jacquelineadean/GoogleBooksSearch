import React from "react";

export const Input = props => (
    <div className="form-group">
      <input className="form-control" {...props} />
    </div>
);

export const FormBtn = props => (
    <button {...props} style={{ float: "right", marginBottom: 10 }} className="btn btn-success">
      {props.children} 
    </button>
);