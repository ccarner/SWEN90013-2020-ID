import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { MDBBtn } from "mdbreact";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
class Landing extends Component {
  componentDidMount() {
    localStorage.clear();
  }

  render() {
    return (
      <div className="container" style={{ padding: "150px" }}>
        <h1 style={{ color: "purple" }}>Women's Wellbeing Project</h1>
        <br></br>
        <h2>Do you worry about whether your relationship is healthy?</h2>
        <h2>Do you sometimes wonder if you are safe?</h2>
        <p>
          This website is for women who feel unsafe or afraid of a current or
          ex-partner.
        </p>

        <NavLink to="./surveyComponent/surveyHome">
          <MDBBtn gradient="purple">Anonymous</MDBBtn>
        </NavLink>
        <NavLink to="./loginComponent/loginPage">
          <MDBBtn gradient="purple">Log in</MDBBtn>
        </NavLink>
      </div>
    );
  }
}

export default Landing;
