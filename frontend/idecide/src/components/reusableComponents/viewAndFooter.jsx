import React from "react";

// takes props of 'footer' and 'view' and composes them
// into a main view with a footer which is 'fixed' to the bottom of the screen
// (but the view scaled to be able to scroll behind the footer)
// must be placed into an environment where:
// 1) the parent element has a fixed/defined height (so can take up all remaining space)
// 2) either the parent is flexbox (column; flexgrow=1 takes up remainder of space)
//    OR there are no other child elements along with this ViewAndFooter (else the 100% height won't work)
// note removed the 100% height, so must be in flexbox now, could add with a prop to indicate how to render
export default function ViewAndFooter(props) {
  return (
    <div
      className="ViewAndFooterOuter"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        flexGrow: 1,
        overflow: "hidden",
        // height:"100%"
      }}
    >
      <div
        className="ViewAndFooterView"
        style={{ overflow: "auto", height: "100%", fontSize: "99" }}
      >
        {props.view}
      </div>
      <div lassName="ViewAndFooterFooter">{props.footer}</div>
    </div>
  );
}
