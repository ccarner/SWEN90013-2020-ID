import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";

import DeleteForeverOutlinedIcon from "@material-ui/icons/DeleteForeverOutlined";
import PrimaryButton from "./../../../../reusableComponents/PrimaryButton";

export default class surveyEditingViewSelectionOptions extends Component {
  constructor(props) {
    super(props);
    this.getQuestionOptionFromProps = this.getQuestionOptionFromProps.bind(
      this
    );
  }

  getQuestionOptionFromProps() {
    return this.props.survey.surveySections[this.props.sectionIndex].questions[
      this.props.questionIndex
    ].selectionOptions[this.props.selectionOptionIndex];
  }

  render() {
    const option = this.getQuestionOptionFromProps();
    return (
      <Card
        style={{ display: "flex", flexDirection: "column", padding: "20px" }}
      >
        <TextField
          label={"Selection Option #" + (this.props.selectionOptionIndex + 1)}
          value={option || ""}
          variant="outlined"
          onChange={(event) => {
            this.props.handleUpdate(
              this.props.selectionOptionIndex,
              event.target.value
            );
          }}
        />
        <PrimaryButton
          onClick={() => {
            this.props.handleDelete(this.props.selectionOptionIndex);
          }}
        >
          Delete this Option <DeleteForeverOutlinedIcon />
        </PrimaryButton>
      </Card>
    );
  }
}
