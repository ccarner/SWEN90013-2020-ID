package com.uom.idecide.result.dao;


import com.uom.idecide.result.pojo.DTOResult;
import com.uom.idecide.result.pojo.Result;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ResultDao extends MongoRepository<DTOResult,String> {

    public List<DTOResult> findAllByUserId(String userId);

    public List<DTOResult> findAllByUserIdAndModuleId(String userId, String moduleId);

    public List<DTOResult> findAllByUserIdAndModuleIdAndPartId(String userId, String moduleId, String partId);
}
