import React from "react";

function Header() {
  return (
    <div className="jumbotron" style={{ height: 300, clear: "both", paddingTop: 120, textAlign: "center" }}>
      <h1 className="display-4">Google Books Search</h1>
      <h5 className="lead">Search for and Save Books of Interest</h5>
    </div>
  );
}

export default Header;