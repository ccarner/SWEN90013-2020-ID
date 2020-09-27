import React from "react";
import { MDBBtn } from "mdbreact";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import { registerUser } from "../../API/loginAPI";


// import { NavLink, BrowserRouter } from "react-router-dom";


const txtFieldState = {
  value: "",
  valid: true,
  typeMismatch: false,
  errMsg: "You should add the ashwaq" //this is where our error message gets across
};


export default class RegisterPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        username: '',
        password: '',
        email: { ...txtFieldState, fieldName: "Email", required: true, requiredTxt: "Email is required", formatErrorTxt: "Incorrect email format" },
        phonenumber: '',
        postcode: '',

      },


    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleChange = (event) => {
    const { formData } = this.state;
    formData[event.target.name] = event.target.value;
    this.setState({ formData });
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

    const response = await registerUser(userObject);
    if (response.flag) {
      alert("Sign up Successful!");
    } else {
      alert("Sign up Failed");
    }
    window.location.replace("/");
  }


  render() {
    const { formData, submitted } = this.state;
    return (

      <div>

        <form onSubmit={this.handleSubmit} >
          <div className="font-of-input-box">
            <div className="padding-1">Register</div>
            <div className="content">
              <div className="form">
                <div>
                  <label htmlFor="username">Username: </label>

                  <input type="text" name="username" placeholder="username" required />
                </div>
                <br />
                <div>
                  <label htmlFor="password">Password: </label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    required
                  />


                </div>
                <br />
                <div>
                  <label htmlFor="partnerGender">Gender: </label>
                  <input
                    type="text"
                    name="partnerGender"
                    placeholder="partnerGender"
                    required
                  />
                </div>
                <br />
                <div>
                  <label htmlFor="email">Email Address: </label>
                  <input type="text" name="email" placeholder="Email Address" required />
                </div>
                <br />
                <div>
                  <label htmlFor="phoneNumber">Phone Number: </label>
                  <input
                    type="text"
                    name="phoneNumber"
                    placeholder="phoneNumber"
                    required
                  />


                </div>
                <br />
                <div>
                  <label htmlFor="postcode">Post Code:</label>
                  <input type="text" name="postcode" placeholder="postcode" required />
                </div>
              </div>
            </div>
            <br />
            <div className="footer">
              <MDBBtn type="submit" gradient="purple">
                Register
              </MDBBtn>

              <MDBBtn gradient="purple" onClick={this.props.registerToggle}>
                Login here
              </MDBBtn>
            </div>
          </div>
        </form>

      </div >
    );
  }
}

