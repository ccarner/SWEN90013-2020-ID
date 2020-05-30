package com.uom.idecide.result.service;

import com.uom.idecide.result.dao.ResultDao;
import com.uom.idecide.result.pojo.DTOResult;
import com.uom.idecide.result.pojo.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ResultService {

    @Autowired
    private ResultDao resultDao;

    public void add(DTOResult dtoResult) {
        resultDao.save(dtoResult);
    }

    public List<DTOResult> findAll() {
        List<DTOResult> all = resultDao.findAll();
        return all;
    }

    public List<DTOResult> findAllByUserId(String userId) {
        return resultDao.findAllByUserId(userId);
    }

    public List<DTOResult> findAllByUserIdAndModuleId(String userId, String moduleId){
        return resultDao.findAllByUserIdAndModuleId(userId,moduleId);
    }

    public List<DTOResult> findAllByUserIdAndModuleIdAndPartId(String userId, String moduleId, String partId){
        return resultDao.findAllByUserIdAndModuleIdAndPartId(userId,moduleId,partId);
    }
}
