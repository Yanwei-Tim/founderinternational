package com.founderinternational.rscenter.file;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.util.zip.CRC32;
import java.util.zip.CheckedOutputStream;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

public class ZipCompressor {   
    static final int BUFFER =1024*15;   
  
    private File zipFile;   
    
    public ZipCompressor(String pathName) {   
        zipFile = new File(pathName);   
    }   
    public void compress(String... pathName) { 
    	ZipOutputStream out = null;   
    	try {  
			FileOutputStream fileOutputStream = new FileOutputStream(zipFile);   
			CheckedOutputStream cos = new CheckedOutputStream(fileOutputStream,   
					new CRC32());   
			out = new ZipOutputStream(cos);   
			String basedir = ""; 
			for (int i=0;i<pathName.length;i++){
				compress(new File(pathName[i]), out, basedir);   
			}
	    	out.close();  
    	} catch (Exception e) {   
			throw new RuntimeException(e);   
		} 
    }   
    public void compress(String srcPathName) {   
        File file = new File(srcPathName);   
        if (!file.exists())   
            throw new RuntimeException(srcPathName + "�����ڣ�");   
        try {   
            FileOutputStream fileOutputStream = new FileOutputStream(zipFile);   
            CheckedOutputStream cos = new CheckedOutputStream(fileOutputStream,   
                    new CRC32());   
            ZipOutputStream out = new ZipOutputStream(cos);   
            String basedir = "";   
            compress(file, out, basedir);   
            out.close();   
        } catch (Exception e) {   
            throw new RuntimeException(e);   
        }   
    }   
  
    private void compress(File file, ZipOutputStream out, String basedir) {   
        /* �ж���Ŀ¼�����ļ� */  
        if (file.isDirectory()) {   
            System.out.println("ѹ����" + basedir + file.getName());   
            this.compressDirectory(file, out, basedir);   
        } else {   
            System.out.println("ѹ����" + basedir + file.getName());   
            this.compressFile(file, out, basedir);   
        }   
    }   
  
    /** ѹ��һ��Ŀ¼ */  
    private void compressDirectory(File dir, ZipOutputStream out, String basedir) {   
        if (!dir.exists())   
            return;   
        File[] files = dir.listFiles();   
        if(files.length==0)
        {
        	System.out.println(basedir + dir.getName() + "/");
        	compressNullFile(out,basedir + dir.getName() + "/");
        }else
        for (int i = 0; i < files.length; i++)
        {   
            /* �ݹ� */  
            compress(files[i], out, basedir + dir.getName() + "/");   
        }   
    }   
     private void compressNullFile( ZipOutputStream out, String basedir) {
        try {   
            ZipEntry entry = new ZipEntry(basedir +"/");   
            out.putNextEntry(entry);   
        } catch (Exception e) {   
            throw new RuntimeException(e);   
        }   
    }   
    /** ѹ��һ���ļ� */  
    private void compressFile(File file, ZipOutputStream out, String basedir) {
    	
        if (!file.exists()) {   
            return;   
        } 
        try {   
            BufferedInputStream bis = new BufferedInputStream(   
                    new FileInputStream(file));   
            ZipEntry entry = new ZipEntry(basedir + file.getName());   
            out.putNextEntry(entry);   
            int count;   
            byte data[] = new byte[BUFFER];   
            while ((count = bis.read(data, 0, BUFFER)) != -1) {   
                out.write(data, 0, count);   
            }   
            bis.close();   
        } catch (Exception e) {   
            throw new RuntimeException(e);   
        }   
    }   
   public static void main(String[] args) {   
        ZipCompressor zc = new ZipCompressor("E:/test21522211.zip");   
        zc.compress("E:/http_flow/resources","E:/http_flow/lib","E:/http_flow/config.xml");  
    }
} 