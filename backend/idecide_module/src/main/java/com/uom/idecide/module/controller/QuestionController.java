/*
package com.uom.idecide.module.controller;

import Question;
import com.uom.idecide.module.service.QuestionService;
import entity.Result;
import entity.StatusCode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/question")
public class QuestionController {

    @Autowired
    private QuestionService questionService;

    @RequestMapping(method= RequestMethod.POST)
    public Result add(@RequestBody Question question) {
        questionService.add(question);
        return new Result(true, StatusCode.OK,"Inserting successfully");
    }

    @RequestMapping(method= RequestMethod.PUT)
    public Result updateById(@RequestBody Question question) {
        questionService.updateById(question);
        return new Result(true, StatusCode.OK,"updating successfully");
    }

    @RequestMapping(value="/{questionId}",method= RequestMethod.GET)
    public Result findById(@PathVariable("questionId") String id){
        return new Result(true, StatusCode.OK,"finding successfully",questionService.findById(id));
    }

    @RequestMapping(value="/{questionId}",method= RequestMethod.DELETE)
    public Result deleteById(@PathVariable("questionId") String id){
        questionService.deleteById(id);
        return new Result(true, StatusCode.OK,"deleting successfully");
    }

}
*/
