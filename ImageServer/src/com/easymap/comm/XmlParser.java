package com.easymap.comm;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.List;

import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;

public class XmlParser {
    public static XmlParser getInstance()
    {
    	   return new XmlParser();
    }
	public  String[][] parseXml(String xml) throws DocumentException
	{
		String[][] resultArys = null;
		Document doc = DocumentHelper.parseText(xml);
		List list = doc.selectNodes("RBSPMessage/Method/Items/Item/Value/Row");
		//判断节点是否为空同时节点大于2
		if (list != null && list.size() > 2) {
			Element stateElement = (Element)list.get(0);
			String state = ((Element)stateElement.elements().get(0)).getText();			
			if(state.equalsIgnoreCase("000")) {//状态等于000代表结果返回正常
				Element fieldElement = (Element)list.get(1);
				//初始化二维数组
				resultArys = new String[list.size() - 2][fieldElement.elements().size()];				
				for (int i = 2; i < list.size(); i++) {
					Element data = (Element)list.get(i);					
					List fields = data.elements();
					for (int j = 0; j < fields.size(); j++) 
					{
						Element tmpE = (Element)fields.get(j);
					    	//二维数组赋值
						resultArys[i-2][j] = tmpE.getText();
					}
				}
			} 
		}
		return resultArys;
	}
	public  String getImg(String xml) throws DocumentException{
		Document doc = DocumentHelper.parseText(xml);
		String data = "";
		//获取Row节点集合
		List list = doc.selectNodes("RBSPMessage/Method/Items/Item/Value/Row");
		//判断节点是否为空同时节点大于2
		if(list != null && list.size() >2){
			Element rowElement = (Element)list.get(2);
			data = ((Element)rowElement.elements().get(0)).getText();
		}
		return data;
	}
	 
		
	
}
