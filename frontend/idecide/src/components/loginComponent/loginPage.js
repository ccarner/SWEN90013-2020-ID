import React from "react";

import { loginUser } from "../../API/loginAPI";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
// import { NavLink, BrowserRouter } from "react-router-dom";
import PrimaryButton from "../reusableComponents/PrimaryButton";
import RegisterPage from "./registerPage";
import { Button, Card } from "react-bootstrap";


export default class LoginPage extends React.Component {
  constructor(props) {
    super();
    this.state = {
      isLoggingPage: true,
      isLoggedIn: false,
      username: null,
      password: null,
      error: null,
      isLoaded: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
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

    const response = await loginUser(userObject);

    if (response.flag) {
      window.location.replace("/loginComponent/userInfo");
    } else {
      alert("Log in Failed");
    }
  }

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

    const { isLoggingPage, isLoggedIn } = this.state;
    if (isLoggedIn) {
      {
        return (
          <div>
            <h1>Welcome!</h1>
          </div>
        );
      }
    } else if (isLoggingPage) {
      return (

        <div style={{
          paddingTop: '40px',
          boxSizing: 'content-box',
        }}>
          <Card className="container card-body" style={{ width: "50%", padding: "10%;" }}>

            <Card.Body className="container" style={{ padding: "10%" }}>
              <Card.Title className="font-of-input-box">
                <div className="padding-1">
                  {"Log in to I-Decide "}
                </div>
              </Card.Title>
              <Card.Text></Card.Text>
              <form onSubmit={this.handleSubmit}>
                <div className="font-of-input-box">
                  <div className="content">
                    <div className="form">
                      <div>
                        <label htmlFor="username"> Username: </label>
                        &nbsp;&nbsp; &nbsp;&nbsp;
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
              </form>
            </Card.Body>
          </Card>
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
