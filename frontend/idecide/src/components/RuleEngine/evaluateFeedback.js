export default function evaluateFeedback(rules, factContainers, surveyResults) {
  let RuleEngine = require("json-rules-engine");
  let engine = new RuleEngine.Engine();

  // console.log(669, rules, factContainers)
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

  let topPriorityFact = function (params, almanac) {
    return almanac.factValue("prevCompletions").then((prevCompletions) => {
      var topPriority = null;
      try {
        // result for Q1 of priorities survey, then return first component = 'top' priority
        // ID of my priorities survey is "4"
        console.log("prevCompletions is ---*", prevCompletions);
        topPriority = prevCompletions[4].questions[1].questionAnswer[0];

        console.log("topPriority was", topPriority);
        // the top priorities as given are the quetion answers, eg "My Safety".. and could be changed
        let priorities = ["safety", "child", "resources", "health", "partner"];
        for (var priority of priorities) {
          if (topPriority.toLowerCase().indexOf(priority) > -1) {
            topPriority = priority;
            break;
          }
        }
      } catch (err) {
        console.error(
          "An answer for an uncompleted question was requested",
          " (Top priorities question)"
        );
      }
      // console.log("top priority was", topPriority);
      return topPriority;
    });
  };

  engine.addFact("TOP_PRIORITY", topPriorityFact);

  let intentionFact = function (params, almanac) {
    return almanac.factValue("prevCompletions").then((prevCompletions) => {
      var intention = null;
      try {
        // result for Q2 of priorities survey
        // priorities surveyID = "4"
        intention = prevCompletions[4].questions[2].questionAnswer[0];

        // the top priorities as given are the quetion answers, eg "My Safety".. and could be changed
        let intentions = ["stay", "leave", "left"];
        for (var option of intentions) {
          if (intention.toLowerCase().indexOf(option) > -1) {
            intention = option;
            break;
          }
        }
      } catch (err) {
        console.error(
          "An answer for an uncompleted question was requested",
          " (Intentions question)"
        );
      }
      // console.log("intention was", intention);
      return intention;
    });
  };

  engine.addFact("INTENTION", intentionFact);

  //default facts and operators...

  // let prevCompletionsFact = function (params, almanac) {
  //   var prevCompletions = JSON.parse(localStorage.getItem("prevCompletions"));

  //   return prevCompletions;
  // };

  engine.addFact("prevCompletions", surveyResults);

  let totalAnswerPointsFact = function (params, almanac) {
    return almanac.factValue("prevCompletions").then((prevCompletions) => {
      var totalPoints = 0;
      // totalAnswerPointsQuestions needs to be an array of form [[surveyId,sectionId,questionId], [surveyId,..,..],...]
      // one entry in array per question we're considering when adding up points.
      console.log("questionparams were", params.totalAnswerPointsQuestions);
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
          question = prevCompletions[idArr[0]].questions[idArr[2]];
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
      // console.log("total points is", totalPoints);
      // console.log("Questions were", params.totalAnswerPointsQuestions);
      return totalPoints;
    });
  };

  engine.addFact("totalAnswerPoints", totalAnswerPointsFact);

  let dangerAssessmentPointsFact = function (params, almanac) {
    // mysafety = survey Id of "2"
    params.totalAnswerPointsQuestions = [["2", "2", "31-42"]];
    return totalAnswerPointsFact(params, almanac);
  };

  engine.addFact("DA_SUM", dangerAssessmentPointsFact);

  let casScore = function (params, almanac) {
    // mysafety = survey Id of "2"
    params.totalAnswerPointsQuestions = [["2", "1", "1-30"]];
    return totalAnswerPointsFact(params, almanac);
  };

  engine.addFact("CAS_SCORE", casScore);

  let SEVERE_SUBSCALE_CAS_SCORE = function (params, almanac) {
    // mysafety = survey Id of "2"
    params.totalAnswerPointsQuestions = [
      ["2", "1", "2"],
      ["2", "1", "5"],
      ["2", "1", "7"],
      ["2", "1", "15"],
      ["2", "1", "18"],
      ["2", "1", "22"],
      ["2", "1", "25"],
      ["2", "1", "26"],
    ];

    // return totalAnswerPointsFact(params, almanac);
    var value = totalAnswerPointsFact(params, almanac);
    // console.log("severe subscale is", value);
    return value;
  };

  engine.addFact("SEVERE_SUBSCALE_CAS_SCORE", SEVERE_SUBSCALE_CAS_SCORE);

  let PHYSICAL_SUBSCALE_CAS_SCORE = function (params, almanac) {
    // mysafety = survey Id of "2"
    params.totalAnswerPointsQuestions = [
      ["2", "1", "6"],
      ["2", "1", "10"],
      ["2", "1", "14"],
      ["2", "1", "17"],
      ["2", "1", "23"],
      ["2", "1", "27"],
      ["2", "1", "30"],
    ];
    return totalAnswerPointsFact(params, almanac);
  };

  engine.addFact("PHYSICAL_SUBSCALE_CAS_SCORE", PHYSICAL_SUBSCALE_CAS_SCORE);

  let EMOTIONAL_SUBSCALE_CAS_SCORE = function (params, almanac) {
    // mysafety = survey Id of "2"
    params.totalAnswerPointsQuestions = [
      ["2", "1", "1"],
      ["2", "1", "4"],
      ["2", "1", "8"],
      ["2", "1", "9"],
      ["2", "1", "12"],
      ["2", "1", "19"],
      ["2", "1", "20"],
      ["2", "1", "21"],
      ["2", "1", "24"],
      ["2", "1", "28"],
      ["2", "1", "29"],
    ];
    return totalAnswerPointsFact(params, almanac);
  };

  engine.addFact("EMOTIONAL_SUBSCALE_CAS_SCORE", EMOTIONAL_SUBSCALE_CAS_SCORE);

  let HARASSMENT_SUBSCALE_CAS_SCORE = function (params, almanac) {
    params.totalAnswerPointsQuestions = [
      ["2", "1", "3"],
      ["2", "1", "11"],
      ["2", "1", "13"],
      ["2", "1", "16"],
    ];
    return totalAnswerPointsFact(params, almanac);
  };

  engine.addFact(
    "HARASSMENT_SUBSCALE_CAS_SCORE",
    HARASSMENT_SUBSCALE_CAS_SCORE
  );

  let questionResponseFact = function (params, almanac) {
    return almanac.factValue("prevCompletions").then((prevCompletions) => {
      var answer = null;
      try {
        answer =
          prevCompletions[params.surveyId][params.sectionId][params.questionId];
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
    // console.log(
    //   "all rules executed; the following events were triggered: ",
    //   result.events
    // );
    return result;
  });
  return results;
}
