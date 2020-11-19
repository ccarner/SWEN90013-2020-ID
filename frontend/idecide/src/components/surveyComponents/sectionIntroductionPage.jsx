import React from "react";
import InfoCard from "../reusableComponents/infoCard";

/**
 * The initial page displayed after selecting a survey, with info about the survey itself
 * @param {*} props
 */
export default function SectionIntroductionPage(props) {
  var cardBody = null;
  if (props.section.sectionIntroductionBodyHtml) {
    cardBody = (
      <div
        className="content"
        dangerouslySetInnerHTML={{
          __html: props.section.sectionIntroductionBodyHtml,
        }}
      ></div>
    );
  }

  return (
    <InfoCard
      heading={props.section.sectionTitleText}
      cardTitle={null}
      cardBody={cardBody}
    />
  );
}
