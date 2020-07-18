import React from "react";
import { NavLink } from 'react-router-dom';
import { getSafetyQuestions, postingSurvey } from "../../API/surveyAPI";



export default class safetyQuestions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questionCount: null,
            numQuestions: 0,
            numSections: 0,
            results: {
                "userId": 1,
                "surveyId": 2,
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
            const dataIn = await getSafetyQuestions();
            this.setState({
                surveyFile: JSON.parse(dataIn["data"]["jsonStr"]),
                isLoaded: true,
                questionCount: 0,
                sectionCount: 0
            });
            console.log(999, this.state.surveyFile);
        } catch (err) {
            return err;
        }
    }

    componentDidMount() {
        this.fetchQuestions();
    }



    questionHandler(event) {
        const { surveyFile, questionCount, sectionCount } = this.state;
        var currentResults = this.state.results;
        // var questionID2 = "SurveyID:" + this.state.surveyFile.surveyId + " SectionID:" + this.state.sectionCount + " QuestionID:" + this.state.questionCount;

        currentResults["questions"].push({
            questionId: surveyFile.surveySections[sectionCount].questions[questionCount].questionId,
            questionText: surveyFile.surveySections[sectionCount].questions[questionCount].questionText,
            questionType: surveyFile.surveySections[sectionCount].questions[questionCount].questionType,
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
            isLoaded: false,
            surveyId: this.state.surveyFile.surveyId,
            sectionId: this.state.surveyFile.sectionId
        });

        var feedback = await postingSurvey(this.state.results);
        this.setState({
            actionPlan: feedback.data.data,
            isLoaded: true
        });

    }




    render() {
        const { isLoaded, surveyFile, questionCount, sectionCount, actionPlan, results } = this.state;

        if (!isLoaded) {
            return <div>Loading...</div>;
        } else if (actionPlan) {
            return (
                <div>
                    <h3 style={{ color: "purple" }}>Message from backend: {actionPlan}</h3>
                    <h5>Your Selections:</h5>
                    <div>
                        {results.questions.map(question =>
                            <div>
                                Question ID:{question.questionId}___Question Type:{question.questionType}<br />
                                Question Text:{question.questionText}<br />
                                Question Selection:{question.questionAnswer}<br /><br />
                            </div>
                        )}
                    </div>
                    <NavLink to="/surveyComponent/surveyHome">
                        <button >Back</button>
                    </NavLink>
                </div>
            );
        } else if (sectionCount >= surveyFile.surveySections.length) {
            return (
                <div>
                    <br /><br /><button onClick={this.submitHandler}>Submit Survey</button>
                </div>
            );
        } else {
            return (
                <div>

                    <div style={{ color: "purple" }}>
                        {surveyFile.surveySections[sectionCount].questions[questionCount].questionText}
                    </div>


                    {surveyFile.surveySections[sectionCount].questions[questionCount].questionType === "slider" ?
                        <div onClick={this.questionHandler}>
                            0<input type="range" min="0" max="10" />10
                        </div>
                        :

                        <div onChange={this.questionHandler}>

                            <label htmlFor="option1">{surveyFile.surveySections[sectionCount].questions[questionCount].selectionOptions[0]}:</label>
                            <input type="radio" name="questionResult" value="option1" /><br />
                            <label htmlFor="option2">{surveyFile.surveySections[sectionCount].questions[questionCount].selectionOptions[1]}:</label>
                            <input type="radio" name="questionResult" value="option2" /><br />
                            <label htmlFor="option3">{surveyFile.surveySections[sectionCount].questions[questionCount].selectionOptions[2]}:</label>
                            <input type="radio" name="questionResult" value="option3" /><br />
                        </div>}
                    <div>
                        <button onClick={this.submitHandler}>Submit Survey</button>
                    </div>



                </div>
            );
        }
    }
}