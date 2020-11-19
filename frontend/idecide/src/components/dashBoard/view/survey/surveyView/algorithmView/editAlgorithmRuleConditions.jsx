import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import PrimaryButton from "../../../../../reusableComponents/PrimaryButton";
import update from "immutability-helper";
import { async } from "../../../../../../API/keyValueAPI";
import EditAlgorithmRuleSubCondition from "./editAlgorithmRuleSubCondition";

//rules consist of an 'event' and a set of 'conditions'
//this component modifies the externalmost 'condition', which can
//only be 'any' or 'all'.
export default class EditAlgorithmRuleConditions extends Component {
  constructor(props) {
    super(props);
    this.handleAddCondition = this.handleAddCondition.bind(this);
  }

  handleAddCondition() {
    const newCondition = {
      fact: "TOP_PRIORITY",
      operator: "equal",
      value: "child",
    };

    const updateRuleEvent = (prevSurvey) =>
      update(prevSurvey, {
        surveySections: {
          [this.props.sectionIndex]: {
            sectionResultAlgorithm: {
              [this.props.ruleIndex]: {
                conditions: {
                  [this.valueType()]: {
                    $push: [newCondition],
                  },
                },
              },
            },
          },
        },
      });
    this.props.modifySurvey(updateRuleEvent);
  }

  handleTypeChange(newType) {
    if (newType !== this.valueType()) {
      var currentType = newType === "any" ? "all" : "any";

      const updateRuleEvent = (prevSurvey) =>
        update(prevSurvey, {
          surveySections: {
            [this.props.sectionIndex]: {
              sectionResultAlgorithm: {
                [this.props.ruleIndex]: {
                  conditions: {
                    [newType]: {
                      $set: this.props.rule.conditions[currentType],
                    },
                    $unset: [currentType],
                  },
                },
              },
            },
          },
        });
      this.props.modifySurvey(updateRuleEvent);
    }
  }

  valueType() {
    if (
      this.props.rule.conditions.hasOwnProperty("any") &&
      this.props.rule.conditions.any !== null
    ) {
      return "any";
    }
    return "all";
  }

  render() {
    // the fields being actually rendered for this condition

    return (
      <div style={{ backgroundColor: "#f5f5f5" }}>
        <Select
          variant="outlined"
          style={{ margin: "10px" }}
          value={this.valueType()}
          label="Condition Type"
          onChange={(event) => {
            this.handleTypeChange(event.target.value);
          }}
        >
          {/* outermost condition only has 'ANY' or 'ALL' conditions, can't be both */}
          <MenuItem value={"any"}> ANY </MenuItem>
          <MenuItem value={"all"}> ALL </MenuItem>
        </Select>
        <PrimaryButton onClick={this.handleAddCondition}>
          Add a new Condition
        </PrimaryButton>

        {this.props.rule.conditions[this.valueType()].map(
          (condition, index) => {
            return (
              <EditAlgorithmRuleSubCondition
                sectionIndex={this.props.sectionIndex}
                ruleIndex={this.props.ruleIndex}
                conditionLocationMap={[this.valueType(), index]}
                conditionObject={condition}
                modifySurvey={this.props.modifySurvey}
                rule={this.props.rule}
              />
            );
          }
        )}
      </div>
    );
  }
}
