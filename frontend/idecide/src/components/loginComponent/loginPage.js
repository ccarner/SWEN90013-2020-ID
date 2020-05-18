import React from "react";

import { loginUser } from "../../API/loginAPI";
import { NavLink } from 'react-router-dom';

export default class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

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

        await loginUser(userObject);
        window.location.replace("/");
    }

    render() {

        return (
            <form onSubmit={this.handleSubmit}>
                <div>
                    <div className="header">Login</div>
                    <div className="content">

                        <div className="form">

                            <div >
                                <label htmlFor="email">Email Address: </label>
                                <input type="text" name="email" placeholder="Email Address" />
                            </div>



                            <div>
                                <label htmlFor="password">Password: </label>
                                <input type="password" name="password" placeholder="Password" />
                            </div>

                        </div>

                    </div>

                    <div className="footer">
                        <button >Login</button>
                        <br />

                        <NavLink to='./registerPage'>Signup here</NavLink>
                    </div>

                </div>
            </form>
        );
    }
}