import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import {
  MDBJumbotron,
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCardTitle,
  MDBIcon,
} from "mdbreact";
import PrimaryButton from "./reusableComponents/PrimaryButton";

class Landing extends Component {
  componentDidMount() {
    localStorage.clear();
  }

  render() {
    return (
      <React.Fragment>
        <div className="container" style={{ padding: "10%" }}>
          <h1 style={{ color: "purple" }}>Women's Wellbeing</h1>
          <br></br>
          <h2>Do you worry about whether your relationship is healthy?</h2>
          <h2>Do you sometimes wonder if you are safe?</h2>
          <p>
            This website is for women who feel unsafe or afraid of a current or
            ex-partner.
          </p>
          <NavLink to="./surveyComponent/surveyHome">
            <PrimaryButton>Anonymous</PrimaryButton>
          </NavLink>
          <NavLink to="./loginComponent/loginPage">
            <PrimaryButton>Log in</PrimaryButton>
          </NavLink>
        </div>

        <MDBJumbotron style={{ padding: 0 }}>
          <div
            style={{
              backgroundImage: `url(${require("../images/background.png")})`,
            }}
          >
            <div className="py-5" >
              <MDBCardTitle
                className="h1-responsive pt-3 m-5 font-bold"
                style={{ color: "white" }}
              >
                About iDecide
              </MDBCardTitle>
              <p className="mx-5 mb-5">
                iDecide has been developed by a team of researchers in general
                practice, social work, women's health, nursing, and health
                technology led by The University of Melbourne.
                <br />
                <br /> Many women in Australia feel unsafe, or worry that their
                relationships with their partners are not healthy. iDecide helps
                women to self-reflect on the health of their relationhips,
                become more informed about options available, and plan for their
                safety and well being.
              </p>
            </div>
          </div>
        </MDBJumbotron>
      </React.Fragment>
    );
  }
}

export default Landing;
