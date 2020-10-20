import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { registerUser } from "../../API/loginAPI";
import { Link } from "react-router-dom";
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
import PrimaryButton from "../reusableComponents/PrimaryButton";
import { toast } from "react-toastify";

export default class RegisterPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      password: null,
      repeatedPassword: null,
      response: null,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  validateInputPopToasts(userObject) {
    //not checking for strength of passwords
    if (userObject.password !== userObject.repeatPassword) {
      toast("Passwords given do not match", { autoClose: false });
      return false;
    }

    return true;
  }

  async handleSubmit(event) {
    // the following call will stop the form from submitting
    event.preventDefault();

    // get the user information
    const data = new FormData(event.target);
    var userObject = {};
    data.forEach((value, key) => {
      userObject[key] = value;
    });

    if (!this.validateInputPopToasts(userObject)) {
      return;
    }

    const response = await registerUser(userObject);
    if (response.flag) {
      toast("Successfully Saved", { autoClose: true });
      window.setTimeout(function () {
        window.location.replace("/surveyComponent/surveyHome");
      }, 2000);
    } else {
      toast("Signup Failed:" + response.message, { autoClose: true });
    }
  }

  render() {
    return (
      <div style={{ padding: "5%" }}>
        <h1 className="text-center" style={{ color: "white" }}>
          Save Your Results
        </h1>
        <br />
        {/** <form onSubmit={this.handleSubmit}>
          <div className="font-of-input-box">
            <div className="padding-1">Register</div>
            <div className="content">
              <div className="form">
                <div>
                  <label htmlFor="username">Username: </label>
                  <input type="text" name="username" placeholder="username" />
                </div>
                <br />
                <div>
                  <label htmlFor="password">Password: </label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                  />
                </div>
                <br />
                <div>
                  <label htmlFor="partnerGender">Gender: </label>
                  <input
                    type="text"
                    name="partnerGender"
                    placeholder="partnerGender"
                  />
                </div>
                <br />
                <div>
                  <label htmlFor="email">Email Address: </label>
                  <input type="text" name="email" placeholder="Email Address" />
                </div>
                <br />
                <div>
                  <label htmlFor="phoneNumber">Phone Number: </label>
                  <input
                    type="text"
                    name="phoneNumber"
                    placeholder="phoneNumber"
                  />
                </div>
                <br />
                <div>
                  <label htmlFor="postcode">Post Code:</label>
                  <input type="text" name="postcode" placeholder="postcode" />
                </div>
              </form>
            </div>
          </div>
        </form>*/}

        {/** new register UI */}
        <form onSubmit={this.handleSubmit}>
          <Card>
            <CardHeader title="Sign Up" />
            <Divider />
            <CardContent>
              <Typography color="textSecondary">
                Create a username and password to save your Action Plan for
                later
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
                placeholder="Username"
              />
              <Box p={1} />
              <TextField
                id="password"
                required
                style={{ width: "50%" }}
                type="password"
                name="password"
                value={this.state.password}
                label="Password"
                variant="outlined"
                placeholder="Password"
              />
              <Box p={1} />
              <TextField
                id="repeatPassword"
                required
                style={{ width: "50%" }}
                type="password"
                name="repeatPassword"
                value={this.state.repeatPassword}
                label="Repeat Password"
                variant="outlined"
                placeholder="Repeat  password"
              />
            </CardContent>
            <CardContent>
              <PrimaryButton
                style={{ width: "50%" }}
                type="submit"
                onSubmit={this.handleSubmit}
              >
                Save results
              </PrimaryButton>
            </CardContent>
            <Link
              style={{ textDecoration: "none" }}
              to={{
                pathname: "/surveyComponent/surveyHome",
              }}
            >
              <PrimaryButton style={{ width: "50%" }}>
                Back to Action Plan
              </PrimaryButton>
            </Link>
            {/* <Typography>
              Already have an account?{" "}
              <Link
                to={{
                  pathname: "/loginComponent/loginPage",
                  state: { buttonClass: this.props.classes },
                }}
              >
                Sign In
              </Link>
              <Box p={1} />
            </Typography> */}
          </Card>
        </form>
      </div>
    );
  }
}
