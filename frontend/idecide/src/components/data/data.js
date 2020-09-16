const RelationshipSurvey = {
    "surveyTitle": "Relationship",
    "surveyVersion": "2.0",
    "published":"true",
    "image":"",
    "surveyIntroduction": "This section of I-DECIDE walks you through some questions and activities to help you think about the health of your relationship with the partner or ex-partner who has made you feel afraid or unsafe.",
    "surveySections": [
      {
        "sectionId": "1",
        "sectionIndex": "0",
        "sectionTitle": "My Relationship Health",
        "sectionIntroduction": "Sometimes, it can be difficult to tell whether a relationship is healthy or unhealthy because we don't have anything to compare it to.Generally, a healthy relationship involves:Mutual trust and shared power;Support and open communication;Commitment and honesty;An unhealthy relationship involves:Unsupportive behaviour;Misuse of power and authority;Pain, fear or harm;Most couples have arguments and fights, but this does not necessarily mean your relationship is unhealthy. However, when one person is feeling unsafe or afraid in the relationship, this is usually a sign that there are serious problems. It is a good idea to regularly assess your relationship using the scales below.",
        "questions": [
          {
            "questionId": "1",
            "questionIndex": "0",
            "questionText": "How unhealthy do you think your relationship is with your partner or ex-partner? (0 is not at all unhealthy and 10 is very unhealthy or abusive)",
            "questionType": "slider",
            "image":"https://idecide.com/image/testimg1.png",
            "sliderMaxValue": 10,
            "sliderMinValue": 0,
            "sliderDefaultValue": 5
          },
          {
            "questionId": "2",
            "questionIndex": "1",
            "questionText": "How unsafe do you feel in your relationship with your partner or ex-partner? (0 is not at all unsafe and 10 is very unsafe)",
            "questionType": "slider",
            "sliderMaxValue": 10,
            "sliderMinValue": 0,
            "sliderDefaultValue": 5
          },
          {
            "questionId": "3",
            "questionIndex": "2",
            "questionText": "How afraid do you feel in your relationship with your partner or ex-partner? (0 is not at all afraid and 10 is very afraid)",
            "questionType": "slider",
            "sliderMaxValue": 10,
            "sliderMinValue": 0,
            "sliderDefaultValue": 5
          }
        ]
      },
    ],    
   "resultAlgorithm":"if(questions[0] > 10 && questions[4] == 'yes'){output=10}"
}

const SafetySurvey = {
    "surveyTitle": "My Safety",
    "surveyVersion": "2.0",
    "published":"true",
    "surveyIntroduction": "This section of I-DECIDE walks you through some questions and activities to help you think about safety in your relationship. It will also give you information about your personal safety risks.\nRemember you are responding about the partner / ex-partner who you made you feel afraid.",
    "surveySections": [
      {
        "sectionId": "1",
        "sectionIndex": "0",
        "sectionTitle": "Your relationship with the current or ex-partner",
        "sectionIntroduction": "These next questions will ask you about your relationship with the current or ex-partner who has made feel afraid or unsafe. Please slide the scales below to indicate how safe you feel and how afraid you are.",
        "questions": [
          {
            "questionId": "1",
            "questionText": "How unsafe do you feel in your relationship with your partner or ex-partner? (10 is very unsafe and 0 is not at all unsafe)",
            "questionType": "slider",
            "image":"https://idecide.com/image/testimg1.png",
            "sliderMaxValue": 10,
            "sliderMinValue": 0,
            "sliderDefaultValue": 5
          },
          {
            "questionId": "2",
            "questionText": "How afraid do you feel in your relationship with your partner or ex-partner? (10 is very afraid and 0 is not at all afraid)",
            "questionType": "slider",
            "sliderMaxValue": 10,
            "sliderMinValue": 0,
            "sliderDefaultValue": 5
          }
        ]
      },
      {
        "sectionId": "2",
        "sectionIndex": "1",
        "sectionTitle": "Partner Behaviours",
        "sectionIntroduction": "We would like to ask you some questions about behaviours or actions you may have experienced from your partner or ex-partner.\n\n We would like to know if you experienced any of the actions listed below from the partner / ex-partner who made you feel afraid. Please tick the frequency, over the last twelve months, that it happened to you. There is space at the bottom for behaviours not in the list. \n\n Over the last twelve months, my partner...",
        "questions": [
          {
            "questionId": "1",
            "questionIndex": "0",
            "questionText": "Told me that I wasn't good enough",
            "questionType": "singleSelection",
            "selectionOptions": [
              "Never",
              "Only Once",
              "Several Times",
              "Once a month",
              "Once a Week",
              "Daily"
            ]
          },
          {
            "questionId": "2",
            "questionIndex": "1",
            "questionText": "Kept me from medical care",
            "questionType": "singleSelection",
            "selectionOptions": [
              "Never",
              "Only Once",
              "Several Times",
              "Once a month",
              "Once a Week",
              "Daily"
            ]
          },
          {
            "questionId": "3",
            "questionIndex": "2",
            "questionText": "Followed me",
            "questionType": "singleSelection",
            "selectionOptions": [
              "Never",
              "Only Once",
              "Several Times",
              "Once a month",
              "Once a Week",
              "Daily"
            ]
          },
          {
            "questionId": "4",
            "questionIndex": "3",
            "questionText": "Tried to turn my family, friends or children against me",
            "questionType": "singleSelection",
            "selectionOptions": [
              "Never",
              "Only Once",
              "Several Times",
              "Once a month",
              "Once a Week",
              "Daily"
            ]
          },
          {
            "questionId": "5",
            "questionIndex": "4",
            "questionText": "Locked me in the bedroom",
            "questionType": "singleSelection",
            "selectionOptions": [
              "Never",
              "Only Once",
              "Several Times",
              "Once a month",
              "Once a Week",
              "Daily"
            ]
          },
          {
            "questionId": "6",
            "questionIndex": "5",
            "questionText": "Slapped me",
            "questionType": "singleSelection",
            "selectionOptions": [
              "Never",
              "Only Once",
              "Several Times",
              "Once a month",
              "Once a Week",
              "Daily"
            ]
          },
          {
            "questionId": "7",
            "questionIndex": "6",
            "questionText": "Forced me to have sex",
            "questionType": "singleSelection",
            "selectionOptions": [
              "Never",
              "Only Once",
              "Several Times",
              "Once a month",
              "Once a Week",
              "Daily"
            ]
          },
          {
            "questionId": "8",
            "questionIndex": "7",
            "questionText": "Told me that I was ugly",
            "questionType": "singleSelection",
            "selectionOptions": [
              "Never",
              "Only Once",
              "Several Times",
              "Once a month",
              "Once a Week",
              "Daily"
            ]
          },
          {
            "questionId": "9",
            "questionIndex": "8",
            "questionText": "Tried to keep me from seeing or talking to my family",
            "questionType": "singleSelection",
            "selectionOptions": [
              "Never",
              "Only Once",
              "Several Times",
              "Once a month",
              "Once a Week",
              "Daily"
            ]
          },
          {
            "questionId": "10",
            "questionIndex": "9",
            "questionText": "Threw me",
            "questionType": "singleSelection",
            "selectionOptions": [
              "Never",
              "Only Once",
              "Several Times",
              "Once a month",
              "Once a Week",
              "Daily"
            ]
          },
          {
            "questionId": "11",
            "questionIndex": "10",
            "questionText": "Hung around outside my houseHung around outside my house",
            "questionType": "singleSelection",
            "selectionOptions": [
              "Never",
              "Only Once",
              "Several Times",
              "Once a month",
              "Once a Week",
              "Daily"
            ]
          },
          {
            "questionId": "12",
            "questionIndex": "11",
            "questionText": "Blamed me for causing their violent behaviour",
            "questionType": "singleSelection",
            "selectionOptions": [
              "Never",
              "Only Once",
              "Several Times",
              "Once a month",
              "Once a Week",
              "Daily"
            ]
          },
          {
            "questionId": "13",
            "questionIndex": "12",
            "questionText": "Harassed me over the telephone",
            "questionType": "singleSelection",
            "selectionOptions": [
              "Never",
              "Only Once",
              "Several Times",
              "Once a month",
              "Once a Week",
              "Daily"
            ]
          },
          {
            "questionId": "14",
            "questionIndex": "13",
            "questionText": "Shook me",
            "questionType": "singleSelection",
            "selectionOptions": [
              "Never",
              "Only Once",
              "Several Times",
              "Once a month",
              "Once a Week",
              "Daily"
            ]
          },
          {
            "questionId": "15",
            "questionIndex": "14",
            "questionText": "Tried to force me to have sex",
            "questionType": "singleSelection",
            "selectionOptions": [
              "Never",
              "Only Once",
              "Several Times",
              "Once a month",
              "Once a Week",
              "Daily"
            ]
          },
          {
            "questionId": "16",
            "questionIndex": "15",
            "questionText": "Harassed me at work",
            "questionType": "singleSelection",
            "selectionOptions": [
              "Never",
              "Only Once",
              "Several Times",
              "Once a month",
              "Once a Week",
              "Daily"
            ]
          },
          {
            "questionId": "17",
            "questionIndex": "16",
            "questionText": "Pushed, grabbed or shoved me",
            "questionType": "singleSelection",
            "selectionOptions": [
              "Never",
              "Only Once",
              "Several Times",
              "Once a month",
              "Once a Week",
              "Daily"
            ]
          },
          {
            "questionId": "18",
            "questionIndex": "17",
            "questionText": "Used a knife or gun or other weapon",
            "questionType": "singleSelection",
            "selectionOptions": [
              "Never",
              "Only Once",
              "Several Times",
              "Once a month",
              "Once a Week",
              "Daily"
            ]
          },
          {
            "questionId": "19",
            "questionIndex": "18",
            "questionText": "Became upset if dinner/housework wasn't done when they thought it should be",
            "questionType": "singleSelection",
            "selectionOptions": [
              "Never",
              "Only Once",
              "Several Times",
              "Once a month",
              "Once a Week",
              "Daily"
            ]
          },
          {
            "questionId": "20",
            "questionIndex": "19",
            "questionText": "Told me that I was crazy",
            "questionType": "singleSelection",
            "selectionOptions": [
              "Never",
              "Only Once",
              "Several Times",
              "Once a month",
              "Once a Week",
              "Daily"
            ]
          },
          {
            "questionId": "21",
            "questionIndex": "20",
            "questionText": "Told me that no one would ever want me",
            "questionType": "singleSelection",
            "selectionOptions": [
              "Never",
              "Only Once",
              "Several Times",
              "Once a month",
              "Once a Week",
              "Daily"
            ]
          },
          {
            "questionId": "22",
            "questionIndex": "21",
            "questionText": "Took my wallet and left me stranded",
            "questionType": "singleSelection",
            "selectionOptions": [
              "Never",
              "Only Once",
              "Several Times",
              "Once a month",
              "Once a Week",
              "Daily"
            ]
          },
          {
            "questionId": "23",
            "questionIndex": "22",
            "questionText": "Hit or tried to hit me with something",
            "questionType": "singleSelection",
            "selectionOptions": [
              "Never",
              "Only Once",
              "Several Times",
              "Once a month",
              "Once a Week",
              "Daily"
            ]
          },
          {
            "questionId": "24",
            "questionIndex": "23",
            "questionText": "Did not want me to socialize with my female friends",
            "questionType": "singleSelection",
            "selectionOptions": [
              "Never",
              "Only Once",
              "Several Times",
              "Once a month",
              "Once a Week",
              "Daily"
            ]
          },
          {
            "questionId": "25",
            "questionIndex": "24",
            "questionText": "Put foreign objects in my vagina",
            "questionType": "singleSelection",
            "selectionOptions": [
              "Never",
              "Only Once",
              "Several Times",
              "Once a month",
              "Once a Week",
              "Daily"
            ]
          },
          {
            "questionId": "26",
            "questionIndex": "25",
            "questionText": "Refused to let me work outside the home",
            "questionType": "singleSelection",
            "selectionOptions": [
              "Never",
              "Only Once",
              "Several Times",
              "Once a month",
              "Once a Week",
              "Daily"
            ]
          },
          {
            "questionId": "27",
            "questionIndex": "26",
            "questionText": "Kicked me, bit me or hit me with a fistKicked me, bit me or hit me with a fist",
            "questionType": "singleSelection",
            "selectionOptions": [
              "Never",
              "Only Once",
              "Several Times",
              "Once a month",
              "Once a Week",
              "Daily"
            ]
          },
          {
            "questionId": "28",
            "questionIndex": "27",
            "questionText": "Tried to convince my friends, family or children that I was crazy",
            "questionType": "singleSelection",
            "selectionOptions": [
              "Never",
              "Only Once",
              "Several Times",
              "Once a month",
              "Once a Week",
              "Daily"
            ]
          },
          {
            "questionId": "29",
            "questionIndex": "28",
            "questionText": "Told me that I was stupid",
            "questionType": "singleSelection",
            "selectionOptions": [
              "Never",
              "Only Once",
              "Several Times",
              "Once a month",
              "Once a Week",
              "Daily"
            ]
          },
          {
            "questionId": "30",
            "questionIndex": "29",
            "questionText": "Beat me up",
            "questionType": "singleSelection",
            "selectionOptions": [
              "Never",
              "Only Once",
              "Several Times",
              "Once a month",
              "Once a Week",
              "Daily"
            ]
          }
        ]
      }
    ],    
   "resultAlgorithm":"if(questions[0] > 10 && questions[4] == 'yes'){output=10}"
  }



