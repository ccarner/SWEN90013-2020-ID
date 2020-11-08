# Project Overview & Background

Description
================================================================================
About my relationship' is a healthy relationship tool and safety decision aid for women who have experienced domestic violence. 

The project in its current form is a web-portal with interview-style questions which participants fill in, and then are given an analysis of the health of their relationship. There are additional surveys which a user can then take to get further insights into the types of behaviours they value.

The current website link: http://idecide.org.au/

iDecide is headed by Professor Kelsey Hegarty (Professor at University of Melbourne). The website itself was built by a company in the US, and components of it may be subject to copyright/ownership issues. The website is hosted by and modified by the creator, and data is sent from creator back to Kelsey when required manually.

Stakeholder Information
================================================================================

+ Kelsey Hegarty (Project Owner): Professor interested in Family Violence, and done research and address about domestic family violence in last 20 years, recently moved online.
+ Laura: Academic worker in partnership with Kelsey
+ Additional academics at the university interested in using the data collected: The data produced by the site is used by researchers who are interested in family/domestic violence.
+ Website target demographic/users: Women who are experiencing domestic abuse or violence, and have access to the internet via a smartphone of computer. Of these women:
   + 11% are Aboriginal and Torres Strait Islander
   + 20% were culturally diverse
   + Most are educated (Passed grade 12) 
   +  Many use libraries/public spaces to access the site so that the site is not in their history etc (Desktop usage is important)
   +  Research council: Originally funded the site development (Not as involved at this stage, since the grant is completed)
   +  Possibly other organisations interested in extending the platform or using as a basis for new projects, eg the Victorian government (possibility of extending for use as a self-assessment tool, front-risk assessment for women)


System-As-Is vs Ideal System
================================================================================
| Problems with -system-as-is         |  Features of Ideal system         |
| ----------------------------------- |:-------------------------------:| 
| Several problems with the current system-as-is were identified during client interviews:      | (Kelsey) Survey results were previously provided by the software engineer, ideally, Kelsey will have direct access to the information | 
|- The current Desktop website uses older web-design styles, including in particular the need for many clickthroughs as part of the process rather than scrolling. | (Kelsey, Orgs interested in adapting program) Complete and transparent ownership of the project and the codebase.
|- There is currently no mobile website (the desktop site is simply given to people on their phones). | (Kelsey, Orgs interested in adapting program) Allow for future expansion of platform (Addition of more modules/questions).
|- Ownership of the current system is uncertain: it is likely that the creator has some ownership over the current codebase. | (Kelsey) Ability to easily add content such as new questions, or modify the algorithm. 
|- Algorithms are partially owned by overseas entities (ie the initial questions asked in the survey developed at Johns Hopkins). | (Users) Secure, safe and private platform.
|- Information in the database is stored in the US (makes it hard to harvest data). | (Users) More modern interface with:Fewer 'clickthroughs' (ie more scrolling rather than hitting 'next') - Mobile-friendly site - More multimedia: eg add short videos (survivor videos, ~ 2 mins) to make the website more interactive (tentative), or short audios for those who do not want their pictures appear in the videos.
|- Web developer controls the entire site structure, possibly owns the codebase legally (so difficult to extend/modify) -Current software team hard to get in contact with -Some functionality of the website is underused / over complicated (the later modules after the initial questions are not used very frequently)

 
Benefits of this project
================================================================================
Benefits for stakeholders are:

+ Kelsey + Laura : Ownership over the codebase, option to have the codebase extended in future by developer of their choice, simplified data collection process
+ Additional academics at the university: simplified data collection process
+ Website Users: Simplified navigation and easier use, easier to understand/streamlined functionality, mobile site availability
+ Research Council: Further extension of the original goals of the original grant, without a need for extra funding
+ Other organisations interested in extension: Opportunity to extend the platform through collaboration with Kelsey


Scope of Project
================================================================================

From the Features of Ideal system (Assuming we cannot have access to the current codebase), the scope of the project will be:

- A fresh codebase will be created, using the questions/algorithm from the existing site as a template. This will involve:
  - A backend data collection system for user data storage
  - A Mobile-friendly web portal
  - A Desktop-friendly web portal

- Deployment and hosting for the website will need to be organised, in a way that the client can easily manage self hosting afterwards
- Code will need to be developed to be maintainable/extensible so that future extensions might be made by stakeholders who are interested in extending the platform


 


