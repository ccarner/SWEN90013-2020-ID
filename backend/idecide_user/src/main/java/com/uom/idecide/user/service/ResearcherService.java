package com.uom.idecide.user.service;

import com.uom.idecide.user.dao.ResearcherDao;
import com.uom.idecide.user.pojo.Researcher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import util.IdWorker;
import util.JwtUtil;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * 服务层
 * 
 * @author Administrator
 *
 */
@Service
public class ResearcherService {

	@Autowired
	private ResearcherDao researcherDao;
	
	@Autowired
	private IdWorker idWorker;

	@Autowired
	private BCryptPasswordEncoder encoder;

	/**
	 * 增加
	 * @param researcher
	 */
	public void add(Researcher researcher) {
		researcher.setResearcherId( idWorker.nextId()+"" );
		//密码加密
		researcher.setPassword(encoder.encode(researcher.getPassword()));
		researcherDao.save(researcher);
	}


	public Researcher login(String email, String password) {
		Researcher researcherLogin = researcherDao.findByEmail(email);
		//2.然后那数据库中的密码和用户输入的密码匹配是否相同
		if(researcherLogin!=null && encoder.matches(password,researcherLogin.getPassword())){	//prevent from null pointer
			//login successful
			return researcherLogin;
		}
		return null;
	}

	/**
	 * 查询全部列表
	 * @return
	 */
	public List<Researcher> findAll() {
		return researcherDao.findAll();
	}

	/**
	 * 查询全部列表
	 * @return
	 */
	public Page<Researcher> findAllWithPagination(int page, int size) {
		//DB从0开始，页面从1开始
		Pageable pageable = PageRequest.of(page-1,size);
		return researcherDao.findAll(pageable);
	}


	/**
	 * 根据ID查询实体
	 * @param id
	 * @return
	 */
	public Researcher findById(String id) {
		return researcherDao.findById(id).get();
	}

	/**
	 * 修改
	 * @param researcher
	 */
	public void updateById(Researcher researcher) {
		researcherDao.save(researcher);
	}

	@Autowired
	private HttpServletRequest request;
	@Autowired
	private JwtUtil jwtUtil;
	/**
	 * 删除：必须有admin角色才能删除
	 * @param id
	 */
	public void deleteById(String id) {
/*		//把token从header中取出
		String token = (String)request.getAttribute("claims_admin");
		if(token==null || "".equals(token)){
			throw new RuntimeException("权限不足！");
		}*/
		//只有通过上面的层层判断全部通过后，才能删除用户
		researcherDao.deleteById(id);
	}

	/**
	 * 动态条件构建
	 * @param searchMap
	 * @return
	 */
	private Specification<Researcher> createSpecification(Map searchMap) {

		return new Specification<Researcher>() {

			@Override
			public Predicate toPredicate(Root<Researcher> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
				List<Predicate> predicateList = new ArrayList<Predicate>();
                // ID
                if (searchMap.get("researcherId")!=null && !"".equals(searchMap.get("researcherId"))) {
                	predicateList.add(cb.like(root.get("researcher_Id").as(String.class), "%"+(String)searchMap.get("researcher_Id")+"%"));
                }
                // password
                if (searchMap.get("password")!=null && !"".equals(searchMap.get("password"))) {
                	predicateList.add(cb.like(root.get("password").as(String.class), "%"+(String)searchMap.get("password")+"%"));
                }
                // email
                if (searchMap.get("email")!=null && !"".equals(searchMap.get("email"))) {
                	predicateList.add(cb.like(root.get("email").as(String.class), "%"+(String)searchMap.get("email")+"%"));
                }
				return cb.and( predicateList.toArray(new Predicate[predicateList.size()]));
			}
		};

	}


}
