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
            <div>
                <form onSubmit={this.handleQuestion}>
                    <div style={{ color: "purple" }}>
                        {question.questionText}
                    </div>

                    {question.questionType === "slider" ?
                        <div className="sliderContainer">
                            <input className="slider" name="option" type="range" min="1" max="10" />
                        </div>
                        : question.questionType === "singleSelection" ?
                            <div onClick={this.questionHandler}>
                                <label htmlFor="option1">{options[0]}:</label>
                                <input type="radio" name="questionResult" value="option1" /><br />
                                <label htmlFor="option2">{options[1]}:</label>
                                <input type="radio" name="questionResult" value="option2" /><br />
                                <label htmlFor="option3">{options[2]}:</label>
                                <input type="radio" name="questionResult" value="option3" /><br />
                                <label htmlFor="option4">{options[3]}:</label>
                                <input type="radio" name="questionResult" value="option4" /><br />
                                <label htmlFor="option5">{options[4]}:</label>
                                <input type="radio" name="questionResult" value="option5" /><br />
                                {/* <br /><button >Rather not to say</button><br /> */}
                            </div>
                            :
                            "Unrecognized Question Type"
                    }
                    <button>NEXT</button>
                </form>
            </div>
        );

    }
}