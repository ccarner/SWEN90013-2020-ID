import React from "react";
import { MDBBtn } from "mdbreact";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import { registerUser } from "../../API/loginAPI";
import { Alert, AlertTitle } from '@material-ui/lab';
import { Container, Row, Col } from 'reactstrap';
import PrimaryButton from "../reusableComponents/PrimaryButton";



export default class RegisterPage extends React.Component {
  constructor(props) {
    super();
    this.state = {
      isWarning: false,
      warningType: null,
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

    const response = await registerUser(userObject);
    if (response.flag) {
      this.setState({
        isWarning: false,
        warningType: "success"
      });

    } else {
      this.setState({
        isWarning: true,
        warningType: "error"
      });
    }

  }

  handleCloseWarning = () => {
    window.location.replace("/");
  }

  render() {
    const { isWarning, warningType } = this.state;
    if (isWarning) {
      return (
        
<div  style={{display: 'inline-block', padding: '50px',
 justifyContent:'center', alignItems:'center' }}>
          <Alert severity="success">
          <AlertTitle>Success</AlertTitle>
          Your details have been saved Successfully<strong> ! </strong>
          </Alert>
          &nbsp;&nbsp;
          <div  className="row" style={{display: 'flex',justifyContent:'center', alignItems:'center'}}>
      
          <PrimaryButton
                  gradient="purple"
                  onClick={this.handleCloseWarning}>
                   close 
               </PrimaryButton>
               </div>
        </div>
      );
    } else {
      return (
        <div>
          <form onSubmit={this.handleSubmit}>
            <div className="font-of-input-box">
              <div className="padding-1">Register</div>
              <div className="content">
                <div className="form">
                  <div>
                    <label htmlFor="username">Username: </label>
                    <input type="text" name="username" placeholder="username" required pattern="[a-z0-9]+"
                      title="Username should only contain lowercase letters. e.g. john" className="input:invalid"
                    />
                  </div>
                  <br />
                  <div>
                    <label htmlFor="password">Password: </label>
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
                      title="Password must contain at least 6 characters, including UPPER/lowercase and numbers."
                      required
                    />
                  </div>
                  <br />
                  <div>
                    <label htmlFor="partnerGender">Gender: </label>
                    <input type="radio" value="Male" name="gender" /> Male  &nbsp;&nbsp;
        <input type="radio" value="Female" name="gender" /> Female  &nbsp; &nbsp;
        <input type="radio" value="Other" name="gender" /> Other  &nbsp;&nbsp;
                  </div>
                  <br />
                  <div>
                    <label htmlFor="email">Email Address: </label>
                    <input type="email" id="email" name="email" placeholder="Email Address" required
                      pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                      title="Contact's email (format: xxx@xxx.xxx)"
                    />
                  </div>
                  <br />
                  <div>
                    <label htmlFor="phoneNumber">Phone Number: </label>
                    <input
                      type="text"
                      name="phoneNumber"
                      placeholder="phoneNumber"
                      pattern="^[0-9]{10}$"
                      title="Enter Valid phone Number with 10 digits"
                      required
                    />
                  </div>
                  <br />
                  <div>
                    <label htmlFor="postcode">Post Code:</label>
                    <input type="text" name="postcode" placeholder="postcode" required
                      pattern="[0-9]{4}$" title="Three letter country code"
                      title="please enter 4 digits number"
                    />
                  </div>
                </div>
              </div>
              <br />
              <div className="footer" >
                <PrimaryButton
                  type="submit"
                  gradient="purple"
                  onClick={this.registerToggle}
              
                >
                  Register
                  
                 </PrimaryButton>


                <PrimaryButton
                  gradient="purple"
                  onClick={this.props.registerToggle}>
                  Login here
               </PrimaryButton>

              </div>
            </div>
          </form>
        </div>
      );
    }
  }
}