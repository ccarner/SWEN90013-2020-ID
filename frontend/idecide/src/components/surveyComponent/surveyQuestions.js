import React from "react";
import { NavLink } from 'react-router-dom';
import { postingSurvey } from "../../API/surveyAPI";
import Question from "./question";



export default class SurveyQuestions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: true,
            questionCount: 0,
            sectionCount: 0,
            surveySections: props.allSections,
            actionPlan: null,
            results: {
                "userId": 1,
                "surveyId": props.surveyFile.surveyId,
                "sectionId": "ALL",
                "completedTime": 99999,
                "questions": []
            }
        };
        this.questionHandler = this.questionHandler.bind(this);
    }



    questionHandler(received) {
        console.log(796, received, 796);

        const { questionCount, sectionCount, surveySections } = this.state;
        const currentQuestion = surveySections[sectionCount].questions[questionCount];

        var currentResults = this.state.results;

        currentResults["questions"].push({
            questionId: currentQuestion.questionId,
            questionText: currentQuestion.questionText,
            questionType: currentQuestion.questionType,
            questionAnswer: received
        })
        this.setState({
            results: currentResults
        });


        if (this.state.questionCount + 1 >= this.state.surveySections[this.state.sectionCount].questions.length) {
            if (sectionCount + 1 >= surveySections.length) {
                this.setState({
                    actionPlan: "FINISHED"
                })
            } else {
                this.setState({
                    sectionCount: this.state.sectionCount + 1,
                    questionCount: 0
                });
            }
        } else {
            this.setState({
                questionCount: this.state.questionCount + 1
            });
        }
    }



    submitHandler = async (event) => {

        this.setState({
            isLoaded: false
        });

        const feedback = await postingSurvey(this.state.results);
        this.setState({
            actionPlan: feedback.data.data,
            isLoaded: true
        });

    }


    completeHandler = () => {
        this.props.completeHandler(this.state.results);
    }


    render() {
        const { isLoaded, surveySections, questionCount, sectionCount, actionPlan } = this.state;
        const question = surveySections[sectionCount].questions[questionCount];
        if (!isLoaded) {
            return (<div>Loading...</div>);
        } else if (actionPlan) {
            return (
                <div>
                    {actionPlan === "FINISHED" ?
                        <div>
                            <button onClick={this.submitHandler}>Submit Survey</button>
                        </div>
                        :
                        <div>
                            <h3 style={{ color: "purple" }}>Message from the backend: <br />
                                {actionPlan}
                            </h3>
                            {/* <NavLink to="/surveyComponent/surveyHome"> */}
                            <button onClick={this.completeHandler}>Complete</button>
                            {/* </NavLink> */}
                        </div>}
                </div>
            );
        } else {
            return (
                <div>

                    <div className="container" style={{ padding: "50px" }}>
                        <h2 style={{ color: "purple" }}>{surveySections[sectionCount].sectionTitle}</h2>
                        <p style={{ color: "black" }}>{surveySections[sectionCount].sectionIntroduction}</p>
                    </div >
                    <Question handleQuestion={this.questionHandler} question={question} />

                </div>
            );
        }
    }
}