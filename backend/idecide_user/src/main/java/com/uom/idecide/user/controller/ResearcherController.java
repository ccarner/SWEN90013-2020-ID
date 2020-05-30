package com.uom.idecide.user.controller;

import com.uom.idecide.user.pojo.Researcher;
import com.uom.idecide.user.service.ResearcherService;
import entity.PageResult;
import entity.Result;
import entity.StatusCode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;
import util.JwtUtil;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping("/researcher")
public class ResearcherController {

	@Autowired
	private ResearcherService researcherService;

//	@Autowired
//	private RedisTemplate redisTemplate;

	@Autowired
	private JwtUtil jwtUtil;

	/**
	 * 增加researcher用户
	 * @param researcher
	 */
	@RequestMapping(method=RequestMethod.POST)
	public Result add(@RequestBody Researcher researcher){
		researcherService.add(researcher);
		return new Result(true, StatusCode.OK,"增加成功");
	}

	@RequestMapping(value = "/login", method = RequestMethod.POST)
	public Result login(@RequestBody Researcher researcher){
		researcher =researcherService.login(researcher.getEmail(),researcher.getPassword());
		if(researcher == null){		//为null的原因之一是密码错误
			return new Result(false, StatusCode.LOGINERROR,"login fail");
		}

		String token = jwtUtil.createJWT(researcher.getResearcherId(),researcher.getEmail(),"researcher");
		//把token打印出来看看
		System.out.println(token);
		Map<String,Object> map = new HashMap<>();
		map.put("token",token);		//把token返回给前端
		map.put("roles","researcher");	//告诉前端role是researcher
		return new Result(true, StatusCode.OK,"login successful",map);
	}

	@RequestMapping(value = "/logout", method = RequestMethod.PUT)
	public Result logout(@RequestBody Researcher researcher){
		//TODO 登出只需要在前端销毁token即可
		return new Result(true, StatusCode.OK,"logout successful");
	}

	@RequestMapping(value = "/researcherList", method = RequestMethod.GET)
	public Result researcherList(){
		return new Result(true, StatusCode.OK,"operation successful",researcherService.findAll());
	}

	@RequestMapping(value = "/researcherList/{page}/{size}", method = RequestMethod.GET)
	public Result researcherListWithPagination(@PathVariable(value="page") int page,@PathVariable(value="size") int size){
		Page<Researcher> pages = researcherService.findAllWithPagination(page, size);
		//PageResult中第一个是返回记录条数，第二个是对应的researcherList
		return new Result(true, StatusCode.OK,"operation successful", new PageResult<Researcher>(page,pages.getTotalElements(),pages.getTotalPages(),pages.getContent()));
	}

	/**
	 * 根据ID查询
	 * @param id ID
	 * @return
	 */
	@RequestMapping(value="/{researcherId}",method= RequestMethod.GET)
	public Result findById(@PathVariable(value="researcherId") String id){
		return new Result(true, StatusCode.OK,"查询成功",researcherService.findById(id));
	}

	/**
	 * 修改
	 * @param researcher
	 */
	@RequestMapping(value="/{researcherId}",method= RequestMethod.PUT)
	public Result updateById(@RequestBody Researcher researcher, @PathVariable(value="researcherId") String id){
		researcher.setResearcherId(id);
		researcherService.updateById(researcher);
		return new Result(true, StatusCode.OK,"修改成功");
	}

	/**
	 * 删除
	 * @param id
	 */
	@RequestMapping(value="/{researcherId}",method= RequestMethod.DELETE)
	public Result deleteById(@PathVariable(value="researcherId") String id){
		researcherService.deleteById(id);
		return new Result(true, StatusCode.OK,"删除成功");
	}


	@RequestMapping(value = "/jwt", method = RequestMethod.POST)
	public Result testJwt(HttpServletRequest req){
		String token = (String) req.getAttribute("claims_researcher");
		if(token!=null){
			System.out.println(token);
		}else{
			System.out.println("没有token");
		}
		return new Result(true, StatusCode.OK,"test end");
	}
	
}
