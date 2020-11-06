import React from "react";
import InfoCard from "../reusableComponents/infoCard";

/**
 * The initial page displayed after selecting a survey, with info about the survey itself
 * @param {*} props
 */
export default function SectionIntroductionPage(props) {
  var cardBody = null;
  if (props.section.sectionIntroductionHtmlB64) {
    cardBody = (
      <div
        className="content"
        dangerouslySetInnerHTML={{
          __html: atob(props.section.sectionIntroductionHtmlB64),
        }}
      ></div>
    );
  } else {
    cardBody = props.section.sectionIntroduction;
  }

  return (
    <InfoCard
      heading={props.section.sectionTitle}
      cardTitle={null}
      cardBody={cardBody}
    />
  );
}
