export default function evaluateFeedback(rules, factContainers, surveyResults) {
  let RuleEngine = require("json-rules-engine");
  let engine = new RuleEngine.Engine();

  // console.log(669, rules, factContainers)
  // a rule is an object of form {conditions, event}
  console.warn("rules was", rules);
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
          if (idArr[1].includes("-")) {
            let re = /([\d]*)-([\d]*)/g;
            var match = re.exec(idArr[1]);
            console.log("match was", match);
            let startQ = match[1];
            let endQ = match[2];
            startQ = parseInt(startQ);
            endQ = parseInt(endQ);
            console.log("start/end was", startQ, endQ);

            if (startQ < endQ) {
              //protects against incorrectly entered values, stops infinite loop
              for (var i = startQ; i <= endQ; i++) {
                params.totalAnswerPointsQuestions.push([
                  idArr[0],
                  i.toString(),
                ]);
              }
            } else {
              console.error(
                "The starting question was GREATER than the finishing question in a totalAnswerPointsFact: ",
                idArr[1]
              );
            }
            // not removing the entry from the array, since currently IN the array looping through, so just skip loop iteration
            continue;
          }
          //since the prevCompletions questions array is just an array of objects with each one having an 'id' attribute, we need to create a temp
          // datastructure to index based on the id
          //TODO doesn't actually use the ID of section, since the question ID itself is unique... maybe remove the ID of section from the format...
          const surveyQuestions = prevCompletions[idArr[0]].questions;
          var surveyQuestionsIndexedId = {};
          for (var q of surveyQuestions) {
            if (q) {
              surveyQuestionsIndexedId[q.questionId] = q;
            }
          }
          //now can access using the ID of the question
          question = surveyQuestionsIndexedId[idArr[1]];
        } catch (err) {
          console.error(
            "An answer for an uncompleted question was requested",
            idArr
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
          } else if (question.questionType.includes("singleSelection")) {
            if (
              question.questionAnswer.length > 0 &&
              question.questionAnswer.indexOf("Never") === -1
            ) {
              //if the answer was not 'Never', count it as an abusive behaviour that HAS occurred
              totalPoints += 1;
            }
          }
        }
      }
      console.log("total points was", totalPoints, params);
      return totalPoints;
    });
  };

  engine.addFact("TOTAL_ANSWER_POINTS", totalAnswerPointsFact);

  let dangerAssessmentPointsFact = function (params, almanac) {
    // mysafety = survey Id of "2"
    params.totalAnswerPointsQuestions = [["2", "31-42"]];
    return totalAnswerPointsFact(params, almanac);
  };

  engine.addFact("DA_SUM", dangerAssessmentPointsFact);

  let casScore = function (params, almanac) {
    // mysafety = survey Id of "2"
    params.totalAnswerPointsQuestions = [["2", "1-30"]];
    return totalAnswerPointsFact(params, almanac);
  };

  engine.addFact("CAS_SCORE", casScore);

  let SEVERE_SUBSCALE_CAS_SCORE = function (params, almanac) {
    // mysafety = survey Id of "2"
    params.totalAnswerPointsQuestions = [
      ["2", "2"],
      ["2", "5"],
      ["2", "7"],
      ["2", "15"],
      ["2", "18"],
      ["2", "22"],
      ["2", "25"],
      ["2", "26"],
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
      ["2", "6"],
      ["2", "10"],
      ["2", "14"],
      ["2", "17"],
      ["2", "23"],
      ["2", "27"],
      ["2", "30"],
    ];
    return totalAnswerPointsFact(params, almanac);
  };

  engine.addFact("PHYSICAL_SUBSCALE_CAS_SCORE", PHYSICAL_SUBSCALE_CAS_SCORE);

  let EMOTIONAL_SUBSCALE_CAS_SCORE = function (params, almanac) {
    // mysafety = survey Id of "2"
    params.totalAnswerPointsQuestions = [
      ["2", "1"],
      ["2", "4"],
      ["2", "8"],
      ["2", "9"],
      ["2", "12"],
      ["2", "19"],
      ["2", "20"],
      ["2", "21"],
      ["2", "24"],
      ["2", "28"],
      ["2", "29"],
    ];
    return totalAnswerPointsFact(params, almanac);
  };

  engine.addFact("EMOTIONAL_SUBSCALE_CAS_SCORE", EMOTIONAL_SUBSCALE_CAS_SCORE);

  let HARASSMENT_SUBSCALE_CAS_SCORE = function (params, almanac) {
    params.totalAnswerPointsQuestions = [
      ["2", "3"],
      ["2", "11"],
      ["2", "13"],
      ["2", "16"],
    ];
    return totalAnswerPointsFact(params, almanac);
  };

  engine.addFact(
    "HARASSMENT_SUBSCALE_CAS_SCORE",
    HARASSMENT_SUBSCALE_CAS_SCORE
  );

  //returns the answer from a response, ONLY RETURNS FIRST VALUE from answer....
  let questionResponseFact = function (params, almanac) {
    return almanac.factValue("prevCompletions").then((prevCompletions) => {
      var answer = null;
      try {
        answer = prevCompletions[params.surveyId].questions;
        answer = answer.reduce(
          (question) => question.questionId === params.questionId
        );
        answer = answer[0];
      } catch (error) {
        console.error(
          "Error: a surveyAnswer fact was requested, and either the answer didn't exist in completions or the required params were not provided to the fact"
        );
        answer = null;
      }
      return answer[0];
    });
  };

  engine.addFact("QUESTION_RESPONSE", questionResponseFact);

  //operator to determine if answers for a question are equal to a specific value
  //NOTE that this is not usef currently, since really only useful when some answer types
  // allow for multiple answers. For single-answer types, can just use "equals"
  engine.addOperator("surveyAnswerEquals", (factValue, jsonValue) => {
    //compare for equality of two arrays
    factValue = factValue.sort();
    jsonValue = jsonValue.sort();

    if (factValue === jsonValue) return true;
    if (factValue == null || jsonValue == null) return false;
    if (factValue.length !== jsonValue.length) return false;

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
