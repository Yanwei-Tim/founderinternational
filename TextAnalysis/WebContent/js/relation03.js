var basepath = getBaseURL();
var pageSize="10000";
var qtype="KvQuery";
var hbaseTable1="SJZ_DB_RELATION111";
var HBase="HBase01";
var ppstr="#??????????????????#??????????????#";
var wbxinxi="";
var counts=1;
var objlist=new Array();
var ispass=0;
var countwbdigui=0;
var ocxurl='http://10.25.1.150:8080/SJZDataCenter/personrelation/relation.jsp?pagename=index&sfzh=';
var countwb=0;
function searchInfo(types){ 
	countwb=0;
	var count=0;
	objlist=new Array();//初始化
	if($("#idcard").val()==''||$("#idcard").val()==null)
		{ 
		alert("身份证不可以为空！");
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
	requestUHB.params.rowkey="";
	requestUHB.params.isBatch='false';
	requestUHB.params.isFuzzy='true';
	requestUHB.params.pageSize=pageSize;
    requestUHB.params.returnType='rowkey';
	requestUHB.params.maxVersions='1';
	
	 
   // 同案  同监所  同户 同住宿  同上网
	$("#biaoqian1").html("同案");//清理count
	$("#biaoqian2").html("同监所");
	$("#biaoqian3").html("同户");
	$("#biaoqian4").html("同住宿");
	$("#biaoqian5").html("同上网");
	
	contentscount(requestUHB,'01');
	contentscount(requestUHB,'02');
	contentscount(requestUHB,'03');
	contentscount(requestUHB,'04');
	jisuanwbcount('05');
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
            					 if(results2[ooo].ID2==$("#idcard").val()){
            						 content+="<tr style='color:red'>"; 
            						 // alert();
            					 }else{   
            						 //content+="<tr>";
            						 content+="<tr >"; }
            					 //姓名，证件号，性别，案件名称，发案时间，案件描述
            					 content+="<td>"+results2[ooo].XM2+"</td>";
            					 content+="<td>"+results2[ooo].ID2+"</td>";

            					 content+="<td>"+results2[ooo].XB2+"</td>";
            					 content+="<td>"+results2[ooo].CSMC+"</td>";
            					 content+="<td>"+results2[ooo].TIME+"</td>";


            					 content+="<td><div class='btn-group'> <button class='btn  btn-xs btn-default' onclick='desp(\"案件描述\",\""+results2[ooo].DESP+"\")'>案件描述</button></div></td>";
            					 content+="</tr>";
            				 } 


            			 }
            			 else if(types=='02'){
            				 //姓名，证件号，性别，监所名称，同监时间，入所原因
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

            					 content+="<td><div class='btn-group'> <button class='btn  btn-xs btn-default' onclick='desp(\"入所原因\",\""+results2[ooo].DESP+"\")'>入所原因</button></div></td>";
            					 content+="</tr>";
            				 }
            			 }
            			 else if(types=='03'){
            				 if(results2[ooo].ID2.length==18){ 
            					 if(results2[ooo].ID2==$("#idcard").val()){
            						 content+="<tr style='color:red'>"; 
            						 // alert();
            					 }else{//姓名，证件号，性别，关系描述
            						 //content+="<tr>";
            						 content+="<tr >"; }
            					 content+="<td>"+results2[ooo].XM2+"</td>";
            					 content+="<td>"+results2[ooo].ID2+"</td>";

            					 content+="<td>"+results2[ooo].XB2+"</td>";

            					 content+="<td><div class='btn-group'> <button class='btn  btn-xs btn-default' onclick='desp(\"关系描述\",\""+results2[ooo].DESP+"\")'>关系描述</button></div></td>";
            					 content+="</tr>";
            				 }
            			 }
            			 else if(types=='04'){//姓名，证件号，性别，同住时间，住所名称，同住描述
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
            					 content+="<td><div class='btn-group'> <button class='btn  btn-xs btn-default' onclick='desp(\"同住描述\",\""+results2[ooo].DESP+"\")'>同住描述</button></div></td>";
            					 content+="</tr>";
            				 }
            			 }
            			 
            			 objlist[count]=content;
            			 count++;
            			 //alert(count);
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
      var ppstrs2=ppstr+'000001#';
      requestUHB.params.fuzzyRow=$("#idcard").val()+ppstrs2+types;
      contentscount01(requestUHB,types);
     // alert(content+"---------------------------");
    //02
      var ppstrs3=ppstr+'000002#';
      requestUHB.params.fuzzyRow=$("#idcard").val()+ppstrs3+types;
      contentscount01(requestUHB,types);
    //03
      var ppstrs4=ppstr+'000003#';
      requestUHB.params.fuzzyRow=$("#idcard").val()+ppstrs4+types;
      contentscount01(requestUHB,types);
    //04
      var ppstrs5=ppstr+'000004#';
      requestUHB.params.fuzzyRow=$("#idcard").val()+ppstrs5+types;
      contentscount01(requestUHB,types);
    //05
      var ppstrs6=ppstr+'000005#';
      requestUHB.params.fuzzyRow=$("#idcard").val()+ppstrs6+types;
      //alert($("#idcard").val()+ppstrs6+types);
      contentscount01(requestUHB,types);
     // alert("---");
	
	
	
}

function guanxi(){
	if($("#idcard").val()==''||$("#idcard").val()==null)
	{ 
	alert("身份证不可以为空！");
	return false;
	}
	//window.open(ocxurl+$("#idcard").val()).moveTo(0, 0).resizeTo(1000,800);
    // $("#idcard").val();	
	window.open(ocxurl+$("#idcard").val(),'关系图展示','width='+(window.screen.availWidth-10)+',height='+(window.screen.availHeight-30)+',top=0,left=0,resizable=yes,status=yes,menubar=no,scrollbars=yes');
	
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
	 objlist=new Array();//初始化
    ispass=0;
	counts=0;
	countwb=0;
	if($("#idcard").val()==''||$("#idcard").val()==null)
		{ 
		alert("身份证不可以为空！");
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
	$("#biaoqian1").html("同案");//清理count
	$("#biaoqian2").html("同监所");
	$("#biaoqian3").html("同户");
	$("#biaoqian4").html("同住宿");
	$("#biaoqian5").html("同上网");
	
	contentscount(requestUHB,'01');
	contentscount(requestUHB,'02');
	contentscount(requestUHB,'03');
	contentscount(requestUHB,'04');
	jisuanwbcount('05');
     var ppstrs1=ppstr+'000000#';
     requestUHB.params.fuzzyRow=$("#idcard").val()+ppstrs1+types;
        contents(requestUHB,types);//00
    //01
      var ppstrs2=ppstr+'000001#';
      requestUHB.params.fuzzyRow=$("#idcard").val()+ppstrs2+types;
      contents(requestUHB,types);
     // alert(content+"---------------------------");
    //02
      var ppstrs3=ppstr+'000002#';
      requestUHB.params.fuzzyRow=$("#idcard").val()+ppstrs3+types;
       contents(requestUHB,types);
    //03
      var ppstrs4=ppstr+'000003#';
      requestUHB.params.fuzzyRow=$("#idcard").val()+ppstrs4+types;
      contents(requestUHB,types);
    //04
      var ppstrs5=ppstr+'000004#';
      requestUHB.params.fuzzyRow=$("#idcard").val()+ppstrs5+types;
      contents(requestUHB,types);
    //05
      var ppstrs6=ppstr+'000005#';
      requestUHB.params.fuzzyRow=$("#idcard").val()+ppstrs6+types;
      contents(requestUHB,types);
      $.extend(param, {page : 1});
      //alert(counts);
	 
 
}

function contentscount01(requestOb,types){
	//requestOb.params.fuzzyRow=$("#idcard").val()+ppstr+types;
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
        				  
        				  //姓名，证件号，性别，上网时间，上网描述
        					//countx++;
          					countwb++;
          					// alert(countwb);
        			 }
        			 }
        		 }
        	 break;
        	}
			
			 if(countwb>0)
		    	{
		    	//alert(countx);
		    	  if(types=='05'){
		    		  $("#biaoqian5").html("同上网<span id='biaoqian1' class='label label-warning'>"+countwb+"</span>");

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
        				  
        				  //姓名，证件号，性别，上网时间，上网描述
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
					$("#biaoqian1").html("同案<span id='biaoqian1' class='label label-warning'>"+countx+"</span>");
					//
				}
				else if(types=='02'){
					$("#biaoqian2").html("同监所<span id='biaoqian1' class='label label-warning'>"+countx+"</span>");
				}
				else if(types=='03'){
					$("#biaoqian3").html("同户<span id='biaoqian1' class='label label-warning'>"+countx+"</span>");
				}
				else if(types=='04'){
					$("#biaoqian4").html("同住宿<span id='biaoqian1' class='label label-warning'>"+countx+"</span>");
				}  // 同案  同监所  同户 同住宿  同上网
		    	}
			 
			   
		} 
	});
	
	
}
function contents(requestOb,types){
	  
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
            		      content="";
          				 if(results2[ooo].ID2.length==18){ 
            				 if(results2[ooo].ID2==$("#idcard").val()){
            					 content+="<tr style='color:red'>"; 
            					// alert();
            				 }else{
            					 //content+="<tr>";
            					 content+="<tr >"; }
            				  //姓名，证件号，性别，上网时间，上网描述
            				 content+="<td>"+results2[ooo].XM2+"</td>";
            			    content+="<td>"+results2[ooo].ID2+"</td>";
            			// content+="<td>"+results2[ooo].XB2+"</td>";
            			 content+="<td>"+results2[ooo].TIME+"</td>";
            			 content+="<td><div class='btn-group'> <button class='btn  btn-xs btn-default' onclick='desp(\"上网描述\",\""+results2[ooo].DESP+"\")'>上网描述</button></div></td>";
            			 content+="</tr>";
            			 objlist[counts]=content;//初始化
            			 counts++;
            			 }
            			 }
            		 }
            	 break;
            	}
			 ispass++;
		     if(ispass==6)
		    	 {
		    	// alert("-----");
		    	 pagecontent(types);
		    	 }
			  
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
function desp(desp,filed){
	
	        $("#myModal5").modal('show');
	        $("#myModalLabel5").text(desp);
	        $("#desp").html(filed);
	
	
}