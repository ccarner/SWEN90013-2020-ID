/*
package com.uom.idecide.module.service;

import com.uom.idecide.module.dao.PartDao;
import com.uom.idecide.module.dao.QuestionDao;
import Part;
import Question;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import util.IdWorker;

import java.util.List;

@Service
public class PartService {

    @Autowired
    private PartDao partDao;

    @Autowired
    private IdWorker idWorker;

    public void add(Part part) {
        part.setPartId(idWorker.nextId()+"");
        part.setActive(true);
        List<Question> questions = part.getQuestions();
        for (Question question: questions){
            if(question.getQuestionId()==null){
                question.setQuestionId(idWorker.nextId()+"");
            }
        }
        partDao.save(part);
    }

    public void updateById(Part part) {
        partDao.save(part);
    }

    public Part findById(String id) {
        Part part = partDao.findById(id).get();
        return part;
    }

    public void deleteById(String id) {
        Part part = partDao.findById(id).get();
        part.setActive(false);
        partDao.save(part);
    }

}
*/
