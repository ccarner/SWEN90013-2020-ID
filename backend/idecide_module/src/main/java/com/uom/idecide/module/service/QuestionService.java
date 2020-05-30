/*
package com.uom.idecide.module.service;

import com.uom.idecide.module.dao.QuestionDao;
import Question;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import util.IdWorker;

@Service
public class QuestionService {

    @Autowired
    private QuestionDao questionDao;

    @Autowired
    private IdWorker idWorker;

    public void add(Question question) {
        question.setQuestionId( idWorker.nextId()+"");
        questionDao.save(question);
    }

    public void updateById(Question question) {
        questionDao.save(question);
    }

    public void deleteById(String id){
        Question question = questionDao.findById(id).get();
        question.setActive(false);
        questionDao.save(question);
    }

    public Question findById(String id){
        return questionDao.findById(id).get();
    }

}
*/
