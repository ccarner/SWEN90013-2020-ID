import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class RelationshipSurvey extends Component {
    render() {
        return (
            <div className="container" style={{ padding: "100px" }}>
                <h2 style={{ color: "purple" }}>This page should contain the relationship survey</h2><br />


                <div style={{ padding: "10px" }}>
                    <NavLink to="/">
                        <button >Back Home</button>
                    </NavLink>
                </div >
            </div >



        );
    }
}