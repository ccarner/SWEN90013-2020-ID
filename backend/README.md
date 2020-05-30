# Backend

Backend of iDecide project is implemented by Spring Cloud

## How to run


## Repository Structure
```
| / backend
      - modules organized in Spring Cloud framework
    / README.md
      - readme.md file for i-decide backend.
      / idecide_base
      - module of basic support for backend
      / idecide_common
      - module of common used classes including:
      	entity:
      		(Not used)PageResult: Common format of returned result to frontend
      		Result: Common format of returned result to frontend
      		StatusCode:Success and error types for request
      	util:
      		IdWorker: Snowflake to generate a global unique id
      		JwtUtil: generate or parse Token
      / idecide_eureka
      - module for service registration and discovery
      /idecide_module
      - module for user taking surveys
      /idecide_result
      - module of survey result
      /idecide_user
      - module of user account
      		
```

## Progress:
```

```