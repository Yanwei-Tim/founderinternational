package com.founderinternational.rscenter.entity;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.founderinternational.rscenter.tools.Constants;

public class EZServiceMTODef {
        public static EZServiceMditemDEF MTOdef(List<EZServiceMditem> list){
        	if(list!=null)
        		if(list.size()>0)
        		{
        			EZServiceMditemDEF def=new EZServiceMditemDEF();
        			for(EZServiceMditem em:list)
        			{
        			   if(Constants.SMD_BASE_ACOUNT.equals(em.getMD_CODE()) )
        			   {//���ʴ���
        				   def.setAcount(em.getMD_VALUE());
        			   }else if(Constants.SMD_BASE_COMPANY.equals(em.getMD_CODE()))
        			   {//��������
        				   
        				   def.setCompany(em.getMD_VALUE());
        			   }else if(Constants.SMD_BASE_DZ.equals(em.getMD_CODE()))
        			   {//����
        				   
        				   def.setDz(em.getMD_VALUE());
        			   }else if(Constants.SMD_BASE_GET.equals(em.getMD_CODE()))
        			   {//���ʷ�ʽ
        				   
        				   def.setGET(em.getMD_VALUE());
        			   }else if(Constants.SMD_BASE_VERSION.equals(em.getMD_CODE()))
        			   {//�汾
        				   
        				   def.setVersion(em.getMD_VALUE());
        			   }else if(Constants.SMD_BASE_IMAGEURL.equals(em.getMD_CODE()))
        			   {//ͼƬ
        				   def.setImageurl(em.getMD_VALUE());
        			   }else if(Constants.SMD_BASE_TIME.equals(em.getMD_CODE()))
        			   {//ʱ��
        				   def.setTime(em.getMD_VALUE());
        			   }else if(Constants.SMD_BASE_USER.equals(em.getMD_CODE()))
        			   {//�û�
        				   def.setUser(em.getMD_VALUE());
        			   }
        			}
        			return def;
        		}
        	return null;
        }
}
