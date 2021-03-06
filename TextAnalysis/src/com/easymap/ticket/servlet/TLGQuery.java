  package com.easymap.ticket.servlet;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.*;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.io.IOUtils;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import com.easymap.ticket.db.ConnectionDB;
import com.easymap.ticket.db.ReadProperties;
import com.easymap.ticket.model.PageHelper;
import com.easymap.ticket.model.PersonRel;
import com.easymap.ticket.tools.Constants;
import com.easymap.ticket.tools.OrientdbUtil;
import com.easymap.ticket.tools.Tools;
import com.easymap.ticket.tools.testUrlCon;
import com.orientechnologies.orient.core.id.ORID;
import com.orientechnologies.orient.core.record.impl.ODocument;

public class TLGQuery extends HttpServlet{
	private final int pagesize=20;
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		try {
			process(req, resp);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		try {
			process(req, resp);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	private void process(HttpServletRequest request, HttpServletResponse response)
	throws Exception {
		//idcard startdate enddate rrtype
		 request.setCharacterEncoding("UTF-8");
		 String jsonstr=IOUtils.toString(request.getInputStream());
		 System.out.println(jsonstr);
		 JSONObject parm=JSONObject.fromObject(jsonstr);
		 String idcard=null;
		 String startdate=null;
		 String enddate=null;
		 String rrtype =null;
		  if(parm.get("idcard")!=null)
		  idcard =parm.getString("idcard");
		  if(parm.get("startdate")!=null&&!"".equals(parm.get("startdate")))
		  startdate =parm.getString("startdate").replaceAll("-", "");
		  if(parm.get("enddate")!=null&&!"".equals(parm.get("enddate")))
		  enddate =parm.getString("enddate").replaceAll("-", "");
		  if(parm.get("rrtype")!=null)
		  rrtype =parm.getString("rrtype");
		  String[] strtype=null;
		  if(rrtype!=null&&!"".equals(rrtype))
		  {
			  strtype=rrtype.split(",");
		  }
		  long times=System.currentTimeMillis();
		  Map<String,PersonRel> relmap=new TreeMap<String,PersonRel>();
		  Map<String,String> flagmap=new HashMap<String,String>();
		  if(idcard!=null&&!"".equals(idcard))
		  {
			  //String sql="select from (select expand(bothe().bothv().bothe()) from person where id='"+idcard+"') ";
			  String sql="select from (select expand(bothe()) from person where id='"+idcard+"') ";
			  if(rrtype!=null&&!"".equals(rrtype))
			  {
				  if(strtype!=null)
				  {
					   
					  int count=0;
					  for(String str:strtype)
					  {
						  if(!"".equals(str))
						  {
							  if(count==0)
							  {
								  sql+=" where  (type='"+str+"' ";
								  count++;  
							  }else{
								  sql+=" or type='"+str+"' ";
								  count++; 
							  }
							 
						  }
					  }
					  sql+=" )";
				  }
			 }
			  if((startdate!=null&&!"".equals(startdate))||(enddate!=null&&!"".equals(enddate)))
			  {
				 if(rrtype==null||"".equals(rrtype))
				 {
					 sql+="where 1=1 ";
				 }
				 if(startdate!=null&&!"".equals(startdate))
					 sql+=" and (ltime1>'"+startdate+"' or ltime2>'"+startdate+"') ";
				 if(enddate!=null&&!"".equals(enddate))
					 sql+=" and (etime1<'"+enddate+"' or etime2<'"+enddate+"' )";
			  }
			  sql+=" order by ltime1 desc";
			  
			  System.out.println(sql);
			  List<ODocument> olist=OrientdbUtil.getinstance().searchRecord(sql);
			
			  if(olist!=null)
			  {
				  for(ODocument o:olist)
				  {   
					    doODum(relmap,o,flagmap,idcard);
				  }
			  }
		  }
		  
		  System.out.println(System.currentTimeMillis()-times);
		 JSONObject res = new JSONObject();
 		 res.put("result", JSONObject.fromObject(relmap).toString());
		 response.setCharacterEncoding("UTF-8");
		// System.out.println(res.toString());
		 response.getWriter().print(res.toString());
	}
	
	public void doODum(Map<String,PersonRel> relmap,ODocument o, Map<String,String> flagmap,String idcard){
		  String rid=o.field("@RID").toString();
		  if(relmap.get(o.field("ltime1")+rid)==null)
		  {
			  PersonRel p=new PersonRel();
			  //���ӽ�ȥ
			  //|@RID |@CLASS |type|spantime|nohotel   |noroom1|ltime1    
			  //|etime1      |noroom2|ltime2      |etime2      |out  |in
			  if(o.field("nohotel")!=null)
			  {
				  if(Constants.jdmap.containsKey(o.field("nohotel")))
				  {
					  p.setNohotel(Constants.jdmap.get(o.field("nohotel")));  
				  }else
				  p.setNohotel(o.field("nohotel").toString());  
			  }
			  if(o.field("noroom1")!=null)
			  {
				  p.setNoroom1(o.field("noroom1").toString());  
			  }
			  if(o.field("ltime1")!=null)
			  {
				  p.setLtime1(o.field("ltime1").toString());  
			  }
			  if(o.field("etime1")!=null)
			  {
				  p.setEtime1(o.field("etime1").toString());  
			  }
			  if(o.field("noroom2")!=null)
			  {
				  p.setNoroom2(o.field("noroom2").toString());  
			  }
			  
			  if(o.field("ltime2")!=null)
			  {
				  p.setLtime2(o.field("ltime2").toString());  
			  }
			  if(o.field("etime2")!=null)
			  {
				  p.setEtime2(o.field("etime2").toString());  
			  }
			  if(o.field("out")!=null)
			  {
				  p.setOut(o.field("out").toString());  
			  }
			  if(o.field("in")!=null)
			  {
				  p.setIn(o.field("in").toString());  
			  }
			 // System.out.println("select from "+o.field("out").toString());
			  String key="";
			  
				  ORID RIDout=o.field("out");
				  ODocument  po1=OrientdbUtil.getinstance().searchOneRecord(RIDout);
				  if(po1.field("id")!=null)
					  p.setIdcard1(po1.field("id").toString());
				  if(po1.field("name")!=null)
					  p.setName1(po1.field("name").toString());
				  flagmap.put(key, "1");
				  if(!idcard.equals(po1.field("id").toString()))
				  {
					     key=o.field("nohotel")+"#"+o.field("noroom2")+"#"+po1.field("id").toString()+"#"+o.field("ltime1")+"#"
								  +o.field("etime1");
				  }
			   
			  
				  ORID RIDin=o.field("in");
				  ODocument  po2=OrientdbUtil.getinstance().searchOneRecord(RIDin);
				  if(po2.field("id")!=null)
					  p.setIdcard2(po2.field("id").toString());
				  if(po2.field("name")!=null)
					  p.setName2(po2.field("name").toString());
				  
				  if(!idcard.equals(po2.field("id").toString()))
				  {
					  key=o.field("nohotel")+"#"+o.field("noroom2")+"#"+po2.field("id").toString()+"#"+o.field("ltime2")+"#"
							  +o.field("etime2");
				  }
				  if(flagmap.get(key)==null)
				  {
					  relmap.put(o.field("ltime1")+rid, p);
					  flagmap.put(key, "1");
				  }
			  
		  }
	}
}
