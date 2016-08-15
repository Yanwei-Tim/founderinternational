
package com.founderinternational.rscenter.controller;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.founderinternational.rscenter.entity.EZFunction;
import com.founderinternational.rscenter.entity.EZFunctionC;
import com.founderinternational.rscenter.entity.EZPFunctionService;
import com.founderinternational.rscenter.entity.EZService;
import com.founderinternational.rscenter.entity.EZServiceApply;
import com.founderinternational.rscenter.entity.EZServiceApplyInfo;
import com.founderinternational.rscenter.entity.EZServiceMditem;
import com.founderinternational.rscenter.entity.EZServiceMditemDEF;
import com.founderinternational.rscenter.entity.EZServiceMditemDEFVO;
import com.founderinternational.rscenter.entity.FwSqTable;
import com.founderinternational.rscenter.entity.Menu;
import com.founderinternational.rscenter.entity.form.EZFunctionVO;
import com.founderinternational.rscenter.entity.form.UserVO;
import com.founderinternational.rscenter.hankesbservice.HankESBService;
import com.founderinternational.rscenter.hankesbservice.HankServiceBean;
import com.founderinternational.rscenter.service.EZFunctionCService;
import com.founderinternational.rscenter.service.EZFunctionService;
import com.founderinternational.rscenter.service.EZServiceApplyService;
import com.founderinternational.rscenter.service.EZServiceService;
import com.founderinternational.rscenter.service.FwSqTableService;
import com.founderinternational.rscenter.service.MassegeInfoService;
import com.founderinternational.rscenter.service.MenuService;
import com.founderinternational.rscenter.tools.Constants;
import com.founderinternational.rscenter.tools.PrintGenerator;
import com.founderinternational.rscenter.tools.Tools;
import com.founderinternational.rscenter.tools.impl.TimeGeneral;
import  com.founderinternational.rscenter.entity.form.*;

@Controller
@RequestMapping(value = "fg")
public class FwSqTableController {

	@Resource(name = "massegeInfoService")
	private MassegeInfoService massegeInfoService;
	@Resource(name = "fwSqTableService")
    private FwSqTableService fwSqTableService;
	@Resource(name = "eZServiceService")
    private EZServiceService eZServiceService;
	/*
	 * author cloudMa
	 * ����Ա��������
	 * date  2015-8-5
	 * */
	private  static String httppath="";
	@ResponseBody
	@RequestMapping(value="dealFwSq")  
	public  Map<String, Object>   dealFwSq(HttpServletResponse response,HttpServletRequest request,int status,String aid,String reply) throws Exception 
	{
		System.out.println("aid"+aid);
		Map<String, Object> map = new HashMap<String, Object>();
		/* UserVO user=new UserVO();
		 user.setRole(Constants.ADMINROLE);
		 user.setUsername("admin");
		 request.getSession().setAttribute(Constants.USER, user);*/
		/*
		 * Ȩ�޴���
		 * */
		httppath=request.getServletContext().getRealPath("/");
	    if(request.getSession().getAttribute(Constants.USER)==null)
	    {
	    	map.put("result","no auth to access the operation");
	    	return map;
	    }
	    UserVO uservo=(UserVO)request.getSession().getAttribute(Constants.USER);
	    if(!Constants.ADMINROLE.equals(uservo.getRole()))
	    {
	    	map.put("result","no auth to access the operation");
	    	return map;
	    }
	    if(aid!=null)
	    {
	    FwSqTable fwsq=this.fwSqTableService.findFwSqTableById(aid);
		if(status==Constants.TGSTATUS/*ͨ������*/)
		{
			
			if(fwsq!=null)
			{
				fwsq.setDEALUSER(uservo.getUsername());
				fwsq.setDEALTIME(TimeGeneral.getInstance().next());
				fwsq.setSTATUS(Constants.TGSTATUS);
				fwsq.setREPLY(reply);
				int ss=this.fwSqTableService.UpdateFwSqTable(fwsq);
				//д����EzServiceInfo
				if(ss>0){
					if(FWToService(fwsq)>0){//д��EzServiceInfo
						map.put("result","success");
						
						this.massegeInfoService.addMessageInfo(fwsq.getAPPLYUSER(), Constants.MASSAGEFWTG, fwsq.getFWNAME()+"�����ɹ�",  "���ʱ�䣺"+fwsq.getDEALTIME()+"\n"+fwsq.getFWNAME()+"����ע����ͨ������Ա��� "+"\n���������"+fwsq.getREPLY()+"\n����ˣ�"+fwsq.getDEALUSER()+"\nע���ˣ�"+fwsq.getAPPLYUSER()+"\nע��ʱ�䣺"+fwsq.getAPPLYTIME());
					    //����esb
					
					}else{
						map.put("result","deal apply faild");
					} }else{
						map.put("result","deal apply faild");
					} 
			}
		}
		else if(status==Constants.jjSTATUS/*�ܾ�����*/)
		{
			if(reply!=null)
			{
				 
				if(fwsq!=null)
				{  
					fwsq.setDEALUSER(uservo.getUsername());
					fwsq.setDEALTIME(TimeGeneral.getInstance().next());
					fwsq.setSTATUS(Constants.jjSTATUS);
					fwsq.setREPLY(reply);
					this.fwSqTableService.UpdateFwSqTable(fwsq);
					map.put("result","success");
					this.massegeInfoService.addMessageInfo(fwsq.getAPPLYUSER(), Constants.MASSAGEFWJJ, fwsq.getFWNAME()+"ע��ʧ��", "���ʱ�䣺"+fwsq.getDEALTIME()+"\n"+fwsq.getFWNAME()+"����ע��ʧ�ܣ�δͨ������Ա��� "+"\n��������"+fwsq.getREPLY()+"\n����ˣ�"+fwsq.getDEALUSER()+"\nע���ˣ�"+fwsq.getAPPLYUSER()+"\nע��ʱ�䣺"+fwsq.getAPPLYTIME());
				}else{
					map.put("result","reply is null");
				}
			}
		}else{
			map.put("result","deal apply faild");
	    	return map;
		}
		}else{
			map.put("result","aid is null");
			return map;
		}
		return  map;
	}
	
	
	
   public int FWToService(FwSqTable fwsq){
	    if(fwsq!=null)
	    {
	    EZService ezservice=new EZService();
	    ezservice.setNAME(fwsq.getFWNAME());
	    ezservice.setINFO(fwsq.getFWINFO());
	    ezservice.setTYPE(fwsq.getFWTYPE());
	    ezservice.setSCORE("0");
	    ezservice.setMETHODNAME(fwsq.getMETHODNAME());
	    ezservice.setREGIONTYPE(fwsq.getFWREGION());
	    ezservice.setINTERFACETYPE(fwsq.getINTERFACETYPE());
	    ezservice.setACCESSCOUNT(0);
        int status=-1;
		ezservice.setPARENTSERVICEID(Constants.dicParentService.get(ezservice.getTYPE()));
		String serviceid=Tools.getUUID();
		System.out.println(serviceid);
		ezservice.setSERVICEID(serviceid);
		status=this.eZServiceService.InsertEZService(ezservice);
		if(status>0)
		{
				EZServiceMditemDEFVO ezservicedef=new EZServiceMditemDEFVO();
				ezservicedef.setCompany(fwsq.getFWURL());
				ezservicedef.setGET(fwsq.getFWHELPURL());
				ezservicedef.setVersion(fwsq.getDEMOURL());
				ezservicedef.setImageurl(fwsq.getIMAGEURL());
				HankServiceBean hankServiceBean=new HankServiceBean();
				hankServiceBean.setFWurl(fwsq.getFWURL()); 
				hankServiceBean.setServicename(fwsq.getMETHODNAME());
				//hankServiceBean.setESBPort(Constants.FWZXDKHM);
				hankServiceBean.setESBContextPath("/"+fwsq.getMETHODNAME());
				if(ezservicedef.getCompany()!=null)
				{
					EZServiceMditem ezsm=new EZServiceMditem();
					ezsm.setMD_CODE(Constants.SMD_BASE_COMPANY);
					ezsm.setMD_VALUE(ezservicedef.getCompany());
					ezsm.setSERVICE_ID(serviceid);
					this.eZServiceService.InsertEZServiceM(ezsm);
				}
				if(ezservicedef.getGET()!=null)
				{
					EZServiceMditem ezsm1=new EZServiceMditem();
					ezsm1.setMD_CODE(Constants.SMD_BASE_GET);
					ezsm1.setMD_VALUE(ezservicedef.getGET());
					ezsm1.setSERVICE_ID(serviceid);
					this.eZServiceService.InsertEZServiceM(ezsm1);
				}
				if(ezservicedef.getImageurl()!=null)
				{
					EZServiceMditem ezsm2=new EZServiceMditem();
					ezsm2.setMD_CODE(Constants.SMD_BASE_IMAGEURL);
					ezsm2.setMD_VALUE(ezservicedef.getImageurl());
					ezsm2.setSERVICE_ID(serviceid);
					this.eZServiceService.InsertEZServiceM(ezsm2);
				}
				if(ezservicedef.getVersion()!=null)
				{
					EZServiceMditem ezsm3=new EZServiceMditem();
					ezsm3.setMD_CODE(Constants.SMD_BASE_VERSION);
					ezsm3.setMD_VALUE(ezservicedef.getVersion());
					ezsm3.setSERVICE_ID(serviceid);
					this.eZServiceService.InsertEZServiceM(ezsm3);
				}
				EZServiceMditem ezsm4=new EZServiceMditem();
				ezsm4.setMD_CODE(Constants.SMD_BASE_TIME);
				ezsm4.setMD_VALUE(/*TimeGeneral.getInstance().next()*/fwsq.getAPPLYTIME());
				ezsm4.setSERVICE_ID(serviceid);
				this.eZServiceService.InsertEZServiceM(ezsm4);


				if(fwsq.getAPPLYUSER()!=null)
				{
					 
					EZServiceMditem ezsm5=new EZServiceMditem();
					ezsm5.setMD_CODE(Constants.SMD_BASE_USER);
					ezsm5.setMD_VALUE(fwsq.getAPPLYUSER());
					ezsm5.setSERVICE_ID(serviceid);
					this.eZServiceService.InsertEZServiceM(ezsm5);
				}
				
				//����esb����
				if("true".equals(Constants.ISHANKSERVICE))
				{    
					HankESBService hankthread=new HankESBService();
					
					hankthread.setXmlPath(httppath); 
					String fwtype=fwsq.getINTERFACETYPE();
					if("WebService".equals(fwtype))
					{
						hankthread.setType(Constants.HANKWSDL);
						hankServiceBean.setESBPort(Constants.FWZXDKWS);
					}else{
						hankthread.setType(Constants.HANKHTTP);
						hankServiceBean.setESBPort(Constants.FWZXDKHTTP);
					}
					hankthread.setHankServiceBean(hankServiceBean);
					new Thread(hankthread).start();
				}
				return status;
		  }
	    }
	    return 0;
   }
	
	/*
	 * author cloudMa
	 * �������뷢��
	 * date  2015-06-18
	 * */
   
	@ResponseBody
	@RequestMapping(value="findFwSq")  
	public  Map<String, Object>   findFwSq(HttpServletResponse response,HttpServletRequest request,int status,String start,String flag) throws Exception 
	{
		 
		 
		Map<String, Object> map = new HashMap<String, Object>();
		 
		UserVO user=null;
		if(request.getSession().getAttribute("user")!=null)
		{
			user=(UserVO)request.getSession().getAttribute("user");
		}
		 
		List<FwSqTable> result=null;
		if(status==Constants.STATUS)//������
		{
			
			if(user.getRole().equals(Constants.ADMINROLE))
			{
				if(flag!=null)
				{//��������
					result=this.fwSqTableService.findFwSqTableList(status, user.getUsername(), null);//����������Ҫ�û�
				}else{
					result=this.fwSqTableService.findFwSqTableList(status, null, null);//����������Ҫ�û�
				}
				
			}else{
				result=this.fwSqTableService.findFwSqTableList(status, user.getUsername(), null);
			}
		}else{
			if(user.getRole().equals(Constants.ADMINROLE))
			{
				if(flag!=null)
				{//��������
					result=this.fwSqTableService.findFwSqTableList(status, user.getUsername(), null);//����������Ҫ�û�
				}else{ 
					result=this.fwSqTableService.findFwSqTableList(status, null, user.getUsername());
				}
				
			}else{
				result=this.fwSqTableService.findFwSqTableList(status, user.getUsername(), null);
			}
			//����Ա�ǲ��ǿ�������
		}
		if( result!=null)
		{
			for(FwSqTable ff:result)
			{
				ff.setAPPLYTIME(dotime(ff.getAPPLYTIME()));
				ff.setDEALTIME(dotime(ff.getDEALTIME()));
			}
		}
		response.setCharacterEncoding("utf-8");
		map.put("data",result);
		return  map;
	}
	 
	/*public String dotime(String str){
		if(str!=null&&str!="")
		return str.replace(":", "").replace("-", "").replace(" ","");
				return str;
	}*/
	public String dotime(String str){
		if(str!=null&&str!=""){
			int endindex=str.lastIndexOf(":");
			if(endindex>10)
				str=str.substring(0, endindex);
		}
		  return str;
	}
	/*
	 * author cloudMa
	 * �鿴����������������
	 * date  2015-8-06
	 * */
   
	@ResponseBody
	@RequestMapping(value="findFwSqById")  
	public  Map<String, Object>   findFwSqById(HttpServletResponse response,int ids) throws Exception 
	{
		Map<String, Object> map = new HashMap<String, Object>();
		if(ids>0)
		{
			FwSqTable result=this.fwSqTableService.findFwSqTableById(ids+"");
			result.setFWTYPE(Constants.dicMap.get(result.getFWTYPE()));
			map.put("result",result);
		}else{
			map.put("result","null");
		}
		return  map;
	}
    
	/*
	 * author cloudMa
	 * �޸�����ͨ���ļ�¼�� ����Աdate 
	 * date  2015-09-06
	 * 2015-09-06
	 * */
	@ResponseBody
	@RequestMapping(value="updateSqFwTableAdmin")  
	public Map<String, Object>   updateSqFwTableAdmin(HttpServletRequest request,HttpServletResponse response, FwSqTable fwsq) throws Exception {
		response.setCharacterEncoding("utf-8");
		Map<String, Object> map = new HashMap<String, Object>();
		List<String> listr=null;
		if(fwsq==null)
			return null;
	    int ids= fwsq.getID();
		if(ids>0)
		{
			FwSqTable result=this.fwSqTableService.findFwSqTableById(ids+"");
			
			String uuid=Tools.getUUID();
			String username="";
			String userrole="";
			int status=0;
			if(request.getSession().getAttribute(Constants.USER)!=null){
				UserVO uservo=(UserVO)request.getSession().getAttribute(Constants.USER);
				username=uservo.getUsername();
				userrole=uservo.getRole();
			}else
			{
				    	map.put("result","no auth to access the operation");
				    	return map;
			}
				 
			
			if(!userrole.equals(Constants.ADMINROLE))
			{
				return null;
			}
			   /*param.FWNAME=$("#fwname").val();
			    param.METHODNAME=$("#fwmethod").val();
			    param.FWINFO=$("#fwinfo").val();
			    param.FWTYPE=$("#fwtype").val();
			    param.INTERFACETYPE=$("#interfacetype").val();
			    param.FWURL=$("#fwurl").val();
			    param.FWHELPURL=$("#fwhelpurl").val();
			    param.DEMOURL=$("#demourl").val();
			    param.IMAGEURL=$("#fwimage").val();
			    param.ID=$("#sids").val();
			    param.FWREGION=$("#fwregion").val();
			    if($("#acceptid").attr("checked")=='checked')
			    	 param.PUBLISHTYPE="1";
			    else
			    	 param.PUBLISHTYPE="0";*/
			//���Ӧ�ø���
			if(result!=null)
			{    
				 EZService  ezs=null;
				 ezs=new EZService();
				 ezs.setNAME(result.getFWNAME());
				 ezs.setINFO(result.getFWINFO());
				 ezs.setINTERFACETYPE(result.getINTERFACETYPE());
				 ezs.setMETHODNAME(result.getMETHODNAME());
				 ezs.setREGIONTYPE(result.getFWREGION());
				 
				 listr=this.eZServiceService.findByCondition(ezs);
				 
				 result.setAPPLYUSER(username);
			     result.setAPPLYTIME(TimeGeneral.getInstance().next());
			     result.setFWNAME(fwsq.getFWNAME());
			     result.setMETHODNAME(fwsq.getMETHODNAME());
			     result.setFWINFO(fwsq.getFWINFO());
			     result.setFWTYPE(fwsq.getFWTYPE());
			     result.setINTERFACETYPE(fwsq.getINTERFACETYPE());
			     result.setFWURL(fwsq.getFWURL());
			     result.setFWHELPURL(fwsq.getFWHELPURL());
			     result.setDEMOURL(fwsq.getDEMOURL());
			     System.out.println("----i---"+fwsq.getIMAGEURL());
			     result.setIMAGEURL(fwsq.getIMAGEURL());
			     result.setFWREGION(fwsq.getFWREGION());
			     result.setPUBLISHTYPE("1");
			     
				 status=this.fwSqTableService.UpateFwSqTableDetail(result);
			}
			
			
			 
			/*
			 * �޸���ԴĿ¼
			 * Ȩ�޴���
			 * */
		   
		    UserVO uservo=(UserVO)request.getSession().getAttribute(Constants.USER);
		    if(!Constants.ADMINROLE.equals(uservo.getRole()))
		    {
		    	map.put("result","no auth to access the operation");
		    	return map;
		    }
		    String aid=ids+"";
		    if(aid!=null)
		    {
		     
			if(result.getSTATUS()==Constants.TGSTATUS/*ͨ������*/)
			{
				
				if(result!=null)
				{
					result.setDEALUSER(uservo.getUsername());
					result.setDEALTIME(TimeGeneral.getInstance().next());
					result.setSTATUS(Constants.TGSTATUS);
					int ss=this.fwSqTableService.UpdateFwSqTable(result);
					//д����EzServiceInfo
					if(ss>0){
						if(FWToServiceupdate(result,listr)>0){//д��EzServiceInfo
							map.put("result","success");
							this.massegeInfoService.addMessageInfo(result.getAPPLYUSER(), Constants.MASSAGEFWTG, result.getFWNAME()+"���³ɹ�", "����ʱ�䣺"+result.getDEALTIME()+"\n"+result.getFWNAME()+"���񱻹���Ա����"+"\n�����ṩ�ˣ�"+result.getAPPLYUSER()+"\n�����ṩʱ�䣺"+result.getAPPLYTIME()+"\n�����ˣ�"+result.getDEALUSER()+"\n����ʱ�䣺"+result.getDEALTIME());
						}else{
							map.put("result","deal apply faild");
						} }else{
							map.put("result","deal apply faild");
						} 
				}
			}
			 else{
				map.put("result","deal apply faild");
		    	return map;
			}
			}else{
				map.put("result","aid is null");
				return map;
			}
			
			
			
			
			//�����
			map.put("result", status);
		}else
		{
			map.put("result","null");
		}
		return  map;
	}
	
	
	
	public int FWToServiceupdate(FwSqTable fwsq,List<String> listr){
	    if(listr==null)
	    {
	    	return 0;
	    }else{
	    	String serviceid=null;
	    	for(String str: listr)
	    	{//ɾ��
	    		serviceid=str;
	    		//ɾ��
	    		
	    		break;
	    	}
	    	if(serviceid==null)
	    	{
	    		return 0;
	    	}
	    	if(fwsq!=null)
		    {
		    List<EZService> ezlist=this.eZServiceService.findByServiceid(serviceid);
		    if(ezlist!=null)
		    {
		    	EZService ezservice=ezlist.get(0);
		    	ezservice.setNAME(fwsq.getFWNAME());
			    ezservice.setINFO(fwsq.getFWINFO());
			    ezservice.setTYPE(fwsq.getFWTYPE());
			    ezservice.setMETHODNAME(fwsq.getMETHODNAME());
			    ezservice.setREGIONTYPE(fwsq.getFWREGION());
			    ezservice.setINTERFACETYPE(fwsq.getINTERFACETYPE());
			    int status=-1;
				ezservice.setPARENTSERVICEID(Constants.dicParentService.get(ezservice.getTYPE()));
				//����
				status=this.eZServiceService.UpdateEZService(ezservice);
				System.out.println(status+"----status----");
				if(status>0)
				{
					    //ɾ��
					    //this.eZServiceService.deleteEZServiceM(serviceid);
						EZServiceMditemDEFVO ezservicedef=new EZServiceMditemDEFVO();
						ezservicedef.setCompany(fwsq.getFWURL());
						ezservicedef.setGET(fwsq.getFWHELPURL());
						ezservicedef.setVersion(fwsq.getDEMOURL());
						ezservicedef.setImageurl(fwsq.getIMAGEURL());

						List<EZServiceMditem> ezsmli=this.eZServiceService.findEZServiceMditem(serviceid);
						if(ezservicedef!=null)
						{   
							if(ezservicedef.getCompany()!=null)
							{
								EZServiceMditem ezsm= getEZServiceMditem(ezsmli,Constants.SMD_BASE_COMPANY);
								if(ezsm!=null){//����
									ezsm.setMD_VALUE(ezservicedef.getCompany());
									this.eZServiceService.UpdateEZServiceM(ezsm);
								}else{
									ezsm=new EZServiceMditem();
									ezsm.setMD_CODE(Constants.SMD_BASE_COMPANY);
									ezsm.setMD_VALUE(ezservicedef.getCompany());
									ezsm.setSERVICE_ID(serviceid);
									this.eZServiceService.InsertEZServiceM(ezsm);
								}
								
							}
							if(ezservicedef.getGET()!=null)
							{
								
								EZServiceMditem ezsm1= getEZServiceMditem(ezsmli,Constants.SMD_BASE_GET);
								if(ezsm1!=null){//����
									ezsm1.setMD_VALUE(ezservicedef.getGET());
									this.eZServiceService.UpdateEZServiceM(ezsm1);
								}else{
									ezsm1=new EZServiceMditem();
									ezsm1.setMD_CODE(Constants.SMD_BASE_GET);
									ezsm1.setMD_VALUE(ezservicedef.getGET());
									ezsm1.setSERVICE_ID(serviceid);
									this.eZServiceService.InsertEZServiceM(ezsm1);
								}
								
							 
							}
							if(ezservicedef.getImageurl()!=null)
							{
								EZServiceMditem ezsm2= getEZServiceMditem(ezsmli,Constants.SMD_BASE_IMAGEURL);
								if(ezsm2!=null){//����
									ezsm2.setMD_VALUE(ezservicedef.getImageurl());
									this.eZServiceService.UpdateEZServiceM(ezsm2);
								}else{
									ezsm2=new EZServiceMditem();
									ezsm2.setMD_CODE(Constants.SMD_BASE_IMAGEURL);
									ezsm2.setMD_VALUE(ezservicedef.getImageurl());
									ezsm2.setSERVICE_ID(serviceid);
									this.eZServiceService.InsertEZServiceM(ezsm2);
								}
							}
							if(ezservicedef.getVersion()!=null)
							{
								EZServiceMditem ezsm3= getEZServiceMditem(ezsmli,Constants.SMD_BASE_VERSION);
								if(ezsm3!=null){//����
									ezsm3.setMD_VALUE(ezservicedef.getVersion());
									this.eZServiceService.UpdateEZServiceM(ezsm3);
								}else{
									ezsm3=new EZServiceMditem();
									ezsm3.setMD_CODE(Constants.SMD_BASE_VERSION);
									ezsm3.setMD_VALUE(ezservicedef.getVersion());
									ezsm3.setSERVICE_ID(serviceid);
									this.eZServiceService.InsertEZServiceM(ezsm3);
								}
								 
							}
							 


							if(fwsq.getAPPLYUSER()!=null)
							{
								 
								EZServiceMditem ezsm5= getEZServiceMditem(ezsmli,Constants.SMD_BASE_USER);
								if(ezsm5!=null){//����
									ezsm5.setMD_VALUE(fwsq.getAPPLYUSER());
									this.eZServiceService.UpdateEZServiceM(ezsm5);
								}else{
									ezsm5=new EZServiceMditem();
									ezsm5.setMD_CODE(Constants.SMD_BASE_USER);
									ezsm5.setMD_VALUE(fwsq.getAPPLYUSER());
									ezsm5.setSERVICE_ID(serviceid);
									this.eZServiceService.InsertEZServiceM(ezsm5);
								}
							}
						 
							return status;
						}
				  }
		    }
	       
			
		    }
	    }
	    
		
	    return 0;
   }
	
	
	    public EZServiceMditem getEZServiceMditem(List<EZServiceMditem> list,String str)
		{
			
			if(list!=null)
			{
				for(EZServiceMditem ez:list)
				{
					if(ez.getMD_CODE().equals(str))
						return ez;
				}
			}
			return null;
		}
	
	/*
	 * author cloudMa
	 * �޸������date 
	 * date  2015-09-06
	 * 2015-06-17
	 * */
	@ResponseBody
	@RequestMapping(value="updateSqFwTable")  
	public Map<String, Object>   updateSqFwTable(HttpServletRequest request,HttpServletResponse response, FwSqTable fwsq) throws Exception {
		response.setCharacterEncoding("utf-8");
		Map<String, Object> map = new HashMap<String, Object>();
		if(fwsq==null)
			return null;
	    int ids= fwsq.getID();
		if(ids>0)
		{
			FwSqTable result=this.fwSqTableService.findFwSqTableById(ids+"");
			String uuid=Tools.getUUID();
			String username="";
			int status=0;
			if(request.getSession().getAttribute(Constants.USER)!=null){
				UserVO uservo=(UserVO)request.getSession().getAttribute(Constants.USER);
				username=uservo.getUsername();
			}else
				return null;
			if(!username.equals(result.getAPPLYUSER()))
			{
				return null;
			}
			//���Ӧ�ø���
			if(fwsq!=null)
			{    fwsq.setAPPLYUSER(username);
			     fwsq.setAPPLYTIME(TimeGeneral.getInstance().next());
			     fwsq.setSTATUS(Constants.STATUS);
				 status=this.fwSqTableService.UpateFwSqTableDetail(fwsq);
				 //System.out.println("status:"+status);
			}
			//�����
			map.put("result", status);
		}else
		{
			map.put("result","null");
		}
		return  map;
	}
	
	
	/*
	 * author cloudMa
	 * ��������date 
	 * date  2015-06-18
	 * 2015-06-17
	 * */
	@ResponseBody
	@RequestMapping(value="addFwSq")  
	public Map<String, Object>   addFwSq(HttpServletRequest request,HttpServletResponse response, FwSqTable fwsq) throws Exception {
		response.setCharacterEncoding("utf-8");
		Map<String, Object> map = new HashMap<String, Object>();
		String uuid=Tools.getUUID();
		String username="";
		int status=0;
		if(request.getSession().getAttribute(Constants.USER)!=null){
			UserVO uservo=(UserVO)request.getSession().getAttribute(Constants.USER);
			username=uservo.getUsername();
		}
		
		//���Ӧ�ø���
		if(fwsq!=null)
		{    fwsq.setAPPLYUSER(username);
		     fwsq.setAPPLYTIME(TimeGeneral.getInstance().next());
		     fwsq.setSTATUS(Constants.STATUS);
			 status=this.fwSqTableService.InsertFwSqTable(fwsq);
			 // System.out.println("status:"+status);
		}
		//�����
		map.put("result", status);
		return  map;
	}


	 

}