import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import "../../CSS/survey.css";

export default class SurveyHome extends Component {
    render() {
        return (
            <div className="container" style={{ padding: "100px" }}>
                <h2 style={{ color: "purple" }}>Help Me Decide</h2><br />
                <h6>There are three modules below.</h6>
                <h6>The 'My Relationship' module is optional,</h6>
                <h6>but you must complete 'Safety' and 'Priorities' before you can continue.</h6>
                <h6>Click 'Next' in the bottom right corner when you are finished.</h6>

                <NavLink to="/surveyComponent/relationshipSurvey">
                    <img src={require("./iconRelationshipSurvey.png")} alt="Relationship Survey Icon" />
                </NavLink>
                <NavLink to="/surveyComponent/safetySurvey" style={{ padding: "10px" }}>
                    <img src={require("./iconSafetySurvey.png")} alt="Safety Survey Icon" />
                </NavLink>
                <NavLink to="/surveyComponent/prioritiesSurvey">
                    <img src={require("./iconPrioritiesSurvey.png")} alt="Priorities Survey Icon" />
                </NavLink>

                <div style={{ padding: "10px" }}>
                    <NavLink to="/">
                        <button >Next</button>
                    </NavLink>
                </div >
            </div >



        );
    }
}