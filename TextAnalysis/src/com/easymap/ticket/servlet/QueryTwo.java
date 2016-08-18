package com.easymap.ticket.servlet;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import com.easymap.ticket.db.ConnectionDB;
import com.easymap.ticket.db.ReadProperties;
import com.easymap.ticket.model.PageHelper;

public class QueryTwo extends HttpServlet{
	private final int pagesize=30;
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		process(req, resp);
	}
	
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		process(req, resp);
	}
	
	private void process(HttpServletRequest request, HttpServletResponse response)
	throws ServletException, IOException {
		System.out.println("coming in,and execute query now...");
		response.setCharacterEncoding("utf-8");
		
		String startdate = request.getParameter("startdate1");
		String enddate = request.getParameter("enddate1");
		String train_number = request.getParameter("train_number");
		String start_station = request.getParameter("start_station");
		String end_station = request.getParameter("end_station");
		String page = request.getParameter("page");
		
		
		PageHelper ph = new PageHelper();
		ph.setRows(pagesize);
		ph.setPage(Integer.parseInt(page));
		
		int start = (ph.getPage() - 1) * ph.getRows()+1;
		int end = ph.getPage()*pagesize+1;
		String table = ReadProperties.get("tablename");
		String countsql = "select count(1) from "+table+" where 1=1 ";
		String sql = "SELECT * FROM (SELECT row_.*, ROWNUM rownum_ FROM (select xm,spczjc,to_char(spsj,'yyyy-mm-dd'),cph,to_char(ccrq,'yyyy-mm-dd'),cc,cxh,zwh,fz,dz,zjh,SPCKH from "+table+" where 1=1 ";
		if(!startdate.equals("")&&!enddate.equals("")&&startdate==enddate){
			sql += " and to_char(ccrq,'yyyymmdd')='"+startdate.replace("-", "")+"'";
			countsql += " and to_char(ccrq,'yyyymmdd')='"+startdate.replace("-", "")+"'";
		}else{
			if(!startdate.equals("")){
				sql += " and to_char(ccrq,'yyyymmdd')>='"+startdate.replace("-", "")+"'";
				countsql += " and to_char(ccrq,'yyyymmdd')>='"+startdate.replace("-", "")+"'";
			}
			
			if(!enddate.equals("")){
				sql += " and to_char(ccrq,'yyyymmdd')<='"+enddate.replace("-", "")+"'";
				countsql += " and to_char(ccrq,'yyyymmdd')<='"+enddate.replace("-", "")+"'";
			}
		}
		
		if(!train_number.equals("")){
			sql += " and cc ='"+train_number+"'";
			countsql += " and  cc ='"+train_number+"'";
		}
		
		if(!start_station.equals("")){
			sql += " and  fz ='"+start_station+"'";
			countsql += " and  fz ='"+start_station+"'";
		}
		
		if(!end_station.equals("")){
			sql += " and  dz ='"+end_station+"'";
			countsql += " and  dz ='"+end_station+"'";
		}
		
		sql += " order by ccrq desc, cc desc) row_ WHERE ROWNUM < "+end+") WHERE rownum_ >= "+start;
		
		System.out.println("execute sql:"+sql);
		ConnectionDB db = new ConnectionDB();
		Object[] count = db.executeQuerySingle(countsql, null);
 		int pagecount = ((BigDecimal)count[0]).intValue();
 		int pagenum = ((BigDecimal)count[0]).intValue()%pagesize==0?0:1;
		 pagenum = pagecount/pagesize+pagenum;
    	if(pagenum==0) pagenum=1;
 	    System.out.println(pagecount);
		List<Object[]> objs = db.excuteQuery(sql, null);
		db.closeAll();
		JSONObject res = new JSONObject();
     	res.put("pagenum", pagenum);
		res.put("result", JSONArray.fromObject(objs));
		response.getWriter().print(res.toString());
	}
}
