package com.uom.idecide.module.dao;

import com.uom.idecide.module.pojo.Module;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface ModuleDao extends MongoRepository<Module,String> {
    /**
     * 返回所有的启用状态的module，并且不包含parts信息
     */
    @Query(fields="{ 'moduleName' : 1,'description':1, 'active':1}")
    public List<Module> findAllByActiveTrue();

}
