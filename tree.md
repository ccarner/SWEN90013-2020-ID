.
├── LICENSE
├── README.md
├── backend
│   ├── README.md
│   ├── idecide_base
│   │   ├── pom.xml
│   │   └── src
│   │       ├── main
│   │       │   ├── java
│   │       │   │   └── com
│   │       │   │       └── uom
│   │       │   │           └── idecide
│   │       │   │               └── result
│   │       │   │                   └── base
│   │       │   │                       ├── BaseApplication.java
│   │       │   │                       └── controller
│   │       │   │                           └── BaseExceptionHandler.java
│   │       │   └── resources
│   │       │       └── application.yml
│   │       └── test
│   │           └── java
│   │               └── com
│   │                   └── tensquare
│   │                       └── base
│   │                           └── AppTest.java
│   ├── idecide_common
│   │   ├── pom.xml
│   │   └── src
│   │       ├── main
│   │       │   └── java
│   │       │       ├── entity
│   │       │       │   ├── PageResult.java
│   │       │       │   ├── Result.java
│   │       │       │   └── StatusCode.java
│   │       │       └── util
│   │       │           ├── IdWorker.java
│   │       │           └── JwtUtil.java
│   │       └── test
│   │           └── java
│   │               └── com
│   │                   └── tensquare
│   │                       └── jwt
│   │                           ├── CreateJwt.java
│   │                           └── ParseJwtTest.java
│   ├── idecide_eureka
│   │   ├── pom.xml
│   │   └── src
│   │       └── main
│   │           ├── java
│   │           │   └── com
│   │           │       └── uom
│   │           │           └── idecide
│   │           │               └── result
│   │           │                   └── eureka
│   │           │                       └── EurekaServer.java
│   │           └── resources
│   │               └── application.yml
│   ├── idecide_module
│   │   ├── pom.xml
│   │   └── src
│   │       └── main
│   │           ├── java
│   │           │   └── com
│   │           │       └── uom
│   │           │           └── idecide
│   │           │               └── module
│   │           │                   ├── ModuleApplication.java
│   │           │                   ├── controller
│   │           │                   │   ├── ModuleController.java
│   │           │                   │   ├── PartController.java
│   │           │                   │   └── QuestionController.java
│   │           │                   ├── dao
│   │           │                   │   ├── ModuleDao.java
│   │           │                   │   ├── PartDao.java
│   │           │                   │   └── QuestionDao.java
│   │           │                   ├── pojo
│   │           │                   │   ├── Module.java
│   │           │                   │   ├── Option.java
│   │           │                   │   ├── Part.java
│   │           │                   │   └── Question.java
│   │           │                   └── service
│   │           │                       ├── ModuleService.java
│   │           │                       ├── PartService.java
│   │           │                       └── QuestionService.java
│   │           └── resources
│   │               └── application.yml
│   ├── idecide_result
│   │   ├── pom.xml
│   │   └── src
│   │       ├── main
│   │       │   ├── java
│   │       │   │   └── com
│   │       │   │       └── uom
│   │       │   │           └── idecide
│   │       │   │               └── result
│   │       │   │                   ├── ResultApplication.java
│   │       │   │                   ├── controller
│   │       │   │                   │   └── ResultController.java
│   │       │   │                   ├── dao
│   │       │   │                   │   └── ResultDao.java
│   │       │   │                   ├── pojo
│   │       │   │                   │   ├── DTOResult.java
│   │       │   │                   │   ├── Option.java
│   │       │   │                   │   └── Result.java
│   │       │   │                   └── service
│   │       │   │                       └── ResultService.java
│   │       │   └── resources
│   │       │       └── application.yml
│   │       └── test
│   │           └── exampleTest.java
│   ├── idecide_user
│   │   ├── pom.xml
│   │   └── src
│   │       └── main
│   │           ├── java
│   │           │   └── com
│   │           │       └── uom
│   │           │           └── idecide
│   │           │               └── user
│   │           │                   ├── UserApplication.java
│   │           │                   ├── config
│   │           │                   │   ├── InterceptorConfig.java
│   │           │                   │   └── SecurityConfig.java
│   │           │                   ├── controller
│   │           │                   │   ├── AdminController.java
│   │           │                   │   ├── BaseExceptionHandler.java
│   │           │                   │   ├── ResearcherController.java
│   │           │                   │   └── UserController.java
│   │           │                   ├── dao
│   │           │                   │   ├── AdminDao.java
│   │           │                   │   ├── ResearcherDao.java
│   │           │                   │   └── UserDao.java
│   │           │                   ├── interceptor
│   │           │                   │   └── JwtInterceptor.java
│   │           │                   ├── pojo
│   │           │                   │   ├── Admin.java
│   │           │                   │   ├── Researcher.java
│   │           │                   │   └── User.java
│   │           │                   └── service
│   │           │                       ├── AdminService.java
│   │           │                       ├── ResearcherService.java
│   │           │                       └── UserService.java
│   │           └── resources
│   │               └── application.yml
│   └── pom.xml
├── frontend
│   ├── README.md
│   └── idecide
│       ├── package-lock.json
│       ├── package.json
│       ├── public
│       │   ├── idecide-logo.png
│       │   ├── index.html
│       │   ├── manifest.json
│       │   └── robots.txt
│       ├── src
│       │   ├── API
│       │   │   ├── loginAPI.js
│       │   │   ├── surveyAPI.js
│       │   │   └── surveyResultsAPI.js
│       │   ├── App.css
│       │   ├── App.js
│       │   ├── App.test.js
│       │   ├── CSS
│       │   │   ├── home.css
│       │   │   ├── login.css
│       │   │   ├── navbar.css
│       │   │   └── survey.css
│       │   ├── components
│       │   │   ├── ActionPlan.js
│       │   │   ├── ActionPlan.test.js
│       │   │   ├── AdminComponents
│       │   │   │   ├── adminConsole.jsx
│       │   │   │   └── adminLogin.jsx
│       │   │   ├── CardDeskCompoent
│       │   │   │   ├── cardDeck.jsx
│       │   │   │   ├── cards.css
│       │   │   │   └── testdata.js
│       │   │   ├── Framework.js
│       │   │   ├── Landing.js
│       │   │   ├── Navbar.js
│       │   │   ├── NotFound.js
│       │   │   ├── Questions.js
│       │   │   ├── RuleEngine
│       │   │   │   ├── algorithem.js
│       │   │   │   └── jsonRule.js
│       │   │   ├── dashBoard
│       │   │   │   ├── DBLayout.js
│       │   │   │   ├── DBSideBar.js
│       │   │   │   ├── VerticalTab.js
│       │   │   │   └── view
│       │   │   │       ├── researcher
│       │   │   │       │   └── ResearcherListView.js
│       │   │   │       └── survey
│       │   │   │           ├── NewSurvey.js
│       │   │   │           ├── QuesitonComponent.js
│       │   │   │           ├── QuestionDetails.js
│       │   │   │           ├── SurveyCard.js
│       │   │   │           ├── SurveyDetails.js
│       │   │   │           └── SurveyLayout.js
│       │   │   ├── loginComponent
│       │   │   │   ├── adminInfo.js
│       │   │   │   ├── loginPage.js
│       │   │   │   ├── loginPage.test.js
│       │   │   │   ├── registerPage.js
│       │   │   │   └── registerPage.test.js
│       │   │   ├── reusableComponents
│       │   │   │   ├── PrimaryButton.jsx
│       │   │   │   ├── loadingSpinner.jsx
│       │   │   │   └── progressBar.jsx
│       │   │   ├── surveyComponents
│       │   │   │   ├── iconCompleted.png
│       │   │   │   ├── iconPrioritiesSurvey.png
│       │   │   │   ├── iconRelationshipSurvey.png
│       │   │   │   ├── iconSafetySurvey.png
│       │   │   │   ├── questionComponents
│       │   │   │   │   ├── questionSingleChoice.jsx
│       │   │   │   │   ├── questionSlider.jsx
│       │   │   │   │   └── questionYesOrNo.jsx
│       │   │   │   ├── surveyControl.jsx
│       │   │   │   ├── surveyHome.jsx
│       │   │   │   ├── surveyInformationPage.jsx
│       │   │   │   ├── surveyResultsPage.jsx
│       │   │   │   ├── surveySection.jsx
│       │   │   │   └── surveySelectionButton.jsx
│       │   │   └── testing.js
│       │   ├── images
│       │   │   ├── background.png
│       │   │   ├── homeBackground.png
│       │   │   ├── iconPrioritiesSurvey.png
│       │   │   ├── iconSafetySurvey.png
│       │   │   └── idecide-logo.png
│       │   ├── index.css
│       │   ├── index.js
│       │   ├── serviceWorker.js
│       │   └── setupTests.js
│       └── yarn.lock
└── tree.md

99 directories, 139 files
