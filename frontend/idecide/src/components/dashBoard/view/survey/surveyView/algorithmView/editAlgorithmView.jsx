import React, { Component } from "react";
import { Typography } from "@material-ui/core";
import PrimaryButton from "../../../../../reusableComponents/PrimaryButton";
import update from "immutability-helper";
import EditAlgorithmRuleEvent from "./editAlgorithmRuleEvent";
import EditAlgorithmRuleConditions from "./editAlgorithmRuleConditions";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

export default class EditAlgorithmView extends Component {
  constructor(props) {
    super(props);
    this.handleAddRule = this.handleAddRule.bind(this);
  }

  shouldComponentUpdate(newProps) {
    return newProps.algorithm !== this.props.algorithm;
  }

  //TODO: if renamed 'response string' to 'responseHTML' or similar, will need to change this!
  handleAddRule() {
    const newRule = {
      event: {
        type: "",
        params: {
          categoryName: "",
          responseString: "",
        },
      },
      conditions: {
        all: [],
      },
    };

    const updateRuleEvent = (prevSurvey) => {
      var addObject;
      if (this.props.algorithm) {
        // its an array already, just push
        addObject = { $push: [newRule] };
      } else {
        addObject = { $set: [newRule] };
      }
      return update(prevSurvey, {
        surveySections: {
          [this.props.sectionIndex]: {
            sectionResultAlgorithm: addObject,
          },
        },
      });
    };
    this.props.modifySurvey(updateRuleEvent);
  }

  render() {
    return (
      <div>
        <Typography variant="h4" gutterBottom>
          Feedback Algorithm
        </Typography>
        {this.props.algorithm &&
          this.props.algorithm.map((rule, index) => {
            return (
              <Accordion
                key={index}
                // IMPORTANT NOTE: this transition props stops the accordion details from rendering
                // if they are not open!!
                TransitionProps={{ unmountOnExit: true }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>Rule #{index + 1}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <div>
                    <EditAlgorithmRuleEvent
                      rule={rule}
                      ruleIndex={index}
                      sectionIndex={this.props.sectionIndex}
                      modifySurvey={this.props.modifySurvey}
                    />
                    <EditAlgorithmRuleConditions
                      rule={rule}
                      ruleIndex={index}
                      sectionIndex={this.props.sectionIndex}
                      modifySurvey={this.props.modifySurvey}
                    />
                  </div>
                </AccordionDetails>
              </Accordion>
            );
          })}
        <PrimaryButton onClick={this.handleAddRule}>Add new Rule</PrimaryButton>
      </div>
    );
  }
}
