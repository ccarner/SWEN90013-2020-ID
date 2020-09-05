/*
 * This is the hello-world example from the README.
 *
 * Usage:
 *   node ./examples/01-hello-world.js
 *
 * For detailed output:
 *   DEBUG=json-rules-engine node ./examples/01-hello-world.js
 */
import { Engine } from "json-rules-engine";

export default function JsonRuleEngine(
  SurveyResult,
  algorithmRelated,
  casRule,
  handleCASResult
) {
  if (algorithmRelated == null || casRule == null) {
    handleCASResult("Thanks you ");
  } else {
    var result = {};
    var i;
    for (i = 0; i < algorithmRelated.length; i++) {
      var name = algorithmRelated[i].name;
      var threshold = algorithmRelated[i].rule.threshold;
      var questions = algorithmRelated[i].rule.RelatedQuestions;

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

    /**
     * Setup a new engine
     *
     */
    let engine = new Engine();

    casRule.map((ruleItme) => {
      engine.addRule(ruleItme);
    });

    /**
     * Define facts the engine will use to evaluate the conditions above.
     * Facts may also be loaded asynchronously at runtime; see the advanced example below
     */
    let facts = result;

    // Run the engine to evaluate
    engine.run(facts).then((results) => {
      // 'results' is an object containing successful events, and an Almanac instance containing facts
      results.events.map((event) => handleCASResult(event.params.message));
    });
  }
}
