import React, { Component } from "react";
import { Card } from "react-bootstrap";
import PrimaryButton from "../reusableComponents/PrimaryButton";
import evaluateFeedback from "../RuleEngine/evaluateFeedback";
import { Link } from "react-router-dom";
var rules = require("../../SurveyJsons/actionPlanAlgorithm.json");

export default class ActionPlans extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.addResultsToFacts();
    this.determineActionPlans();
    this.determineActionPlans = this.determineActionPlans.bind(this);
  }

  addResultsToFacts() {
    //facts for use in algorithm, fill with defaults
    var facts = {
      HaveChildren: "Yes",
      Intention: "I intend to leave the relationship",
      Priority: "Safety",
    };
    var results = JSON.parse(localStorage.getItem("prevCompletions"));
    console.log("results are in", results);
    //TODO: need to add the parsing for the priorities
    for (var survey of results) {
      for (var question of survey.questions) {
        if (question !== null) {
          if (
            question.questionText ===
              "What are your intentions regarding your relationship?" &&
            question.questionAnswer.length !== 0
          ) {
            switch (question.questionAnswer[0]) {
              case "I indend to stay in the relationship":
                facts.Intention = "STAY";
                break;
              case "I indend to leave the relationship":
                facts.Intention = "LEAVE";
                break;
              case "I have already left the relationship":
                facts.Intention = "LEFT";
                break;
              default:
                facts.Intention = "LEAVE";
            }
          }
          if (
            question.questionText ===
              "Do you have any dependent children or step-children under the age of 18?" &&
            question.questionAnswer.length !== 0
          ) {
            facts.HaveChildren = question.questionAnswer[0];
          }
        }
      }
    }
    localStorage.setItem("actionPlanFacts", JSON.stringify(facts));
    console.log("straight facts", facts);
  }

  determineActionPlans() {
    var actionPlanFacts = JSON.parse(localStorage.getItem("actionPlanFacts"));
    var factsContainer = [];
    for (var key in actionPlanFacts) {
      factsContainer.push({ factName: key, fact: actionPlanFacts[key] });
    }
    console.log("facts container is", factsContainer);

    evaluateFeedback(rules, factsContainer).then((result) => {
      this.setState({ plan: result.events[0].params });
    });
  }

  render() {
    return (
      <div>
        <div>
          <Card className="surveyIntroCard" style={{ width: "80%" }}>
            <Card.Body>
              <Card.Title>Your Action Plan</Card.Title>

              <Card.Text>
                {this.state.plan && (
                  <ul>
                    {this.state.plan.map((plan) => (
                      <li>{plan}</li>
                    ))}
                  </ul>
                )}
              </Card.Text>

              <Link to="/surveyComponent">
                <PrimaryButton>Go back home</PrimaryButton>
              </Link>
            </Card.Body>
          </Card>
        </div>
      </div>
    );
  }
}
