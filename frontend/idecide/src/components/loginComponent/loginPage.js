//TODO is this component being used?
import React from "react";

import { loginUser } from "../../API/loginAPI";
import AdminLogin from "../../App";
import { Link } from "react-router-dom";
import PrimaryButton from "../reusableComponents/PrimaryButton";
import RegisterPage from "./registerPage";
import { getResultByUser } from "../../API/resultAPI";
import userContext from "../../contexts/userContext";
//import { Button, Card } from "react-bootstrap";

import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  Box,
  Typography,
} from "@material-ui/core";

export default class LoginPage extends React.Component {
  static contextType = userContext;
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      isLoggingPage: true,
      isLoggedIn: false,
      isAdmin: false,
      username: null,
      password: null,
      showAdmin: false,
      error: null,
      isLoaded: false,
    };
    // this.handleSubmit = this.handleSubmit.bind(this);
    // this.displayAdmins = this.displayAdmins.bind(this);
  }

  // displayAdmins() {
  // 	this.setState({ showAdmin: true });
  // }

  handleHistory = async () => {
    const userContext = JSON.parse(localStorage.getItem("userContext"));
    const prevCompletionHistory = await getResultByUser(userContext.userId);
    console.log("prev completion is ----*", prevCompletionHistory);
    var surveyResults = {};
    // convert into format of {"surveyId":{surveyCompetion}}
    for (const surveyCompletion of prevCompletionHistory) {
      surveyResults[surveyCompletion.surveyId] = surveyCompletion;
    }
    localStorage.setItem("prevCompletions", JSON.stringify(surveyResults));
  };

  handleSubmit = async (event) => {
    // the following call will stop the form from submitting
    event.preventDefault();
    //clear any previous saved data
    localStorage.clear();
    // get the user information
    const data = new FormData(event.target);
    var userObject = {};
    data.forEach((value, key) => {
      userObject[key] = value;
    });

    this.setState({
      isLoading: true,
    });

    const response = await loginUser(userObject);

    if (response.flag) {
      // console.log(response);
      this.context.setUserContext({
        userId: response.data.id,
        userType: response.data.roles,
        token: response.data.token,
      });

      if (response.data.roles === "admin") {
        window.location.replace("/dashboard/surveys");
      } else {
        await this.handleHistory();
        window.location.replace("/surveyComponent/surveyHome");
      }
    } else {
      alert("Log in Failed");
      this.setState({
        isLoading: false,
      });
    }
  };

  registerToggle = () => {
    this.setState({
      isLoggingPage: !this.state.isLoggingPage,
    });
  };

  render() {
    const style = {
      width: "300px",
      high: "500px",
      padding: "10px 10px 50px 10px",
    };

    const { isLoggingPage, isLoggedIn, isAdmin } = this.state;

    if (isLoggingPage) {
      return (
        <div style={{ padding: "5%" }}>
          <h1 className="text-center" style={{ color: "white" }}>
            Review a Saved Action Plan
          </h1>
          <br />
          {/** 	 		   <Card className="surveyIntroCard" style={{ width: "80%" }}>
            <Card.Body>
              <Card.Title>{"Log in to I-Decide "}</Card.Title>
              <Card.Text></Card.Text>
              <form onSubmit={this.handleSubmit}>

                <div className="font-of-input-box">
                  <div className="content">
                    <div className="form">
                      <div>
                        <label htmlFor="email">Email Address: </label>
                        <input
                            type="text"
                            name="username"
                            placeholder="username"
                            required
                          />
                        </div>
                        <br />
                        <div>
                          <label htmlFor="password">Password: </label>
                        &nbsp;&nbsp; &nbsp;&nbsp;
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <br />
                    <br />

                    <div className="footer">
                      <div className="login-form">
                        <PrimaryButton
                          type="submit"
                          gradient="purple"
                          onSubmit={this.handleSubmit}
                        >
                          Login
                      </PrimaryButton>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <PrimaryButton
                          gradient="purple"
                          onClick={this.registerToggle}
                        >
                          Sign up here
                      </PrimaryButton>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </Card.Body>
		  </Card>*/}

          {/** new login UI */}
          <form onSubmit={this.handleSubmit}>
            <Card>
              <CardHeader title="Sign In" />
              <Divider />
              <CardContent>
                <Typography color="textSecondary">
                  Sign in here to review your previous action plan
                </Typography>
                <Box p={1} />
                <TextField
                  id="username"
                  required
                  style={{ width: "50%" }}
                  type="text"
                  value={this.state.username}
                  name="username"
                  label="User Name"
                  variant="outlined"
                />
              </CardContent>
              <CardContent>
                <TextField
                  id="password"
                  required
                  style={{ width: "50%" }}
                  type="password"
                  name="password"
                  value={this.state.password}
                  label="Password"
                  variant="outlined"
                />
              </CardContent>
              {/* <Typography>
                Don't have an account?{" "}
                <Link
                  to={{
                    pathname: "/loginComponent/registerPage",
                    state: { buttonClass: this.props.classes },
                  }}
                >
                  Sign Up
                </Link>
              </Typography> */}
              <CardContent>
                <PrimaryButton
                  type="submit"
                  style={{ width: "50%" }}
                  onSubmit={this.handleSubmit}
                >
                  Sign In
                </PrimaryButton>
                <Link
                  style={{ textDecoration: "none" }}
                  to={{
                    pathname: "/",
                  }}
                >
                  <PrimaryButton style={{ width: "50%" }}>
                    Back to Home
                  </PrimaryButton>
                </Link>
              </CardContent>
            </Card>
          </form>
        </div>
      );
    } else {
      return (
        <div>
          <RegisterPage registerToggle={this.registerToggle} />
        </div>
      );
    }
  }
}
