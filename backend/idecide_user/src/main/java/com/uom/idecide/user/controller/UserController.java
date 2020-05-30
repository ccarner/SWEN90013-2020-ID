package com.uom.idecide.user.controller;

import com.uom.idecide.user.pojo.User;
import com.uom.idecide.user.service.UserService;
import entity.PageResult;
import entity.Result;
import entity.StatusCode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;
import util.JwtUtil;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 控制器层
 * @author Administrator
 *
 */
@RestController
@CrossOrigin
@RequestMapping("/user")
public class UserController {

	@Autowired
	private UserService userService;

//	@Autowired
//	private RedisTemplate redisTemplate;

	@Autowired
	private JwtUtil jwtUtil;

	/**
	 * 增加新用户
	 */
	@RequestMapping(method=RequestMethod.POST)
	public Result add(@RequestBody User user){
		userService.add(user);
		return new Result(true, StatusCode.OK,"Inserted Successfully");
	}

	/**
	 * Query by ID
	 * Require: current user permission or admin user permission
	 */
	@RequestMapping(value="/{userId}",method= RequestMethod.GET)
	public Result findById(@PathVariable(value="userId") String id){
		User user;
		try{
			user = userService.findById(id);
		}catch(Exception e){
			return new Result(false,StatusCode.ACCESSERROR,"Insufficient Permission");
		}
		return new Result(true, StatusCode.OK,"Queried Successfully",user);
	}

	/**
	 * Update by ID
	 * Require: current user permission
	 */
	@RequestMapping(value="/{userId}",method= RequestMethod.PUT)
	public Result updateById(@RequestBody User user, @PathVariable(value="userId") String id){
		try{
			userService.updateById(user);
		}catch(Exception e){
			return new Result(false,StatusCode.ACCESSERROR,"Insufficient Permission");
		}
		return new Result(true, StatusCode.OK,"Updated Successfully");
	}

	/**
	 * delete by ID
	 * Require: admin user permission
	 */
	@RequestMapping(value="/{userId}",method= RequestMethod.DELETE)
	public Result deleteById(@PathVariable(value="userId") String id){
		try{
			userService.deleteById(id);
		}catch(Exception e){
			return new Result(false,StatusCode.ACCESSERROR,"Insufficient Permission");
		}
		return new Result(true, StatusCode.OK,"Deleted Successfully");
	}

	@RequestMapping(value = "/login", method = RequestMethod.POST)
	public Result login(@RequestBody User user){
		user =userService.login(user.getEmail(),user.getPassword());
		if(user == null){
			return new Result(false, StatusCode.LOGINERROR,"Login Fail");
		}

		String token = jwtUtil.createJWT(user.getUserId(),user.getEmail(),"user");
		//把token打印出来看看
		System.out.println(token);
		Map<String,Object> map = new HashMap<>();
		map.put("token",token);		//把token返回给前端
		map.put("roles","user");	//告诉前端role是user
		return new Result(true, StatusCode.OK,"Login Successfully",map);
	}

	/**
	 * 登出
	 * user权限
	 */
	@RequestMapping(value = "/logout", method = RequestMethod.PUT)
	public Result logout(@RequestBody User user){
		//TODO 登出只需要在前端销毁token即可
		return new Result(true, StatusCode.OK,"Logout Successfully");
	}

	/**
	 * 查询用户列表
	 * admin权限
	 */
	@RequestMapping(value = "/userList", method = RequestMethod.GET)
	public Result userList(){
		List<User> userList;
		try{
			userList = userService.findAll();
		}catch(Exception e){
			return new Result(false,StatusCode.ACCESSERROR,"Insufficient Permission");
		}
		return new Result(true, StatusCode.OK,"operation successful",userList);
	}

	/**
	 * 查询用户列表含分页
	 * admin权限
	 */
	@RequestMapping(value = "/userList/{page}/{size}", method = RequestMethod.GET)
	public Result userListWithPagination(@PathVariable(value="page") int page,@PathVariable(value="size") int size){
		Page<User> pages;
		try{
			pages = userService.findAllWithPagination(page, size);
		}catch(Exception e){
			return new Result(false,StatusCode.ACCESSERROR,"Insufficient Permission");
		}
		//PageResult中第一个是返回记录条数，第二个是对应的userList
		return new Result(true, StatusCode.OK,"Operation Successful", new PageResult<User>(page,pages.getTotalElements(),pages.getTotalPages(),pages.getContent()));
	}


	@RequestMapping(value = "/jwt", method = RequestMethod.POST)
	public Result testJwt(HttpServletRequest req){
		String token = (String) req.getAttribute("claims_user");
		if(token!=null){
			System.out.println(token);
		}else{
			System.out.println("No Token");
		}
		return new Result(true, StatusCode.OK,"test end");
	}
	
}
