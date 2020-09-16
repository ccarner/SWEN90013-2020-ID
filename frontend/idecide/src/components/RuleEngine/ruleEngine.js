// export default function runTheEngine() {
//   let RuleEngine = require("json-rules-engine");
//   let engine = new RuleEngine.Engine();

//   //defining rules (rule = condition + events)
//   let event = {
//     type: "highRisk",
//     params: {
//       responseString:
//         " You seem to have experienced serious abusive behaviours from your partner. It is not acceptable for these things to happen in relationships. It is probably affecting your mental and physical health and possibly your studies as well. ",
//       imageLink:
//         "https://upload.wikimedia.org/wikipedia/commons/a/a0/Heart_anterior_exterior_view.jpg",
//     },
//   };

//   let conditions = {
//     any: [
//       {
//         fact: "totalAnswerPoints",
//         operator: "greaterThanInclusive",
//         value: 1,
//       },
//     ],
//   };

//   let rule = new RuleEngine.Rule({ conditions, event });
//   engine.addRule(rule);

//   let totalAnswerPointsFact = function (params, almanac) {
//     return almanac.factValue("surveyAnswers").then((surveyAnswers) => {
//       console.log("answers was", surveyAnswers);
//       var totalPoints = 0;
//       for (const question of surveyAnswers.questions) {
//         if (question.questionType === "slider") {
//           totalPoints += parseInt(question.questionAnswer[0]);
//         } else if (
//           question.questionType === "singleChoice" &&
//           question.questionAnswer === "yes"
//         ) {
//           totalPoints += 1;
//         }
//       }
//       console.log("totalpoints", totalPoints);
//       return totalPoints;
//     });
//   };

//   engine.addFact("totalAnswerPoints", totalAnswerPointsFact);

//   engine.on("highRisk", (params) => {
//     console.log(params);
//   });

//   let exampleSurveyAnswers = {
//     userId: "92138918723",
//     surveyId: "1",
//     sectionId: "1",
//     completedTime: "873987989222",
//     questions: [
//       {
//         questionId: "1",
//         questionType: "slider",
//         questionText:
//           "How unsafe do you feel in your relationship with your partner or ex-partner? (10 is very unsafe and 0 is not at all unsafe)",
//         questionAnswer: ["10"],
//       },
//       {
//         questionId: "2",
//         questionText: "where do you feel unsafe?",
//         questionType: "multiChoice",
//         questionAnswer: ["At home", "At work"],
//       },
//       {
//         questionId: "3",
//         questionText: "please explain how you feel unsafe",
//         questionType: "longAnswer",
//         questionAnswer: "I feel unsafe when I am going outside",
//       },
//       {
//         questionId: "4",
//         questionText: "Does he abuse you",
//         questionType: "singleChoice",
//         questionAnswer: "yes",
//       },
//     ],
//     resultCalculation: "CategoryXYZ",
//   };

//   engine.addFact("surveyAnswers", exampleSurveyAnswers);
//   engine.run().then((results) => {
//     console.log(
//       "all rules executed; the following events were triggered: ",
//       results.events
//     );
//   });
// }
