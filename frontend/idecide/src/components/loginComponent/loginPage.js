import React from "react";

import { loginUser } from "../../API/loginAPI";
import { NavLink } from "react-router-dom";
import AdminInfo from "./adminInfo";
import { MDBBtn } from "mdbreact";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";

export default class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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

    let response = await loginUser(userObject);

    window.location.replace("/");
  }

  render() {
    const style = { width: "300px", high: "0px" };
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <div className="header">Login</div>
            <div className="content">
              <div className="form">
                <div>
                  <label htmlFor="email">Email Address: </label>
                  <input type="text" name="email" placeholder="Email Address" />
                </div>

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

            <div className="footer">
              <MDBBtn gradient="purple">Login</MDBBtn>
              <br />

              <NavLink to="./registerPage">
                <MDBBtn gradient="purple">Sign up here</MDBBtn>
              </NavLink>
            </div>
          </div>
        </form>

        <div style={{ padding: "80px" }}>
          <h6>For Demo Purpose Only:</h6>
          <MDBBtn style={style} onClick={this.displayAdmins} gradient="purple">
            Display <br />
            Admins
          </MDBBtn>

          {this.state.showAdmin ? <AdminInfo /> : null}
        </div>
      </div>
    );
  }
}
