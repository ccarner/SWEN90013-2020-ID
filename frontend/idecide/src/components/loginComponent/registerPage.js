import React from "react";
import { MDBBtn } from "mdbreact";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import { registerUser } from "../../API/loginAPI";
import { NavLink, BrowserRouter } from "react-router-dom";

export default class RegisterPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      password: null,
      partnerGender: null,
      email: null,
      phoneNumber: null,
      postcode: null,
      response: "Nothing yet",
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

    await registerUser(userObject);
    window.location.replace("/");
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
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
                  <label htmlFor="partnerGender">Last Name: </label>
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
              </div>
            </div>
            <br />
            <div className="footer">
              <MDBBtn gradient="purple">Register</MDBBtn>
              <BrowserRouter>
              <NavLink to="./loginPage">
                <MDBBtn gradient="purple">Login here</MDBBtn>
              </NavLink>
              </BrowserRouter>
            </div>
          </div>
        </form>
        {/* <div><h1>Returned message:{this.state.response}</h1></div> */}
      </div>
    );
  }
}
