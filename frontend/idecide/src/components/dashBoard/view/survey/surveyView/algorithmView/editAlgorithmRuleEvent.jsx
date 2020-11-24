import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import PrimaryButton from "../../../../../reusableComponents/PrimaryButton";
import update from "immutability-helper";

//rules consist of an 'event' and a set of 'conditions'
//this component modifies the 'event' component
export default class EditAlgorithmRuleEvent extends Component {
  handleChange(eventType, event) {
    var value = event.target.value;

    const updateRuleEvent = (prevSurvey) =>
      update(prevSurvey, {
        surveySections: {
          [this.props.sectionIndex]: {
            sectionResultAlgorithm: {
              [this.props.ruleIndex]: {
                event: { [eventType]: { $set: value } },
              },
            },
          },
        },
      });

    this.props.modifySurvey(updateRuleEvent);
  }

  render() {
    return (
      <div>
        Event Values:
        <div>
          <TextField
            label="Event Type"
            helperText="This is just an identifier, not shown to the user"
            multiline
            fullWidth
            variant="outlined"
            value={this.props.rule.event.type}
            onChange={(event) => {
              this.handleChange("type", event);
            }}
          />
        </div>
        <div>
          <TextField
            label={"Feedback Heading"}
            helperText="This is the heading for the feedback shown to users who match this condition"
            multiline
            fullWidth
            variant="outlined"
            value={this.props.rule.event.params.categoryName}
            onChange={(event) => {
              this.handleChange("params", event);
            }}
          />
        </div>
        <div>
          <TextField
            label={"Feedback"}
            helperText="This is the feedback shown to users who match this condition"
            multiline
            fullWidth
            variant="outlined"
            value={this.props.rule.event.params.responseString}
            onChange={(event) => {
              this.handleChange("params", event);
            }}
          />
        </div>
        <div>
          <TextField
            label={"Image Name/Link"}
            helperText="This is the image shown to users who match this condition. It can be either the name of an image (If uploaded here on the site) or a link otherwise"
            multiline
            fullWidth
            variant="outlined"
            value={this.props.rule.event.params.imageLink}
            onChange={(event) => {
              this.handleChange("params", event);
            }}
          />
        </div>
      </div>
    );
  }
}
