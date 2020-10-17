//TODO: remove this component
// import React, { useState, useEffect } from "react";
// import { makeStyles } from "@material-ui/core/styles";
// import Grid from "@material-ui/core/Grid";
// import VerticalTab from "./VerticalTab";
// import dashboardAllSurveysExpose from "./view/survey/dashboardAllSurveysExpose";
// import DCLayout from "./view/dataCollection/DCLayout";
// import APLayout from "./view/actionPlan/APLayout";

// import { BrowserRouter as Router, Route } from "react-router-dom";

// import NewSurvey from "./view/survey/surveyEdit/NewSurveyS";
// import SurveySection from "./view/survey/surveyView/SurveySection";
// import Dashboard from "./view/dashboardview";
// import Researcher from "./view/researcher/RLayout";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//   },
//   paper: {
//     padding: theme.spacing(2),
//     textAlign: "center",
//     color: theme.palette.text.secondary,
//   },
// }));

// export default function DBLayout() {
//   const classes = useStyles();

//   return (
//     <Grid
//       container
//       className={classes.root}
//       spacing={3}
//       direction="row"
//       justify="flex-start"
//       alignItems="flex-start"
//     >
//       {/**		<Grid item xs={3} lg={2}>
// 				<VerticalTab />
// 			</Grid>
// 			<Grid item xs={9} >
// 		<Route path="/dashboard/home" component={Dashboard} />
// 				<Route path="/dashboard/survey" component={dashboardAllSurveysExpose} />
// 				<Route path="/dashboard/datacollection" component={DCLayout} />
// 				<Route path="/dashboard/actionplan" component={APLayout} />
// 				<Route path="/dashboard/surveyId=:surveyId" component={SurveySection} />
// 				<Route path="/dashboard/newsurvey" component={NewSurvey} />
// 				<Route path="/dashboard/user" component={Researcher} />
// 			</Grid> */}
//     </Grid>
//   );
// }
