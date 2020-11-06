import React, { Component } from "react";

import { Accordion as MuiAccordion, Typography } from "@material-ui/core";
import { AccordionSummary as MuiAccordionSummary } from "@material-ui/core";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { withStyles } from "@material-ui/core/styles";

export default class ActionPlanAccordion extends Component {
  render() {
    const AccordionSummary = withStyles({
      content: {
        justifyContent: "center",
      },
    })(MuiAccordionSummary);

    return (
      <div>
        <MuiAccordion
          key={1}
          // IMPORTANT NOTE: this transition props stops the accordion details from rendering
          // if they are not open!!
          TransitionProps={{ unmountOnExit: true }}
          style={{ marginTop: 10 }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon style={{ color: "white" }} />}
            style={{
              background: "linear-gradient(40deg, #ff6ec4, #7873f5)",
              color: "white",
              fontSize: "25px",
            }}
          >
            <Typography style={{ fontSize: "1em" }}>
              {this.props.heading}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>{this.props.children}</AccordionDetails>
        </MuiAccordion>
      </div>
    );
  }
}
