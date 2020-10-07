export default function evaluateFeedback(rules, factContainers) {
  let RuleEngine = require("json-rules-engine");
  let engine = new RuleEngine.Engine();

  // a rule is an object of form {conditions, event}
  for (const rule of rules) {
    let engineRule = new RuleEngine.Rule(rule);
    engine.addRule(engineRule);
  }

  //facts are pure functions which convert a set of parameters + access to an
  //'almanac' of previous facts to a new fact value
  // OR they are simple key,value pairs of data
  // all facts passed in should be an object with a factName and a fact
  // which evaluates to some data
  //fact container is just an object with {factName, fact}
  for (const fact of factContainers) {
    engine.addFact(fact.factName, fact.fact);
  }

  //   engine.on("highRisk", (params) => {
  //     console.log(params);
  //   });

  //default facts and operators...
  let surveyResultsFact = function (params, almanac) {
    var surveyResults = JSON.parse(localStorage.getItem("surveyResults"));
    return surveyResults;
  };

  engine.addFact("surveyResults", surveyResultsFact);

  let totalAnswerPointsFact = function (params, almanac) {
    return almanac.factValue("surveyResults").then((surveyResults) => {
      var totalPoints = 0;
      // totalAnswerPointsQuestions needs to be an array of form [[surveyId,sectionId,questionId], [surveyId,..,..],...]
      // one entry in array per question we're considering when adding up points.
      for (const idArr of params.totalAnswerPointsQuestions) {
        // survey answers should be a nested object of surveys,sections,questions
        var question = null;
        try {
          //dones't actually use the ID of section, since the question ID itself is unique...
          question = surveyResults[idArr[0]].questions[idArr[2]];
        } catch (err) {
          console.error(
            "A question asked for had not yet been completed",
            idArr[0],
            idArr[1],
            idArr[2]
          );
        }
        if (question !== undefined && question != null) {
          if (question.questionType === "slider") {
            var value = parseInt(question.questionAnswer[0]);
            if (!isNaN(value)) {
              //if they leave the answer empty, then will give NaN
              totalPoints += value;
            }
          } else if (
            question.questionType === "yesOrNo" &&
            question.questionAnswer[0] === "Yes"
          ) {
            totalPoints += 1;
          } else if (question.questionType === "singleSelection") {
            if (
              question.questionAnswer.indexOf("Once") > -1 ||
              question.questionAnswer.indexOf("Sometimes") > -1 ||
              question.questionAnswer.indexOf("Several Times") > -1 ||
              question.questionAnswer.indexOf("Once A Month") > -1 ||
              question.questionAnswer.indexOf("Once A Month") > -1 ||
              question.questionAnswer.indexOf("Once A Week") > -1 ||
              question.questionAnswer.indexOf("Daily") > -1
            ) {
              totalPoints += 1;
            }
          }
        }
      }
      console.log("total points is", totalPoints);
      return totalPoints;
    });
  };

  engine.addFact("totalAnswerPoints", totalAnswerPointsFact);

  let questionResponseFact = function (params, almanac) {
    return almanac.factValue("surveyResults").then((surveyResults) => {
      var answer = null;
      try {
        answer =
          surveyResults[params.surveyId][params.sectionId][params.questionId];
      } catch (error) {
        console.error(
          "Error: a surveyAnswer fact was requested, and either the answer didn't exist in completions or the required params were not provided to the fact"
        );
        answer = null;
      }
      return answer;
    });
  };

  engine.addFact("questionResponse", questionResponseFact);

  //operator to determine if answers for a question are equal to a specific value
  engine.addOperator("surveyAnswerEquals", (factValue, jsonValue) => {
    factValue = factValue.sort();
    jsonValue = jsonValue.sort();

    if (factValue === jsonValue) return true;
    if (factValue == null || jsonValue == null) return false;
    if (factValue.length !== jsonValue.length) return false;

    // If you don't care about the order of the elements inside
    // the array, you should sort both arrays here.
    // Please note that calling sort on an array will modify that array.
    // you might want to clone your array first.

    for (var i = 0; i < factValue.length; ++i) {
      if (factValue[i] !== jsonValue[i]) return false;
    }
    return true;
  });

  var results = engine.run().then((result) => {
    console.log(
      "all rules executed; the following events were triggered: ",
      result.events
    );
    return result;
  });
  return results;
}
