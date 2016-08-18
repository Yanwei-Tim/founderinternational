package com.easymap.ticket.servlet;

import java.io.IOException;
import java.math.BigDecimal;
import java.sql.Date;
import java.util.Enumeration;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.io.IOUtils;
import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;

import com.easymap.management.newapi.LogManager;
import com.easymap.ticket.db.ReadProperties;
import com.easymap.ticket.model.User;
import com.easymap.ticket.tools.Constants;
import com.easymap.ticket.tools.testUrlCon;

import net.sf.json.JSONObject;
import sun.misc.BASE64Encoder;
public class TextAnalysisQuery extends HttpServlet{
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		process(req, resp);
	}
	public  void insertLOG(HttpServletRequest request,String datastr)
	{
		String ezManagerLocation;
		LogManager logManager;
		ezManagerLocation= Constants.EzManagerUrl;
		logManager = new LogManager(ezManagerLocation);
		Enumeration<String> plist=request.getParameterNames();
		String str=datastr;
		//String address;
		try {
			String orgId = "nologin";
			/*address = InetAddress.getLocalHost().getHostAddress();*/
			String orgcode="";
			if(request.getSession().getAttribute("user")!=null)
			{
				User user= (User)request.getSession().getAttribute("user");
			    orgcode=user.getOrgCode();
				orgId=user.getUsername();
				System.out.println("-----"+orgcode+orgId);
			
			}
			String  requeststr=request.getRequestURI();
			requeststr=requeststr.substring(requeststr.lastIndexOf("/"));
			String  ip=request.getRemoteAddr();
			try {
					logManager.setLog("440100120009", orgId, orgId, orgcode, new Date(System.currentTimeMillis()), "�����ı�����","�����ı������ӿ�",  ip, "1", "�����ı�:"+str);
				} catch (Exception e) {
				e.printStackTrace();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException{
		process(req, resp);
	}
	private void process(HttpServletRequest request, HttpServletResponse response)
	throws ServletException, IOException {
		 request.setCharacterEncoding("UTF-8");
		 String jsonstr=IOUtils.toString(request.getInputStream(),"utf-8");
		 System.out.println(jsonstr);
		 JSONObject parm=JSONObject.fromObject(jsonstr);
		 String textstr=null;
		 String result="";
		 long times =System.currentTimeMillis();
		 String xmlstr="";
		 if(parm.get("content")!=null)
		 {
			 textstr=parm.getString("content");
		     insertLOG(request,textstr);	//�����־    
		     xmlstr=dealXml(textstr);
		    if(textstr!=null&&!"".equals(textstr))
		    {
		    	try {
		    		result=testUrlCon.getInstance().getPostUrl(ReadProperties.get("textanalysis"), xmlstr);
		    	 
		    	} catch (Exception e) {
					e.printStackTrace();
				}
			}
		 }
		 JSONObject res=new JSONObject();
		  try {
			 resultxml(result,res);
		} catch (Exception e) {
			e.printStackTrace();
		} 
		 System.out.println(System.currentTimeMillis()-times);
		 response.setCharacterEncoding("UTF-8");
		 System.out.println(res.toString());
		 response.getWriter().print(res.toString());
	}
	public void resultxml(String xmlstr,JSONObject res) throws  Exception{
		if(!"".equals(xmlstr))
		{
			Document doc = DocumentHelper.parseText(xmlstr);
			System.out.println(xmlstr);
			Element root=doc.getRootElement();
			String resultstr="";
			Element  BJPerson  = root.element("BJPerson");
			if(BJPerson!=null)
			{
				resultstr+="�����ˣ�"+BJPerson.getTextTrim()+"<br/>";
			}
			Element  BJTime  = root.element("BJTime");
			if(BJTime!=null)
			{
				//year="2015" month="1" day="13" hour="8" minute="1"
				String year="";
				String month="";
				String day="";
				String hour="";
				String minute="";
				String times=year+"-"+month+"-"+day+" "+hour+":"+minute; 
				if(times.length()>4)
				resultstr+="����ʱ�䣺"+times+"<br/>";
			}
			
			Element  FADZ = root.element("FADZ");
			if(FADZ!=null)
			{
				resultstr+="������ַ��"+FADZ.getTextTrim()+"<br/>";
			}
			Element  JQLX = root.element("JQLX");
			if(JQLX!=null)
			{
				resultstr+="�������ͣ�"+JQLX.getTextTrim()+"<br/>";
			}
			Element  ZAGJ = root.element("ZAGJ");
			if(ZAGJ!=null)
			{
				resultstr+="�������ߣ�"+ZAGJ.getTextTrim()+"<br/>";
			}
			Element  ZAFS = root.element("ZAFS");
			if(ZAFS!=null)
			{
				resultstr+="������ʽ��"+ZAFS.getTextTrim()+"<br/>";
			}
			 Element   AllDZ = root.element("AllDZ");
			 List<Element> listalldz=null;
			 if(AllDZ!=null)
			 {
				 listalldz=AllDZ.elements("DZ");
			 }
			 int count=1;
			 if(listalldz!=null)
			 {
				 for(Element ele:listalldz)
				 {
					 resultstr+="��ַ"+count+"��"+ele.getTextTrim()+"<br/>";
					 count++;
				 }
			 }
			 System.err.println(resultstr);
			 res.put("result",resultstr);
		}
	}
	
	public String dealXml(String textstr){
		String xmlstr="";//
		xmlstr+="<?xml version='1.0' encoding='utf-8'?>";
		xmlstr+="<Request>";
		xmlstr+="<JQDescription>"+textstr+"</JQDescription>";
		xmlstr+="</Request>";
		System.out.println(xmlstr);
		return xmlstr;
	}
	
	
	public static void main(String[] arg)
	{
		TextAnalysisQuery tq=new TextAnalysisQuery();
		String xmlstr=tq.dealXml("סլС��������ҵ����2015��1��12�� 16ʱ44��������110ָ�����ĳ�:�ڹ㶫ʡ��������ɳ����һ��ѧ�Ա߱�5��4¥411�������Ƽ��ﱻ���ҵ��ԡ��ӱ���������Ѹ�ٸ����ֳ������飬��������ַ���˼���������ʽ���ҵ���400Ԫ�ֽ�һ̨����������һ�����������ѷ��Ż�ִ��");
		try {
			String result=result=testUrlCon.getInstance().getPostUrl("http://10.235.36.7:8008/JQAnalyseService", xmlstr);
	    System.out.println(result);
	    JSONObject OB=new JSONObject();
	
	     tq.resultxml(result, OB);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}
}
