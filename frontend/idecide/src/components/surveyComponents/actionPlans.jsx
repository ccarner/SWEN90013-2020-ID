import React, { Component } from "react";
import { Card } from "react-bootstrap";
import PrimaryButton from "../reusableComponents/PrimaryButton";
import evaluateFeedback from "../RuleEngine/evaluateFeedback";
import { Link } from "react-router-dom";
//TODO change this over to materialUI to be consistent (instead of bootstrap)
import { Table, Accordion, CardDeck, Modal } from "react-bootstrap";
import Grid from "antd/lib/card/Grid";
import SaveIcon from "@material-ui/icons/Save";
import "../../CSS/Modal.css";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";

//TODO refactor this class: LOTS of repetition of eg the slicing... ctrl-f for "view", there are about 6 instances, one per each accordion...
// TODO: this class ia also quite laggy/slow I think when executing... needs to be improved speedwise

var rules = require("../../SurveyJsons/actionPlanAlgorithm.json");
var planHtmls = require("../../SurveyJsons/actionPlanHtml.json");

export default class ActionPlans extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ModalShow: false,
      ModalBody: undefined,
      currentView: "top5",
    };
    this.addResultsToFacts();
    this.determineActionPlans();
    this.determineActionPlans = this.determineActionPlans.bind(this);
    this.handleAlignment = this.handleAlignment.bind(this);
  }
  handleAlignment(event, newView) {
    this.setState({ currentView: newView });
  }

  addResultsToFacts = () => {
    //facts for use in algorithm, fill with defaults
    // var facts = {
    //   HaveChildren: "Yes",
    //   Intention: "I intend to leave the relationship",
    //   Priority: "Safety",
    // };
    // var results = JSON.parse(localStorage.getItem("prevCompletions"));
    // console.log("results are in", results);
    // //TODO: need to add the parsing for the priorities
    // for (var survey of results) {
    //   for (var question of survey.questions) {
    //     if (question !== null) {
    //       if (
    //         question.questionText ===
    //           "What are your intentions regarding your relationship?" &&
    //         question.questionAnswer.length !== 0
    //       ) {
    //         switch (question.questionAnswer[0]) {
    //           case "I intend to stay in the relationship":
    //             facts.Intention = "STAY";
    //             break;
    //           case "I intend to leave the relationship":
    //             facts.Intention = "LEAVE";
    //             break;
    //           case "I have already left the relationship":
    //             facts.Intention = "LEFT";
    //             break;
    //           default:
    //             facts.Intention = "LEAVE";
    //         }
    //       }
    //       if (
    //         question.questionText ===
    //           "Do you have any dependent children or step-children under the age of 18?" &&
    //         question.questionAnswer.length !== 0
    //       ) {
    //         facts.HaveChildren = question.questionAnswer[0];
    //       }
    //       if (
    //         question.questionText ===
    //           "Please rank the following from most important to you at the top to least important at the bottom" &&
    //         question.questionAnswer.length !== 0
    //       ) {
    //         facts.Priority = question.questionAnswer[0];
    //       }
    //     }
    //   }
    // }
    // if (facts.HaveChildren === "Yes" && facts.Priority === "Children") {
    //   facts.Priority = "Safety";
    // }
    // localStorage.setItem("actionPlanFacts", JSON.stringify(facts));
  };

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

    evaluateFeedback(data, [], this.props.isReview).then((result) => {
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
    if (list !== undefined) {
      var firstType = planHtmls[list[0]].strategyType;
      if (firstType === "EMERGENCY") {
        var secondType = planHtmls[list[9]].strategyType;
        return (
          <div>
            <Accordion style={{ marginTop: 10 }}>
              <Card
                key={1}
                style={{
                  background: "rgba(54, 25, 25, 0.00004)",
                  border: "0",
                  boxShadow: "none",
                }}
              >
                <Accordion.Toggle
                  as={Card.Header}
                  eventKey={1 + 1} // doesn't work with index of 0 for some reason?
                  style={{
                    background: "linear-gradient(40deg, #ff6ec4, #7873f5)",
                    color: "white",
                    "font-size": "25px",
                  }}
                >
                  EMERGENCY
                </Accordion.Toggle>

                <Accordion.Collapse eventKey={1 + 1}>
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
                        this.state.plan.slice(0, 9).map((plan, index) => {
                          var html = {
                            __html: planHtmls[plan].strategyHtmlString,
                          };

                          return (
                            <Card>
                              <Card.Body>
                                {planHtmls[plan].description}
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
                </Accordion.Collapse>
              </Card>
            </Accordion>
            <Accordion style={{ marginTop: 10 }}>
              <Card
                key={1}
                style={{
                  background: "rgba(54, 25, 25, 0.00004)",
                  border: "0",
                  boxShadow: "none",
                }}
              >
                <Accordion.Toggle
                  as={Card.Header}
                  eventKey={1 + 1} // doesn't work with index of 0 for some reason?
                  style={{
                    background: "linear-gradient(40deg, #ff6ec4, #7873f5)",
                    color: "white",
                    "font-size": "25px",
                  }}
                >
                  Your top 5 strategies
                </Accordion.Toggle>

                <Accordion.Collapse eventKey={1 + 1}>
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
                        this.state.plan.slice(9, 14).map((plan, index) => {
                          // console.log("plan was", plan);
                          var html = {
                            __html: planHtmls[plan].strategyHtmlString,
                          };

                          return (
                            <Card>
                              <Card.Body>
                                {planHtmls[plan].description}
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
                </Accordion.Collapse>
              </Card>
            </Accordion>
          </div>
        );
      } else {
        return (
          <Accordion style={{ marginTop: 10 }}>
            <Card
              key={1}
              style={{
                background: "rgba(54, 25, 25, 0.00004)",
                border: "0",
                boxShadow: "none",
              }}
            >
              <Accordion.Toggle
                as={Card.Header}
                eventKey={1 + 1} // doesn't work with index of 0 for some reason?
                style={{
                  background: "linear-gradient(40deg, #ff6ec4, #7873f5)",
                  color: "white",
                  "font-size": "25px",
                }}
              >
                Your top 5 strategies
              </Accordion.Toggle>

              <Accordion.Collapse eventKey={1 + 1}>
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
                      this.state.plan.slice(0, 5).map((plan, index) => {
                        console.log("plan was", plan);
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
              </Accordion.Collapse>
            </Card>
          </Accordion>
        );
      }
    }
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
        <Accordion style={{ marginTop: 10 }}>
          <Card
            key={index}
            style={{
              background: "rgba(54, 25, 25, 0.00004)",
              border: "0",
              boxShadow: "none",
            }}
          >
            <Accordion.Toggle
              as={Card.Header}
              eventKey={index + 1} // doesn't work with index of 0 for some reason?
              style={{
                background: "linear-gradient(40deg, #ff6ec4, #7873f5)",
                color: "white",
                "font-size": "25px",
              }}
            >
              {type}
            </Accordion.Toggle>

            <Accordion.Collapse eventKey={index + 1}>
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
                      console.log("plan was", plan);
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
            </Accordion.Collapse>
          </Card>
        </Accordion>
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
          <Card style={{ margin: "1em" }}>
            <Card.Body>
              <ToggleButtonGroup
                value={this.state.currentView}
                exclusive
                onChange={this.handleAlignment}
              >
                <ToggleButton value="top5">Top 5 Strategies</ToggleButton>
                <ToggleButton value="all">More Strategies</ToggleButton>
              </ToggleButtonGroup>
              {/* {this.handleActionPlanAccordion()} */}
              {this.handleStrategySwitch()}
              <Link to="/" style={{ textDecoration: "none" }}>
                <PrimaryButton>Go home</PrimaryButton>
              </Link>

              <Link
                style={{ textDecoration: "none" }}
                to={{
                  pathname: "/loginComponent/registerPage",
                }}
              >
                <PrimaryButton>
                  Save your Plan <SaveIcon />
                </PrimaryButton>
              </Link>
            </Card.Body>
          </Card>
        </div>
      </div>
    );
  }
}
