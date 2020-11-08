// /*
//  * This is the hello-world example from the README.
//  *
//  * Usage:
//  *   node ./examples/01-hello-world.js
//  *
//  * For detailed output:
//  *   DEBUG=json-rules-engine node ./examples/01-hello-world.js
//  */
//  import { Engine } from "json-rules-engine";

//     export default function JsonRuleEngine(
//       SurveyResult,
//       algorithmRelated,
//       casRule,
//       handleCASResult
//     ) {

//         /**
//          * Setup a new engine
//          *
//          */
//         let engine = new Engine();

//         casRule.map((ruleItme) => {
//           engine.addRule(ruleItme);
//         });

//         /**
//          * Define facts the engine will use to evaluate the conditions above.
//          * Facts may also be loaded asynchronously at runtime; see the advanced example below
//          */
//         let facts = result;

//         // Run the engine to evaluate
//         engine.run(facts).then((results) => {
//           // 'results' is an object containing successful events, and an Almanac instance containing facts
//           results.events.map((event) => handleCASResult(event.params.message));
//         });
//       }
//     }
