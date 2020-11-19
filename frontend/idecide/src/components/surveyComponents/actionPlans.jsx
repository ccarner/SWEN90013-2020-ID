import React, { Component } from "react";
import { Card } from "react-bootstrap";
import PrimaryButton from "../reusableComponents/PrimaryButton";
import evaluateFeedback from "../RuleEngine/evaluateFeedback";
import { Link } from "react-router-dom";
//TODO change this over to materialUI to be consistent (instead of bootstrap)
import { Table, CardDeck, Accordion, Modal } from "react-bootstrap";
import SaveIcon from "@material-ui/icons/Save";
import "../../CSS/Modal.css";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import { Accordion as MuiAccordion, Typography } from "@material-ui/core";
import { AccordionSummary as MuiAccordionSummary } from "@material-ui/core";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { withStyles } from "@material-ui/core/styles";
import ActionPlanAccordion from "./actionPlanAccordion";
import { getValue } from "../../API/keyValueAPI";
import GetAppIcon from "@material-ui/icons/GetApp";
import * as jsPDF from "jspdf";
import Loading from "../reusableComponents/loading";

//TODO refactor this class: LOTS of repetition of eg the slicing... ctrl-f for "view", there are about 6 instances, one per each accordion...
// TODO: this class ia also quite laggy/slow I think when executing... needs to be improved speedwise

// var actionPlanContents = require("../../SurveyJsons/actionPlanHtml.json");

const AccordionSummary = withStyles({
  content: {
    justifyContent: "center",
  },
})(MuiAccordionSummary);

export default class ActionPlans extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      ModalShow: false,
      ModalBody: undefined,
      currentView: "top5",
      actionPlanContents: null,
      recommendedPlans: null,
      actionPlanAlgorithm: null,
    };
    // this.addResultsToFacts();

    this.determineActionPlans = this.determineActionPlans.bind(this);
    this.handleAlignment = this.handleAlignment.bind(this);
    this.makePdf = this.makePdf.bind(this);
  }

  //NOTE: needs jsPDF version < 2.0, wasn't rendering with newest v2 since they changed the HTML rendering engine
  async makePdf() {
    const doc = new jsPDF();

    //add header
    doc.setFontSize(26);
    doc.text(20, 20, "I-Decide: Your Action Plan");
    doc.setFontSize(20);

    // start at 30 since we have a header of 'your action plan'
    // these are the last points when we finished writing, needed for
    // html since we don't KNOW how long it is
    var lastxy = { x: 20, y: 30 };

    const setLastxy = (value) => {
      console.log("value was", value);
      lastxy = value;
    };

    for (var plan of this.state.recommendedPlans) {
      // if (plan === "GATHER_IMP_ITEMS") continue;
      //have to manually split, doesn't wrap words
      const splitTitle = doc.splitTextToSize(
        this.state.actionPlanContents[plan].description,
        170
      );
      doc.text(20, lastxy.y + 14, splitTitle);
      lastxy.y += 10 * splitTitle.length;
      console.log("now attempting", plan);

      await doc.fromHTML(
        this.state.actionPlanContents[plan].strategyHtmlString,
        20,
        lastxy.y,
        { width: 170 },
        setLastxy
      );
      // await doc.html(
      //   this.state.actionPlanContents[plan].strategyHtmlString,

      //   { x: 20, y: lastxy.y, width: 170, callback: setLastxy }
      // );

      // doc.addPage();
    }
    doc.save("I-DecidePlan.pdf");
  }

  async componentDidMount() {
    const plans = JSON.parse(await getValue("actionPlanContents"));
    const algorithm = JSON.parse(await getValue("actionPlanAlgorithm"));
    console.warn("algorithm was", algorithm);
    console.warn("plans was", plans);
    this.setState(
      {
        actionPlanContents: plans,
        actionPlanAlgorithm: algorithm,
      },
      () => {
        //then...
        this.determineActionPlans();
      }
    );
  }

  handleAlignment(event, newView) {
    this.setState({ currentView: newView });
  }

  determineActionPlans = () => {
    const prevCompletions = JSON.parse(localStorage.getItem("prevCompletions"));
    evaluateFeedback(this.state.actionPlanAlgorithm, [], prevCompletions).then(
      (result) => {
        this.setState({
          recommendedPlans: result.events.map(({ type }) => type),
          loaded: true,
        });
        // console.log("result was in eval feedback", result);
      }
    );
  };

  handleModalShow = () => {
    this.setState({ ModalShow: !this.state.ModalShow });
  };

  handleActionPlanAccordion = () => {
    var { recommendedPlans, actionPlanContents } = this.state;
    var returnArray = [];
    if (recommendedPlans && actionPlanContents) {
      console.log("currentaction Plans", recommendedPlans, actionPlanContents);

      // emergency plans come first, then non-emergency plans. Count number of
      // emergency plans using reduce / an accumulator
      const countNumberEmergencyPlans = (accumulator, currentPlan) => {
        console.log("current plan", currentPlan);
        return actionPlanContents[currentPlan].strategyType === "EMERGENCY"
          ? 1 + accumulator
          : accumulator;
      };
      var startOfNonEmergency = recommendedPlans.reduce(
        countNumberEmergencyPlans,
        0
      );

      console.log("number of emergency plans was", startOfNonEmergency);

      if (startOfNonEmergency > 0) {
        returnArray.push(
          <ActionPlanAccordion heading="In Case of Emergency">
            <div
              style={{
                width: "100%",
                margin: "1rem",
                justifyContent: "center",
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fill, minmax(min(300px, 100%), 1fr))",
                gridGap: "1rem",
              }}
            >
              {recommendedPlans
                .slice(0, startOfNonEmergency)
                .map((plan, index) => {
                  var html = {
                    __html: actionPlanContents[plan].strategyHtmlString,
                  };
                  return (
                    <Card>
                      <Card.Body>
                        {actionPlanContents[plan].description}
                      </Card.Body>
                      <Card.Footer>
                        <PrimaryButton
                          gradient="purple-gradient"
                          rounded
                          className="purple-gradient"
                          onClick={() => {
                            this.handleModalShow();
                            this.setState({
                              ModalBody: html,
                              modalHeader: actionPlanContents[plan].description,
                            });
                          }}
                        >
                          view
                        </PrimaryButton>
                      </Card.Footer>
                    </Card>
                  );
                })}
            </div>
          </ActionPlanAccordion>
        );
      }
      returnArray.push(
        <ActionPlanAccordion heading="Your Top 5 Recommended Plans">
          <div
            style={{
              width: "100%",
              margin: "1rem",
              justifyContent: "center",
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fill, minmax(min(300px, 100%), 1fr))",
              gridGap: "1rem",
            }}
          >
            {recommendedPlans
              .slice(startOfNonEmergency, startOfNonEmergency + 5)
              .map((plan, index) => {
                var html = {
                  __html: actionPlanContents[plan].strategyHtmlString,
                };
                return (
                  <Card>
                    <Card.Body>
                      {actionPlanContents[plan].description}
                    </Card.Body>
                    <Card.Footer>
                      <PrimaryButton
                        gradient="purple-gradient"
                        rounded
                        className="purple-gradient"
                        onClick={() => {
                          this.handleModalShow();
                          this.setState({
                            ModalBody: html,
                            modalHeader: actionPlanContents[plan].description,
                          });
                        }}
                      >
                        view
                      </PrimaryButton>
                    </Card.Footer>
                  </Card>
                );
              })}
          </div>
        </ActionPlanAccordion>
      );
    }
    return returnArray;
  };

  handleAllStrategies = () => {
    const keys = Object.keys(this.state.actionPlanContents);
    var AllStrategies = {};
    keys.map((item, index) => {
      var tempStrategyType = this.state.actionPlanContents[item].strategyType;
      if (AllStrategies.hasOwnProperty(tempStrategyType)) {
        AllStrategies[tempStrategyType].push(item);
      } else {
        AllStrategies[tempStrategyType] = [item];
      }
    });
    const strategyTypekeys = Object.keys(AllStrategies);
    return strategyTypekeys.map((type, index) => {
      return (
        <ActionPlanAccordion heading={type}>
          <div
            style={{
              width: "100%",
              margin: "1rem",
              justifyContent: "center",
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fill, minmax(min(300px, 100%), 1fr))",
              gridGap: "1rem",
            }}
          >
            {AllStrategies &&
              AllStrategies[type].map((plan, index) => {
                // console.log("plan was", plan);
                var html = {
                  __html: this.state.actionPlanContents[plan]
                    .strategyHtmlString,
                };

                return (
                  <Card>
                    <Card.Body>
                      {this.state.actionPlanContents[plan].description}
                    </Card.Body>

                    <Card.Footer>
                      <PrimaryButton
                        gradient="purple-gradient"
                        rounded
                        className="purple-gradient"
                        onClick={() => {
                          this.handleModalShow();
                          this.setState({
                            ModalBody: html,
                            modalHeader: this.state.actionPlanContents[plan]
                              .description,
                          });
                        }}
                      >
                        view
                      </PrimaryButton>
                    </Card.Footer>
                  </Card>
                );
              })}
          </div>
        </ActionPlanAccordion>
      );
    });
  };

  handleStrategySwitch = () => {
    if (this.state.currentView === "top5") {
      return this.handleActionPlanAccordion();
    } else {
      return this.handleAllStrategies();
    }
  };

  render() {
    let userContext = this.context;
    let userIsAnon = userContext.userType === "anon";
    if (!this.state.loaded) {
      return <Loading text={"Generating your action plan..."} />;
    }
    return (
      <div>
        <Card
          style={{ position: "fixed", bottom: 0, width: "100%", zIndex: "10" }}
        >
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
                  Save your Plan &nbsp; <SaveIcon />
                </React.Fragment>
              ) : (
                <React.Fragment>
                  Your Plan is saved <SaveIcon />
                </React.Fragment>
              )}
            </PrimaryButton>
            <PrimaryButton onClick={this.makePdf}>
              Export as PDF &nbsp; <GetAppIcon />
            </PrimaryButton>
          </div>
        </Card>

        <Modal
          show={this.state.ModalShow}
          onHide={() => this.handleModalShow()}
          dialogClassName="main-modal"
        >
          <Modal.Header closeButton>
            <Modal.Title>{this.state.modalHeader}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div dangerouslySetInnerHTML={this.state.ModalBody}></div>
          </Modal.Body>
        </Modal>
        <div className="surveyIntroCard">
          <h1 className="text-center" style={{ color: "white" }}>
            Action Plan
          </h1>
          <p style={{ fontSize: "20px", color: "white" }}>
            Based on your responses, we have recommended strategies to help you
            deal with your situation. There is additional help, resources and
            recommendations in the "More Strategies" section.
          </p>
          <Card style={{ margin: "1em", marginBottom: "10vh" }}>
            <Card.Body>
              <ToggleButtonGroup
                value={this.state.currentView}
                exclusive
                onChange={this.handleAlignment}
              >
                <ToggleButton value="top5">Recommended</ToggleButton>
                <ToggleButton value="all">More Strategies</ToggleButton>
              </ToggleButtonGroup>

              {this.handleStrategySwitch()}
            </Card.Body>
          </Card>
        </div>
      </div>
    );
  }
}
