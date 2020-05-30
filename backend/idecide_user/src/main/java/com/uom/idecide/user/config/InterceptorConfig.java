package com.uom.idecide.user.config;

import com.uom.idecide.user.interceptor.JwtInterceptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurationSupport;

/**
 * Springboot默认实现了SpringMVC的常用配置
 * 但是例如 文件解析器 拦截器 Springboot并没有提供
 * 因此需要自己写对应的配置类
 */
@Configuration
public class InterceptorConfig extends WebMvcConfigurationSupport {
    //把需要注册的拦截器注入进来
    @Autowired
    JwtInterceptor jwtInterceptor;

    //重写WebMvcConfigurationSupport中的添加拦截器的方法
    protected void addInterceptors(InterceptorRegistry registry){
        //注册拦截器要声明拦截器对象和要拦截的请求
        registry.addInterceptor(jwtInterceptor)
                //拦截所有路径
                .addPathPatterns("/**")
                //出了登录的路径不拦截
                .excludePathPatterns("/**/login/**");
    }

}
