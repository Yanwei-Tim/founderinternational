package com.founderinternational.rscenter.totalchart;

import java.util.Calendar;
import java.util.Date;
import java.util.Timer;

import org.springframework.stereotype.Component;
public class TotalTimerStart {
	public void init(){
		   startTask();
	}
	public  void startTask(){
		//new TotalTask().run();//��һ������
		Calendar calendar = Calendar.getInstance();
		calendar.set(Calendar.HOUR_OF_DAY, 3);  // ����ʱ
		calendar.set(Calendar.MINUTE, 0);       // ���Ʒ�
		calendar.set(Calendar.SECOND, 0);       // ������
		Date time = calendar.getTime();         // �ó�ִ�������ʱ��,�˴�Ϊ�����12��00��00
		Timer timer = new Timer();
		timer.schedule(new TotalTask(), time,1000 * 60 * 60 * 24);
		System.out.println("-------����------");
		//ÿ��3�����""
	}

}
