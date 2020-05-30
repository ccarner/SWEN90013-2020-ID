package com.uom.idecide.result.controller;

import com.uom.idecide.result.pojo.DTOResult;
import com.uom.idecide.result.service.ResultService;
import entity.Result;
import entity.StatusCode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/result")
public class ResultController {

    @Autowired
    private ResultService resultService;

    @RequestMapping(method= RequestMethod.POST)
    public Result add(@RequestBody DTOResult dtoResult) {
        resultService.add(dtoResult);
        //TODO 这边需要加评测算法，并返回对应的测试结果

        return new Result(true, StatusCode.OK,"Inserting successfully");
    }

    @RequestMapping(value="/findAll" , method= RequestMethod.GET)
    public Result findAllByUserId() {
        List<DTOResult> all = resultService.findAll();
        System.out.println(all);
        return new Result(true, StatusCode.OK,"Fetching successfully", all);
    }

    @RequestMapping(value="/findAllByUserId/{userId}" , method= RequestMethod.GET)
    public Result findAllByUserId(@PathVariable("userId") String userId) {
        return new Result(true, StatusCode.OK,"Fetching successfully", resultService.findAllByUserId(userId));
    }

    @RequestMapping(value="/findAllByUserIdAndModuleId/{userId}/{moduleId}" , method= RequestMethod.GET)
    public Result findAllByUserIdAndModuleId(@PathVariable("userId") String userId, @PathVariable("moduleId") String moduleId){
        return new Result(true, StatusCode.OK,"Fetching successfully", resultService.findAllByUserIdAndModuleId(userId,moduleId));
    }

    @RequestMapping(value="/findAllByUserIdAndModuleIdAndPartId/{userId}/{moduleId}/{partId}" , method= RequestMethod.GET)
    public Result findAllByUserIdAndModuleIdAndPartId(@PathVariable("userId") String userId, @PathVariable("moduleId") String moduleId, @PathVariable("partId")  String partId){
        return new Result(true, StatusCode.OK,"Fetching successfully", resultService.findAllByUserIdAndModuleIdAndPartId(userId,moduleId,partId));
    }

}
