# Frontend

Implementation of IDecide project frontend is built with React.js

## How to run
1. ```cd frontend```
2. ```cd idecide```
3. ```yarn```
4. ```npm start```

    Local:            http://localhost:3000
  On Your Network:  http://192.168.0.8:3000

## Repository Structure
```
.
├── package-lock.json
├── package.json
├── public
│   ├── idecide-logo.png
│   ├── index.html
│   ├── manifest.json
│   └── robots.txt
├── src
│   ├── API
│   │   ├── loginAPI.js
│   │   ├── surveyAPI.js
│   │   └── surveyResultsAPI.js
│   ├── App.css
│   ├── App.js
│   ├── App.test.js
│   ├── CSS
│   │   ├── home.css
│   │   ├── login.css
│   │   ├── navbar.css
│   │   └── survey.css
│   ├── components
│   │   ├── ActionPlan.js
│   │   ├── ActionPlan.test.js
│   │   ├── AdminComponents
│   │   │   ├── adminConsole.jsx
│   │   │   └── adminLogin.jsx
│   │   ├── CardDeskCompoent
│   │   │   ├── cardDeck.jsx
│   │   │   ├── cards.css
│   │   │   └── testdata.js
│   │   ├── Framework.js
│   │   ├── Landing.js
│   │   ├── Navbar.js
│   │   ├── NotFound.js
│   │   ├── Questions.js
│   │   ├── RuleEngine
│   │   │   ├── algorithem.js
│   │   │   └── jsonRule.js
│   │   ├── dashBoard  //Admin Dashboard js file
│   │   │   ├── DBLayout.js // Dashboard layout
│   │   │   ├── DBSideBar.js
│   │   │   ├── VerticalTab.js // side menu
│   │   │   └── view 
│   │   │       ├── researcher // user management
│   │   │       │   └── ResearcherListView.js
│   │   │       └── survey     // survey management file
│   │   │           ├── NewSurvey.js
│   │   │           ├── QuesitonComponent.js
│   │   │           ├── QuestionDetails.js
│   │   │           ├── SurveyCard.js
│   │   │           ├── SurveyDetails.js
│   │   │           └── SurveyLayout.js
│   │   ├── loginComponent
│   │   │   ├── adminInfo.js
│   │   │   ├── loginPage.js
│   │   │   ├── loginPage.test.js
│   │   │   ├── registerPage.js
│   │   │   └── registerPage.test.js
│   │   ├── reusableComponents
│   │   │   ├── PrimaryButton.jsx
│   │   │   ├── loadingSpinner.jsx
│   │   │   └── progressBar.jsx
│   │   ├── surveyComponents
│   │   │   ├── iconCompleted.png
│   │   │   ├── iconPrioritiesSurvey.png
│   │   │   ├── iconRelationshipSurvey.png
│   │   │   ├── iconSafetySurvey.png
│   │   │   ├── questionComponents
│   │   │   │   ├── questionSingleChoice.jsx
│   │   │   │   ├── questionSlider.jsx
│   │   │   │   └── questionYesOrNo.jsx
│   │   │   ├── surveyControl.jsx
│   │   │   ├── surveyHome.jsx
│   │   │   ├── surveyInformationPage.jsx
│   │   │   ├── surveyResultsPage.jsx
│   │   │   ├── surveySection.jsx
│   │   │   └── surveySelectionButton.jsx
│   │   └── testing.js
│   ├── images
│   │   ├── background.png
│   │   ├── homeBackground.png
│   │   ├── iconPrioritiesSurvey.png
│   │   ├── iconSafetySurvey.png
│   │   └── idecide-logo.png
│   ├── index.css
│   ├── index.js
│   ├── serviceWorker.js
│   └── setupTests.js
├── tree.md
└── yarn.lock
```

## Progress:
```
1. Basic structure of the project
2. Basic display of the 5 recommendations page, need to update the design.
```