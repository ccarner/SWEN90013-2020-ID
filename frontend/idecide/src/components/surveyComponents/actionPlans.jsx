import React, { Component } from "react";
import { Card } from "react-bootstrap";
import PrimaryButton from "../reusableComponents/PrimaryButton";
import evaluateFeedback from "../RuleEngine/evaluateFeedback";
import { Link } from "react-router-dom";
//TODO change this over to materialUI to be consistent (instead of bootstrap)
import { Table, CardDeck, Accordion, Modal } from "react-bootstrap";
import Grid from "antd/lib/card/Grid";
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

//TODO refactor this class: LOTS of repetition of eg the slicing... ctrl-f for "view", there are about 6 instances, one per each accordion...
// TODO: this class ia also quite laggy/slow I think when executing... needs to be improved speedwise

var rules = require("../../SurveyJsons/actionPlanAlgorithm.json");
var planHtmls = require("../../SurveyJsons/actionPlanHtml.json");

const AccordionSummary = withStyles({
  content: {
    justifyContent: "center",
  },
})(MuiAccordionSummary);

export default class ActionPlans extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ModalShow: false,
      ModalBody: undefined,
      currentView: "top5",
    };
    // this.addResultsToFacts();
    this.determineActionPlans();
    this.determineActionPlans = this.determineActionPlans.bind(this);
    this.handleAlignment = this.handleAlignment.bind(this);
  }
  handleAlignment(event, newView) {
    this.setState({ currentView: newView });
  }

  determineActionPlans = () => {
    // var actionPlanFacts = JSON.parse(localStorage.getItem("actionPlanFacts"));
    // var factsContainer = [];
    // for (var key in actionPlanFacts) {
    //   factsContainer.push({ factName: key, fact: actionPlanFacts[key] });
    // }
    // console.log("facts container is", factsContainer);

    var data = require("../../SurveyJsons/actionPlanAlgorithm.json");
    // console.log(777, this.props.isReview);
    // alert(777);

    const prevCompletions = JSON.parse(localStorage.getItem("prevCompletions"));

    evaluateFeedback(data, [], prevCompletions).then((result) => {
      this.setState({ plan: result.events.map(({ type }) => type) });
      // console.log("result was in eval feedback", result);
    });
  };

  handleModalShow = () => {
    this.setState({ ModalShow: !this.state.ModalShow });
  };

  handleActionPlanAccordion = () => {
    var list = this.state.plan;
    console.log("plan is ----", this.state.plan);
    var returnArray = [];
    if (list !== undefined) {
      var firstType = planHtmls[list[0]].strategyType;
      var startOfNonEmergency = 0;

      if (firstType === "EMERGENCY") {
        startOfNonEmergency = 9;
        returnArray.push(
          <ActionPlanAccordion heading="EMERGENCY">
            <CardDeck>
              <div
                style={{
                  display: "grid",
                  "grid-template-columns": "repeat(3,1fr)",
                  gap: "45px",
                  margin: "20px",
                }}
              >
                {/* there are 9 emergency plans */}
                {this.state.plan &&
                  this.state.plan.slice(0, 9).map((plan, index) => {
                    var html = {
                      __html: planHtmls[plan].strategyHtmlString,
                    };
                    return (
                      <Card>
                        <Card.Body>{planHtmls[plan].description}</Card.Body>
                        <Card.Footer>
                          <PrimaryButton
                            gradient="purple-gradient"
                            rounded
                            className="purple-gradient"
                            onClick={() => {
                              this.handleModalShow();
                              this.setState({
                                ModalBody: html,
                                modalHeader: planHtmls[plan].description,
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
            </CardDeck>
          </ActionPlanAccordion>
        );
      }
      returnArray.push(
        <ActionPlanAccordion heading="Your Top 5 Recommended Plans">
          <CardDeck>
            <div
              style={{
                display: "grid",
                "grid-template-columns": "repeat(3,1fr)",
                gap: "45px",
                margin: "20px",
              }}
            >
              {this.state.plan &&
                this.state.plan
                  .slice(startOfNonEmergency, startOfNonEmergency + 5)
                  .map((plan, index) => {
                    // console.log("plan was", plan);
                    var html = {
                      __html: planHtmls[plan].strategyHtmlString,
                    };
                    return (
                      <Card>
                        <Card.Body>{planHtmls[plan].description}</Card.Body>
                        <Card.Footer>
                          <PrimaryButton
                            gradient="purple-gradient"
                            rounded
                            className="purple-gradient"
                            onClick={() => {
                              this.handleModalShow();
                              this.setState({
                                ModalBody: html,
                                modalHeader: planHtmls[plan].description,
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
          </CardDeck>
        </ActionPlanAccordion>
      );
    }
    return returnArray;
  };

  handleAllStrategies = () => {
    const keys = Object.keys(planHtmls);
    var AllStrategies = {};
    keys.map((item, index) => {
      var tempStrategyType = planHtmls[item].strategyType;
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
          <CardDeck>
            <div
              style={{
                display: "grid",
                "grid-template-columns": "repeat(3,1fr)",
                gap: "45px",
                margin: "20px",
              }}
            >
              {AllStrategies &&
                AllStrategies[type].map((plan, index) => {
                  // console.log("plan was", plan);
                  var html = {
                    __html: planHtmls[plan].strategyHtmlString,
                  };

                  return (
                    <Card>
                      <Card.Body>{planHtmls[plan].description}</Card.Body>

                      <Card.Footer>
                        <PrimaryButton
                          gradient="purple-gradient"
                          rounded
                          className="purple-gradient"
                          onClick={() => {
                            this.handleModalShow();
                            this.setState({
                              ModalBody: html,
                              modalHeader: planHtmls[plan].description,
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
          </CardDeck>
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
    return (
      <div>
        <Card
          style={{ position: "fixed", bottom: 0, width: "100%", zIndex: "10" }}
        >
          <Link
            style={{ textDecoration: "none" }}
            to={{
              pathname: "/loginComponent/registerPage",
            }}
          >
            <PrimaryButton>
              Save your Plan &nbsp; <SaveIcon />
            </PrimaryButton>
          </Link>
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
        <div className="surveyIntroCard" style={{ width: "80%" }}>
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
                <ToggleButton value="top5">Top 5 Strategies</ToggleButton>
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
