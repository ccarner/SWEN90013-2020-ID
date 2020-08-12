import React, { Component } from 'react';
import SurveyControl from "./surverControl";
import "../../CSS/survey.css";
import { MDBBtn } from "mdbreact";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import CardDesk from "../CardDeskCompoent/cardDesk";

export default class SurveyHome extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isStarted: false,
            showCardDesk: false,
            currentComponent: "HOME"
        };
    }


    startSurvey = (surveyType) => {
        this.setState({
            currentComponent: surveyType.target.id,
            isStarted: true
        });
    }

    completeHandler = (surveyType) => {

        if (surveyType === "RELATIONSHIP") {
            this.setState({ relationshipSurveyDone: true });
        } else if (surveyType === "SAFETY") {
            this.setState({ safetySurveyDone: true });
        } else if (surveyType === "PRIORITIS") {
            this.setState({ prioritiesSurveyDone: true });
        }

        this.setState({
            currentComponent: "HOME",
            isStarted: false
        });
    }

    handleCardDesk = () => {
        this.setState({
            showCardDesk: !this.state.showCardDesk
        });
    }

    render() {

        const { isStarted, currentComponent, showCardDesk } = this.state;

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


                    <div>
                        <div className="surveyIcon">
                            {localStorage.getItem("RELATIONSHIP") ? <img src={require("./iconCompleted.png")}
                                width="155px" height="140px" alt="completed_Icon" />
                                :
                                <img src={require("./iconRelationshipSurvey.png")} alt="Relationship_Survey_Icon"
                                    onClick={this.startSurvey} id="RELATIONSHIP" />}
                        </div>

                        <div className="surveyIcon">
                            {localStorage.getItem("SAFETY") ? <img src={require("./iconCompleted.png")}
                                width="155px" height="140px" alt="completed_Icon" />
                                :
                                <img src={require("./iconSafetySurvey.png")} alt="Safety_Survey_Icon"
                                    onClick={this.startSurvey} id="SAFETY" />}
                        </div>

                        <div className="surveyIcon">
                            {localStorage.getItem("PRIORITIS") ? <img src={require("./iconCompleted.png")}
                                width="155px" height="140px" alt="completed_Icon" />
                                :
                                <img src={require("./iconPrioritiesSurvey.png")} alt="Priorities_Survey_Icon"
                                    onClick={this.startSurvey} id="PRIORITIS" />}
                        </div>
                    </div>

                    {/* ########## BELOW For demonstration purpose only ##########*/}
                    <button onClick={this.handleCardDesk}>Card desk(DEMO) </button>
                    {showCardDesk ?
                        <CardDesk />
                        :
                        null}
                    {/* ########## ABOVE For demonstration purpose only ##########*/}


                    {(localStorage.getItem("SAFETY") && localStorage.getItem("PRIORITIS")) ?
                        < div ><button >Next(To Be Done in Sprint2)</button></div >
                        : null
                    }
                </div >
            );
        }
    }
}
