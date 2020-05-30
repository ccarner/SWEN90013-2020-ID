package com.uom.idecide.module.service;

import com.uom.idecide.module.dao.ModuleDao;
import com.uom.idecide.module.pojo.Module;
import com.uom.idecide.module.pojo.Part;
import com.uom.idecide.module.pojo.Question;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import util.IdWorker;

import java.util.*;

@Service
public class ModuleService {

    @Autowired
    private IdWorker idWorker;

    @Autowired
    private ModuleDao moduleDao;

    public void add(Module module) {
        module.setModuleId(idWorker.nextId()+"");
        module.setActive(true);
        List<Part> parts = module.getParts();

        for(Part part: parts){
            //为每个module里的part赋值id
            part.setPartId(idWorker.nextId()+"");
            List<Question> questions = part.getQuestions();
            for (Question question: questions){
                //为每个part里的question赋值id
                question.setQuestionId(idWorker.nextId()+"");
            }
        }
        moduleDao.save(module);
    }

    public void updateById(Module module) {
        List<Part> parts = module.getParts();
        module.setActive(true);
        for(Part part: parts){
            //为每个module里的part赋值id
            if(part.getPartId() == null) part.setPartId(idWorker.nextId()+"");
            List<Question> questions = part.getQuestions();
            for (Question question: questions){
                //为每个part里的question赋值id
                if(question.getQuestionId()==null) question.setQuestionId(idWorker.nextId()+"");
            }
        }
        moduleDao.save(module);
    }

    public void deleteById(String id) {
        Module module = moduleDao.findById(id).get();
        module.setActive(false);
        moduleDao.save(module);
    }

    public Module findById(String id) {
        Module module = moduleDao.findById(id).get();
        return module;
    }

    public List<Module> findAllByActiveTrue() {
        return moduleDao.findAllByActiveTrue();
    }
}
