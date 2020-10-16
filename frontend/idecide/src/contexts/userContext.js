import React from "react";
// context object for user accounts

// helpful resource: https://www.digitalocean.com/community/tutorials/react-manage-user-login-react-context
const userContext = React.createContext({
  userContext: { userType: null, jwt: null, username: null },
});

export default userContext;
