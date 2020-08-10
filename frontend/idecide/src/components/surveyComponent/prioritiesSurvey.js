import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { MDBBtn } from "mdbreact";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";

export default class PrioritiesSurvey extends Component {
  render() {
    return (
      <div className="container" style={{ padding: "100px" }}>
        <h2 style={{ color: "purple" }}>
          This page should contain the priorities survey
        </h2>
        <br />

        <div style={{ padding: "10px" }}>
          <NavLink to="/">
            <MDBBtn gradient="purple">Back Home </MDBBtn>
          </NavLink>
        </div>
      </div>
    );
  }
}
