package com.founderinternational.rscenter.totalchart;

import java.util.List;

public class ListGeneral {
	
		private static List<TotalObject> applyrank;//����һ��ǰʮ
		private static List<TotalObject> highgrade;//���ʷ�������
		private static List<TotalObject> poorgrade;//���ʷ�������
		private static List<TotalObject> lastweekdatatotal;//��һ����������ͳ��
		private static List<TotalObject> lastfunctiontotalrank;//����Ӧ������
		private static List<TotalObject> lastservicetotalrank;
		private static List<TotalObject> realMuData;//������
		private static List<TotalObject> realMuServiceData;//������
		private static TotalObject realHourData;//��Сʱ
		
		public static List<TotalObject> getRealMuServiceData() {
			return realMuServiceData;
		}
		public static void setRealMuServiceData(List<TotalObject> realMuServiceData) {
			ListGeneral.realMuServiceData = realMuServiceData;
		}
		public static List<TotalObject> getRealMuData() {
			return realMuData;
		}
		public static void setRealMuData(List<TotalObject> realMuData) {
			ListGeneral.realMuData = realMuData;
		}
		public static TotalObject getRealHourData() {
			return realHourData;
		}
		public static void setRealHourData(TotalObject realHourData) {
			ListGeneral.realHourData = realHourData;
		}
		public static List<TotalObject> getApplyrank() {
			return applyrank;
		}
		public static void setApplyrank(List<TotalObject> applyrank) {
			ListGeneral.applyrank = applyrank;
		}
		public static List<TotalObject> getHighgrade() {
			return highgrade;
		}
		public static void setHighgrade(List<TotalObject> highgrade) {
			ListGeneral.highgrade = highgrade;
		}
		public static List<TotalObject> getPoorgrade() {
			return poorgrade;
		}
		public static void setPoorgrade(List<TotalObject> poorgrade) {
			ListGeneral.poorgrade = poorgrade;
		}
		public static List<TotalObject> getLastweekdatatotal() {
			return lastweekdatatotal;
		}
		public static void setLastweekdatatotal(List<TotalObject> lastweekdatatotal) {
			ListGeneral.lastweekdatatotal = lastweekdatatotal;
		}
		public static List<TotalObject> getLastfunctiontotalrank() {
			return lastfunctiontotalrank;
		}
		public static void setLastfunctiontotalrank(
				List<TotalObject> lastfunctiontotalrank) {
			ListGeneral.lastfunctiontotalrank = lastfunctiontotalrank;
		}
		public static List<TotalObject> getLastservicetotalrank() {
			return lastservicetotalrank;
		}
		public static void setLastservicetotalrank(
				List<TotalObject> lastservicetotalrank) {
			ListGeneral.lastservicetotalrank = lastservicetotalrank;
		}

}

