import React from "react";
import PrimaryButton from "../reusableComponents/PrimaryButton";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import InfoCard from "../reusableComponents/infoCard";

/**
 * The initial page displayed after selecting a survey, with info about the survey itself
 * @param {*} props
 */
export default function SurveyIntroductionPage(props) {
  var cardBody = null;
  if (props.survey.surveyIntroductionHtmlB64) {
    cardBody = (
      <div
        className="content"
        dangerouslySetInnerHTML={{
          __html: props.survey.surveyIntroductionHtmlB64,
        }}
      />
    );
  } else {
    cardBody = props.survey.surveyIntroduction;
  }

  return (
    <InfoCard
      heading={"Introduction"}
      cardTitle={props.survey.surveyTitle}
      cardBody={cardBody}
    >
      <PrimaryButton onClick={props.returnHome}>
        <ChevronLeftIcon /> Back
      </PrimaryButton>
      <PrimaryButton onClick={props.startSurvey}>
        Begin <ChevronRightIcon />
      </PrimaryButton>
    </InfoCard>
  );
}
