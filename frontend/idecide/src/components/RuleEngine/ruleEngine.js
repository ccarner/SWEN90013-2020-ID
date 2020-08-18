import algorithmPlan from "./algorithem.js";
import dangerCAS from "./Rule.js";
export default function RuleEngine(SurveyResult) {
  var result = {};
  var i;
  for (i = 0; i < algorithmPlan.length; i++) {
    var name = algorithmPlan[i].name;
    var threshold = algorithmPlan[i].rule.threshold;
    var questions = algorithmPlan[i].rule.RelatedQuestions;

    var sum = 0;
    var j = 0;
    for (j = 0; j < questions.length; j++) {
      var id = questions[i].id;
      var k = 0;
      for (k = 0; k < SurveyResult.length; k++) {
        if (SurveyResult[k].questionId == id) {
          sum += Number(SurveyResult[k].answer.weight);
        }
      }
    }
    var isValid = sum > threshold ? true : false;

    result[name] = isValid;
  }

  //import package
  var RuleEngine = require("node-rules");

  /* Creating Rule Engine instance */
  var R = new RuleEngine();

  var rule = dangerCAS;

  R.register(rule);

  var fact = result;

  R.execute(fact, function (data) {
    console.log(data.result);
  });
}
