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

  let topPriorityFact = function (params, almanac) {
    return almanac.factValue("surveyResults").then((surveyResults) => {
      var topPriority = null;
      try {
        // result for Q1 of priorities survey, then return first component = 'top' priority
        topPriority =
          surveyResults["My Priorities"].questions[1].questionAnswer[0];
      } catch (err) {
        console.error(
          "An answer for an uncompleted question was requested",
          " (Top priorities question)"
        );
      }
      return topPriority;
    });
  };

  engine.addFact("TOP_PRIORITY", topPriorityFact);

  let intentionFact = function (params, almanac) {
    return almanac.factValue("surveyResults").then((surveyResults) => {
      var intention = null;
      try {
        // result for Q2 of priorities survey
        intention =
          surveyResults["My Priorities"].questions[2].questionAnswer[0];
      } catch (err) {
        console.error(
          "An answer for an uncompleted question was requested",
          " (Intentions question)"
        );
      }
      return intention;
    });
  };

  engine.addFact("INTENTION", intentionFact);

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
          // if its abbreviated, eg "31-42", replace it with the actual Q numbers
          if (idArr[2].includes("-")) {
            let re = /([\d]*)-([\d]*)/g;
            var match = re.exec(idArr[2]);
            console.log("match was", match);
            let startQ = match[1];
            let endQ = match[2];
            startQ = parseInt(startQ);
            endQ = parseInt(endQ);
            console.log("start/end was", startQ, endQ);

            for (var i = startQ; i <= endQ; i++) {
              params.totalAnswerPointsQuestions.push([
                idArr[0],
                idArr[1],
                i.toString(),
              ]);
            }
            // not removing since IN the array while looping through, so just skip loop iteration
            continue;
          }
          //TODO doesn't actually use the ID of section, since the question ID itself is unique... maybe remove the ID of section from the format...
          question = surveyResults[idArr[0]].questions[idArr[2]];
        } catch (err) {
          console.error(
            "An answer for an uncompleted question was requested",
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
      console.log("Questions were", params.totalAnswerPointsQuestions);
      return totalPoints;
    });
  };

  engine.addFact("totalAnswerPoints", totalAnswerPointsFact);

  let dangerAssessmentPointsFact = function (params, almanac) {
    params.totalAnswerPointsQuestions = [["My Safety", "2", "31-42"]];
    return totalAnswerPointsFact(params, almanac);
  };

  engine.addFact("DA_SUM", dangerAssessmentPointsFact);

  let casScore = function (params, almanac) {
    params.totalAnswerPointsQuestions = [["My Safety", "1", "1-30"]];
    return totalAnswerPointsFact(params, almanac);
  };

  engine.addFact("CAS_SCORE", casScore);

  let SEVERE_SUBSCALE_CAS_SCORE = function (params, almanac) {
    params.totalAnswerPointsQuestions = [
      ["My Safety", "1", "2"],
      ["My Safety", "1", "5"],
      ["My Safety", "1", "7"],
      ["My Safety", "1", "15"],
      ["My Safety", "1", "18"],
      ["My Safety", "1", "22"],
      ["My Safety", "1", "25"],
      ["My Safety", "1", "26"],
    ];

    // return totalAnswerPointsFact(params, almanac);
    var value = totalAnswerPointsFact(params, almanac);
    console.log("severe subscale is", value);
    return value;
  };

  engine.addFact("SEVERE_SUBSCALE_CAS_SCORE", SEVERE_SUBSCALE_CAS_SCORE);

  let PHYSICAL_SUBSCALE_CAS_SCORE = function (params, almanac) {
    params.totalAnswerPointsQuestions = [
      ["My Safety", "1", "6"],
      ["My Safety", "1", "10"],
      ["My Safety", "1", "14"],
      ["My Safety", "1", "17"],
      ["My Safety", "1", "23"],
      ["My Safety", "1", "27"],
      ["My Safety", "1", "30"],
    ];
    return totalAnswerPointsFact(params, almanac);
  };

  engine.addFact("PHYSICAL_SUBSCALE_CAS_SCORE", PHYSICAL_SUBSCALE_CAS_SCORE);

  let EMOTIONAL_SUBSCALE_CAS_SCORE = function (params, almanac) {
    params.totalAnswerPointsQuestions = [
      ["My Safety", "1", "1"],
      ["My Safety", "1", "4"],
      ["My Safety", "1", "8"],
      ["My Safety", "1", "9"],
      ["My Safety", "1", "12"],
      ["My Safety", "1", "19"],
      ["My Safety", "1", "20"],
      ["My Safety", "1", "21"],
      ["My Safety", "1", "24"],
      ["My Safety", "1", "28"],
      ["My Safety", "1", "29"],
    ];
    return totalAnswerPointsFact(params, almanac);
  };

  engine.addFact("EMOTIONAL_SUBSCALE_CAS_SCORE", EMOTIONAL_SUBSCALE_CAS_SCORE);

  let HARASSMENT_SUBSCALE_CAS_SCORE = function (params, almanac) {
    params.totalAnswerPointsQuestions = [
      ["My Safety", "1", "3"],
      ["My Safety", "1", "11"],
      ["My Safety", "1", "13"],
      ["My Safety", "1", "16"],
    ];
    return totalAnswerPointsFact(params, almanac);
  };

  engine.addFact(
    "HARASSMENT_SUBSCALE_CAS_SCORE",
    HARASSMENT_SUBSCALE_CAS_SCORE
  );

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
