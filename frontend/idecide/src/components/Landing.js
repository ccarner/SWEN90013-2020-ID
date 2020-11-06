import React, { Component } from "react";
import { NavLink, BrowserRouter } from "react-router-dom";
//TODO: this 'fort awesome' / font awesome, are we actually USING it??? why not importing it at the 'App.js' level?
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Container, Row, Col } from "react-bootstrap";
import PrimaryButton from "./reusableComponents/PrimaryButton";
import GetHelpDialog from "./reusableComponents/getHelpDialog";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import PhoneIcon from "@material-ui/icons/Phone";
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
import idecideLogoWhite from "../images/idecide-logo-white.png";

import userContext from "../contexts/userContext";
import SaveIcon from "@material-ui/icons/Save";

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = { helpOpen: false };
  }
  static contextType = userContext;

  render() {
    const userId = this.context.userContext.userId;
    const userType = this.context.userContext.userType;
    const completionSaved = localStorage.getItem("prevCompletions");
    return (
      <div>
        <GetHelpDialog
          open={this.state.helpOpen}
          handleClose={() => {
            this.setState({ helpOpen: false });
          }}
        />
        <Container style={{ width: "100%" }}>
          <img
            src={idecideLogoWhite}
            style={{ padding: "20px", width: "14em" }}
            alt="logo"
          />
          <Typography
            color="textPrimary"
            style={{ color: "white" }}
            variant="h2"
          >
            Women's Wellbeing Tool
          </Typography>

          <Row className="align-items-center">
            <Col
              style={{
                padding: "10px",
              }}
            >
              <br />
              <Typography style={{ color: "white" }} variant="h5">
                Do you worry about whether your relationship is healthy?
              </Typography>
              <br />
              <Typography style={{ color: "white" }} variant="h5">
                Do you sometimes wonder if you are safe?
              </Typography>
              <br />
              <Typography style={{ color: "white" }} variant="h6">
                This website helps women who feel afraid of a current or
                ex-partner to plan for the future.
              </Typography>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                {/* placed the gethelp button on top due to user testing */}
                <PrimaryButton
                  style={{ background: "white", width: "fit-content" }}
                  onClick={() => {
                    this.setState({ helpOpen: true });
                  }}
                >
                  <span
                    style={{
                      background:
                        "linear-gradient(45deg, #DA76C7 30%, #8973E6 90%)",
                      backgroundClip: "text",
                      webkitBackgroundClip: "text",
                      color: "rgba(0,0,0,.2)",
                    }}
                  >
                    Get Help Now <PhoneIcon style={{ color: "#8973E6" }} />
                  </span>
                </PrimaryButton>
                <PrimaryButton
                  style={{ background: "white", width: "fit-content" }}
                  onClick={() => {
                    this.props.history.push("/surveyComponent/surveyHome");
                  }}
                >
                  <span
                    style={{
                      background:
                        "linear-gradient(45deg, #DA76C7 30%, #8973E6 90%)",
                      backgroundClip: "text",
                      webkitBackgroundClip: "text",
                      color: "rgba(0,0,0,.2)",
                    }}
                  >
                    {completionSaved
                      ? "Continue your session"
                      : "Start a new session"}
                    <KeyboardArrowRightIcon style={{ color: "#8973E6" }} />
                  </span>
                </PrimaryButton>

                <PrimaryButton
                  style={{ background: "white", width: "fit-content" }}
                  onClick={() => {
                    this.props.history.push("/loginComponent/loginPage");
                  }}
                >
                  <span
                    style={{
                      background:
                        "linear-gradient(45deg, #DA76C7 30%, #8973E6 90%)",
                      backgroundClip: "text",
                      webkitBackgroundClip: "text",
                      color: "rgba(0,0,0,.2)",
                    }}
                  >
                    Restore a saved session &nbsp;
                    <SaveIcon style={{ color: "#8973E6" }} />
                  </span>
                </PrimaryButton>
              </div>

              {/* <PrimaryButton
                style={{
                  border: "10px",
                  borderColor: "white",
                  borderWidth: "5px",
                  borderStyle: "solid",
                  background: "rgba(0,0,0,0)",
                }}
              >
                Start <KeyboardArrowRightIcon />
              </PrimaryButton> */}
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
