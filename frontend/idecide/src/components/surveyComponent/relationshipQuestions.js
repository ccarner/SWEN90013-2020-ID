import React from "react";
import { Redirect } from 'react-router-dom';
import { getRelationQuestions } from "../../API/surveyAPI";



export default class RelationQuestions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questionCount: null,
            numQuestions: 0,
            partCount: 0,
            questions: [1, 2, 3],
            isCompleted: false,
            isLoaded: false,
        };
        this.addCount = this.addCount.bind(this);
    }

    async fetchQuestions() {
        const dataIn = await getRelationQuestions();
        this.setState({
            questions: dataIn["data"]["parts"][this.state.partCount]["questions"],
            isLoaded: true,
            questionCount: 0,

        });
    }

    addCount() {
        this.setState({ questionCount: this.state.questionCount + 1 });
    }

    componentDidMount() {
        this.addCount();
        this.fetchQuestions();
    }


    render() {
        const { isLoaded, questions, questionCount, numQuestions, isCompleted } = this.state;
        if ((isLoaded) && (questionCount >= questions.length)) {
            return <Redirect to="/surveyComponent/surveyComplete" />;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div>
                    <div>
                        <h1 style={{ color: "purple" }}>Relationship Survey</h1><br />
                    </div>
                    <div>
                        <h3>{questions[questionCount].description1}</h3>
                        <p>{questions[questionCount].description2}</p><br />
                    </div>
                    <div>
                        <h3 style={{ color: "purple" }}>{questions[questionCount].content}</h3>
                        <label for="surveyQuestion">Points (between 0 and 10):</label><br />
                        <input type="range" name="surveyQuestion" min="0" max="10" />

                    </div><br />
                    <div>
                        <button onClick={this.addCount}>Confirm, Next Question</button>
                    </div>

                </div>
            );
        }
    }
}