import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class SurveyComplte extends Component {
    render() {
        return (
            <div className="container" style={{ padding: "100px" }}>
                <h2 style={{ color: "purple" }}>Congradulations !!!</h2><br />
                <div style={{ padding: "10px" }}>
                    <NavLink to="/surveyComponent/surveyHome">
                        <button >Back</button>
                    </NavLink>
                </div >
            </div >
        );
    }
}