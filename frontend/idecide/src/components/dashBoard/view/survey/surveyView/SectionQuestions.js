// //TODO: remove this component, not being used anymore
// import React, { useState, useEffect, createContext } from "react";
// import {
//   Box,
//   Button,
//   Collapse,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogContentText,
//   TextField,
//   FormControl,
//   InputLabel,
//   MenuItem,
//   Select,
//   DialogActions,
//   Card,
//   CardContent,
//   CardHeader,
//   Divider,
//   Typography,
//   IconButton,
//   Grid,
//   Tooltip,
//   Paper,
//   TableContainer,
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
// } from "@material-ui/core";
// import DeleteForeverOutlinedIcon from "@material-ui/icons/DeleteForeverOutlined";

// import { getSurveyById, editSurvey } from "../../../../../API/surveyAPI";
// import EditIcon from "@material-ui/icons/Edit";
// import ExpandMore from "@material-ui/icons/ExpandMore";
// import ExpandLess from "@material-ui/icons/ExpandLess";
// import QuestionDetails from "./QuestionDetails";
// import Alert from "@material-ui/lab/Alert";
// import ExpandMoreRoundedIcon from "@material-ui/icons/ExpandMoreRounded";
// import ControlPointRoundedIcon from "@material-ui/icons/ControlPointRounded";

// export const t = 4;
// export const QuestionContext = createContext();

// const SectionQuestions = (props) => {
//   const [openAddQuestion, setOpenAddQuestion] = useState(false);
//   const [isOpen, setIsOpen] = React.useState(false);

//   const [open, setDMOpen] = React.useState(false); //control of adding new survey
//   const [openTable, setOpenTable] = React.useState(false); // open algorithm table
//   const [openAlert, setOpen] = React.useState(false); // open error alert
//   const [openGreen, setOpenGreen] = React.useState(false);
//   const [error, setError] = React.useState();
//   const [values, setValues] = React.useState({
//     title: props.data.sectionTitleText,
//     descrpition: props.data.sectionIntroduction,
//     sectionIntroductionBodyHtml: props.data.sectionIntroductionBodyHtml,
//     question: "",
//     option1: "Never",
//     option2: "Once",
//     option3: "Several Times",
//     option4: "Once A Month",
//     option5: "Once A Week",
//     option6: "Daily",
//     left: "",
//     right: "",
//   });

//   const [editRow, setRow] = React.useState();
//   const [algorithm, setAlgorithm] = React.useState({
//     fact: "",
//     operator: "",
//     value: "",
//     categoryName: "",
//     responseString: "",
//     index: -1,
//   });

//   //	console.log('values', values);

//   const handleOpenTable = () => {
//     setOpenTable(!openTable);
//   };

//   const [type, setType] = React.useState("");

//   const handleTypeChange = (event) => {
//     setType(event.target.value);
//   };

//   const handleChange = (prop) => (event) => {
//     setValues({ ...values, [prop]: event.target.value });
//   };

//   const handleOpen = () => {
//     setDMOpen(true);
//   };

//   const handleClose = () => {
//     setDMOpen(false);
//   };

//   function handleView() {
//     setIsOpen((prev) => !prev);
//   }

//   const handleQClose = () => {
//     setOpenAddQuestion(false);
//   };

//   const handleAddQuestion = () => {
//     setOpenAddQuestion(true);
//   };

//   const AddQuestion = async () => {
//     if (openGreen) {
//       window.location.href = "./surveyId=" + props.surveyId;
//     } else {
//       let questions = props.data.questions;
//       let questionIndex = 0;
//       console.log(questions);
//       if (questions == "undefined") questions = [];

//       if (typeof questions.length !== "undefined")
//         questionIndex = questions.length;
//       var newSliderQuestion = {
//         //questionIndex: questionIndex,
//         questionId: questionIndex,
//         questionText: values.question,
//         questionType: type,
//         sliderDefaultValue: 5,
//         sliderMaxValue: 10,
//         sliderMinValue: 0,
//         left: values.left,
//         right: values.right,
//       };

//       // new long answer
//       var newLongAnswerQuestion = {
//         //	questionIndex: questionIndex,
//         questionId: questionIndex,
//         questionText: values.question,
//         questionType: type,
//         answerLength: 200, // no instruction in confluence
//       };

//       // new multiple selection
//       var newMultiSelectionQuestion = {
//         //	questionIndex: questionIndex,
//         questionId: questionIndex,
//         questionText: values.question,
//         questionType: type,
//         selectionOptions: [
//           {
//             name: values.option1,
//             weight: "0",
//           },
//           {
//             name: values.option2,
//             weight: "0.2",
//           },
//           {
//             name: values.option3,
//             weight: "0.4",
//           },
//           {
//             name: values.option4,
//             weight: "0.6",
//           },
//           {
//             name: values.option5,
//             weight: "0.8",
//           },
//           {
//             name: "Daily",
//             weight: "1",
//           },
//         ],
//       };

//       // new single selection
//       var newSingleSelectionQuestion = {
//         //	questionIndex: questionIndex,
//         questionId: questionIndex,
//         questionText: values.question,
//         questionType: type,
//         selectionOptions: [
//           {
//             name: values.option1,
//             weight: "0",
//           },
//           {
//             name: values.option2,
//             weight: "0.2",
//           },
//           {
//             name: values.option3,
//             weight: "0.4",
//           },
//           {
//             name: values.option4,
//             weight: "0.6",
//           },
//           {
//             name: values.option5,
//             weight: "0.8",
//           },
//           {
//             name: "Daily",
//             weight: "1",
//           },
//         ],
//       };

//       // new yes or no
//       var newYNQuestion = {
//         //	questionIndex: questionIndex,
//         questionId: questionIndex,
//         questionText: values.question,
//         questionType: type,
//         selectionOptions: [
//           {
//             name: "yes",
//             weight: "0",
//           },
//           {
//             name: "no",
//             weight: "1",
//           },
//         ],
//       };
//       //	questions.push(newMCQuestion);

//       if (type == "slider") {
//         questions.splice(questionIndex, 1, newSliderQuestion);
//       } else if (type == "yesOrNo") {
//         questions.push(newYNQuestion);
//       } else if (type == "longAnswer") {
//         questions.push(newLongAnswerQuestion);
//       } else if (type == "singleSelection") {
//         questions.push(newSingleSelectionQuestion);
//       } else if (type == "multipleSelection") {
//         questions.push(newMultiSelectionQuestion);
//       }
//       /*else {
// 				var newMCQuestion = {
// 					questionIndex: questionIndex,
// 					questionId: values.questionId,
// 					questionText: values.question,
// 					questionType: type,
// 					selectionOptions: [
// 						{
// 							name: values.option1,
// 							weight: '0'
// 						},
// 						{
// 							name: values.option2,
// 							weight: '0.2'
// 						},
// 						{
// 							name: values.option3,
// 							weight: '0.4'
// 						},
// 						{
// 							name: values.option4,
// 							weight: '0.6'
// 						},
// 						{
// 							name: values.option5,
// 							weight: '0.8'
// 						},
// 						{
// 							name: values.option6,
// 							weight: '1'
// 						}
// 					]
// 				};
// 				questions.push(newMCQuestion);
// 			}*/

//       console.log(questions);
//       let sections = props.sections;
//       console.log(sections.questions);
//       sections.questions = "";

//       sections.questions = questions;
//       var readyData = {
//         surveyId: props.surveyId,
//         surveySections: sections,
//       };
//       console.log(readyData);
//       await editSurvey(readyData)
//         .then(() => {
//           setOpenAddQuestion(false);
//         })
//         .catch(() => {
//           setOpen(true);
//           setError(error + "");
//         });
//     }
//   };

//   const UpdateSection = async (event) => {
//     if (openGreen) {
//       window.location.reload();
//     } else {
//       let sections = props.sections;

//       var modifiedSection = {
//         sectionTitleText: values.title,
//         sectionIntroduction: values.descrpition,
//         sectionId: props.data.sectionId,
//         questions: props.data.questions,
//         sectionResultAlgorithm: props.data.sectionResultAlgorithm,
//         sectionIntroductionBodyHtml: values.sectionIntroductionBodyHtml,
//       };

//       sections.splice(parseInt(props.index), 1, modifiedSection);

//       var readyData = JSON.stringify({
//         surveyId: props.surveyId,
//         surveySections: sections,
//       });

//       await editSurvey(readyData)
//         .then((response) => {
//           console.log(response.data);
//           if (response.data.code == 200) setOpenGreen(true);
//           else {
//             setOpen(true);
//             setError(response.data.message);
//           }
//         })
//         .catch(() => {
//           setOpen(true);
//           setError(error + "");
//         });
//     }
//   };

//   const deleteSection = async () => {
//     if (openGreen) {
//       window.location.href = "./surveyId=" + props.surveyId;
//     }

//     let sections = props.sections;
//     sections.splice(props.data.sectionIndex, 1);
//     sections.map((item, index) => {
//       item.sectionIndex = index;
//     });

//     var readyData = {
//       surveyId: props.surveyId,
//       surveySections: sections,
//     };

//     await editSurvey(readyData)
//       .then((data) => {
//         window.location.reload();
//       })
//       .catch(() => {
//         setOpen(true);
//         setError(error + "");
//       });
//   };

//   //editing, deleting, adding algrithm.
//   const [openAlgorithm, setOpenAlgorithm] = React.useState(false);

//   const handleOpenAlgorithm = (row, index) => {
//     setOpenAlgorithm(!openAlgorithm);
//     if (typeof row.conditions !== "undefined") {
//       setAlgorithm({
//         fact: row.conditions.any[0].fact,
//         operator: row.conditions.any[0].operator,
//         value: row.conditions.any[0].value,
//         categoryName: row.event.params.categoryName,
//         imageLink: row.event.params.imageLink,
//         responseString: row.event.params.responseString,
//         index: index,
//       });
//     }
//   };

//   const handleCloseAlgorithm = () => {
//     setOpenAlgorithm(!openAlgorithm);
//   };

//   const UpdateAlgorithm = async () => {
//     if (openGreen) {
//       window.location.reload();
//     } else {
//       if (algorithm.index == -1) {
//         console.log("algorithm", algorithm);
//         // adding new algorithm
//         const newAlgorithm = {
//           conditions: {
//             any: [
//               {
//                 fact: algorithm.fact,
//                 operator: algorithm.operator,
//                 value: algorithm.value,
//               },
//             ],
//           },
//           event: {
//             params: {
//               categoryName: algorithm.categoryName,
//               imageLink: algorithm.imageLink,
//               responseString: algorithm.responseString,
//             },
//           },
//         };

//         if (typeof props.data.sectionResultAlgorithm == "undefined")
//           props.data.sectionResultAlgorithm = [];
//         props.data.sectionResultAlgorithm.push(newAlgorithm);
//       } else {
//         // updating algorithm
//         let row = props.data.sectionResultAlgorithm[algorithm.index];

//         row.conditions.any[0].fact = algorithm.fact;
//         row.conditions.any[0].operator = algorithm.operator;
//         row.conditions.any[0].value = algorithm.value;
//         row.event.params.categoryName = algorithm.categoryName;
//         row.event.params.imageLink = algorithm.imageLink;
//         row.event.params.responseString = algorithm.responseString;

//         props.data.sectionResultAlgorithm.splice(algorithm.index, 1, row);
//       }

//       setAlgorithm({
//         fact: "",
//         operator: "",
//         value: "",
//         categoryName: "",
//         responseString: "",
//         index: -1,
//       });
//       // updating sections in the survey
//       props.sections.splice(props.index, 1, props.data);
//       console.log(algorithm.index, props.sections[0].sectionResultAlgorithm[0]);

//       var readyData = {
//         surveyId: props.surveyId,
//         surveySections: props.sections,
//       };

//       // updating the survey
//       await editSurvey(readyData)
//         .then((response) => {
//           if (response.data.code == 200) setOpenGreen(true);
//           else {
//             setOpen(true);
//             setError(response.data.message);
//           }
//         })
//         .catch(() => {
//           setOpen(true);
//           setError(error + "");
//         });
//     }
//   };

//   const handleAlChange = (prop) => (event) => {
//     setAlgorithm({ ...algorithm, [prop]: event.target.value });
//   };

//   const handleDeleteAlgorithm = async (index) => {
//     props.data.sectionResultAlgorithm.splice(index, 1);
//     props.sections.splice(props.index, 1, props.data);

//     var readyData = {
//       surveyId: props.surveyId,
//       surveySections: props.sections,
//     };

//     // updating the deleted algrithm survey
//     await editSurvey(readyData)
//       .then((response) => {
//         if (response.data.code == 200) alert("Delete successfully");
//         else {
//           alert(response.data.message);
//         }
//       })
//       .catch(() => {
//         alert(error + "");
//       });
//   };

//   return (
//     <div style={{ padding: "2%" }}>
//       <Card>
//         <CardHeader
//           action={
//             <div>
//               <Tooltip title="Click to edit the section title and introduction">
//                 <IconButton
//                   style={{ width: 50 }}
//                   color="secondary"
//                   aria-label="add an alarm"
//                   onClick={handleOpen}
//                 >
//                   <EditIcon color="primary" />
//                 </IconButton>
//               </Tooltip>
//               <Tooltip title="Click to add new question.">
//                 <IconButton
//                   style={{ width: 50 }}
//                   color="secondary"
//                   aria-label="add an alarm"
//                   onClick={handleAddQuestion}
//                 >
//                   <ControlPointRoundedIcon color="primary" />
//                 </IconButton>
//               </Tooltip>
//               <Tooltip title="Click to view all questions.">
//                 <IconButton
//                   style={{ width: 50 }}
//                   color="secondary"
//                   aria-label="add an alarm"
//                   onClick={handleView}
//                 >
//                   <ExpandMoreRoundedIcon color="primary" />
//                 </IconButton>
//               </Tooltip>
//             </div>
//           }
//           //   subheader="Description"
//           title={props.data.sectionTitleText}
//         />
//         <Divider />
//         <CardContent>
//           <Grid
//             container
//             spacing={2}
//             direction="row"
//             justify="flex-start"
//             alignItems="center"
//           >
//             <Grid
//               container
//               spacing={2}
//               direction="row"
//               justify="flex-start"
//               alignItems="center"
//             >
//               <Grid item>
//                 <Typography variant="h6" gutterBottom>
//                   Introduction:
//                 </Typography>
//               </Grid>
//               <Grid item>
//                 <Typography variant="body1" gutterBottom>
//                   {props.data.sectionIntroduction}
//                 </Typography>
//               </Grid>
//             </Grid>
//             <Grid
//               container
//               spacing={2}
//               direction="row"
//               justify="flex-start"
//               alignItems="center"
//             >
//               <Grid item>
//                 <Typography variant="h6" gutterBottom>
//                   Result Algorithm:
//                 </Typography>
//               </Grid>
//               <Grid item>
//                 {typeof props.data.sectionResultAlgorithm == "undefined" ||
//                 props.data.sectionResultAlgorithm.length == 0 ||
//                 typeof props.data.sectionResultAlgorithm[0] == "undefined" ||
//                 typeof props.data.sectionResultAlgorithm.map == "undefined" ? (
//                   <div>
//                     No algorithm
//                     <Tooltip title="Add result algorithm">
//                       <IconButton
//                         onClick={handleOpenAlgorithm}
//                         style={{ width: 50 }}
//                         color="primary"
//                       >
//                         <ControlPointRoundedIcon />
//                       </IconButton>
//                     </Tooltip>
//                   </div>
//                 ) : (
//                   <IconButton onClick={handleOpenTable}>
//                     <Typography variant="body1" gutterBottom>
//                       view{!openTable ? <ExpandMore /> : <ExpandLess />}
//                     </Typography>
//                   </IconButton>
//                 )}
//               </Grid>
//             </Grid>
//           </Grid>
//         </CardContent>
//         <Collapse in={openTable}>
//           <Divider />
//           <CardContent>
//             <TableContainer component={Paper}>
//               <Table size="small" aria-label="a dense table">
//                 <TableHead>
//                   <TableRow>
//                     <TableCell>Fact</TableCell>
//                     <TableCell align="right">Operator</TableCell>
//                     <TableCell align="right">value</TableCell>
//                     <TableCell align="right">categoryName</TableCell>
//                     <TableCell align="center">ImageLink</TableCell>
//                     <TableCell align="center">responseString</TableCell>
//                     <TableCell align="center">Action</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {typeof props.data.sectionResultAlgorithm == "undefined" ||
//                   typeof props.data.sectionResultAlgorithm.map ==
//                     "undefined" ? (
//                     <IconButton onClick={handleOpenAlgorithm}>
//                       No algorithm <ControlPointRoundedIcon />
//                     </IconButton>
//                   ) : (
//                     //	props.data.sectionResultAlgorithm
//                     props.data.sectionResultAlgorithm.map((row, index) => (
//                       <TableRow key={row.name}>
//                         <TableCell component="th" scope="row">
//                           {row.conditions.any[0].fact}
//                         </TableCell>
//                         <TableCell align="right">
//                           {row.conditions.any[0].operator}
//                         </TableCell>
//                         <TableCell align="right">
//                           {row.conditions.any[0].value}
//                         </TableCell>
//                         <TableCell align="right">
//                           {row.event.params.categoryName}
//                         </TableCell>
//                         <TableCell align="center">
//                           <Button href={row.event.params.imageLink}>
//                             image
//                           </Button>
//                         </TableCell>
//                         <TableCell>{row.event.params.responseString}</TableCell>
//                         <TableCell>
//                           <IconButton
//                             onClick={handleOpenTable}
//                             style={{ width: 50 }}
//                             onClick={() => handleOpenAlgorithm(row, index)}
//                             color="primary"
//                           >
//                             <EditIcon fontSize="small" />
//                           </IconButton>
//                           <IconButton
//                             color="secondary"
//                             style={{ width: 50 }}
//                             size="small"
//                             onClick={() => handleDeleteAlgorithm(index)}
//                           >
//                             <DeleteForeverOutlinedIcon fontSize="small" />
//                           </IconButton>
//                         </TableCell>
//                       </TableRow>
//                     ))
//                   )}
//                   <TableRow align="center">
//                     <TableCell align="center" colSpan={7}>
//                       <Button fullWidth onClick={handleOpenAlgorithm}>
//                         <ControlPointRoundedIcon fontSize="middle" />
//                       </Button>
//                     </TableCell>
//                   </TableRow>
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           </CardContent>
//         </Collapse>
//       </Card>
//       <Collapse in={isOpen}>
//         <div>
//           {typeof props.data.questions !== "undefined" ? (
//             props.data.questions.map((question, index) => (
//               <Box key={index}>
//                 <QuestionDetails
//                   surveyID={props.surveyId}
//                   data={question}
//                   index={index}
//                   currentSection={props.sections}
//                   questions={props.data.questions}
//                 />
//               </Box>
//             ))
//           ) : (
//             <div>No questions</div>
//           )}
//         </div>
//       </Collapse>

//       {/**  This window is used for updating section */}
//       <Dialog
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="max-width-dialog-title"
//         maxWidth="lg"
//         fullWidth
//       >
//         <DialogTitle id="form-dialog-title">Section</DialogTitle>
//         <DialogContent>
//           <Collapse in={!openGreen}>
//             <DialogContentText>
//               Please input the title and description for the section.
//             </DialogContentText>

//             <TextField
//               id="outlined-multiline-flexible"
//               required
//               fullWidth
//               value={values.title}
//               onChange={handleChange("title")}
//               label="Title"
//               variant="outlined"
//             />
//             <Box p={1} />
//             <TextField
//               id="outlined-multiline-flexible"
//               multiline
//               fullWidth
//               required
//               value={values.descrpition}
//               onChange={handleChange("descrpition")}
//               rows={4}
//               label="Description"
//               variant="outlined"
//             />
//             <Box p={1} />
//             <DialogContentText>
//               Please input the HTML description for the section.
//             </DialogContentText>
//             <TextField
//               id="outlined-multiline-flexible"
//               multiline
//               fullWidth
//               required
//               value={values.sectionIntroductionBodyHtml}
//               onChange={handleChange("sectionIntroductionBodyHtml")}
//               rows={4}
//               label="HTML"
//               variant="outlined"
//             />
//           </Collapse>
//         </DialogContent>
//         <DialogContent>
//           <Collapse in={openAlert}>
//             <Alert severity="error">{error}</Alert>
//           </Collapse>
//           <Collapse in={openGreen}>
//             <Alert severity="success">Update Section Successfully!</Alert>
//           </Collapse>
//         </DialogContent>
//         <DialogActions>
//           <Collapse in={!openGreen}>
//             <IconButton
//               color="secondary"
//               aria-label="add an alarm"
//               onClick={deleteSection}
//             >
//               <DeleteForeverOutlinedIcon fontSize="large" />
//             </IconButton>
//           </Collapse>
//           <Collapse in={!openGreen}>
//             <Button onClick={handleClose} color="primary">
//               Cancel
//             </Button>
//           </Collapse>
//           <Button type="submit" color="primary" onClick={UpdateSection}>
//             Confirm
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/**  This window is used for updating result algorithm */}
//       <Dialog
//         open={openAlgorithm}
//         onClose={handleCloseAlgorithm}
//         aria-labelledby="max-width-dialog-title"
//         maxWidth="lg"
//         fullWidth
//       >
//         <DialogTitle id="form-dialog-title">Algorithm</DialogTitle>
//         <DialogContent>
//           <Collapse in={!openGreen}>
//             <DialogContentText>
//               Please input the details for the algorithm.
//             </DialogContentText>
//             <TextField
//               id="outlined-multiline-flexible"
//               required
//               fullWidth
//               value={algorithm.fact}
//               onChange={handleAlChange("fact")}
//               label="Fact"
//               variant="outlined"
//             />
//             <Box p={1} />
//             <TextField
//               id="outlined-multiline-flexible"
//               fullWidth
//               required
//               value={algorithm.operator}
//               onChange={handleAlChange("operator")}
//               label="Operator"
//               variant="outlined"
//             />
//             <Box p={1} />
//             <TextField
//               id="outlined-multiline-flexible"
//               fullWidth
//               required
//               value={algorithm.value}
//               onChange={handleAlChange("value")}
//               label="Value"
//               variant="outlined"
//             />
//             <Box p={1} />
//             <TextField
//               id="outlined-multiline-flexible"
//               fullWidth
//               required
//               value={algorithm.categoryName}
//               onChange={handleAlChange("categoryName")}
//               label="CategoryName"
//               variant="outlined"
//             />
//             <Box p={1} />
//             <TextField
//               id="outlined-multiline-flexible"
//               fullWidth
//               required
//               value={algorithm.imageLink}
//               onChange={handleAlChange("imageLink")}
//               label="ImageLink"
//               variant="outlined"
//             />
//             <Box p={1} />
//             <TextField
//               id="outlined-multiline-flexible"
//               fullWidth
//               multiline
//               required
//               value={algorithm.responseString}
//               onChange={handleAlChange("responseString")}
//               rows={4}
//               label="ResponseString"
//               variant="outlined"
//             />
//           </Collapse>
//         </DialogContent>
//         <DialogContent>
//           <Collapse in={openAlert}>
//             <Alert severity="error">{error}</Alert>
//           </Collapse>
//           <Collapse in={openGreen}>
//             <Alert severity="success">Update Algorithm Successfully!</Alert>
//           </Collapse>
//         </DialogContent>
//         <DialogActions>
//           <Collapse in={!openGreen}>
//             <IconButton
//               color="secondary"
//               aria-label="add an alarm"
//               onClick={deleteSection}
//             >
//               <DeleteForeverOutlinedIcon fontSize="large" />
//             </IconButton>
//           </Collapse>
//           <Collapse in={!openGreen}>
//             <Button onClick={handleCloseAlgorithm} color="primary">
//               Cancel
//             </Button>
//           </Collapse>
//           <Button type="submit" color="primary" onClick={UpdateAlgorithm}>
//             Confirm
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/**  This window is used for adding new question */}
//       <Dialog
//         open={openAddQuestion}
//         onClose={handleQClose}
//         aria-labelledby="max-width-dialog-title"
//         //	fullWidth="md"
//         maxWidth="lg"
//         fullWidth
//       >
//         <DialogTitle id="form-dialog-title">New Question</DialogTitle>
//         <DialogContent>
//           <Collapse in={!openGreen}>
//             <DialogContentText>
//               Please fill in details for the new question.
//             </DialogContentText>
//             {/** <TextField
// 							id="outlined-multiline-flexible"
// 							required
// 							value={values.questionId}
// 							type="number"
// 							min="0"
// 							step="1"
// 							onChange={handleChange('questionId')}
// 							label="questionId"
// 							variant="outlined"
// 						/>
// 						<Box p={1} />*/}
//             <TextField
//               id="outlined-multiline-flexible"
//               required
//               fullWidth
//               value={values.question}
//               onChange={handleChange("question")}
//               label="Question"
//               variant="outlined"
//             />
//             <Box p={1} />
//             {/* <DialogContentText>value={values.question}</DialogContentText> */}
//             <FormControl fullWidth>
//               <InputLabel id="demo-simple-select-label">Type</InputLabel>
//               <Select
//                 labelId="demo-simple-select-label"
//                 id="demo-simple-select"
//                 value={type}
//                 onChange={handleTypeChange}
//               >
//                 <MenuItem value={"slider"}>Slider </MenuItem>
//                 <MenuItem value={"singleSelection"}>Single Selection</MenuItem>
//                 <MenuItem value={"yesOrNo"}>Yes/No</MenuItem>
//                 <MenuItem value={"longAnswer"}>Long Answer</MenuItem>
//                 <MenuItem value={"multipleSelection"}>
//                   Multiple Selection
//                 </MenuItem>
//               </Select>
//             </FormControl>
//             <Box p={1}>
//               <div>
//                 {type === "singleSelection" || type === "multipleSelection" ? (
//                   <div>
//                     <TextField
//                       label="option1"
//                       id="outlined-multiline-flexible"
//                       variant="outlined"
//                       value={values.option1}
//                       onChange={handleChange("option1")}
//                     />
//                     <TextField
//                       label="option2"
//                       id="outlined-multiline-flexible"
//                       variant="outlined"
//                       value={values.option2}
//                       onChange={handleChange("option2")}
//                     />
//                     <TextField
//                       label="option3"
//                       id="outlined-multiline-flexible"
//                       variant="outlined"
//                       value={values.option3}
//                       onChange={handleChange("option3")}
//                     />
//                     <TextField
//                       label="option4"
//                       id="outlined-multiline-flexible"
//                       variant="outlined"
//                       value={values.option4}
//                       onChange={handleChange("option4")}
//                     />
//                     <TextField
//                       label="option5"
//                       id="outlined-multiline-flexible"
//                       variant="outlined"
//                       value={values.option5}
//                       onChange={handleChange("option5")}
//                     />
//                     <TextField
//                       label="option6"
//                       id="outlined-multiline-flexible"
//                       variant="outlined"
//                       value={values.option6}
//                       onChange={handleChange("option6")}
//                     />
//                   </div>
//                 ) : type === "slider" ? (
//                   <div>
//                     <TextField
//                       label="Left"
//                       id="outlined-multiline-flexible"
//                       variant="outlined"
//                       value={values.left}
//                       onChange={handleChange("left")}
//                     />
//                     <TextField
//                       label="Right"
//                       id="outlined-multiline-flexible"
//                       variant="outlined"
//                       value={values.right}
//                       onChange={handleChange("right")}
//                     />
//                   </div>
//                 ) : null}
//               </div>
//             </Box>
//           </Collapse>
//         </DialogContent>
//         <DialogContent>
//           <Collapse in={openAlert}>
//             <Alert severity="error">{error}</Alert>
//           </Collapse>
//           <Collapse in={openGreen}>
//             <Alert severity="success">Update Section Successfully!</Alert>
//           </Collapse>
//         </DialogContent>
//         <DialogActions>
//           <Collapse in={!openGreen}>
//             <Button onClick={handleQClose} color="primary">
//               Cancel
//             </Button>
//           </Collapse>
//           <Button onClick={AddQuestion} color="primary">
//             Confirm
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// };

// export default SectionQuestions;
