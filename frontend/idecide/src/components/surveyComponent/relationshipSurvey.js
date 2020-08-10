import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { getRelationQuestions, postingSurvey } from "../../API/surveyAPI";
import RelationQuestions from "./relationshipQuestions";
import { MDBBtn } from "mdbreact";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";

export default class RelationshipSurvey extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionCount: null,
      numQuestions: 0,
      numSections: 0,
      results: {
        userId: 1,
        surveyId: null,
        sectionId: null,
        completedTime: 99999,
        questions: [],
      },
      isStarted: false,
      actionPlan: null,
      sectionCount: null,
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
      isStarted: !this.state.isStarted,
    });
  };

  async fetchQuestions() {
    try {
      const dataIn = await getRelationQuestions();

      console.log(775, dataIn, 775);
      this.setState({
        surveyFile: JSON.parse(dataIn["data"]["jsonStr"]),
        isLoaded: true,
        questionCount: 0,
        sectionCount: 0,
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
    const {
      isLoaded,
      surveyFile,
      isStarted,
      questionCount,
      sectionCount,
      actionPlan,
      results,
    } = this.state;
    if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          <div className="container" style={{ padding: "50px" }}>
            <h2 style={{ color: "purple" }}>{surveyFile.surveyTitle}</h2>
            <p style={{ color: "black" }}>{surveyFile.surveyIntroduction}</p>
          </div>

          {isStarted ? (
            <RelationQuestions
              surveyFile={surveyFile}
              allSections={surveyFile.surveySections}
            />
          ) : (
            <div style={{ padding: "10px" }}>
              <MDBBtn gradient="purple" onClick={this.handleStart}>
                Next
              </MDBBtn>
            </div>
          )}
        </div>
      );
    }
  }
}
