var basepath = getBaseURL();
var pageSize="10000";
var qtype="KvQuery";
var hbaseTable1="SJZ_DB_RELATION";
var hbaseTable2='SJZ_DB_TEST6';
var HBase="HBase01";
var ppstr="#??????????????????#??????????????#";
var wbxinxi="";
var counts=1;
var objlist=new Array();
var objlist1=new Array();
var objlist2=new Array();
var objlist3=new Array();
var objlist4=new Array();
var ispass=0;
var urllink="http://10.25.2.229/RyxxServlet?sfzh=";
var countwbdigui=0;
var ocxurl='http://10.25.2.229/personrelation/relation.jsp?pagename=index&sfzh=';
var countwb=0;

function searchtotal(){
	$("#idcard").val($("#idcard").val().trim());
	
	if($("#idcard").val()==''||$("#idcard").val()==null)
	{ 
	alert("֤���Ų�����Ϊ�գ�");
	return false;
	
	}else{
		
		if($("#idcard").val().length==15||$("#idcard").val().length==18){
			
			
		}else{
			alert("֤���ű���Ϊ15λ��18λ��ĸ�����֣���ȷ�������ٽ��в�ѯ��");
			return false;
			
		}
		
	}
	//document.getElementById('loadquery').style.visibility='visible';
	document.getElementById('loadquery').style.visibility='visible';
	searchInfo('01');
	searchInfo('02');
	searchInfo('03');
	searchWBInfo('05');
	searchTZSInfo('04');
}
function searchInfo(types){ 
	
	 
	countwb=0;
	var count=0;
	
	 //alert(count);
	
	
	
	//alert(basepath + "/ProxRequest");
	var requestUHB=new Object();
	var parm=new Object();
	requestUHB.hbaseInstance=HBase;
	requestUHB.hbaseTable=hbaseTable1;
	requestUHB.qasType=qtype;
	requestUHB.params=new Object();
	//parm.fuzzyRowkey='130121199109142#??????????????????#??????????????#03';132629198006162012#130828200501171912#20141122143350#03
	requestUHB.params.rowkey="";
	requestUHB.params.isBatch='false';
	requestUHB.params.isFuzzy='true';
	requestUHB.params.pageSize=pageSize;
    requestUHB.params.returnType='rowkey';
	requestUHB.params.maxVersions='1';
	
	 
   // ͬ��  ͬ����  ͬ�� ͬס��  ͬ����
	if(types=='01')
	{     objlist=new Array();
	 requestUHB.hbaseTable='SJZ_DB_TA';
		$("#biaoqian1").html("<span class='glyphicon glyphicon-book'></span>ͬ��");//����count
		contentscount(requestUHB,'01');
	}
	else if(types=='02'){
		 objlist1=new Array();
		 requestUHB.hbaseTable=hbaseTable2;
		$("#biaoqian2").html("<span class='glyphicon glyphicon-lock'></span>ͬ����");
		contentscount(requestUHB,'02');
	}
	else if(types=='03'){
		
		 objlist2=new Array();
		 requestUHB.hbaseTable='SJZ_DB_TH';
		$("#biaoqian3").html("<span class='glyphicon glyphicon-user'></span>ͬ��");
		contentscount(requestUHB,'03');
		
	}
	else if(types=='04'){
		 objlist3=new Array();
		$("#biaoqian4").html("ͬס��");
		
		contentscount(requestUHB,'04');
	}  else{
		$("#biaoqian5").html("ͬ����");
		//jisuanwbcount('05');
	}
	requestUHB.params.fuzzyRow=$("#idcard").val()+ppstr+types;
	
	//requestUHB.params=parm;
	//alert(JSON.stringify(requestUHB));
 //StreamQASServlet
	//alert();
	$.ajax({
		type : "POST",
		url :basepath + "/ProxRequest",
		data :JSON.stringify(requestUHB),
		dataType : "json", 
		processData:false,
		jsonp:false,
		success : function(restext) {
			//alert(JSON.stringify(restext)); 
			var results=restext.result;
			var content="";
			
            var nextRowkey="";
			for(var o in restext.result)
            	{
            	 //alert(results[o]);
            	 var results1=results[o];
            	 for(var oo in results[o])
            	 {
            		 var results2=results1[oo];
            		 for(var ooo in results2)
            		 { 
                        content="";

            			 if(types=='01')
            			 {    
            				 if(results2[ooo].ID2.length==18){ 
            					 if(count==0){
            						 content+="<tr style='color:red'>"; 
            						 content+="<td>"+results2[ooo].XM1+"</td>";
                					 content+="<td> <a href='"+urllink+results2[ooo].ID1+"'  target='blank' style='color:red'>"+results2[ooo].ID1+"</a></td>";
                                   
                					 content+="<td>"+results2[ooo].XB1+"</td>";
                					 content+="<td>"+results2[ooo].CSMC+"</td>";
                					 content+="<td>"+dotime(results2[ooo].TIME)+"</td>";
                					
                					// content+="<td>"+results2[ooo].TIME+"</td>";
                					 content+="<td><div class='btn-group'> <button class='btn  btn-xs btn-default' onclick='desp(\"��������\",\""+results2[ooo].DESP+"\")'>��������</button></div></td>";
                					 content+="</tr>";
                					// alert(content);
                					 objlist[count]=content;
                					 count++;
                					 content='';
                					 content+="<tr >"; 
            					 //������֤���ţ��Ա𣬰������ƣ�����ʱ�䣬��������
            					 content+="<td>"+results2[ooo].XM2+"</td>";
            					 content+="<td> <a href='"+urllink+results2[ooo].ID2+"'  target='blank'>"+results2[ooo].ID2+"</a></td>";

            					 content+="<td>"+results2[ooo].XB2+"</td>";
            					 content+="<td>"+results2[ooo].CSMC+"</td>";
            					 content+="<td>"+dotime(results2[ooo].TIME)+"</td>";

            					// content+="<td>"+results2[ooo].TIME+"</td>";
            					 content+="<td><div class='btn-group'> <button class='btn  btn-xs btn-default' onclick='desp(\"��������\",\""+results2[ooo].DESP+"\")'>��������</button></div></td>";
            					 content+="</tr>";
            					 objlist[count]=content;
            					 }else{
            						 
            					 
            					 if(results2[ooo].ID2==$("#idcard").val()){
            						 content+="<tr style='color:red'>"; 
            						 // alert();
            					 }else{   
            						 //content+="<tr>";
            						 content+="<tr >"; }
            					 //������֤���ţ��Ա𣬰������ƣ�����ʱ�䣬��������
            					 content+="<td>"+results2[ooo].XM2+"</td>";
            					 content+="<td> <a href='"+urllink+results2[ooo].ID2+"' target='blank'>"+results2[ooo].ID2+"</a></td>";

            					 content+="<td>"+results2[ooo].XB2+"</td>";
            					 content+="<td>"+results2[ooo].CSMC+"</td>";
            					 content+="<td>"+dotime(results2[ooo].TIME)+"</td>";

            					// content+="<td>"+results2[ooo].TIME+"</td>";
            					 content+="<td><div class='btn-group'> <button class='btn  btn-xs btn-default' onclick='desp(\"��������\",\""+results2[ooo].DESP+"\")'>��������</button></div></td>";
            					 content+="</tr>";
            					 objlist[count]=content;
            					 
            				 } 
            					 count++;
            			 }


            			 }
            			 else if(types=='02'){
            				 //������֤���ţ��Ա𣬼������ƣ�ͬ��ʱ�䣬����ԭ��
            				 if(results2[ooo].ID2.length==18){ 
            					 if(count==0){
            						 content+="<tr style='color:red'>"; 
            						 content+="<td>"+results2[ooo].XM1+"</td>";
                					 content+="<td><a href='"+urllink+results2[ooo].ID1+"'  target='blank' style='color:red'>"+results2[ooo].ID1+"</a></td>";
      
                					 content+="<td>"+results2[ooo].XB1+"</td>";
                					 content+="<td>"+results2[ooo].CSMC+"</td>";
                					 content+="<td>"+dotime(results2[ooo].TIME)+"</td>";

                					 content+="<td><div class='btn-group'> <button class='btn  btn-xs btn-default' onclick='desp(\"����ԭ��\",\""+results2[ooo].DESP+"\")'>����ԭ��</button></div></td>";
                					 content+="</tr>";
                					 objlist1[count]=content;
                					 count++;
                					 content="";
                					 content+="<tr >";
            					 content+="<td>"+results2[ooo].XM2+"</td>";
            					 //content+="<td>"+results2[ooo].ID2+"</td>";
            					 content+="<td><a href='"+urllink+results2[ooo].ID2+"'  target='blank'  >"+results2[ooo].ID2+"</a></td>";
            					 content+="<td>"+results2[ooo].XB2+"</td>";
            					 content+="<td>"+results2[ooo].CSMC+"</td>";
            					 content+="<td>"+dotime(results2[ooo].TIME)+"</td>";
              
            					 content+="<td><div class='btn-group'> <button class='btn  btn-xs btn-default' onclick='desp(\"����ԭ��\",\""+results2[ooo].DESP+"\")'>����ԭ��</button></div></td>";
            					 content+="</tr>";
            					 objlist1[count]=content;
            					 }else{
            					 if(results2[ooo].ID2==$("#idcard").val()){
            						 content+="<tr style='color:red'>"; 
            						 // alert();
            					 }else{
            						 //content+="<tr>";
            						 content+="<tr >"; }
            					 var times1='';
            					 content+="<td>"+results2[ooo].XM2+"</td>";
            					 content+="<td><a href='"+urllink+results2[ooo].ID2+"'  target='blank' >"+results2[ooo].ID2+"</a></td>";

            					 content+="<td>"+results2[ooo].XB2+"</td>";
            					 content+="<td>"+results2[ooo].CSMC+"</td>";
            					 content+="<td>"+dotime(results2[ooo].TIME)+"</td>";

            					 content+="<td><div class='btn-group'> <button class='btn  btn-xs btn-default' onclick='desp(\"����ԭ��\",\""+results2[ooo].DESP+"\")'>����ԭ��</button></div></td>";
            					 content+="</tr>";
            					 objlist1[count]=content;
            					// alert(content);
            					
            				 }
            					 count++;
            				 }
            			 }
            			 else if(types=='03'){
            				 if(results2[ooo].ID2.length==18){ 
            					 if(count==0){
            						 content+="<tr style='color:red'>"; 
            						 content+="<td>"+results2[ooo].XM1+"</td>";
            						 content+="<td><a href='"+urllink+results2[ooo].ID1+"'  target='blank' style='color:red'>"+results2[ooo].ID1+"</a></td>";

                					 content+="<td>"+results2[ooo].XB1+"</td>";
                					 content+="<td>"+results2[ooo].CSMC+"</td>";
                					 content+="<td><div class='btn-group'> <button class='btn  btn-xs btn-default' onclick='desp(\"��ϵ����\",\""+results2[ooo].DESP+"\")'>��ϵ����</button></div></td>";
                					 content+="</tr>";
                					 objlist2[count]=content;
                					 count++;
                					 content="";
                					 content+="<tr >"; 
            					 content+="<td>"+results2[ooo].XM2+"</td>";
            					 content+="<td><a href='"+urllink+results2[ooo].ID2+"'  target='blank' >"+results2[ooo].ID2+"</a></td>";

            					 content+="<td>"+results2[ooo].XB2+"</td>";
            					 content+="<td>"+results2[ooo].CSMC+"</td>";
            					 content+="<td><div class='btn-group'> <button class='btn  btn-xs btn-default' onclick='desp(\"��ϵ����\",\""+results2[ooo].DESP+"\")'>��ϵ����</button></div></td>";
            					 content+="</tr>";
            					 objlist2[count]=content;
            						 
            					 }else{
            					 if(results2[ooo].ID2==$("#idcard").val()){
            						 content+="<tr style='color:red'>"; 
            						 // alert();
            					 }else{//������֤���ţ��Ա𣬹�ϵ����
            						 //content+="<tr>";
            						 content+="<tr >"; }
            					 content+="<td>"+results2[ooo].XM2+"</td>";
            					 content+="<td>"+results2[ooo].ID2+"</td>";

            					 content+="<td>"+results2[ooo].XB2+"</td>";
            					 content+="<td>"+results2[ooo].CSMC+"</td>";
            					 content+="<td><div class='btn-group'> <button class='btn  btn-xs btn-default' onclick='desp(\"��ϵ����\",\""+results2[ooo].DESP+"\")'>��ϵ����</button></div></td>";
            					 content+="</tr>";
            					 objlist2[count]=content;
            					
            				 }
            					 count++;
            				 }
            			 }
            			 else if(types=='04'){//������֤���ţ��Ա�ͬסʱ�䣬ס�����ƣ�ͬס����
            				
            				 if(results2[ooo].ID2.length==18){ 
            					 if(results2[ooo].ID2==$("#idcard").val()){
            						 content+="<tr style='color:red'>"; 
            						 // alert();
            					 }else{
            						 //content+="<tr>";
            						 content+="<tr >"; }
            					 content+="<td>"+results2[ooo].XM2+"</td>";
            					 content+="<td>"+results2[ooo].ID2+"</td>";

            					 content+="<td>"+results2[ooo].XB2+"</td>";
            					 content+="<td>"+results2[ooo].TIME+"</td>";
            					 content+="<td>"+results2[ooo].CSMC+"</td>";
            					 content+="<td><div class='btn-group'> <button class='btn  btn-xs btn-default' onclick='desp(\"ͬס����\",\""+results2[ooo].DESP+"\")'>ͬס����</button></div></td>";
            					 content+="</tr>";
            					 objlist3[count]=content;
            					 count++;
            				 }
            			 }
            			 
            			 
            			 
            			
            		 }
            	 }
            	 break;
            	}
			
			//alert(count);
			  $.extend(param, {page : 1});
			  pagecontent(types);
		} 
	});
	
	//doData(types);
	
}

function jisuanwbcount(types){
	countwb=0;
	var requestUHB=new Object();
	var parm=new Object();
	requestUHB.hbaseInstance=HBase;
	requestUHB.hbaseTable="SJZ_WB_RELATION";
	requestUHB.qasType=qtype;
	requestUHB.params=new Object();
	requestUHB.count=$("#sjjg").val();
	requestUHB.params.rowkey="";
	requestUHB.params.isBatch='false';
	requestUHB.params.isFuzzy='true';
	requestUHB.params.pageSize=pageSize;
    requestUHB.params.returnType='rowkey';
	requestUHB.params.maxVersions='1';
	
	 var ppstrs1=ppstr+'000000#';
     requestUHB.params.fuzzyRow=$("#idcard").val()+ppstrs1+types;
     contentscount01(requestUHB,types);//00
    //01
     
	
	
	
}

function guanxi(){
	if($("#idcard").val()==''||$("#idcard").val()==null)
	{ 
	alert("���֤������Ϊ�գ�");
	return false;
	}
	//window.open(ocxurl+$("#idcard").val()).moveTo(0, 0).resizeTo(1000,800);
    // $("#idcard").val();	
	window.open(ocxurl+$("#idcard").val(),'��ϵͼչʾ','width='+(window.screen.availWidth-10)+',height='+(window.screen.availHeight-30)+',top=0,left=0,resizable=yes,status=yes,menubar=no,scrollbars=yes');
	
}

function doData(types){
	
	 
	
	
}
function searchWBInfotest(types){
	
	var requestUHB=new Object();
	var parm=new Object(); 
	requestUHB.hbaseInstance=HBase;
	requestUHB.hbaseTable="SJZ_WB_RELATION";
	requestUHB.qasType=qtype;
	requestUHB.params=new Object();
	
	requestUHB.params.rowkey="";
	requestUHB.params.isBatch='false';
	requestUHB.params.isFuzzy='true';
	requestUHB.params.pageSize=pageSize;
    requestUHB.params.returnType='rowkey';
	requestUHB.params.maxVersions='1';
	requestUHB.count="5";
	 var ppstrs1=ppstr+'000000#';
	requestUHB.params.fuzzyRow='110102197111053056'+ppstrs1+types;
	
	
	$.ajax({
		type : "POST",
		url :basepath + "/ProxWBRequest",
		data :JSON.stringify(requestUHB),
		dataType : "json", 
		processData:false,
		jsonp:false,
		success : function(restext) {
			 
			  
		} 
	});
	
	
	
	
}
function searchWBInfo(types){
	
	 objlist4=new Array();
   ispass=0;
	counts=0;
	countwb=0;
	
	//alert(basepath + "/ProxRequest");
	var requestUHB=new Object();
	var parm=new Object();
	requestUHB.hbaseInstance=HBase;
	requestUHB.starttime=$("#startdate").val();
	requestUHB.endtime=$("#enddate").val();
	requestUHB.hbaseTable="SJZ_DBWB_RELATION";
	requestUHB.qasType=qtype;
	requestUHB.params=new Object();
	requestUHB.count=$("#sjjg").val();
	requestUHB.params.rowkey="";
	requestUHB.params.isBatch='false';
	requestUHB.params.isFuzzy='true';
	requestUHB.params.pageSize=pageSize;
    requestUHB.params.returnType='rowkey';
	requestUHB.params.maxVersions='1';
	requestUHB.tcs=$("#tcs").val();
	$("#biaoqian5").html("<span class='glyphicon glyphicon-globe'></span>ͬ����");
	
	 
	//jisuanwbcount('05');
    var ppstrs1=ppstr+'000000#';
    requestUHB.params.fuzzyRow=$("#idcard").val()+ppstrs1+types;
       contents(requestUHB,types);//00
   
     $.extend(param, {page : 1});
     //alert(counts);
	 

}
function searchTZSInfo(types){
	//document.getElementById('loadquery').style.visibility='visible';
	 objlist3=new Array();
  ispass=0;
	counts=0;
	countwb=0;
	
	//alert(basepath + "/ProxRequest");
	var requestUHB=new Object();
	var parm=new Object();
	requestUHB.hbaseInstance=HBase;
	requestUHB.starttime=$("#startdate").val();
	requestUHB.endtime=$("#enddate").val();
	requestUHB.hbaseTable="SJZ_DBTLG_RELATION";
	requestUHB.qasType=qtype;
	requestUHB.params=new Object();
	requestUHB.count=$("#sjjg").val();
	requestUHB.params.rowkey="";
	requestUHB.params.isBatch='false';
	requestUHB.params.isFuzzy='true';
	requestUHB.params.pageSize=pageSize;
  requestUHB.params.returnType='rowkey';
	requestUHB.params.maxVersions='1';
	requestUHB.tcs=$("#tcs").val();
	$("#biaoqian4").html("<span class='glyphicon glyphicon-home'></span>ͬס��");
	 
	
	 
	 
	 
	//jisuanwbcount('05');
   var ppstrs1=ppstr+'000000#';
   requestUHB.params.fuzzyRow=$("#idcard").val()+ppstrs1+types;
   contentsTZS(requestUHB,types);//00
  
    $.extend(param, {page : 1});
    //alert(counts);
	 

}

function contentscount01(requestOb,types){
	//requestOb.params.fuzzyRow=$("#idcard").val()+ppstr+types;
	//alert(countx);  
	var content="";
	$.ajax({
		type : "POST",
		url :basepath + "/ProxWBRequest",
		data :JSON.stringify(requestOb),
		dataType : "json", 
		processData:false,
		jsonp:false,
		success : function(restext) {
			countwb=parseInt(restext.totalcount); 
			//alert(countwb);
			if(countwb>0)
	    	{
	    	//alert(countx);
	    	  if(types=='05'){
	    		  $("#biaoqian5").html("ͬ����<span id='biaoqian1' class='label label-warning'>"+countwb+"</span>");
			}
	    	}
		} 
	});
	
	
}





function contentscount(requestOb,types){
	requestOb.params.fuzzyRow=$("#idcard").val()+ppstr+types;
	//alert(countx);  
	var content="";
	$.ajax({
		type : "POST",
		url :basepath + "/ProxRequest",
		data :JSON.stringify(requestOb),
		dataType : "json", 
		processData:false,
		jsonp:false,
		success : function(restext) {
			var countx=0;
			//alert(JSON.stringify(restext)); 
			var results=restext.result;
            var nextRowkey="";
            for(var o in restext.result)
        	{
        	 //alert(results[o]);
        	 var results1=results[o];
        	 for(var oo in results[o])
        		 {
        		 var results2=results1[oo];
        		 for(var ooo in results2)
        			 { 
        		      content="";
      				 if(results2[ooo].ID2.length==18){ 
        				  
        				  //������֤���ţ��Ա�����ʱ�䣬��������
        					countx++;
          					//countwb++;
          					// alert(countwb);
        			 }
        			 }
        		 }
        	 break;
        	}
			
			 if(countx>0)
		    	{
		    	//alert(countx);
		    	if(types=='01')
				{    
					$("#biaoqian1").html("<span class='glyphicon glyphicon-book'></span>ͬ��<span id='biaoqian1' class='label label-warning'>"+(countx+1)+"</span>");
					//
				}
				else if(types=='02'){
					$("#biaoqian2").html("<span class='glyphicon glyphicon-lock'></span>ͬ����<span id='biaoqian1' class='label label-warning'>"+(countx+1)+"</span>");
				}
				else if(types=='03'){
					$("#biaoqian3").html("<span class='glyphicon glyphicon-user'></span>ͬ��<span id='biaoqian1' class='label label-warning'>"+(countx+1)+"</span>");
				}
				else if(types=='04'){
					$("#biaoqian4").html("ͬס��<span id='biaoqian1' class='label label-warning'>"+(countx+1)+"</span>");
				}  // ͬ��  ͬ����  ͬ�� ͬס��  ͬ����
		    	}
			 
			   
		} 
	});
	
	
}
function contents(requestOb,types){
	//document.getElementById('loadquery').style.visibility='visible';  
	
	var content="";
	$.ajax({
		type : "POST",
		url :basepath + "/ProxWBRequest",
		data :JSON.stringify(requestOb),
		dataType : "json", 
		processData:false,
		jsonp:false,
		success : function(restext) {
			
			//alert(JSON.stringify(restext)); 
			var results2=restext.result;
            var nextRowkey="";
           // alert(results2);
			for(var o in restext.result)
            	{
            	           content="";
            	           if(results2[o].ID2.length==18){ 
            	           if(counts==0){
            	        	   content+="<tr style='color:red'>"; 
            	        	   content+="<td>"+results2[o].XM1+"</td>";
               			  
               			 content+="<td><a href='"+urllink+results2[o].ID1+"'  target='blank' style='color:red'>"+results2[o].ID1+"</a></td>";
               			// content+="<td>"+results2[ooo].XB2+"</td>";
               			// content+="<td>"+results2[o].TIME+"</td>";
               			    content+="<td>"+dotime(results2[o].TIME)+"</td>";
               			 content+="<td>"+results2[o].count+"</td>";
               			 content+="<td><div class='btn-group'> <button class='btn  btn-xs btn-default' data-toggle='modal' data-target='#myModal' onclick='desp(\"��������\",\""+results2[o].DESP+"\")'>��������</button></div></td>";
               			 content+="</tr>";
               			 objlist4[counts]=content;//��ʼ��
               			 counts++;
               			 content="";
               			 content+="<tr >"; 
         				  //������֤���ţ��Ա�����ʱ�䣬��������
         				 content+="<td>"+results2[o].XM2+"</td>";
         				 content+="<td><a href='"+urllink+results2[o].ID2+"'  target='blank'>"+results2[o].ID2+"</a></td>";
         			// content+="<td>"+results2[ooo].XB2+"</td>";
         			// content+="<td>"+results2[o].TIME+"</td>";
         			    content+="<td>"+dotime(results2[o].TIME)+"</td>";
         			 content+="<td>"+results2[o].count+"</td>";
         			 content+="<td><div class='btn-group'> <button class='btn  btn-xs btn-default' data-toggle='modal' data-target='#myModal' onclick='desp(\"��������\",\""+results2[o].DESP+"\")'>��������</button></div></td>";
         			 content+="</tr>";
         			 objlist4[counts]=content;//��ʼ��
            	        	   
            	           }else{
          				  
            				 if(results2[o].ID2==$("#idcard").val()){
            					 content+="<tr style='color:red'>"; 
            					// alert();
            				 }else{
            					 //content+="<tr>";
            					 content+="<tr >"; }
            				  //������֤���ţ��Ա�����ʱ�䣬��������
            				 content+="<td>"+results2[o].XM2+"</td>";
            				 content+="<td><a href='"+urllink+results2[o].ID2+"'  target='blank'>"+results2[o].ID2+"</a></td>";
            			// content+="<td>"+results2[ooo].XB2+"</td>";
            			// content+="<td>"+results2[o].TIME+"</td>";
            			    content+="<td>"+dotime(results2[o].TIME)+"</td>";
            			 content+="<td>"+results2[o].count+"</td>";
            			 content+="<td><div class='btn-group'> <button class='btn  btn-xs btn-default' data-toggle='modal' data-target='#myModal' onclick='desp(\"��������\",\""+results2[o].DESP+"\")'>��������</button></div></td>";
            			 content+="</tr>";
            			 objlist4[counts]=content;//��ʼ��
            			 
            			
            			 }
            	           counts++;
            	           }
            	}
			// alert(counts);
			if(parseInt(restext.totalcount)>0)
    	    	{
			if(types=='05'){
	    		  $("#biaoqian5").html("<span class='glyphicon glyphicon-globe'></span>ͬ����<span id='biaoqian1' class='label label-warning'>"+(parseInt(restext.totalcount)+1)+"</span>");
			}}
			   $.extend(param, {page : 1});
		    	 pagecontent(types);
			  
		} 
	});
	
	
}


function contentsTZS(requestOb,types){
	  
	var content="";
	$.ajax({
		type : "POST",
		url :basepath + "/ProxWBRequest",
		data :JSON.stringify(requestOb),
		dataType : "json", 
		processData:false,
		jsonp:false,
		success : function(restext) {
			//alert(JSON.stringify(restext)); 
			var results2=restext.result;
            var nextRowkey="";
          // alert(results2);
			for(var o in restext.result)
            	{ 
            	           content="";
          				  if(results2[o].ID2.length==18){ 
          					 var tempcsmc=results2[o].CSMC.split("#");
          					if(counts==0){
          						// alert(results2);
             	        	   content+="<tr style='color:red'>"; 
             	        	  content+="<td>"+results2[o].XM1+"</td>";
             	        	 content+="<td><a href='"+urllink+results2[o].ID1+"'  target='blank' style='color:red'>"+results2[o].ID1+"</a></td>";
              			  content+="<td>"+results2[o].XB1+"</td>";
              			// content+="<td>"+results2[o].TIME+"</td>";
              			 
              			 content+="<td>"+tempcsmc[0]+"</td>";
              			 content+="<td>"+tempcsmc[1]+"</td>";
              		     	content+="<td>"+dotime(results2[o].TIME)+"</td>";
              			  content+="<td>"+dotime(results2[o].OUTTIME)+"</td>";
              			  
              			
              			 content+="<td>"+results2[o].count+"</td>";
              			 content+="<td><div class='btn-group'> <button class='btn  btn-xs btn-default'  onclick='desp(\"ͬס������\",\""+results2[o].DESP+"\")'>ͬס������</button></div></td>";
              			 content+="</tr>";
                			 objlist3[counts]=content;//��ʼ��
                			 counts++;
                			 content="";
                			 content+="<tr >";
                			 content+="<td>"+results2[o].XM2+"</td>";
                			 content+="<td><a href='"+urllink+results2[o].ID2+"'  target='blank'>"+results2[o].ID2+"</a></td>";
             			  content+="<td>"+results2[o].XB2+"</td>";
             			// content+="<td>"+results2[o].TIME+"</td>";
             			 content+="<td>"+tempcsmc[0]+"</td>";
              			 content+="<td>"+tempcsmc[1]+"</td>";
              		     	content+="<td>"+dotime(results2[o].TIME)+"</td>";
              			  content+="<td>"+dotime(results2[o].OUTTIME)+"</td>";
             			 content+="<td>"+results2[o].count+"</td>";
             			 content+="<td><div class='btn-group'> <button class='btn  btn-xs btn-default'  onclick='desp(\"ͬס������\",\""+results2[o].DESP+"\")'>ͬס������</button></div></td>";
             			 content+="</tr>";
             			 objlist3[counts]=content;//��ʼ��
             	           }else{
            				 if(results2[o].ID2==$("#idcard").val()){
            					 content+="<tr style='color:red'>"; 
            					// alert();
            				 }else{
            					 //content+="<tr>";
            					 content+="<tr >"; }
            				  //������֤���ţ��Ա�����ʱ�䣬��������
            				 content+="<td>"+results2[o].XM2+"</td>";
            				 content+="<td><a href='"+urllink+results2[o].ID2+"'  target='blank'>"+results2[o].ID2+"</a></td>";
            			  content+="<td>"+results2[o].XB2+"</td>";
            			// content+="<td>"+results2[o].TIME+"</td>";
            			  content+="<td>"+tempcsmc[0]+"</td>";
               			 content+="<td>"+tempcsmc[1]+"</td>";
               		     	content+="<td>"+dotime(results2[o].TIME)+"</td>";
               			  content+="<td>"+dotime(results2[o].OUTTIME)+"</td>";
            			 content+="<td>"+results2[o].count+"</td>";
            			 content+="<td><div class='btn-group'> <button class='btn  btn-xs btn-default'  onclick='desp(\"ͬס������\",\""+results2[o].DESP+"\")'>ͬס������</button></div></td>";
            			 content+="</tr>";
            			 objlist3[counts]=content;//��ʼ��
            			
            			 }
          					 counts++;
          					
          				  }
            	}
			//alert(counts);
			if(parseInt(restext.totalcount)>0)
    	    	{
			if(types=='04'){
	    		  $("#biaoqian4").html("<span class='glyphicon glyphicon-home'></span>ͬס��<span id='biaoqian1' class='label label-warning'>"+(parseInt(restext.totalcount)+1)+"</span>");
			}}
			   $.extend(param, {page : 1});
		    	 pagecontent(types);
			  
		} 
	});
	
	
}



function del(){
	
	var requestUHB=new Object();
	var parm=new Object();
	requestUHB.hbaseInstance=HBase;
	requestUHB.hbaseTableName='YW_CZRK_ZP';
	requestUHB.delType="rows";
	requestUHB.params=new Object();
	//parm.fuzzyRowkey='130121199109142#??????????????????#??????????????#03';132629198006162012#130828200501171912#20141122143350#03
	 requestUHB.params.fuzzyRow="";
	//requestUHB.params.startRow="013012564050479317";
	//requestUHB.params.stopRow="013012564050479317";
	$.ajax({
		type : "POST",
		url :basepath + "/DelProxRequest",
		data :JSON.stringify(requestUHB),
		dataType : "json", 
		processData:false,
		jsonp:false,
		success : function(restext) {
            //alert(constent);
			
		} 
	});
	
	
	
}
function isnumber(){
	var sjjg=$("#sjjg").val();
	var reg=/^\d+$/;
	if(!reg.test(sjjg)){
		$("#sjjg").val("5");
		
	}else{
		if(sjjg<0)
			{
			
			$("#sjjg").val("0");
			}else if(sjjg>=60){
				$("#sjjg").val("60");
			}else{}
		
		
	}
	var tcs=$("#tcs").val();
	 //alert(tcs);
	if(!reg.test(tcs)){
		$("#tcs").val("1");
		
	}else{
		if(tcs<0)
			{
			
			$("#tcs").val("0");
			}else if(tcs>=100){
				$("#tcs").val("100");
			}else{}
		
		
	}
	
	
	
}
function desp(desp,filed){
	
	        $("#myModal5").modal('show');
	        $("#myModalLabel5").text(desp);
	        $("#desp").html(filed);
	
	
}

function yinchang(){
	
	document.getElementById('startdate01').style.visibility='hidden';
	document.getElementById('enddate01').style.visibility='hidden';
	document.getElementById('sjjg01').style.visibility='hidden';
	
}

function xianshi(){
	
	document.getElementById('startdate01').style.visibility='visible';
	document.getElementById('enddate01').style.visibility='visible';
	document.getElementById('sjjg01').style.visibility='visible';
	
	
}

