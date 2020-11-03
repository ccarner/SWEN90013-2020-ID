import React, { useState, useEffect } from "react";

import { Collapse } from "react-bootstrap";
import PrimaryButton from "../reusableComponents/PrimaryButton";
import LoadingSpinner from "../reusableComponents/loadingSpinner";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import SaveIcon from "@material-ui/icons/Save";

import InfoCard from "../reusableComponents/infoCard";
import { Card, Typography } from "@material-ui/core";

import { getValue } from "../../API/keyValueAPI";

export default function SurveyHomeIntroduction(props) {
  const [getIntroHtml, setIntroHtml] = useState("");

  useEffect(() => {
    //had to put separate function in here due to React's design
    async function fetch() {
      const html = await getValue("introductionHtml");
      setIntroHtml(html);
    }
    fetch();
  });

  const introHtml = getIntroHtml;

  const bodyContent = !introHtml ? (
    <LoadingSpinner />
  ) : (
    <div dangerouslySetInnerHTML={{ __html: introHtml }} />
  );

  return (
    <React.Fragment>
      <InfoCard
        heading={"Introduction"}
        cardTitle={"Welcome to I-Decide"}
        cardBody={bodyContent}
      ></InfoCard>
      {/* TODO: abstract out this bottom bar with flex display as a component */}
      <Card style={{ position: "fixed", bottom: 0, width: "100%" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <PrimaryButton onClick={props.handleNext}>
            Continue a previous session &nbsp;
            <SaveIcon />
          </PrimaryButton>
          <PrimaryButton onClick={props.handleNext}>
            Begin new session
            <ChevronRightIcon />
          </PrimaryButton>
        </div>
      </Card>
    </React.Fragment>
  );
}
