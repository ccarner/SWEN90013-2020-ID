import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { Card } from "@material-ui/core";
import PrimaryButton from "../../../../../reusableComponents/PrimaryButton";
import update from "immutability-helper";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import FormHelperText from "@material-ui/core/FormHelperText";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

export default class EditAlgorithmRuleLeafCondition extends Component {
  constructor(props) {
    super(props);
    this.factFieldType = {
      QUESTION_RESPONSE: { type: "TEXT" },
      TOTAL_ANSWER_POINTS: { type: "INT" },
      TOP_PRIORITY: {
        type: "SELECT",
        options: ["safety", "child", "resources", "health", "partner"],
      },
      INTENTION: { type: "SELECT", options: ["stay", "leave", "left"] },
      DA_SUM: { type: "INT" },
      CAS_SUM: { type: "INT" },
      DA_SUM: { type: "INT" },
      SEVERE_SUBSCALE_CAS_SCORE: { type: "INT" },
      PHYSICAL_SUBSCALE_CAS_SCORE: { type: "INT" },
      EMOTIONAL_SUBSCALE_CAS_SCORE: { type: "INT" },
      HARASSMENT_SUBSCALE_CAS_SCORE: { type: "INT" },
    };

    this.handleChangeFact = this.handleChangeFact.bind(this);
  }

  //create extra fields/destroy them when needed

  handleChangeFact(event) {
    const value = event.target.value;
    if (value === "TOTAL_ANSWER_POINTS") {
      this.props.handleChange({
        fact: { $set: value },
        operator: { $set: "" },
        value: { $set: "" },
        params: { $set: { totalAnswerPointsQuestions: [[]] } },
      });
    } else if (value === "QUESTION_RESPONSE") {
      this.props.handleChange({
        fact: { $set: value },
        operator: { $set: "" },
        value: { $set: "" },
        params: { $set: { surveyId: "", questionId: "" } },
      });
    } else {
      this.props.handleChange({
        fact: { $set: value },
        operator: { $set: "" },
        value: { $set: "" },
        $unset: ["params"],
      });
    }
  }

  render() {
    var extraParamFields = [];
    if (this.props.conditionObject.params) {
      if (
        this.props.conditionObject.params.totalAnswerPointsQuestions !==
        undefined
      ) {
        extraParamFields.push(
          <div>
            <div>
              <FormControl variant="outlined" style={{ width: "100%" }}>
                <InputLabel shrink>SurveyId</InputLabel>
                {/* TODO: currently this only allows for arrays that had one entry in the totalAnswerPoints...
              ie of form [[x,y]] rather than [[x,y],[w,z]...], not a huge deal; since can just add ANOTHER condition 
              for each range*/}
                <TextField
                  style={{ margin: "10px" }}
                  helperText="The surveyId from which questions will be referenced. This should be a SINGLE integer"
                  type="number"
                  fullWidth
                  variant="outlined"
                  value={
                    this.props.conditionObject.params
                      .totalAnswerPointsQuestions[0][0]
                  }
                  onChange={(event) => {
                    this.props.handleChange({
                      params: {
                        totalAnswerPointsQuestions: {
                          0: { 0: { $set: event.target.value } },
                        },
                      },
                    });
                  }}
                />
              </FormControl>
            </div>
            <div>
              <FormControl variant="outlined" style={{ width: "100%" }}>
                <InputLabel shrink>questionsId</InputLabel>
                {/* TODO: currently this only allows for arrays that had one entry in the totalAnswerPoints...
              ie of form [[x,y]] rather than [[x,y],[w,z]...], not a huge deal; since can just add ANOTHER condition 
              for each range*/}
                <TextField
                  style={{ margin: "10px" }}
                  helperText="The question(s) which will be referenced. You can type a single question (eg 42) or a range (eg 30-42)"
                  fullWidth
                  variant="outlined"
                  value={
                    this.props.conditionObject.params
                      .totalAnswerPointsQuestions[0][1]
                  }
                  onChange={(event) => {
                    this.props.handleChange({
                      params: {
                        totalAnswerPointsQuestions: {
                          0: { 1: { $set: event.target.value } },
                        },
                      },
                    });
                  }}
                />
              </FormControl>
            </div>
          </div>
        );
      } else if (
        this.props.conditionObject.params.surveyId !== undefined &&
        this.props.conditionObject.params.questionId !== undefined
      ) {
        extraParamFields.push(
          <div>
            <div>
              <FormControl variant="outlined" style={{ width: "100%" }}>
                <InputLabel shrink>SurveyId</InputLabel>
                {/* TODO: currently this only allows for arrays that had one entry in the totalAnswerPoints...
              ie of form [[x,y]] rather than [[x,y],[w,z]...], not a huge deal; since can just add ANOTHER condition 
              for each range*/}
                <TextField
                  style={{ margin: "10px" }}
                  helperText="The surveyId from which question will be referenced. This should be a SINGLE integer"
                  type="number"
                  fullWidth
                  variant="outlined"
                  value={this.props.conditionObject.params.surveyId}
                  onChange={(event) => {
                    this.props.handleChange({
                      params: {
                        surveyId: {
                          $set: event.target.value,
                        },
                      },
                    });
                  }}
                />
              </FormControl>
            </div>
            <div>
              <FormControl variant="outlined" style={{ width: "100%" }}>
                <InputLabel shrink>QuestionId</InputLabel>
                {/* TODO: currently this only allows for arrays that had one entry in the totalAnswerPoints...
              ie of form [[x,y]] rather than [[x,y],[w,z]...], not a huge deal; since can just add ANOTHER condition 
              for each range*/}
                <TextField
                  style={{ margin: "10px" }}
                  helperText="The questionId which will be referenced. This should be a SINGLE integer"
                  type="number"
                  fullWidth
                  variant="outlined"
                  value={this.props.conditionObject.params.questionId}
                  onChange={(event) => {
                    this.props.handleChange({
                      params: {
                        questionId: {
                          $set: event.target.value,
                        },
                      },
                    });
                  }}
                />
              </FormControl>
            </div>
          </div>
        );
      }
    }

    var valueField = null;
    const factFieldType = this.factFieldType[this.props.conditionObject.fact]
      .type;

    if (factFieldType === "SELECT") {
      valueField = (
        <Select
          style={{ margin: "10px" }}
          label={"Operator"}
          multiline
          fullWidth
          variant="outlined"
          value={this.props.conditionObject.value}
          onChange={(event) => {
            this.props.handleChange({
              value: { $set: event.target.value },
            });
          }}
        >
          {this.factFieldType[this.props.conditionObject.fact].options.map(
            (option, index) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            )
          )}
        </Select>
      );
    } else {
      valueField = (
        <TextField
          style={{ margin: "10px" }}
          fullWidth
          type={factFieldType === "INT" && "number"}
          //   inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
          variant="outlined"
          value={this.props.conditionObject.value}
          onChange={(event) => {
            this.props.handleChange({
              value: { $set: event.target.value },
            });
          }}
        />
      );
    }

    return (
      <div>
        <div>
          <FormControl variant="outlined" style={{ width: "95%" }}>
            <InputLabel shrink>Fact</InputLabel>
            <Select
              id="factInputLabel"
              style={{ margin: "10px" }}
              label={"Fact"}
              multiline
              fullWidth
              variant="outlined"
              value={this.props.conditionObject.fact}
              onChange={this.handleChangeFact}
            >
              {/* outermost condition only has 'ANY' or 'ALL' conditions, can't be both */}
              <MenuItem value={"TOP_PRIORITY"}> User's Top Priority </MenuItem>
              <MenuItem value={"INTENTION"}>
                User's Intention (leave/stay/left)
              </MenuItem>
              <MenuItem value={"TOTAL_ANSWER_POINTS"}>
                Number of positive answers
              </MenuItem>
              <MenuItem value={"DA_SUM"}>Danger Assessment Score Sum </MenuItem>
              <MenuItem value={"CAS_SUM"}> CAS Score Sum </MenuItem>
              <MenuItem value={"SEVERE_SUBSCALE_CAS_SCORE"}>
                Severe Subscale CAS Score
              </MenuItem>
              <MenuItem value={"PHYSICAL_SUBSCALE_CAS_SCORE"}>
                Physical Subscale CAS Score
              </MenuItem>
              <MenuItem value={"EMOTIONAL_SUBSCALE_CAS_SCORE"}>
                Emotional Subscale CAS Score
              </MenuItem>
              <MenuItem value={"HARASSMENT_SUBSCALE_CAS_SCORE"}>
                Harrassment Subscale CAS Score
              </MenuItem>
              <MenuItem value={"QUESTION_RESPONSE"}>
                Answer to a particular question
              </MenuItem>
            </Select>
            <FormHelperText>
              This is the piece of information that is 'compared' to determine
              if feedback will be given
            </FormHelperText>
          </FormControl>
          {extraParamFields}
        </div>
        <div>
          <FormControl variant="outlined" style={{ width: "95%" }}>
            <InputLabel shrink>Operator</InputLabel>
            <Select
              style={{ margin: "10px" }}
              label={"Operator"}
              multiline
              fullWidth
              variant="outlined"
              value={this.props.conditionObject.operator}
              onChange={(event) => {
                this.props.handleChange({
                  operator: { $set: event.target.value },
                });
              }}
            >
              {/* outermost condition only has 'ANY' or 'ALL' conditions, can't be both */}

              <MenuItem value={"equal"}>Equal to...</MenuItem>
              <MenuItem value={"notEqual"}>Not equal to...</MenuItem>
              <MenuItem value={"lessThan"}> Less than... </MenuItem>
              <MenuItem value={"lessThanInclusive"}>
                Less than or equal to...
              </MenuItem>
              <MenuItem value={"greaterThan"}>Greater than...</MenuItem>
              <MenuItem value={"greaterThanInclusive"}>
                Greater than or equal to...
              </MenuItem>
            </Select>
            <FormHelperText>
              This is the operator used to compare the 'fact' to some 'value' to
              determine if feedback will be given
            </FormHelperText>
          </FormControl>
        </div>
        <div>
          <FormControl
            variant="outlined"
            type="number"
            style={{ width: "95%" }}
          >
            <InputLabel shrink>Value</InputLabel>
            {valueField}
            <FormHelperText>
              This is the value that is compared to the 'fact' to determine if
              feedback will be given
            </FormHelperText>
          </FormControl>
        </div>
      </div>
    );
  }
}
