package com.founderinternational.rscenter.entity;

import java.io.Serializable;

public class Menu  implements Serializable {
	private static final long serialVersionUID = 1L;
	
	/**
	 * Ωһ��ʶ
	 */
	private Integer id;
	/**
	 * ��ID
	 */
	private Integer parentId;
	/**
	 * ����
	 */
	private String name;
	/**
	 * ��Ӧ�ĵ�ַ
	 */
	private String url;
	/**
	 * �Ƿ���ʾ�����
	 */
	private Integer isShowLeft;
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public Integer getParentId() {
		return parentId;
	}
	public void setParentId(Integer parentId) {
		this.parentId = parentId;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	public Integer getIsShowLeft() {
		return isShowLeft;
	}
	public void setIsShowLeft(Integer isShowLeft) {
		this.isShowLeft = isShowLeft;
	}
}
