var basepath = getBaseURL();
var pageSize="10000";
var qtype="KvQuery";
var hbaseTable1="SJZ_DB_RELATION";
var HBase="HBase01";
var ppstr="#??????????????????#??????????????#";
var wbxinxi="";
var counts=1;
function searchInfo(types){
	if($("#idcard").val()==''||$("#idcard").val()==null)
		{ 
		alert("���֤������Ϊ�գ�");
		return false;
		}
	//alert(basepath + "/ProxRequest");
	var requestUHB=new Object();
	var parm=new Object();
	requestUHB.hbaseInstance=HBase;
	requestUHB.hbaseTable=hbaseTable1;
	requestUHB.qasType=qtype;
	requestUHB.params=new Object();
	//parm.fuzzyRowkey='130121199109142#??????????????????#??????????????#03';132629198006162012#130828200501171912#20141122143350#03
	
	requestUHB.params.fuzzyRow=$("#idcard").val()+ppstr+types;
	requestUHB.params.rowkey="";
	requestUHB.params.isBatch='false';
	requestUHB.params.isFuzzy='true';
	requestUHB.params.pageSize=pageSize;
    requestUHB.params.returnType='rowkey';
	requestUHB.params.maxVersions='1';
	
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
			 if(types=='01')
				{                                                                                           
				 content="<table class='table table-bordered table-striped' border='1'> <thead> <tr>  <th width='10%'>����</th><th align='center' width='15%'>֤����</th> <th width='10%'>�Ա�</th><th width='30%'>��������</th> <th width='10%'>����ʱ��</th>   <th width='15%'> ��������</th> </tr> </thead>";
				}
			else if(types=='02'){
				content="<table class='table table-bordered table-striped' border='1'> <thead> <tr>  <th width='10%'>����</th><th align='center' width='15%'>֤����</th> <th width='10%'>�Ա�</th>   <th width='30%'>��������</th><th width='10%'>ͬ��ʱ��</th><th width='15%'> ����ԭ��</th> </tr> </thead>";
				                                                                  //������֤���ţ��Ա𣬼������ƣ�ͬ��ʱ�䣬����ԭ��
			}
			else if(types=='03'){
				content="<table class='table table-bordered table-striped' border='1'> <thead> <tr>  <th width='10%'>����</th><th align='center' width='15%'>֤����</th> <th width='10%'>�Ա�</th>  <th width='20%'> ��ϵ����</th> </tr> </thead>";
				
			}
			else if(types=='04'){
				content="<table class='table table-bordered table-striped' border='1'> <thead> <tr>  <th width='10%'>����</th><th align='center' width='15%'>֤����</th> <th width='10%'>�Ա�</th> <th width='10%'>ͬסʱ��</th>   <th width='30%'>ס������</th><th width='15%'> ͬס����</th> </tr> </thead>";
				
			}
		 
			 
			 
			 
			 
            content+="<tbody style='border: none'>";
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
            		
            			 
            			 if(types=='01')
          				{    
            				 if(results2[ooo].ID2.length==18){ 
                				 if(results2[ooo].ID2==$("#idcard").val()){
                					 content+="<tr style='color:red'>"; 
                					// alert();
                				 }else{   
                					 //content+="<tr>";
                					 content+="<tr >"; }
                				 //������֤���ţ��Ա𣬰������ƣ�����ʱ�䣬��������
                				 content+="<td>"+results2[ooo].XM2+"</td>";
                			 content+="<td>"+results2[ooo].ID2+"</td>";
                			 
                			 content+="<td>"+results2[ooo].XB2+"</td>";
                			 content+="<td>"+results2[ooo].CSMC+"</td>";
                			 content+="<td>"+results2[ooo].TIME+"</td>";
                			   
                			
                			 content+="<td><div class='btn-group'> <button class='btn  btn-xs btn-default' onclick='desp(\"��������\",\""+results2[ooo].DESP+"\")'>��������</button></div></td>";
                			 content+="</tr>";
                			 } 
            				 
            				 
          				}
          			else if(types=='02'){
          				//������֤���ţ��Ա𣬼������ƣ�ͬ��ʱ�䣬����ԭ��
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
            			 content+="<td>"+results2[ooo].CSMC+"</td>";
            			 content+="<td>"+results2[ooo].TIME+"</td>";
            			
            			 content+="<td><div class='btn-group'> <button class='btn  btn-xs btn-default' onclick='desp(\"����ԭ��\",\""+results2[ooo].DESP+"\")'>����ԭ��</button></div></td>";
            			 content+="</tr>";
            			 }
          			}
          			else if(types=='03'){
          				 if(results2[ooo].ID2.length==18){ 
            				 if(results2[ooo].ID2==$("#idcard").val()){
            					 content+="<tr style='color:red'>"; 
            					// alert();
            				 }else{//������֤���ţ��Ա𣬹�ϵ����
            					 //content+="<tr>";
            					 content+="<tr >"; }
            				 content+="<td>"+results2[ooo].XM2+"</td>";
            			 content+="<td>"+results2[ooo].ID2+"</td>";
            			 
            			 content+="<td>"+results2[ooo].XB2+"</td>";
            			 
            			 content+="<td><div class='btn-group'> <button class='btn  btn-xs btn-default' onclick='desp(\"��ϵ����\",\""+results2[ooo].DESP+"\")'>��ϵ����</button></div></td>";
            			 content+="</tr>";
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
            			 }
          			}
            			 }
            		 }
            	 break;
            	}
			
			content+="</tbody></table>";
			if(types=='01')
				{
				$("#map1").html("");
				$("#map1").html(content);
				}
			else if(types=='02'){
				$("#map2").html("");
				$("#map2").html(content);
				
			}
			else if(types=='03'){
				$("#map3").html("");
				$("#map3").html(content);
				
			}
			else if(types=='04'){
				$("#map4").html("");
				$("#map4").html(content);
				
			}
		 
			else{
				$("#map1").html("");
				$("#map1").html(content);
				
			}
			
            //alert(constent);
			 
		} 
	});
	
}

function doData(types){
	
	
	
	
}

function searchWBInfo(types){
	wbxinxi="";
	counts=0;
	if($("#idcard").val()==''||$("#idcard").val()==null)
		{ 
		alert("���֤������Ϊ�գ�");
		return false;
		}
	//alert(basepath + "/ProxRequest");
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
	var content="";
	 content="<table class='table table-bordered table-striped' border='1'> <thead> <tr>  <th width='10%'>����</th><th align='center' width='15%'>֤����</th>   <th width='10%'>����ʱ��</th>   <th width='20%'> ��������</th> </tr> </thead>";
     content+="<tbody style='border: none'>";
     var ppstrs1=ppstr+'000000#';
     requestUHB.params.fuzzyRow=$("#idcard").val()+ppstrs1+types;
      content +=contents(requestUHB);//00
    //01
      var ppstrs2=ppstr+'000001#';
      requestUHB.params.fuzzyRow=$("#idcard").val()+ppstrs2+types;
      contents(requestUHB);
     // alert(content+"---------------------------");
    //02
      var ppstrs3=ppstr+'000002#';
      requestUHB.params.fuzzyRow=$("#idcard").val()+ppstrs3+types;
       contents(requestUHB);
    //03
      var ppstrs4=ppstr+'000003#';
      requestUHB.params.fuzzyRow=$("#idcard").val()+ppstrs4+types;
      contents(requestUHB);
    //04
      var ppstrs5=ppstr+'000004#';
      requestUHB.params.fuzzyRow=$("#idcard").val()+ppstrs5+types;
      contents(requestUHB);
    //05
      var ppstrs6=ppstr+'000005#';
      requestUHB.params.fuzzyRow=$("#idcard").val()+ppstrs6+types;
      contents(requestUHB);
      alert(wbxinxi);
      content+=wbxinxi;
	  content+="</tbody></table>";
	$("#map5").html("");
	$("#map5").html(content);
	//alert(counts);
}


function contents(requestOb){
	
	var content="";
	$.ajax({
		type : "POST",
		url :basepath + "/ProxRequest",
		data :JSON.stringify(requestOb),
		dataType : "json", 
		processData:false,
		jsonp:false,
		success : function(restext) {
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
            		 
          				 if(results2[ooo].ID2.length==18){ 
            				 if(results2[ooo].ID2==$("#idcard").val()){
            					 content+="<tr style='color:red'>"; 
            					// alert();
            				 }else{
            					 //content+="<tr>";
            					 content+="<tr >"; }
            				  //������֤���ţ��Ա�����ʱ�䣬��������
            				 content+="<td>"+results2[ooo].XM2+"</td>";
            			    content+="<td>"+results2[ooo].ID2+"</td>";
            			// content+="<td>"+results2[ooo].XB2+"</td>";
            			 content+="<td>"+results2[ooo].TIME+"</td>";
            			 content+="<td><div class='btn-group'> <button class='btn  btn-xs btn-default' onclick='desp(\"��������\",\""+results2[ooo].DESP+"\")'>��������</button></div></td>";
            			 content+="</tr>";
            			 counts++;
            			 }
            			 }
            		 }
            	 break;
            	}
		 
			wbxinxi+= content;
		} 
	});
	
	
}



function del(){
	
	var requestUHB=new Object();
	var parm=new Object();
	requestUHB.hbaseInstance=HBase;
	requestUHB.hbaseTableName=hbaseTable1;
	requestUHB.delType="rows";
	requestUHB.params=new Object();
	//parm.fuzzyRowkey='130121199109142#??????????????????#??????????????#03';132629198006162012#130828200501171912#20141122143350#03
	
	requestUHB.params.fuzzyRow="??????????????????#???#??????????????#07";
	
	 
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
function desp(desp,filed){
	
	        $("#myModal5").modal('show');
	        $("#myModalLabel5").text(desp);
	        $("#desp").html(filed);
	
	
}