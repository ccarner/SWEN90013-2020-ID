// TODO remove component
//  import React from "react";

// import { getAllAdmins } from "../../API/loginAPI";
// import LoadingSpinner from "../reusableComponents/loadingSpinner";
// import PrimaryButton from "../reusableComponents/PrimaryButton";
// import { getResultByUser } from "../../API/resultAPI";
// import AdminConsole from "../AdminComponents/adminConsole";

// export default class UserInfo extends React.Component {
//   constructor(props) {
//     super();

//     this.state =
//   }

//   handleHistory = async () => {
//     const userContext = JSON.parse(localStorage.getItem("userContext"));
//     const prevCompletionHistory = await getResultByUser(userContext.userId);
//     var surveyResults = {};
//     // convert into format of {"surveyId":{surveyCompetion}}
//     for (const surveyCompletion of prevCompletionHistory) {
//       surveyResults[surveyCompletion.surveyId] = surveyCompletion;
//     }
//     localStorage.setItem("prevCompletions", JSON.stringify(surveyResults));
//   };

//   render() {
//     const { history } = this.state;

//     return (
//       <div>
//         <PrimaryButton onClick={this.handleHistory}>
//           Completion History
//         </PrimaryButton>
//         {history === null ? null : JSON.stringify(history)}

//         {localStorage.getItem("userType") === "admin" ? <AdminConsole /> : null}
//       </div>
//     );
//   }
// }
