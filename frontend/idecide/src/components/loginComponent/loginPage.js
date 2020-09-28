import React from "react";

import { loginUser } from "../../API/loginAPI";
import AdminInfo from "./adminInfo";
import { MDBBtn } from "mdbreact";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
// import { NavLink, BrowserRouter } from "react-router-dom";
import PrimaryButton from "../reusableComponents/PrimaryButton";
import RegisterPage from "./registerPage";
import { Button, Card } from "react-bootstrap";
import AdminConsole from "../AdminComponents/adminConsole";

export default class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggingPage: true,
      isLoggedIn: false,
      isAdmin: false,
      email: null,
      password: null,
      showAdmin: false,
      error: null,
      isLoaded: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.displayAdmins = this.displayAdmins.bind(this);
  }

  displayAdmins() {
    this.setState({ showAdmin: true });
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
      var userAdmin = false;
      if (userObject.email === "ccarner13@gmail.com") {
        userAdmin = true;
      }
      this.setState({
        isLoggedIn: true,
        isAdmin: userAdmin,
      });
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

    const { isLoggingPage, isLoggedIn, isAdmin } = this.state;
    if (isLoggedIn) {
      if (isAdmin) {
        return <AdminConsole />;
      } else {
        return <div>You are logged in!</div>;
      }
    } else if (isLoggingPage) {
      return (
        <div>
          <Card className="surveyIntroCard" style={{ width: "80%" }}>
            <Card.Body className="container" style={{ padding: "10%" }}>
              <Card.Title className="text-center" style={{ color: "#9572A4" }}>{"Log in to I-Decide "}</Card.Title>
              <Card.Text></Card.Text>
              <form onSubmit={this.handleSubmit}>
                <div className="font-of-input-box">
                  <div className="content">
                    <div className="form">
                      <div>
                        <label htmlFor="email">Email Address: </label>
                        <input
                          type="text"
                          name="email"
                          placeholder="Email Address"
                        />
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
        </div >
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
