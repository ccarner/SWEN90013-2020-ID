import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { Card } from "@material-ui/core";
import PrimaryButton from "../../../../../reusableComponents/PrimaryButton";
import update from "immutability-helper";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import Divider from "@material-ui/core/Divider";

import EditAlgorithmRuleLeafCondition from "./editAlgorithmRuleLeafCondition";

//rules consist of an 'event' and a set of 'conditions'
//this component modifies the 'event' component
export default class EditAlgorithmRuleSubCondition extends Component {
  constructor(props) {
    super(props);
    this.colours = {
      1: "#f7cbcb",
      2: "#f7f3cb",
      3: "#cbf7cb",
      4: "#cbf6f7",
      5: "#d2cbf7",
      6: "#f5cbf7",
      7: "#f7cbcb",
    };
    this.handleAddCondition = this.handleAddCondition.bind(this);
    this.handleChange = this.handleChange.bind(this);
    //map of type of fact to a type of value field
  }

  //takes a string as "any" or "all", and adds a new condition under that heading
  handleAddCondition(allOrAny) {
    const newCondition = {
      fact: "TOP_PRIORITY",
      operator: "equal",
      value: "child",
    };
    this.handleChange({
      [allOrAny]: {
        $push: [newCondition],
      },
    });
  }

  //takes an immutable transform. eg
  // { $set: value } would replace the whole condition with 'value'
  // or { fact: { $set: event.target.value } } sets 'fact' attribute to 'event.target.value'
  //the immutable transform can also be a string "delete" which signals to delete the condition
  handleChange(immutableTransform) {
    // conditionLocationMap should be of form of eg [["all",0],["any",1]] to indicate where in the
    // condition tree this current condition is located
    // need to get an object of form {"all":{0:{"any":{1}}}} for above example for use with
    // immutable-js

    var pathObject;

    if (immutableTransform === "delete") {
      //we want to delete the object, logic is a bit different since we need to
      //edit the array CONTAINING the condition rather than the condition itself
      const indexOfCondition = this.props.conditionLocationMap[
        this.props.conditionLocationMap.length - 1
      ];

      pathObject = { $splice: [[indexOfCondition, 1]] };

      // NOTE we skip the last element of the array (the index of the condition), since the 'slice' is applied
      // to the array that CONTAINS the condition itself
      for (var i = this.props.conditionLocationMap.length - 2; i >= 0; i--) {
        pathObject = { [this.props.conditionLocationMap[i]]: pathObject };
      }
    } else {
      //a normal immutable transform
      pathObject = immutableTransform;

      for (var i = this.props.conditionLocationMap.length - 1; i >= 0; i--) {
        pathObject = { [this.props.conditionLocationMap[i]]: pathObject };
      }
    }

    //now updateLocation should point to a nested structure compatible with
    //immutability helper!

    const updateRuleEvent = (prevSurvey) =>
      update(prevSurvey, {
        surveySections: {
          [this.props.sectionIndex]: {
            sectionResultAlgorithm: {
              [this.props.ruleIndex]: {
                conditions: pathObject,
              },
            },
          },
        },
      });

    this.props.modifySurvey(updateRuleEvent);
  }

  handleTypeChange(newType) {

    var newCondition = {};
    if (newType !== this.valueType()) {
      if (newType === "CONDITION") {
        newCondition = {
          fact: "TOP_PRIORITY",
          operator: "equal",
          value: "child",
        };
      } else {
        //newType is NESTED_LOGIC
        newCondition = { any: [], all: [] };
      }
    }

    //overwrite this whole object
    this.handleChange({ $set: newCondition });
  }

  // is this object a CONDITION or a NESTED LOGIC type of object?
  valueType() {
    if (this.props.conditionObject.hasOwnProperty("fact")) {
      return "CONDITION";
    }
    return "NESTED_LOGIC";
  }

  render() {
    // the fields being actually rendered for this condition
    var conditionFields = null;

    if (this.valueType() === "CONDITION") {
      conditionFields = (
        <EditAlgorithmRuleLeafCondition
          sectionIndex={this.props.sectionIndex}
          ruleIndex={this.props.ruleIndex}
          conditionLocationMap={this.props.conditionLocationMap}
          conditionObject={this.props.conditionObject}
          handleChange={this.handleChange}
        />
      );
    } else {
      //type is NESTED_LOGIC
      conditionFields = (
        <React.Fragment>
          ...If ANY of these are true:
          <div>
            <PrimaryButton
              onClick={() => {
                this.handleAddCondition("any");
              }}
            >
              Add Condition
            </PrimaryButton>
            {/* First push all of the current objects for the "any" list */}
            {this.props.conditionObject.any.map((condition, index) => {
              // need a deep copy
              var conditionLocationMap = JSON.parse(
                JSON.stringify(this.props.conditionLocationMap)
              );
              conditionLocationMap.push("any", index);
              return (
                <EditAlgorithmRuleSubCondition
                  sectionIndex={this.props.sectionIndex}
                  ruleIndex={this.props.ruleIndex}
                  conditionLocationMap={conditionLocationMap}
                  conditionObject={condition}
                  modifySurvey={this.props.modifySurvey}
                />
              );
            })}
          </div>
          ...If ALL of these are true:
          <div>
            <PrimaryButton
              onClick={() => {
                this.handleAddCondition("all");
              }}
            >
              Add Condition
            </PrimaryButton>
            {this.props.conditionObject.all.map((condition, index) => {
              var conditionLocationMap = JSON.parse(
                JSON.stringify(this.props.conditionLocationMap)
              );
              conditionLocationMap.push("all", index);
              return (
                <EditAlgorithmRuleSubCondition
                  sectionIndex={this.props.sectionIndex}
                  ruleIndex={this.props.ruleIndex}
                  conditionLocationMap={conditionLocationMap}
                  conditionObject={condition}
                  modifySurvey={this.props.modifySurvey}
                />
              );
            })}
          </div>
        </React.Fragment>
      );
    }

    return (
      <Card
        style={{
          padding: "10px",
          margin: "10px",
          backgroundColor: this.colours[
            this.props.conditionLocationMap.length / 2
          ],
        }}
      >
        <div>
          <Select
            style={{ margin: "10px" }}
            value={this.valueType()}
            variant="outlined"
            label="Condition Type"
            onChange={(event) => {
              this.handleTypeChange(event.target.value);
            }}
          >
            {/* outermost condition only has 'ANY' or 'ALL' conditions */}
            <MenuItem value={"NESTED_LOGIC"}> Nested Logic (And/Any) </MenuItem>
            <MenuItem value={"CONDITION"}>Condition</MenuItem>
          </Select>

          <PrimaryButton
            onClick={() => {
              this.handleChange("delete");
            }}
          >
            Delete condition (and all children) <DeleteForeverIcon />
          </PrimaryButton>
        </div>
        <Divider style={{ margin: "10px" }} />
        <div>{conditionFields}</div>
      </Card>
    );
  }
}
