import React from "react";


export default class Question extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    handleQuestion = (event) => {
        // the following call will stop the form from submitting
        event.preventDefault();

        // get the data from the form
        const dataForm = new FormData(event.target);
        var formObject = {};
        dataForm.forEach((value, key) => { formObject[key] = value; });

        this.props.handleQuestion(formObject);
    }


    render() {
        const question = this.props.question;
        const options = question.selectionOptions;
        return (
            <div className="questionContainer" >
                <form onSubmit={this.handleQuestion}>
                    <div style={{ color: "purple" }}>
                        {question.questionText}
                    </div>

                    {question.questionType === "slider" ?
                        <div className="sliderContainer">
                            0<input className="slider" name="option" type="range" min="1" max="10" />10

                        </div>
                        : question.questionType === "singleSelection" ?

                            <div className="radio-toolbar">
                                <input type="radio" id="option0" name="questionResult" value="option0" />
                                <label htmlFor="option0">{options[0]}</label>

                                <input type="radio" id="option1" name="questionResult" value="option1" />
                                <label htmlFor="option1">{options[1]}</label>

                                <input type="radio" id="option2" name="questionResult" value="option2" />
                                <label htmlFor="option2">{options[2]}</label>

                                <input type="radio" id="option3" name="questionResult" value="option3" />
                                <label htmlFor="option3">{options[3]}</label>

                                <input type="radio" id="option4" name="questionResult" value="option4" />
                                <label htmlFor="option4">{options[4]}</label>


                            </div>

                            :
                            "Unrecognized Question Type"
                    }
                    <button>NEXT</button>
                </form >
            </div >
        );

    }
}