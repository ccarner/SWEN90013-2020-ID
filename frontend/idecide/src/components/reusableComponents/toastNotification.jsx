import { DefaultToast } from "react-toast-notifications";
import React from "react";

export const ToastNotification = ({ children, ...props }) => (
  <DefaultToast {...props} style={{ zIndex: 1200 }}>
    {children}
  </DefaultToast>
);
