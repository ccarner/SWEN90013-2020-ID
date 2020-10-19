import React from "react";

import { getAllAdmins } from "../../API/loginAPI";
import LoadingSpinner from "../reusableComponents/loadingSpinner";
import PrimaryButton from "../reusableComponents/PrimaryButton";
import { getResultByUser } from "../../API/resultAPI";
import AdminConsole from "../AdminComponents/adminConsole";
import evaluateFeedback from "../RuleEngine/evaluateFeedback";
import ActionPlans from "../surveyComponents/actionPlans";
var APAlgorithms = require("../../SurveyJsons/actionPlanAlgorithm.json");


export default class UserInfo extends React.Component {
  constructor(props) {
    super();
    this.state = {
      userId: JSON.parse(localStorage.getItem("userContext")).userId,
      // token: localStorage.getItem("token"),
      history: null,
      historyTime: null,
      isAP: false
    };
  }

  handleSurveyStart = () => {
    window.location.replace(`/surveyComponent/surveyHome`);
  };

  handleHistory = async () => {
    let history = await getResultByUser(this.state.userId);
    let newSurvey = {}

    let latestSituationSurvey = this.getMostRecentSurveyByType(history, "My Situation");
    newSurvey["My Situation"] = latestSituationSurvey;
    newSurvey["My Safety"] = this.getMostRecentSurveyByType(history, "My Safety");
    newSurvey["My Priorities"] = this.getMostRecentSurveyByType(history, "My Priorities");

    localStorage.setItem("latestSurvey", JSON.stringify(newSurvey));
    let latestTime = new Date(JSON.parse(latestSituationSurvey.completedTime).time);
    this.setState({
      history: newSurvey,
      historyTime: latestTime.toString()
    });

    if (newSurvey["My Priorities"] !== null) {
      this.setState({
        isAP: true
      });
    }
  };

  getMostRecentSurveyByType = (history, surveyType) => {

    let maxDateTime = 0;
    let maxSurvey = null;

    history.forEach(function (thisSurvey) {
      let timeType = JSON.parse(thisSurvey.completedTime);
      if (timeType.type === surveyType) {
        if (timeType.time > maxDateTime) {
          maxDateTime = timeType.time;
          maxSurvey = thisSurvey;
        }
      }
    }
    );

    return maxSurvey;

  }


  // surveyAdapt = (surveyIn) => {
  //   let newSurvey = {}
  //   newSurvey.userId = surveyIn.userId;
  //   newSurvey.surveyId = surveyIn.surveyId;
  //   newSurvey.questions = surveyIn.questions;
  //   return newSurvey;
  // }

  componentDidMount = async () => {
    await this.handleHistory();
  }


  render() {
    const { historyTime, isAP } = this.state;

    if (isAP) {
      return (
        <div>
          <br /><br /><br />
          <h6>Based on your last result on:</h6>
          <h6> {Date(historyTime)} </h6>
          <ActionPlans isReview={"TRUE"} />
          {/* <PrimaryButton onClick={this.handleLogOut}>Log Out</PrimaryButton> */}
          {/* <PrimaryButton onClick={this.handleHistory}>
          Completion History
        </PrimaryButton>
        {history === null ? null : JSON.stringify(history)} */}

          {/* {localStorage.getItem("userType") === "admin" ? <AdminConsole /> : null} */}
        </div>
      );
    } else {
      return (
        <div>
          <br /><br /><br />
          <h6>Welcome, please complete the modules in order to see your Action Plan</h6>
          <PrimaryButton onClick={this.handleSurveyStart}>Start</PrimaryButton>
        </div>
      );

    }
  }
}
