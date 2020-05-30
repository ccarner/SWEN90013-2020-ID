package com.uom.idecide.user.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

/**
 * 安全配置类
 * 因为我们只想要使用Spring Security方法。
 * 因此要把默认自带的验证授权功能取消掉。所有路径全部放行不拦截
 * 因为我们使用JWT来做分布式验证授权
 */
@Configuration
@EnableWebSecurity
//WebSecurityConfigurerAdapter有很多空方法，需要的時候拿來重载即可
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        /**
         * 1）authorizeRequests所有security全注解配置实现的端口，表示开始说明需要的权限
         * 需要的权限分两部分，第一部分是拦截的路径，第二步是访问该路径需要的权限
         * 2）antMatchers表示拦截什么路径。permitAll表示任何权限都允许
         * 3）anyRequest()任何的请求 authenticated认证后才能访问
         * 4）and().csrf().disable:固定写法，表示csrf拦截失效.
         * csrf是一种攻击技术，开启后任何跨域访问都不能被使用。因此需要关闭
         */
        http
                .authorizeRequests()
                .antMatchers("/**").permitAll()
                .anyRequest().authenticated()
                .and().csrf().disable();
    }
}