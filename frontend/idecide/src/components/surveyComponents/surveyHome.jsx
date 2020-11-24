import React, { Component } from "react";
import SurveyControl from "./surveyControl";
import "../../CSS/survey.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import LoadingSpinner from "../reusableComponents/loading";
import {
  getUserResults,
  getAllSurveys,
  getStaticImageUrlFromName,
} from "../../API/surveyAPI";
import { anonymousUser } from "../../API/loginAPI";
import SurveySelectionButton from "./surveySelectionButton";
import SurveyResultsPage from "./surveyResultsPage";
import ActionPlans from "./actionPlans";
import { Card, Button } from "react-bootstrap";
import PrimaryButton from "../reusableComponents/PrimaryButton";
import { Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

import userContext from "../../contexts/userContext";
import ScrollingSurveyView from "./scrollingSurveyView";

import { Link } from "react-router-dom";
import SaveIcon from "@material-ui/icons/Save";

import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import SurveyHomeIntroduction from "./surveyHomeIntroduction";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ViewAndFooter from "./../reusableComponents/viewAndFooter";

/**
 * The parent component of all survey pages. This component:
 * a) fetches all available surveys from the server
 * b) displays all available surveys in a UI
 * c) fetches all previous completions if logged in (INCOMPLETE)
 * d) displays all previous completions in a UI for user to review
 * Once a survey is selected, the ID is passed to a SurveyControl. SurveyHome
 * doesn't fetch the survey itself or post the results.
 */
export default class SurveyHome extends Component {
  // allows us to use this.context to get user context details
  static contextType = userContext;

  constructor(props) {
    super();

    //load in previous completions from localStorage
    // let previousCompletions = localStorage.getItem("prevCompletions");
    const previousState = localStorage.getItem("stepperState");
    // if restoring a save, skip to the action plan if done with surveys

    // this will now be built INTO THE SURVEY ITSELF as 'surveyDisplayOrder'
    // let previousNextSurvey = localStorage.getItem("nextSurvey");
    //this.surveyOrder = ["My Situation", "My Safety", "Action Plan"];
    // this.surveyOrder = [
    //   "My Situation",
    //   "My Safety",
    //   "My Priorities",
    //   "I-Decide Feedback",
    //   "Action Plan",
    // ]; // order that surveys need to be completed in

    this.state = {
      // nextSurvey:
      //   previousCompletions === null ? 0 : parseInt(previousNextSurvey), // index of next survey to complete, from the surveyOrder array
      loaded: false,
      actionPlan: "",
      currentState: previousState ? previousState : "introduction", // ["introduction","menu","survey","completion", "actionPlan"]
      currentSurveyId: -1, // when in "survey" state, ID of current survey
      allSurveys: {}, // pulled from the API, list of surveys available
    };
    this.componentDidMount = this.componentDidMount.bind(this);
    this.startSurvey = this.startSurvey.bind(this);
    this.surveysCompletionStatus = this.surveysCompletionStatus.bind(this);
    this.getCurrentStep = this.getCurrentStep.bind(this);
  }

  getCurrentStep() {
    switch (this.state.currentState) {
      case "introduction":
        return 0;
      case "menu":
        return 1;
      case "survey":
        return 1;
      case "completion":
        return 1;
      case "actionPlan":
        return 2;
      default:
        return 0;
    }
  }

  // TODO need to update this to use surveyDisplayOrder rather than ID, but for now using IDs...
  // rather than just when they were uploaded... note that the display order is important BEFORE
  // passing into function, since it assumes its in correct order when receiving the array
  //takes an array of surveyIds (in the order they should be displayed/completed), and returns an object of statuses:
  // eg {"1":"Completed","2":"Next","3": "Locked"}
  surveysCompletionStatus(surveyIds) {
    const previousCompletions = JSON.parse(
      localStorage.getItem("prevCompletions")
    );

    var previousSurveyWasComplete = true;
    var returnObj = {};
    for (const surveyId of surveyIds) {
      if (previousCompletions && previousCompletions.hasOwnProperty(surveyId)) {
        returnObj[surveyId] = "Completed";
        previousSurveyWasComplete = true;
      } else if (previousSurveyWasComplete) {
        returnObj[surveyId] = "Next";
        previousSurveyWasComplete = false;
      } else {
        returnObj[surveyId] = "Locked";
        previousSurveyWasComplete = false;
      }
    }
    return returnObj;
  }

  getSurveyImage(survey) {
    if (survey.surveyImageName) {
      return getStaticImageUrlFromName(survey.surveyImageName);
    } else {
      return getStaticImageUrlFromName(survey.surveyId + ".png");
    }
  }

  //returns if all surveys are complete so can show action plan
  allSurveysComplete() {
    if (!this.state.loaded) {
      return false;
    }
    //Improvement: factor out all of the parsing of localstorage to put this into state
    // But need to make sure setState when the previous completions change...

    let finishedCount = 0;
    const previousCompletions = JSON.parse(
      localStorage.getItem("prevCompletions")
    );
    for (const survey of this.state.allSurveys) {
      if (
        !previousCompletions ||
        !previousCompletions.hasOwnProperty(survey.surveyId)
      ) {
        // return false;
        // If a survey is yet to be finished, do not count
      } else {
        finishedCount = finishedCount + 1;
      }
    }
    if (finishedCount >= (this.state.allSurveys.length - 1)) {
      return true;
    } else {
      return false;
    }
  }

  async componentDidMount() {
    if (!this.context.userContext.userId) {

      // "User has not logged in, no userId provided, log in anonymously"
      await anonymousUser();
    }
    var surveys = await getAllSurveys();

    var allSurveys = surveys.data;

    allSurveys.forEach((survey) => {
      if (!survey.surveyDisplayOrder) {
        //just give an order of 10
        survey.surveyDisplayOrder = 10;
      }
    });

    allSurveys.sort((x, y) => {
      return x.surveyDisplayOrder - y.surveyDisplayOrder;
    });

    this.setState({
      allSurveys: allSurveys,
      loaded: true,
    });

    if (this.allSurveysComplete()) {
      this.setState({ currentState: "actionPlan" });
    }
  }

  startSurvey(surveyId) {
    this.setState({
      currentState: "survey",
      currentSurveyId: surveyId,
    });
  }

  returnHomeCallback = () => {
    this.setState({ currentState: "menu" });
  };

  handleCardDesk = () => {
    this.setState({
      showCardDesk: !this.state.showCardDesk,
    });
  };

  render() {
    let userContext = this.context;
    let userIsAnon = userContext.userType === "anon";

    var renderElements = []; // array of elements to be returned from render()
    var footer = null; // elements to be rendered as a fixed bottom bar
    const { currentState } = this.state;
    const currentStep = this.getCurrentStep();

    const steps = ["Introduction", "Modules", "Action Plan"];

    if (this.state.loaded) {
      var completionStatus = this.surveysCompletionStatus(
        this.state.allSurveys.map((survey) => survey.surveyId)
      );
    }

    // render the stepper
    if (["introduction", "menu", "actionPlan"].indexOf(currentState) > -1) {
      renderElements.push(
        <Card style={{ flexDirection: "row", justifyContent: "center" }}>
          <Stepper activeStep={currentStep} style={{ minWidth: "80%" }}>
            {steps.map((label, index) => {
              return (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
        </Card>
      );
    }
    if (currentState === "introduction") {
      renderElements.push(
        <SurveyHomeIntroduction
          handleNext={() => {
            this.setState({ currentState: "menu" });
            localStorage.setItem("stepperState", "menu");
          }}
        />
      );
    }

    if (currentState === "survey") {
      renderElements.push(
        <SurveyControl
          returnHome={this.returnHomeCallback}
          surveyId={this.state.currentSurveyId}
          userId={this.context.userContext.userId}
          completeHandler={() => { }}
        />
      );
    } else if (currentState === "menu" && this.state.loaded) {
      renderElements.push(
        <Grid
          container
          style={{
            alignSelf: "center",
            alignItems: "center",
            justifyContent: "center",
            // padding: "2em",
            width: "100vw",
            flexDirection: "column",
            flexWrap: "nowrap",
          }}
        >
          <div style={{ padding: "1em" }}>
            <h2
              className="text-center"
              style={{ color: "white", margin: "0.5em" }}
            >
              Help Me Decide
            </h2>
            <Typography style={{ color: "white" }} gutterBottom variant="h5">
              Completing the modules below will help us better understand your
              situation so we can generate a personalised action plan for you.
            </Typography>
          </div>

          <ScrollingSurveyView
            allSurveys={this.state.allSurveys}
            getSurveyImage={this.getSurveyImage}
            completionStatus={completionStatus}
            startSurvey={this.startSurvey}
          />
        </Grid>
      );
      // } else if (currentState === "completion") {
      //   //TODO: no longer need to show 'previous completions', remove this.
      //   //viewing a previous attempt
      //   //different from when we JUST completed a survey, which is rendered in the surveyControl component
      //   renderElements.push(
      //     <SurveyResultsPage returnHome={this.returnHomeCallback} />
      //   );
    } else if (currentState === "actionPlan") {
      renderElements.push(<ActionPlans />);
    } else if (currentState !== "introduction") {
      renderElements.push(<LoadingSpinner />);
    }

    if (!this.allSurveysComplete() && this.state.currentState === "menu") {
      // renderElements.push(
      //   <Card style={{ position: "fixed", bottom: 0, width: "100%" }}>
      //     <div
      //       style={{
      //         display: "flex",
      //         flexDirection: "row",
      //         justifyContent: "space-around",
      //       }}
      //     >
      //       <PrimaryButton
      //         disabled={!userIsAnon}
      //         onClick={() => {
      //           this.props.history.push("/loginComponent/registerPage");
      //         }}
      //       >
      //         {userIsAnon ? (
      //           <React.Fragment>
      //             Save your Progress &nbsp; <SaveIcon />
      //           </React.Fragment>
      //         ) : (
      //           <React.Fragment>
      //             Your Progress is being saved <SaveIcon />
      //           </React.Fragment>
      //         )}
      //       </PrimaryButton>
      //     </div>
      //   </Card>
      // );
      footer = (
        <Card style={{ width: "100%" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            <PrimaryButton
              disabled={!userIsAnon}
              onClick={() => {
                this.props.history.push("/loginComponent/registerPage");
              }}
            >
              {userIsAnon ? (
                <React.Fragment>
                  Save your Progress &nbsp; <SaveIcon />
                </React.Fragment>
              ) : (
                  <React.Fragment>
                    Your Progress is being saved <SaveIcon />
                  </React.Fragment>
                )}
            </PrimaryButton>
          </div>
        </Card>
      );
    } else if (this.state.currentState === "menu") {
      // renderElements.push(
      footer = (
        <Card style={{ width: "100%" }}>
          <Card.Body>
            <PrimaryButton
              className={"pulsing"}
              onClick={() => {
                this.setState({ currentState: "actionPlan" });
                localStorage.setItem("stepperState", "actionPlan");
              }}
              style={{ width: "70%", borderRadius: "10em", margin: "0px" }}
            >
              View your Action Plan
            </PrimaryButton>
          </Card.Body>
        </Card>
      );
      // );
    }


    if (footer) {
      return (
        <div
          style={{ display: "flex", flexDirection: "column", height: "100%" }}
        >
          <ViewAndFooter view={renderElements} footer={footer} />
        </div>
      );
    } else {
      return (
        <div
          style={{ display: "flex", flexDirection: "column", height: "100%" }}
        >
          {renderElements}
        </div>
      );
    }
  }
}
