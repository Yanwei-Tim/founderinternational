package com.founderinternational.rscenter.tools;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.net.URLDecoder;
import java.security.InvalidKeyException;
import java.security.Key;
import java.security.KeyFactory;
import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.security.NoSuchAlgorithmException;
import java.security.PrivateKey;
import java.security.PublicKey;
import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;
import java.security.spec.PKCS8EncodedKeySpec;
import java.security.spec.X509EncodedKeySpec;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;

import org.apache.commons.codec.binary.Base64;

import sun.misc.BASE64Decoder;
import sun.misc.BASE64Encoder;

 

/**
 * RSA�㷨��ʵ�����ݵļ��ܽ��ܡ�
 * @author ShaoJiang
 *
 */
public class RSAUtil {
	
	private static Cipher cipher;
	
	static{
		try {
			cipher = Cipher.getInstance("RSA");
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		} catch (NoSuchPaddingException e) {
			e.printStackTrace();
		}
	}
	/**
	 * ������Կ��
	 * @param filePath ������Կ��·��
	 * @return
	 */
	public static Map<String,String> generateKeyPair(String filePath){
		try {
			KeyPairGenerator keyPairGen = KeyPairGenerator.getInstance("RSA");
			// ��Կλ��
			keyPairGen.initialize(1024);
			// ��Կ�� 
			KeyPair keyPair = keyPairGen.generateKeyPair();
			// ��Կ
			PublicKey publicKey = (RSAPublicKey) keyPair.getPublic();
			// ˽Կ
			PrivateKey privateKey = (RSAPrivateKey) keyPair.getPrivate();
			//�õ���Կ�ַ���
			String publicKeyString = getKeyString(publicKey);
			//�õ�˽Կ�ַ���
			String privateKeyString = getKeyString(privateKey);
			//����Կ��д�뵽�ļ�
			FileWriter pubfw = new FileWriter(filePath+"/publicKey.keystore");
			FileWriter prifw = new FileWriter(filePath+"/privateKey.keystore");
			BufferedWriter pubbw = new BufferedWriter(pubfw);
			BufferedWriter pribw = new BufferedWriter(prifw);
			pubbw.write(publicKeyString);
			pribw.write(privateKeyString);
			pubbw.flush();
			pubbw.close();
			pubfw.close();
			pribw.flush();
			pribw.close();
			prifw.close();
			//�����ɵ���Կ�Է���
			Map<String,String> map = new HashMap<String,String>();
			map.put("publicKey",publicKeyString);
			map.put("privateKey",privateKeyString);
			return map;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	/**
	 * �õ���Կ
	 * 
	 * @param key
	 *            ��Կ�ַ���������base64���룩
	 * @throws Exception
	 */
	public static PublicKey getPublicKey(String key) throws Exception {
		byte[] keyBytes;
		keyBytes = (new BASE64Decoder()).decodeBuffer(key);
		X509EncodedKeySpec keySpec = new X509EncodedKeySpec(keyBytes);
		KeyFactory keyFactory = KeyFactory.getInstance("RSA");
		PublicKey publicKey = keyFactory.generatePublic(keySpec);
		return publicKey;
	}
	
	/**
	 * �õ�˽Կ
	 * 
	 * @param key
	 *            ��Կ�ַ���������base64���룩
	 * @throws Exception
	 */
	public static PrivateKey getPrivateKey(String key) throws Exception {
		byte[] keyBytes;
		keyBytes = (new BASE64Decoder()).decodeBuffer(key);
		PKCS8EncodedKeySpec keySpec = new PKCS8EncodedKeySpec(keyBytes);
		KeyFactory keyFactory = KeyFactory.getInstance("RSA");
		PrivateKey privateKey = keyFactory.generatePrivate(keySpec);
		return privateKey;
	}

	/**
	 * �õ���Կ�ַ���������base64���룩
	 * 
	 * @return
	 */
	public static String getKeyString(Key key) throws Exception {
		byte[] keyBytes = key.getEncoded();
		Base64 base64=new Base64();
		 
		String s = base64.encode(keyBytes).toString();
		return s;
	}   	
	
	/**
	 * ʹ�ù�Կ�����Ľ��м��ܣ�����BASE64������ַ���
	 * @param publicKey
	 * @param plainText
	 * @return
	 */
	public static String encrypt(PublicKey publicKey,String plainText){
		try {			
			cipher.init(Cipher.ENCRYPT_MODE, publicKey);
			byte[] enBytes = cipher.doFinal(plainText.getBytes());	
			Base64 base64=new Base64(true);
			return new String(base64.encode(enBytes)); 
		} catch (InvalidKeyException e) {
			e.printStackTrace();
		} catch (IllegalBlockSizeException e) {
			e.printStackTrace();
		} catch (BadPaddingException e) {
			e.printStackTrace();
		}
		return null;
	}
	
	/**
	 * ʹ��˽Կ�����Ľ��м��ܣ�����BASE64������ַ���
	 * @param publicKey
	 * @param plainText
	 * @return
	 */
	public static String encryptbypri(PrivateKey privateKey,String plainText){
		try {			
			cipher.init(Cipher.ENCRYPT_MODE, privateKey);
			byte[] enBytes = cipher.doFinal(plainText.getBytes());
			Base64 base64=new Base64(true);
			 
			 
			return new String(base64.encode(enBytes)); 
		} catch (InvalidKeyException e) {
			e.printStackTrace();
		} catch (IllegalBlockSizeException e) {
			e.printStackTrace();
		} catch (BadPaddingException e) {
			e.printStackTrace();
		}
		return null;
	}
	
	
	/**
	 * ʹ�ù�Կ�����Ľ��м��ܣ�����BASE64������ַ���
	 * @param publicKey
	 * @param plainText
	 * @return
	 */
	 
	public static String decryptbyPub(PublicKey publicKey,String enStr){
		try {
			cipher.init(Cipher.DECRYPT_MODE, publicKey);
			Base64 base64=new Base64(true);
			byte[] deBytes = cipher.doFinal(base64.decode(enStr));
			return new String(deBytes);
		} catch (InvalidKeyException e) {
			e.printStackTrace();
		} catch (IllegalBlockSizeException e) {
			e.printStackTrace();
		} catch (BadPaddingException e) {
			e.printStackTrace();
		} 
		return null;
	}
	
	
	
	/**
	 * ʹ��keystore�����Ľ��м���
	 * @param publicKeystore ��Կ�ļ�·��
	 * @param plainText      ����
	 * @return
	 */
	public static String encrypt(String publicKeystore,String plainText){
		try {			
			FileReader fr = new FileReader(publicKeystore);
			BufferedReader br = new BufferedReader(fr);
			String publicKeyString="";
			String str;
			while((str=br.readLine())!=null){
				publicKeyString+=str;
			}
			br.close();
			fr.close();
			cipher.init(Cipher.ENCRYPT_MODE,getPublicKey(publicKeyString));
			byte[] enBytes = cipher.doFinal(plainText.getBytes());			
			return (new BASE64Encoder()).encode(enBytes);
		} catch (InvalidKeyException e) {
			e.printStackTrace();
		} catch (IllegalBlockSizeException e) {
			e.printStackTrace();
		} catch (BadPaddingException e) {
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}	
	
	/**
	 * ʹ��˽Կ���������Ľ��н���
	 * @param privateKey
	 * @param enStr
	 * @return
	 */
	public static String decrypt(PrivateKey privateKey,String enStr){
		try {
			cipher.init(Cipher.DECRYPT_MODE, privateKey);
			Base64 base64=new Base64(true);
			byte[] deBytes = cipher.doFinal(base64.decode(enStr));
			return new String(deBytes);
		} catch (InvalidKeyException e) {
			e.printStackTrace();
		} catch (IllegalBlockSizeException e) {
			e.printStackTrace();
		} catch (BadPaddingException e) {
			e.printStackTrace();
		} 
		return null;
	}
	
	/**
	 * ʹ��keystore�����Ľ��н���
	 * @param privateKeystore  ˽Կ·��
	 * @param enStr	                                     ����
	 * @return
	 */
	public static String decrypt(String privateKeystore,String enStr){
		try {
			FileReader fr = new FileReader(privateKeystore);
			BufferedReader br = new BufferedReader(fr);
			String privateKeyString="";
			String str;
			while((str=br.readLine())!=null){
				privateKeyString+=str;
			}
			br.close();
			fr.close();			
			cipher.init(Cipher.DECRYPT_MODE, getPrivateKey(privateKeyString));
			byte[] deBytes = cipher.doFinal((new BASE64Decoder()).decodeBuffer(enStr));
			return new String(deBytes);
		} catch (InvalidKeyException e) {
			e.printStackTrace();
		} catch (IllegalBlockSizeException e) {
			e.printStackTrace();
		} catch (BadPaddingException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	public static void  main(String args[]){
		 /*   Map map=RSAUtil.generateKeyPair("C:\\RSA");
		    Set<String> keyset=map.keySet();
		    for(String key : keyset)
		    {
		    	System.out.println(key+":"+map.get(key));
		    } */
		/*  String urlstr="iytga0SYE1adoDqnGDvWvWKkmSWTPGA79dFmMLJdph72vAP7Mc6UR2mbSHVakSKWDPlUrK4iIAZb%0D%0ALhQOk4LK642%2FWLn5XRbVDiNB6EYnmAGvj4NCTj%2Fra3P5yw%2BmSXREPmUoobLBW4alTriUbIuXyXRK%0D%0AOYsgQG6vvJmKcD3oA4c%3D";
		  String dec=URLDecoder.decode(urlstr);
		  System.out.println(dec);*/
		  FileReader fr;
			try {
				fr = new FileReader("C:\\RSA\\publicKey.keystore");
				String publicKeyString=RSAUtil.getKeystoreString("C:\\RSA\\publicKey.keystore");;
				PublicKey publickey=RSAUtil.getPublicKey(publicKeyString);
			    String priatestring=RSAUtil.getKeystoreString("C:\\RSA\\privateKey.keystore");
			    PrivateKey privateKey=RSAUtil.getPrivateKey(priatestring);
			    String encodestr=RSAUtil.encryptbypri(privateKey, "�����");
				System.out.println("encodestr:"+encodestr);
			    String plaint=RSAUtil.decryptbyPub(publickey, encodestr);
			    System.out.println(plaint);
			} catch (Exception e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			}
		
		
		
			
		
		
         
	}
	public static String getKeystoreString(String filepath){

		FileReader fr;
		try {
			fr = new FileReader(filepath);
			BufferedReader br = new BufferedReader(fr);
			String privateKeyString="";
			String str;
			while((str=br.readLine())!=null){
				privateKeyString+=str;
			}
			br.close();
			fr.close();	
			return privateKeyString;
		}catch(Exception e){
			
			e.printStackTrace();
			
		}
		return null;
	}
}
