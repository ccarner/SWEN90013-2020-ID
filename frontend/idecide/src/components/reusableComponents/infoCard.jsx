import React from "react";
import { Card, Typography } from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";

/**
 * The initial page displayed after selecting a survey, with info about the survey itself
 * @param {*} props
 */
export default function infoCard(props) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        flexWrap: "nowrap",
        margin: window.matchMedia("(max-width: 600px)").matches
          ? "0.5em"
          : "5%",
      }}
    >
      <Typography style={{ color: "white" }} gutterBottom variant="h3">
        {props.heading}
      </Typography>
      <Card>
        <CardContent>
          <Typography gutterBottom variant="h3">
            {props.cardTitle}
          </Typography>
          <Typography
            variant="body2"
            component="p"
            style={{ fontSize: "18px", padding: "20px", textAlign: "left" }}
          >
            {props.cardBody}
          </Typography>
          {props.children}
        </CardContent>
      </Card>
    </div>
  );
}
