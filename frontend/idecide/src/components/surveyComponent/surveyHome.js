import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import SurveyControl from "./surverControl";
import "../../CSS/survey.css";

export default class SurveyHome extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isStarted: false,
            currentComponent: "HOME"
        };
    }


    startSurvey = (surveyType) => {
        this.setState({
            currentComponent: surveyType.target.id,
            isStarted: true
        });
    }

    completeHandler = (receivedSurveyType) => {
        this.setState({
            currentComponent: "HOME",
            isStarted: false
        })
    }

    render() {

        const { isStarted, currentComponent } = this.state;

        if (isStarted) {
            return (
                <SurveyControl surveyType={currentComponent} completeHandler={this.completeHandler} />
            );
        } else {
            return (
                <div className="container" style={{ padding: "100px" }}>
                    <h2 style={{ color: "purple" }}>Help Me Decide</h2><br />
                    <h6>There are three modules below.</h6>
                    <h6>The 'My Relationship' module is optional,</h6>
                    <h6>but you must complete 'Safety' and 'Priorities' before you can continue.</h6>
                    <h6>Click 'Next' in the bottom right corner when you are finished.</h6>

                    <img src={require("./iconRelationshipSurvey.png")} alt="Relationship_Survey_Icon"
                        id="RELATIONSHIP" onClick={this.startSurvey} />

                    <img src={require("./iconSafetySurvey.png")} alt="Safety_Survey_Icon"
                        id="SAFETY" onClick={this.startSurvey} />

                    <img src={require("./iconPrioritiesSurvey.png")} alt="Priorities_Survey_Icon"
                        id="PRIORITIS" onClick={this.startSurvey} />


                    {/* <div style={{ padding: "10px" }}>
                        <NavLink to="/">
                            <button >Next</button>
                        </NavLink>
                    </div > */}
                </div >
            );
        }
    }
}