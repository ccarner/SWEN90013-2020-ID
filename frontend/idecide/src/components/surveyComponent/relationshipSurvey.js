import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class RelationshipSurvey extends Component {
    render() {
        return (
            <div className="container" style={{ padding: "50px" }}>
                <h2 style={{ color: "purple" }}>My Relationship Health:</h2>

                <p style={{ color: "black" }}>
                    This section of I-DECIDE walks you through some<br />
                    questions and activities to help you think about the health<br />
                    of your relationship with the partner or ex-partner who<br />
                    has made you feel afraid or unsafe.
                </p>



                <div style={{ padding: "10px" }}>
                    <NavLink to="/surveyComponent/relationQuestions">
                        <button >Next</button>
                    </NavLink>
                </div >
            </div >



        );
    }
}