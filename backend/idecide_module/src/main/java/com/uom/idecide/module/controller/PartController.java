/*
package com.uom.idecide.module.controller;

import Part;
import Question;
import com.uom.idecide.module.service.PartService;
import entity.Result;
import entity.StatusCode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/part")
public class PartController {

    @Autowired
    private PartService partService;

    @RequestMapping(method= RequestMethod.POST)
    public Result add(@RequestBody Part part) {
        partService.add(part);
        return new Result(true, StatusCode.OK,"Inserting successfully");
    }

    @RequestMapping(method= RequestMethod.PUT)
    public Result updateById(@RequestBody Part part) {
        partService.updateById(part);
        return new Result(true, StatusCode.OK,"updating successfully");
    }

    @RequestMapping(value="/{partId}",method= RequestMethod.GET)
    public Result findById(@PathVariable("partId") String id){
        return new Result(true, StatusCode.OK,"finding successfully",partService.findById(id));
    }

    @RequestMapping(value="/{partId}",method= RequestMethod.DELETE)
    public Result deleteById(@PathVariable("partId") String id){
        partService.deleteById(id);
        return new Result(true, StatusCode.OK,"deleting successfully");
    }
}
*/
