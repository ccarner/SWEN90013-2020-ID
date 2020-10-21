export default {
  surveySections: [
    {
      sectionTitle: "Priorities",
      sectionIntroduction:
        "There are 10 comparisons below. Slide the circle towards the priority that is most important in that pair.",
      sectionId: "1",
      sectionIndex: 0,
      sectionType: "ranking",
      questions: [
        {
          questionIndex: 0,
          questionId: "1",
          questionText: "rank your priority ",
          selectionOptions: [
            "Having resources",
            "My concern for safety",
            "Feeling for my partner",
            "My health and wellbeing",
            "Children",
          ],
        },
        {
          questionId:"2",
          questionText:"Please tell us about your experiences being referred to this decision aid",
          questionType:"longAnswer",
          answerLength:100
        }
      ],
    },
  ],
};
