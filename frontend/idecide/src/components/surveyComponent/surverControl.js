import React, { Component } from 'react';
import { getSurveyQuestions } from "../../API/surveyAPI";
import SurveyQuestions from "./surveyQuestions";

export default class SurveyControl extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            isStarted: false,
            surveyType: props.surveyType
        };
    }

    handleStart = () => {
        this.setState({
            isStarted: !this.state.isStarted
        })
    }


    fetchQuestions = async () => {
        try {
            const dataIn = await getSurveyQuestions(this.state.surveyType);
            this.setState({
                surveyFile: JSON.parse(dataIn["data"]["jsonStr"]),
                isLoaded: true
            });
        } catch (err) {
            return err;
        }
    }


    completeHandler = (receivedResults) => {
        localStorage.setItem(this.state.surveyType, receivedResults);
        this.props.completeHandler(this.state.surveyType);
    }

    componentDidMount() {
        this.fetchQuestions();
    }


    render() {
        const { isLoaded, surveyFile, isStarted } = this.state;
        if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div>
                    {isStarted ?
                        <div>
                            <SurveyQuestions surveyFile={surveyFile} allSections={surveyFile.surveySections} completeHandler={this.completeHandler} />
                        </div>
                        :
                        <div>
                            <div className="container" style={{ padding: "50px" }}>
                                <h2 style={{ color: "purple" }}>{surveyFile.surveyTitle}</h2>
                                <p style={{ color: "black" }}>{surveyFile.surveyIntroduction}</p>
                            </div >
                            <div style={{ padding: "10px" }}>
                                <button onClick={this.handleStart}>Start</button>
                            </div >
                        </div>
                    }
                </div>
            );
        }
    }
}