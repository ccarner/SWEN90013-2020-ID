import React from "react";

import { loginUser } from "../../API/loginAPI";
import AdminInfo from "./adminInfo";
import { MDBBtn } from "mdbreact";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
// import { NavLink, BrowserRouter } from "react-router-dom";

import RegisterPage from "./registerPage";

export default class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggingPage: true,
      isLoggedIn: false,
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
      this.setState({
        isLoggedIn: true
      });
      alert("Log in Successful!")
    } else {
      alert("Log in Failed")
    }
  }

  registerToggle = () => {
    this.setState({
      isLoggingPage: !this.state.isLoggingPage
    });
  }

  render() {
    const style = {
      width: "300px",
      high: "500px",
      padding: "10px 10px 50px 10px",
    };

    const { isLoggingPage, isLoggedIn } = this.state;
    if (isLoggedIn) {
      return (
        <div>
          You are logged in!
        </div>
      );
    } else if (isLoggingPage) {
      return (
        <div>
          <form onSubmit={this.handleSubmit}>
            <div className="font-of-input-box">
              <div className="padding-1">Login</div>
              <div className="content">
                <div className="form">
                  <div>
                    <label htmlFor="email">Email Address: </label>
                    <input type="text" name="email" placeholder="Email Address" />
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
                  <MDBBtn type="submit" gradient="purple" onSubmit={this.handleSubmit}>Login</MDBBtn>

                  <MDBBtn gradient="purple" onClick={this.registerToggle}>Sign up here</MDBBtn>

                </div>
              </div>
            </div>

          </form>

          <div style={{ padding: "5px" }}>
            <h6>For Demo Purpose Only:</h6>
            <div className="login-form2">
              <MDBBtn
                style={style}
                onClick={this.displayAdmins}
                gradient="purple"
              >
                Display <br />
                Admins
              </MDBBtn>
            </div>

            {this.state.showAdmin ? <AdminInfo /> : null}
          </div>
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
