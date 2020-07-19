import React, { Component } from 'react';
import { getSafetyQuestions, postingSurvey } from "../../API/surveyAPI";
import RelationQuestions from "./relationshipQuestions";

export default class SafetySurvey extends Component {

    constructor(props) {
        super(props);
        this.state = {
            results: {
                "userId": 1,
                "surveyId": null,
                "sectionId": null,
                "completedTime": 99999,
                "questions": []
            },
            isStarted: false,
            actionPlan: null,
            surveyFile: null,
            isLoaded: false,
        };

        this.fetchQuestions = this.fetchQuestions.bind(this);
    }

    handleStart = () => {
        this.setState({
            isStarted: !this.state.isStarted
        })
    }


    async fetchQuestions() {
        try {
            const dataIn = await getSafetyQuestions();

            console.log(775, dataIn, 775);
            this.setState({
                surveyFile: JSON.parse(dataIn["data"]["jsonStr"]),
                isLoaded: true
            });
            console.log(777, this.state.surveyFile, 777);
        } catch (err) {
            return err;
        }
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
                            <RelationQuestions surveyFile={surveyFile} allSections={surveyFile.surveySections} />
                        </div>
                        :
                        <div>
                            <div className="container" style={{ padding: "50px" }}>
                                <h2 style={{ color: "purple" }}>{surveyFile.surveyTitle}</h2>
                                <p style={{ color: "black" }}>{surveyFile.surveyIntroduction}</p>
                            </div >
                            <div style={{ padding: "10px" }}>
                                <button onClick={this.handleStart}>Next</button>
                            </div >
                        </div>
                    }
                </div>
            );
        }
    }
}