import React, { Component } from "react";
import { NavLink, BrowserRouter } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Container, Row, Col } from "react-bootstrap";
import PrimaryButton from "./reusableComponents/PrimaryButton";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  Box,
  Button,
  Typography,
} from "@material-ui/core";
import frontPageMainImage from "../images/hands_earth_transparent.png";
import unimelbLogo from "../images/unimelbLogo.png";
import womenAroundEarth from "../images/womenAroundEarth.png";
import idecideLogo from "../images/idecide-logo.png";

import userContext from "../contexts/userContext";

class Landing extends Component {
  static contextType = userContext;

  render() {
    const userId = this.context.userContext.userId;
    const userType = this.context.userContext.userType;
    return (
      <div>
        <Container style={{ width: "100%" }}>
          <Row className="align-items-center">
            <Col
              style={{
                padding: "10px",
                backgroundColor: "rgba(255,255,255,0.7)",
              }}
            >
              <img
                src={idecideLogo}
                style={{ padding: "10px", width: "40%" }}
                alt="logo"
              />
              <Typography
                color="textPrimary"
                style={{ color: "#9572A4" }}
                variant="h4"
              >
                Women's Wellbeing Tool
              </Typography>
              <br />
              <Typography color="textPrimary" variant="h5">
                Do you worry about whether your relationship is healthy?
              </Typography>
              <br />
              <Typography color="textPrimary" variant="h5">
                Do you sometimes wonder if you are safe?
              </Typography>
              <br />
              <Typography color="textSecondary" variant="h6">
                This website helps women who feel unsafe or afraid of a current
                or ex-partner to plan for the future.
              </Typography>
              <NavLink
                to="/surveyComponent/surveyHome"
                style={{ textDecoration: "none" }}
              >
                <PrimaryButton>
                  Start <KeyboardArrowRightIcon />
                </PrimaryButton>
              </NavLink>
              {userId === null || userType === "anon" ? (
                <NavLink
                  to="/loginComponent/loginPage"
                  style={{ textDecoration: "none" }}
                >
                  <PrimaryButton>
                    Log in <AccountCircleIcon />
                  </PrimaryButton>
                </NavLink>
              ) : (
                <NavLink
                  to="/loginComponent/userInfo"
                  style={{ textDecoration: "none" }}
                >
                  <PrimaryButton>
                    Account <AccountCircleIcon />
                  </PrimaryButton>
                </NavLink>
              )}
            </Col>

            <Col>
              <img
                src={frontPageMainImage}
                style={{ width: "100%" }}
                alt="logo"
              />
            </Col>
          </Row>
        </Container>

        <Card style={{ width: "100%" }}>
          <Container style={{ width: "100%", padding: 30 }}>
            <Row className="align-items-center">
              <Col>
                <img
                  src={womenAroundEarth}
                  style={{ width: "100%" }}
                  alt="logo"
                />
              </Col>
              <Col>
                <Typography color="textPrimary" variant="h4">
                  The Website
                </Typography>
                <Typography color="textSecondary" variant="h6">
                  Many women in Australia feel unsafe or fearful or worry that
                  their relationships with their partners are not healthy. This
                  website is for women to self-reflect on the health of their
                  relationhips, become more informed about what might help them,
                  and plan for their safety and well being.
                </Typography>
              </Col>
            </Row>
          </Container>
        </Card>

        <Card style={{ width: "100%", backgroundColor: "#EEEEEE" }}>
          <Container style={{ width: "100%", padding: 30 }}>
            <Row className="align-items-center">
              <Col>
                <Typography color="textPrimary" variant="h4">
                  The Team
                </Typography>
                <Typography color="textSecondary" variant="h6">
                  I-Decide has been developed by a team of researchers in
                  general practice, social work, women's health, nursing, and
                  health technology led by The University of Melbourne.
                </Typography>
              </Col>
              <Col>
                <img src={idecideLogo} style={{ width: "50%" }} alt="logo" />
              </Col>
            </Row>
          </Container>
        </Card>
        <Card style={{ width: "100%", backgroundColor: "#163653" }}>
          <Row className="align-items-center">
            <Col>
              <img src={unimelbLogo} style={{ width: "20%" }} alt="logo" />
            </Col>
          </Row>
        </Card>
      </div>
    );
  }
}

export default Landing;
