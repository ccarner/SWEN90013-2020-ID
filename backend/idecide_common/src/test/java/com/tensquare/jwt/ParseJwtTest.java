package com.tensquare.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;

import java.text.SimpleDateFormat;

public class ParseJwtTest {
    public static void main(String[] args) {

        //Claims就可以理解为一个map，里面存放的都是K-V形式
        Claims claims =Jwts.parser().setSigningKey("itcast")
                .parseClaimsJws("eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI2NjYiLCJzdWIiOiLlsI_pqawiLCJpYXQiOjE1ODY4NDcxNjAsImV4cCI6MTU4Njg0NzIyMCwicm9sZSI6ImFkbWluIn0.todBvjXg3SPL8L9E4GlX9vvquKqNfBemQiaIXV11SwI")
                .getBody();
        System.out.println("用户id："+claims.getId());
        System.out.println("用户名："+claims.getSubject());
        //SimpleDateFormat对象.format()返回的是字符串.parse()返回的是Date对象！
        System.out.println("登录时间："+
                new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(claims.getIssuedAt()));
        System.out.println("过期时间："+
                new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(claims.getExpiration()));
        System.out.println("用户角色：" +claims.get("role"));

    }
}
