import React from "react";
import { Redirect } from 'react-router-dom';
import { getRelationQuestions } from "../../API/surveyAPI";



export default class RelationQuestions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questionCount: null,
            numQuestions: null,
            partCount: 0,
            questions: [],
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
            numQuestions: (dataIn["data"]["parts"][this.state.partCount]["questions"]).length
        });
        console.log(999, this.state.numQuestions);
    }

    addCount() {
        if (this.state.questionCount > 1) {
            this.setState({ isCompleted: true });
        } else {
            this.setState({ questionCount: this.state.questionCount + 1 });
        }
    }

    componentDidMount() {
        this.addCount();
        this.fetchQuestions();
    }


    render() {
        const { isLoaded, questions, questionCount, partCount, isCompleted } = this.state;
        if (isCompleted) {
            return <Redirect to="/surveyComponent/surveyHome" />;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div>
                    {/* <div>{questions.map(question =>
                        <div>{question.content}<span>:</span>{question.description1}</div>)}
                    </div> */}
                    <div>
                        {this.state.questionCount == this.state.numQuestions}<br />
                        {questions[questionCount].description1}:{this.state.questions.length}
                    </div>
                    <div>
                        <button onClick={this.addCount}>Next Question</button>
                    </div>

                </div>
            );
        }
    }
}