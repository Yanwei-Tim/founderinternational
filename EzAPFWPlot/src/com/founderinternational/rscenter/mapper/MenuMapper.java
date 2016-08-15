/**
 *
 * @author geloin
 * @date 2012-5-5 ����10:26:34
 */
package com.founderinternational.rscenter.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Result;
import org.apache.ibatis.annotations.Results;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import com.founderinternational.rscenter.entity.Menu;

/**
 * 
 * @author cloudMa
 * @date 2015 pm 15:57:06
 */

@Repository(value = "menuMapper")
public interface MenuMapper {

	@Select(value = "${sql}")
	@Results(value = { @Result(id = true, property = "id", column = "id"),
			@Result(property = "parentId", column = "parentId"),
			@Result(property = "url", column = "url"),
			@Result(property = "isShowLeft", column = "isShowLeft"),
			@Result(property = "name", column = "name") })
	List<Menu> operateReturnBeans(@Param(value = "sql") String sql);
}
