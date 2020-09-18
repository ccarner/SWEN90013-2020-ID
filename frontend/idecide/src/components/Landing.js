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
  MDBFooter,
} from "mdbreact";
import PrimaryButton from "./reusableComponents/PrimaryButton";

class Landing extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="container" style={{ padding: "10%" }}>
          <h1 className="text-center" style={{ color: "#9572A4" }}>
            Women's Wellbeing Tool
          </h1>
          <br></br>
          <h2>Do you worry about whether your relationship is healthy?</h2>
          <h2>Do you sometimes wonder if you are safe?</h2>
          <br />
          <h5>
            This website helps women who feel unsafe or afraid of a current or
            ex-partner to plan for the future.
          </h5>
          <br />
          <NavLink to="./surveyComponent/surveyHome">
            <PrimaryButton>Anonymous</PrimaryButton>
          </NavLink>
          <NavLink to="./loginComponent/loginPage">
            <PrimaryButton>Log in</PrimaryButton>
          </NavLink>
        </div>

        <MDBFooter className="font-small pt-4 mt-4" style={{ padding: 0 }}>
          <div
            style={{
              backgroundImage: `url(${require("../images/background.png")})`
            }}
          >
            <MDBContainer fluid className="text-center text-md-left">
              <MDBRow>
                <MDBCol md="8">
                  <h5 className="title">About I-Decide</h5>
                  <p className="mx-5 mb-5">
                    I-Decide has been developed by a team of researchers in
                    general practice, social work, women's health, nursing, and
                    health technology led by The University of Melbourne.
                    <br />
                    <br /> Many women in Australia feel unsafe, or worry that
                    their relationships with their partners are not healthy.
                    I-Decide helps women to self-reflect on the health of their
                    relationhips, become more informed about options available,
                    and plan for their safety and well being.
                  </p>
                </MDBCol>
                <MDBCol md="4">
                  <h5 className="title">More Information</h5>
                  <ul>
                    {/* <li className="list-unstyled">
                      <a href="/survey/3.2">Resources</a>
                    </li> */}
                    <li className="list-unstyled">
                      <a href="https://www.respect.gov.au/">Related Website</a>
                    </li>
                    {/* <li className="list-unstyled">
                      <a href="#!">Get Help</a>
                    </li> */}
                    {/* <li className="list-unstyled">
                      <a href="#!">Contact Us</a>
                    </li> */}
                  </ul>
                </MDBCol>
              </MDBRow>
            </MDBContainer>
            <div className="footer-copyright text-center py-3">
              <MDBContainer fluid>
                &copy; {new Date().getFullYear()} Copyright: I-Decide
                Development Group
              </MDBContainer>
            </div>
          </div>
        </MDBFooter>
      </React.Fragment>
    );
  }
}

export default Landing;
