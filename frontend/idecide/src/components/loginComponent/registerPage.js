import React from 'react';
import { MDBBtn } from 'mdbreact';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import { registerUser } from '../../API/loginAPI';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, Divider, Grid, TextField, Box, Button, Typography } from '@material-ui/core';

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
			response: 'Nothing yet'
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
			alert('Sign up Successful!');
		} else {
			alert('Sign up Failed');
		}
		window.location.replace('/');
	}

	render() {
		return (
			<div style={{ padding: '5%' }}>
				<h1 className="text-center" style={{ color: '#9572A4' }}>
					Welcome to I-Decide
				</h1>
				<br />
				{/** <form onSubmit={this.handleSubmit}>
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
                  <label htmlFor="partnerGender">Gender: </label>
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
              </form>
            </div>
          </div>
        </form>*/}

        {/** new register UI */}
				<form onSubmit={this.handleSubmit}>
					<Card>
						<CardHeader title="Sign Up" />
						<Divider />
						<CardContent>
							<Typography color="textSecondary">
								Please input the following fields to sign up, fields with * are required.
							</Typography>
							<Box p={1} />
							<TextField
								id="username"
								required
								style={{ width: '50%' }}
								type="text"
								value={this.state.username}
								name="username"
								label="User Name"
								variant="outlined"
								placeholder="Please input username here."
							/>
							<Box p={1} />
							<TextField
								id="password"
								required
								style={{ width: '50%' }}
								type="password"
								name="password"
								value={this.state.password}
								label="Password"
								variant="outlined"
								placeholder="Please input password with numbers and at lease 1 uppercase and 1 lowercase letter."
							/>
							<Box p={1} />
							<TextField
								id="email"
								style={{ width: '50%' }}
								type="text"
								value={this.state.email}
								name="email"
								label="Email"
								variant="outlined"
								placeholder="Please input your email here."
							/>
							<Box p={1} />
							<TextField
								id="phoneNumber"
								style={{ width: '50%' }}
								type="text"
								value={this.state.phoneNumber}
								name="phoneNumber"
								label="Phone Number"
								variant="outlined"
								placeholder="Please input your phone number here."
							/>
							<Box p={1} />
							<TextField
								id="postcode"
								style={{ width: '50%' }}
								type="text"
								value={this.state.postcode}
								name="postcode"
								label="Post Code"
								variant="outlined"
								placeholder="Please input the post code here."
							/>
						</CardContent>
						<Typography>
							Already have an account?{' '}
							<Link
								to={{
									pathname: '/loginComponent/loginPage',
									state: { buttonClass: this.props.classes }
								}}
							>
								Log In
							</Link>
						</Typography>
						<CardContent>
							<Button
								className={this.props.location.state.buttonClass}
								style={{ width: '50%' }}
								type="submit"
								onSubmit={this.handleSubmit}
							>
								Sign Up
							</Button>
						</CardContent>
					</Card>
				</form>
			</div>
		);
	}
}
