import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const StyledButton = withStyles((theme) => ({
  root: {
    color: "purple",
    // backgroundImage: "linear-gradient(70deg, Violet , purple);",
    borderRadius: "10em",
    // border: "none",
    borderColor: "purple",
    minHeight: "3em",
    minWidth: "6em",
    height: "auto",
    width: "auto",
    margin: "1em",
    // backgroundColor: purple[500],
    "&:hover": {
      opacity: "0.9",
    },
  },
}))(Button);

export default function SecondaryButton(props) {
  return (
    <StyledButton
      variant="outlined"
      size="large"
      style={{ ...props.extraStyle }}
      {...props}
    >
      {props.children}
    </StyledButton>
  );
}
