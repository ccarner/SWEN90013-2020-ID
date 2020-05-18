import React from "react";

import { registerUser } from "../../API/loginAPI";
import { NavLink } from 'react-router-dom';

export default class RegisterPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: null,
            lastname: null,
            email: null,
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
        data.forEach((value, key) => { userObject[key] = value });

        await registerUser(userObject);
        window.location.replace("/");
    }

    render() {

        return (
            <form onSubmit={this.handleSubmit}>
                <div>
                    <div className="header">Register</div>
                    <div className="content">

                        <div className="form">
                            <div >
                                <label htmlFor="firstname">First Name: </label>
                                <input type="text" name="firstname" placeholder="First Name" />
                            </div>
                            <div>
                                <label htmlFor="lastname">Last Name: </label>
                                <input type="text" name="lastname" placeholder="Last Name" />
                            </div>
                            <div >
                                <label htmlFor="email">Email Address: </label>
                                <input type="text" name="email" placeholder="Email Address" />
                            </div>

                            <div >
                                <label htmlFor="email2">Confirm Email Address: </label>
                                <input type="text" name="email2" placeholder="Confirm Email Address" />
                            </div>

                            <div>
                                <label htmlFor="password">Password: </label>
                                <input type="password" name="password" placeholder="Password" />
                            </div>

                            <div >
                                <label htmlFor="password2">Confirm Password</label>
                                <input type="password" name="password2" placeholder="Confirm Password" />
                            </div>

                        </div>

                    </div>

                    <div className="footer">
                        <button >Register</button>
                        <br />
                        <NavLink to='./loginPage'>Already have an account? Login here</NavLink>
                    </div>

                </div>
            </form>
        );
    }
}