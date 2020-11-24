import React from "react";

import PrimaryButton from "./PrimaryButton";

export default function PrimaryButtonContrast(props) {
  const { style, ...restProps } = props;
  return (
    <PrimaryButton
      style={{ background: "white", width: "fit-content", ...style }}
      {...restProps}
    >
      <span
        style={{
          background: "linear-gradient(45deg, #DA76C7 30%, #8973E6 90%)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          color: "rgba(0,0,0,.2)",
        }}
      >
        {props.children}
      </span>
    </PrimaryButton>
  );
}
