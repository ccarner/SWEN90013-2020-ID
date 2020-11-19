import React, { Component } from "react";
import { NavLink, BrowserRouter } from "react-router-dom";
//TODO: this 'fort awesome' / font awesome, are we actually USING it??? why not importing it at the 'App.js' level?
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Container, Row, Col } from "react-bootstrap";
import PrimaryButton from "./reusableComponents/PrimaryButton";
import PrimaryButtonContrast from "./reusableComponents/primaryButtonContrast";
import GetHelpDialog from "./reusableComponents/getHelpDialog";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import PhoneIcon from "@material-ui/icons/Phone";
import {
  Link,
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
import frontPageMainImage from "../images/hands_homepage.png";
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
        <div style={{ width: "100%", padding: "1em" }}>
          <img
            src={idecideLogoWhite}
            style={{ padding: "20px", width: "min(14em,100%)" }}
            alt="logo"
          />
          <Typography
            color="textPrimary"
            style={{ color: "white" }}
            variant="h2"
          >
            Women's Wellbeing Tool
          </Typography>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            flexWrap: "wrap",
            padding: "1em",
            paddingBottom: 0,
          }}
        >
          <div style={{ width: "min(30em,100%)" }}>
            {/* main homepage text */}
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
                padding: "1em",
              }}
            >
              {/* placed the gethelp button on top due to user testing */}
              <PrimaryButtonContrast
                onClick={() => {
                  this.setState({ helpOpen: true });
                }}
              >
                Get Help Now <PhoneIcon style={{ color: "#8973E6" }} />
              </PrimaryButtonContrast>
              <PrimaryButtonContrast
                onClick={() => {
                  this.props.history.push("/surveyComponent/surveyHome");
                }}
              >
                {completionSaved
                  ? "Continue your session"
                  : "Start a new session"}
                <KeyboardArrowRightIcon style={{ color: "#8973E6" }} />
              </PrimaryButtonContrast>
              <PrimaryButtonContrast
                onClick={() => {
                  this.props.history.push("/loginComponent/loginPage");
                }}
              >
                Restore a saved session &nbsp;
                <SaveIcon style={{ color: "#8973E6" }} />
              </PrimaryButtonContrast>
            </div>
          </div>

          <div style={{ width: "min(30em,100%)" }}>
            <img
              src={frontPageMainImage}
              style={{ width: "100%" }}
              alt="logo"
            />
          </div>
        </div>

        <Card style={{ width: "100%" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <div style={{ width: "min(30em,100%)" }}>
              <img
                src={womenAroundEarth}
                style={{ width: "100%" }}
                alt="logo"
              />
            </div>

            <div style={{ width: "min(30em,100%)", padding: "1em" }}>
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
            </div>
          </div>
        </Card>

        <Card
          style={{ width: "100%", backgroundColor: "#EEEEEE", padding: "1em" }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <div style={{ width: "min(30em,100%)", padding: "1em" }}>
              <Typography color="textPrimary" variant="h4">
                The Team
              </Typography>
              <Typography color="textSecondary" variant="h6">
                I-Decide has been developed by a team of researchers in general
                practice, social work, women's health, nursing, and health
                technology led by The University of Melbourne.
              </Typography>
            </div>

            <div style={{ width: "min(30em,100%)", padding: "1em" }}>
              <img src={idecideLogo} alt="logo" />
            </div>
          </div>
        </Card>
        <Card
          style={{ width: "100%", backgroundColor: "#163653", padding: "1em" }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img src={unimelbLogo} style={{ width: "20%" }} alt="logo" />
            <Link
              style={{ color: "white" }}
              href="#"
              onClick={(event) => {
                event.preventDefault();
                this.props.history.push("/loginComponent/loginPageAdmin");
              }}
            >
              Admin Login
            </Link>
          </div>
        </Card>
      </div>
    );
  }
}

export default Landing;
