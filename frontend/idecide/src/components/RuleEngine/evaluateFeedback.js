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
  let totalAnswerPointsFact = function (params, almanac) {
    return almanac.factValue("surveyAnswers").then((surveyAnswers) => {
      var totalPoints = 0;
      for (const question of surveyAnswers) {
        if (question !== undefined) {
          if (question.questionType === "slider") {
            var value = parseInt(question.questionAnswer[0]);
            if (!isNaN(value)) {
              //if they leave the answer empty, then will give NaN
              totalPoints += value;
            }
          } else if (
            question.questionType === "singleChoice" &&
            question.questionAnswer === "yes"
          ) {
            totalPoints += 1;
          }
        }
      }
      return totalPoints;
    });
  };

  engine.addFact("totalAnswerPoints", totalAnswerPointsFact);

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
