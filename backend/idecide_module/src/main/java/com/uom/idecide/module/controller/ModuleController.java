package com.uom.idecide.module.controller;


import com.uom.idecide.module.pojo.Module;
import com.uom.idecide.module.service.ModuleService;
import entity.Result;
import entity.StatusCode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/module")
public class ModuleController {

    @Autowired
    private ModuleService moduleService;

    @RequestMapping(method= RequestMethod.POST)
    public Result add(@RequestBody Module module) {
        moduleService.add(module);
        return new Result(true, StatusCode.OK,"Inserting successfully");
    }

    @RequestMapping(method= RequestMethod.PUT)
    public Result updateById(@RequestBody Module module) {
        moduleService.updateById(module);
        return new Result(true, StatusCode.OK,"updating successfully");
    }

    @RequestMapping(value="/{moduleId}",method= RequestMethod.GET)
    public Result findById(@PathVariable("moduleId") String id){
        return new Result(true, StatusCode.OK,"finding successfully",moduleService.findById(id));
    }

    @RequestMapping(value="/{moduleId}",method= RequestMethod.DELETE)
    public Result deleteById(@PathVariable("moduleId") String id){
        moduleService.deleteById(id);
        return new Result(true, StatusCode.OK,"deleting successfully");
    }

    @RequestMapping(value = "/findAllByActiveTrue", method = RequestMethod.GET)
    public Result findAllByActiveTrue(){
        return new Result(true, StatusCode.OK,"fetching successfully", moduleService.findAllByActiveTrue());
    }
}

