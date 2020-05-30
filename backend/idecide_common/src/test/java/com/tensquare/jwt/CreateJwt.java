package com.tensquare.jwt;

import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import java.util.Date;

public class CreateJwt {
    public static void main(String[] args) {
        //builder后面放的是载荷
        JwtBuilder jwtBuidler = Jwts.builder()
                .setId("666")
                .setSubject("小马")
                .setIssuedAt(new Date())
                //第一个参数是采用的Hash算法(即头部)，第二个是 盐
                .signWith(SignatureAlgorithm.HS256,"itcast")
                .setExpiration(new Date(new Date().getTime()+60*1000))
                .claim("role","admin");
        //compact方法会返回一个字符串，我们可以打印出来看看
        System.out.println(jwtBuidler.compact());
    }
}
