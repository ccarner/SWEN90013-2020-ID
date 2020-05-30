package com.uom.idecide.user.dao;

import com.uom.idecide.user.pojo.Researcher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

/**
 * 数据访问接口
 * @author Administrator
 *
 */
public interface ResearcherDao extends JpaRepository<Researcher,String>,JpaSpecificationExecutor<Researcher>{
    public Researcher findByEmail(String email);
}
