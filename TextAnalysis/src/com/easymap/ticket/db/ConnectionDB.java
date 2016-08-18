package com.easymap.ticket.db;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.easymap.ticket.model.PageHelper;

public class ConnectionDB {

	/**
	 * ���ݿ�����������
	 */
	private static String DRIVER;

	/**
	 * �����ַ���
	 */
	private static String URLSTR;

	/**
	 * �û���
	 */
	private static String USERNAME;

	/**
	 * ����
	 */
	private static String USERPASSWORD;
	/**
	 * �������ݿ����Ӷ���
	 */
	private Connection connnection = null;

	/**
	 * ����PreparedStatement����
	 */
	private PreparedStatement preparedStatement = null;

	/**
	 * ����CallableStatement����
	 */
	private CallableStatement callableStatement = null;

	/**
	 * �������������
	 */
	private ResultSet resultSet = null;

	static {
		try {
			URLSTR = ReadProperties.getUrl();
			USERNAME = ReadProperties.getUsername();
			USERPASSWORD = ReadProperties.getPassword();
			DRIVER = ReadProperties.getDriver();
			Class.forName(DRIVER);
		} catch (ClassNotFoundException e) {
			System.out.println(e.getMessage());
		}
	}

	public ConnectionDB() {
		try {
			connnection = DriverManager.getConnection(URLSTR, USERNAME,
					USERPASSWORD);
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

	public Connection getConnection() {
		return this.connnection;
	}

	/**
	 * insert update delete SQL����ִ�е�ͳһ����
	 * 
	 * @param sql
	 *            SQL���
	 * @param params
	 *            �������飬��û�в�����Ϊnull
	 * @return ��Ӱ�������
	 */
	public int executeUpdate(String sql, Object[] params) {
		// ��Ӱ�������
		int affectedLine = 0;

		try {
			// ����SQL
			preparedStatement = connnection.prepareStatement(sql);

			// ������ֵ
			if (params != null) {
				for (int i = 0; i < params.length; i++) {
					preparedStatement.setObject(i + 1, params[i]);
				}
			}

			// ִ��
			affectedLine = preparedStatement.executeUpdate();

		} catch (SQLException e) {
			System.out.println(e.getMessage());
		} finally {
			// �ͷ���Դ
			closeAll();
		}
		return affectedLine;
	}

	/**
	 * SQL ��ѯ����ѯ���ֱ�ӷ���ResultSet��
	 * 
	 * @param sql
	 *            SQL���
	 * @param params
	 *            �������飬��û�в�����Ϊnull
	 * @return �����
	 */
	public ResultSet executeQueryRS(String sql, Object[] params) {
		try {

			// ����SQL
			preparedStatement = connnection.prepareStatement(sql);

			// ������ֵ
			if (params != null) {
				for (int i = 0; i < params.length; i++) {
					preparedStatement.setObject(i + 1, params[i]);
				}
			}

			// ִ��
			resultSet = preparedStatement.executeQuery();

		} catch (SQLException e) {
			e.printStackTrace();
			System.out.println(e.getMessage());
		}

		return resultSet;
	}

	/**
	 * SQL ��ѯ����ѯ���
	 * 
	 * @param sql
	 *            SQL���
	 * @param params
	 *            �������飬��û�в�����Ϊnull
	 * @return �����
	 */
	public Object[] executeQuerySingle(String sql, Object[] params) {
		Object[] object = null;
		try {

			// ����SQL
			preparedStatement = connnection.prepareStatement(sql);

			// ������ֵ
			if (params != null) {
				for (int i = 0; i < params.length; i++) {
					preparedStatement.setObject(i + 1, params[i]);
				}
			}

			// ִ��
			resultSet = preparedStatement.executeQuery();
			object = new Object[resultSet.getMetaData().getColumnCount()];
			if (resultSet.next()) {
				for (int i = 0; i < object.length; i++) {
					object[i] = resultSet.getObject(i + 1);
				}
			}

		} catch (SQLException e) {
			System.out.println(e.getMessage());
		} finally {
			// �ͷ���Դ
			closeAll();
		}

		return object;
	}

	/**
	 * ��ȡ������������������List��
	 * 
	 * @param sql
	 *            SQL���
	 * @return List �����
	 */
	public List<Object[]> excuteQuery(String sql, Object[] params) {
		// ִ��SQL��ý����
		ResultSet rs = executeQueryRS(sql, params);

		// ����ResultSetMetaData����
		ResultSetMetaData rsmd = null;

		// ���������
		int columnCount = 0;
		try {
			rsmd = rs.getMetaData();

			// ��ý��������
			columnCount = rsmd.getColumnCount();
		} catch (SQLException e1) {
			System.out.println(e1.getMessage());
		}

		// ����List
		List<Object[]> list = new ArrayList<Object[]>();

		try {
			// ��ResultSet�Ľ�����浽List��
			while (rs.next()) {
				Object[] o = new Object[columnCount];
				for (int i = 1; i <= columnCount; i++) {
					o[i - 1] = rs.getObject(i);
				}
				list.add(o);
			}
		} catch (SQLException e) {
			System.out.println(e.getMessage());
		} finally {
			// �ͷ���Դ
			closeAll();
		}
		return list;
	}

	/**
	 * ��ҳ��ȡ������������������List��
	 * 
	 * @param sql
	 *            SQL���
	 * @return List �����
	 */
	public List<Object[]> excuteQuery(String sql, Object[] params, PageHelper ph) {
		// ִ��SQL��ý����
		ResultSet rs = executeQueryRS(sql, params, ph);

		// ����ResultSetMetaData����
		ResultSetMetaData rsmd = null;

		// ���������
		int columnCount = 0;
		try {
			rsmd = rs.getMetaData();

			// ��ý��������
			columnCount = rsmd.getColumnCount();
		} catch (SQLException e1) {
			System.out.println(e1.getMessage());
		}

		// ����List
		List<Object[]> list = new ArrayList<Object[]>();

		try {
			// ��ResultSet�Ľ�����浽List��
			while (rs.next()) {
				Object[] o = new Object[columnCount];
				for (int i = 1; i <= columnCount; i++) {
					o[i - 1] = rs.getObject(i);
				}
				list.add(o);
			}
		} catch (SQLException e) {
			System.out.println(e.getMessage());
		}

		return list;
	}

	public ResultSet executeQueryRS(String sql, Object[] params, PageHelper ph) {
		try {

			// ����SQL
			preparedStatement = connnection.prepareStatement(sql,
					ResultSet.TYPE_SCROLL_INSENSITIVE,
					ResultSet.CONCUR_READ_ONLY);

			// ������ֵ
			if (params != null) {
				for (int i = 0; i < params.length; i++) {
					preparedStatement.setObject(i + 1, params[i]);
				}
			}
			preparedStatement.setMaxRows(ph.getPage()*ph.getRows());
			// ִ��
			resultSet = preparedStatement.executeQuery();
			resultSet.absolute((ph.getPage() - 1) * ph.getRows()+1);
//			resultSet.absolute(ph.getPage() * ph.getRows());
			
		} catch (SQLException e) {
			System.out.println(e.getMessage());
		}
		return resultSet;
	}

	/**
	 * �洢���̴���һ����������ķ���
	 * 
	 * @param sql
	 *            �洢�������
	 * @param params
	 *            ��������
	 * @param outParamPos
	 *            �������λ��
	 * @param SqlType
	 *            �����������
	 * @return ���������ֵ
	 */
	public Object excuteQuery(String sql, Object[] params, int outParamPos,
			int SqlType) {
		Object object = null;
		try {
			// ���ô洢����
			callableStatement = connnection.prepareCall(sql);

			// ��������ֵ
			if (params != null) {
				for (int i = 0; i < params.length; i++) {
					callableStatement.setObject(i + 1, params[i]);
				}
			}

			// ע���������
			callableStatement.registerOutParameter(outParamPos, SqlType);

			// ִ��
			callableStatement.execute();

			// �õ��������
			object = callableStatement.getObject(outParamPos);

		} catch (SQLException e) {
			System.out.println(e.getMessage());
		} finally {
			// �ͷ���Դ
			closeAll();
		}

		return object;
	}

	/**
	 * �ر�������Դ
	 */
	public void closeAll() {
		// �رս��������
		if (resultSet != null) {
			try {
				resultSet.close();
			} catch (SQLException e) {
				System.out.println(e.getMessage());
			}
		}

		// �ر�PreparedStatement����
		if (preparedStatement != null) {
			try {
				preparedStatement.close();
			} catch (SQLException e) {
				System.out.println(e.getMessage());
			}
		}

		// �ر�CallableStatement ����
		if (callableStatement != null) {
			try {
				callableStatement.close();
			} catch (SQLException e) {
				System.out.println(e.getMessage());
			}
		}

	}
}