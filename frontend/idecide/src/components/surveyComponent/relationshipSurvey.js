import React, { Component } from 'react';
import { getRelationQuestions, postingSurvey } from "../../API/surveyAPI";
import RelationQuestions from "./relationshipQuestions";

export default class RelationshipSurvey extends Component {

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
            isCompleted: false,
            isLoaded: false,
        };
        // this.questionHandler = this.questionHandler.bind(this);
        // this.submitHandler = this.submitHandler.bind(this);
        this.fetchQuestions = this.fetchQuestions.bind(this);
    }

    handleStart = () => {
        this.setState({
            isStarted: !this.state.isStarted
        })
    }


    async fetchQuestions() {
        try {
            const dataIn = await getRelationQuestions();
            this.setState({
                surveyFile: JSON.parse(dataIn["data"]["jsonStr"]),
                isLoaded: true
            });
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
                        <RelationQuestions surveyFile={surveyFile} allSections={surveyFile.surveySections} />
                        :

                        <div>
                            <div className="container" style={{ padding: "50px" }}>
                                <h2 style={{ color: "purple" }}>
                                    {surveyFile.surveyTitle}
                                </h2>
                                <p style={{ color: "black" }}>
                                    {surveyFile.surveyIntroduction}
                                </p>
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