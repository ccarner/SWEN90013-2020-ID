import React from "react";

import { registerUser } from "../../API/loginAPI";
import { NavLink, BrowserRouter } from 'react-router-dom';

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
            response: "Nothing yet"
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(event) {

        // the following call will stop the form from submitting
        event.preventDefault();

        // get the user information
        const data = new FormData(event.target);
        var userObject = {};
        data.forEach((value, key) => { userObject[key] = value });

        await registerUser(userObject);
        window.location.replace("/");
    }

    render() {

        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <div className="header">Register</div>
                        <div className="content">

                            <div className="form">
                                <div >
                                    <label htmlFor="username">Username: </label>
                                    <input type="text" name="username" placeholder="username" />
                                </div>
                                <div>
                                    <label htmlFor="password">Password: </label>
                                    <input type="password" name="password" placeholder="Password" />
                                </div>
                                <div>
                                    <label htmlFor="partnerGender">Last Name: </label>
                                    <input type="text" name="partnerGender" placeholder="partnerGender" />
                                </div>
                                <div >
                                    <label htmlFor="email">Email Address: </label>
                                    <input type="text" name="email" placeholder="Email Address" />
                                </div>

                                <div >
                                    <label htmlFor="phoneNumber">Phone Number: </label>
                                    <input type="text" name="phoneNumber" placeholder="phoneNumber" />
                                </div>



                                <div >
                                    <label htmlFor="postcode">Post Code:</label>
                                    <input type="text" name="postcode" placeholder="postcode" />
                                </div>

                            </div>

                        </div>

                        <div className="footer">
                            <button >Register</button>
                            <br />
                            <BrowserRouter>
                            <NavLink to='./loginPage'>
                                <button>Login here</button>
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
