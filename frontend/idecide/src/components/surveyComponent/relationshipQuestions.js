import React from "react";
import { NavLink } from 'react-router-dom';
import { getRelationQuestions, postingSurvey } from "../../API/surveyAPI";



export default class RelationQuestions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questionCount: null,
            numQuestions: 0,
            numSections: 0,
            results: {
                "userId": 99999,
                "surveyId": 1,
                "sectionId": 1,
                "completedTime": 99999,
                "questions": []
            },
            actionPlan: null,
            sectionCount: null,
            surveyFile: null,
            isCompleted: false,
            isLoaded: false,
        };
        this.questionHandler = this.questionHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
        this.fetchQuestions = this.fetchQuestions.bind(this);
    }


    async fetchQuestions() {
        try {
            const dataIn = await getRelationQuestions();
            this.setState({
                surveyFile: JSON.parse(dataIn["data"]["jsonStr"]),
                isLoaded: true,
                questionCount: 0,
                sectionCount: 0

            });
        } catch (err) {
            return err;
        }
    }

    componentDidMount() {
        this.fetchQuestions();
    }



    questionHandler(event) {

        var currentResults = this.state.results;
        var questionID = "SurveyID:" + this.state.surveyFile.surveyId + " SectionID:" + this.state.sectionCount + " QuestionID:" + this.state.questionCount;
        // currentResults["questions"][questionID] = event.target.value;
        currentResults["questions"].push({
            questionId: questionID,
            questionAnswer: event.target.value
        })
        this.setState({
            results: currentResults
        });


        if (this.state.questionCount + 1 >= this.state.surveyFile.surveySections[this.state.sectionCount].questions.length) {
            this.setState({
                sectionCount: this.state.sectionCount + 1,
                questionCount: 0
            });
        } else {
            this.setState({
                questionCount: this.state.questionCount + 1
            });
        }
    }

    async submitHandler(event) {

        this.setState({
            isLoaded: false
        });

        var feedback = await postingSurvey(this.state.results);
        this.setState({
            actionPlan: feedback.data.data,
            isLoaded: true
        });

    }




    render() {
        const { isLoaded, surveyFile, questionCount, sectionCount, actionPlan } = this.state;

        if (!isLoaded) {
            return <div>Loading...</div>;
        } else if (actionPlan) {
            return (
                <div>
                    <h2>Your Selections:</h2>
                    <div>
                        {this.state.results.questions.map(question => <div>{question.questionId}:{question.questionAnswer}</div>)}
                    </div><br /><br /><br />
                    <h3>{actionPlan}</h3>
                    <NavLink to="/surveyComponent/surveyHome">
                        <button >Back</button>
                    </NavLink>
                </div>
            );
        } else if (sectionCount >= surveyFile.surveySections.length) {
            return (
                <div>
                    <button onClick={this.submitHandler}>Submit Survey</button>
                </div>
            );
        } else {
            return (
                <div>

                    <div style={{ color: "purple" }}>
                        {surveyFile.surveySections[sectionCount].questions[questionCount].questionText}
                    </div>

                    <div onChange={this.questionHandler}>
                        <label htmlFor="option1">option1:</label>
                        <input type="radio" name="questionResult" value="option1" /><br />
                        <label htmlFor="option2">option2:</label>
                        <input type="radio" name="questionResult" value="option2" /><br />
                        <label htmlFor="option3">option3:</label>
                        <input type="radio" name="questionResult" value="option3" /><br />
                    </div>

                    <div>
                        <button onClick={this.submitHandler}>Submit Survey</button>
                    </div>



                </div>
            );
        }
    }
}