package com.uom.idecide.user.interceptor;

import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import util.JwtUtil;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Two ways for implementing JWT interceptors:
 * (1) Implementing HandlerInterceptor interface, or
 * (2) Extending HandlerInterceptorAdapter class
 */
@Component
public class JwtInterceptor implements HandlerInterceptor {
    @Autowired
    private JwtUtil jwtUtil;
    /**
     * The interceptor is only responsible for parsing a token that contains a token in the request header,
     * so it will not block a request regardless of having a token or not.
     * In terms of the authorization of a request, it is still left to the business layer to judge
     */
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {

        //fetch token from Header
        String header = request.getHeader("Authorization");
        System.out.println("interceptor has been executed!");
        if(header!=null && !"".equals(header)){
            //If a request contains Token, then parse it, the value of token should start with "uom "
            if(header.startsWith("uom ")){
                String token = header.substring(4);
                //Validating token
                try{
                    Claims claims = jwtUtil.parseJWT(token);
                    //try to get the info. of role by parsing token.
                    String roles = (String) claims.get("roles");
                    String id = claims.getId();
                    //if the token is parsed successfully, then put the token & id into scope of request
                    if(id!=null && roles != null && roles.equals("admin")){
                        //this is a request from admin
                        request.setAttribute("claims_admin",token);
                        request.setAttribute("id",id);
                    }else if(id!=null && roles != null && roles.equals("user")){
                        //this is a request from user
                        request.setAttribute("claims_user",token);
                        request.setAttribute("id",id);
                    }else if(id!=null && roles != null && roles.equals("researcher")){
                        //this is a request from researcher
                        request.setAttribute("claims_researcher",token);
                        request.setAttribute("id",id);
                    }
                }catch (Exception e){
                    //if there is any problem of parsing token, throwing an exception
                    throw new RuntimeException("Wrong Token！");
                }
            }
        }
        //pass the request
        return true;
    }
}
