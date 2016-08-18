var basepath = getBaseURL();
var pageSize="10000";
var qtype="KvQuery";
var hbaseTable1="SJZ_DB_TA";
var hbaseTable2='SJZ_DB_TJS';
var hbaseTable3='SJZ_DB_TH';
var hbaseTable4="SJZ_DBTLG_RELATION";
var hbaseTable5="SJZ_DBWB_RELATION";
var hbaseTable6="JZ_SHXX_JTWF3";
var indexName="INDEX_JTWF_HPHM";
var HBase="HBase01";
var ppstr="#??????????????????#??????????????#";
var wbxinxi="";
var counts=1;
var objlist=new Array();
var objlist1=new Array();
var objlist2=new Array();
var objlist3=new Array();
var objlist4=new Array();
var objlist6=new Array();
var userID="WATERCODE";
var ispass=0;
var urllink="http://10.25.2.229/RyxxServlet?sfzh=";
var countwbdigui=0;
var ocxurl='http://10.25.2.229/personrelation/relation.jsp?pagename=index&sfzh=';
var countwb=0;

var parmobject=new Object();

function dosure()
{
	parmobject.startdate=$("#startdate").val();
	parmobject.enddate=$("#enddate").val();
	parmobject.wbjgsj=$("#wbjgsj").val();
	var checkbox=document.getElementsByName("tssw");
	var s="";
	for(var i=0;i<checkbox.length;i++)
	{
		if(checkbox[i].checked)
			s+=checkbox[i].value+",";
	}  
	parmobject.tzsfl=s;
	checkbox=document.getElementsByName("tswb");
	var s1="";
	for(var i=0;i<checkbox.length;i++)
	{
		if(checkbox[i].checked)
			s1+=checkbox[i].value+",";
	}
	parmobject.twbfl=s1;
}
function dorefalshg(){
	 
	reflashsvg();
}
function onloadparm()
{
	
	
	$.ajax({
		type : "POST",
		url :basepath + "/GetUserID",
		data :"", 
		dataType : "json", 
		processData:false,
		jsonp:false,
		success : function(result)
		{
			//idcode sex address "phonenum" addresss
			//{"xm":"����","zjhm":"362421198110055920","xb":"Ů��","csdz":"��","dhhm":"85575909,18922348149,85575909"}
			var result=result.result;
			if(result!=null)
			{
				 
				userID=result[0].userId;	
			}
		}
	});
	parmobject.startdate="1999-1-1";    
	var myDate= new Date();
	undefined
	var year=myDate.getFullYear();
	 
	var days=myDate.getDate();
	 
	var mm=myDate.getMonth()+1;
	parmobject.enddate=year+"-"+mm+"-"+days; 
	parmobject.wbjgsj=50;
	parmobject.tzsfl="0201,0202,0203,0204";
	parmobject.twbfl="0301,0302,0303,0304";;
	docancel();
}

function docancel(){
	$("#startdate").val(parmobject.startdate); 
	$("#enddate").val(parmobject.enddate);
	$("#wbjgsj").val(parmobject.wbjgsj+"");
	var tzsfl=parmobject.tzsfl;
	var tzsfls=tzsfl.split(",");
	var checkbox=document.getElementsByName("tssw");
	for(var i=0;i<checkbox.length;i++)
	{
		
		for(var j=0;j<tzsfls.length;j++)
			{
			if(tzsfls[j].endsWith(checkbox[i].value))
			{
				checkbox[i].checked=true;
				break;
			}
			if(j==3)
				{
				checkbox[i].checked=false;
				}
			} 
	}
	
	
	
	var twbfl=parmobject.twbfl;
	
	var twbfls=twbfl.split(",");
    var checkbox1=document.getElementsByName("tswb");
    //alert(checkbox1.length);
	for(var i=0;i<checkbox1.length;i++)
	{
		
		for(var j=0;j<twbfls.length;j++)
			{
			if(checkbox1[i].value.endsWith(twbfls[j]))
			{
				checkbox1[i].checked=true;
				break;
			}
			if(j==3)
			{
			checkbox1[i].checked=false;
			}
			} 
	}
}
function searchtotal()
{
	$("#idcard").val($("#idcard").val().trim());
	if($("#idcard").val()==''||$("#idcard").val()==null)
	{ 
	alert("֤���Ų�����Ϊ�գ�");
	return false;
	}else{
		if($("#idcard").val().length==15||$("#idcard").val().length==18)
		{
			
		}else{
			alert("֤���ű���Ϊ15λ��18λ��ĸ�����֣���ȷ�������ٽ��в�ѯ��");
			return false;
		}
	 }
	loadryxx($("#idcard").val());
	loadimage($("#idcard").val());
	$("#map7").html("")
	loadgrapshow();
	searchTZSInfo('04');
	searchTSWInfo('05');
	 
	//document.getElementById('loadquery').style.visibility='visible';
	 
}
function showcondition(){
        $("#myModal9").modal('show');
        $("#myModalLabel9").text("����ѡ��");
}

function loadryxx(idcard){
	$("#idcode").html("��");
	$("#sex01").html("��");
	$("#name").html("��");
	$("#phonenum").html("��");
	$("#address").html("��");
	$.ajax({
		type : "POST",
		url :basepath + "/RYXXQuery?idcard="+idcard,
		data :"",
		dataType : "json", 
		processData:false,
		jsonp:false,
		success : function(restext)
		{
			//idcode sex address "phonenum" addresss
			//{"xm":"����","zjhm":"362421198110055920","xb":"Ů��","csdz":"��","dhhm":"85575909,18922348149,85575909"}
			$("#idcode").html(restext.zjhm);
			$("#sex01").html(restext.xb);
			$("#name").html(restext.xm);
			$("#phonenum").html(restext.dhhm);
			$("#address").html(restext.csdz);
		}
	});
}
function loadimage(idcard)
{//
	document.getElementById("persontable").style.visibility="hidden";
	$("#imagedzda").attr("onclick","loaddzda('"+idcard+"')");
	$("#picInfo").attr("onclick","loaddzda('"+idcard+"')");
	$("#imgperson").attr("width","106");
	$("#imgperson").attr("height","124");
	$("#imgperson").attr("src",basepath+"/images/loading.gif");
	$.ajax({
		type : "POST",
		url :basepath + "/ImgQuery?idcard="+idcard,
		data :"",
		processData:false,
		jsonp:false,
		success : function(restext)
		{
			$("#imgperson").attr("width","106");
			$("#imgperson").attr("height","124");
			$("#imgperson").attr("src","data:image/jpg;base64,"+restext);
			document.getElementById("persontable").style.visibility="visible";
		}
	});
}
function searchInfo(types){ 
	countwb=0;
	var count=0;
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
	 requestUHB.hbaseTable=hbaseTable1;
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
		 requestUHB.hbaseTable=hbaseTable3;
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
            	
			  $.extend(param, {page : 1});
			  pagecontent(types);
		} 
	});
	
	//doData(types);
	
}
function guanxi(){
	if($("#idcard").val()==''||$("#idcard").val()==null)
	{ 
	alert("���֤������Ϊ�գ�");
	return false;
	}
	window.open(ocxurl+$("#idcard").val(),'��ϵͼչʾ','width='+(window.screen.availWidth-200)+',height='+(window.screen.availHeight-100)+',top=100,left=100,resizable=yes,status=yes,menubar=no,scrollbars=yes');
}

function loaddzda(idcard){
	
	window.open("http://10.235.36.2:8080/EzERecord/?userid="+userID+"&uuid="+idcard,'��ϵͼչʾ','width='+(window.screen.availWidth-10)+',height='+(window.screen.availHeight-30)+',top=0,left=0,resizable=yes,status=yes,menubar=no,scrollbars=yes');
}

function searchTSWInfo(types){
	// alert();
	var requestUHB=new Object();
	var parm=new Object();
	requestUHB.idcard=$("#idcard").val();
	requestUHB.wbjgsj=$("#wbjgsj").val();
	requestUHB.startdate=$("#startdate").val();
	requestUHB.enddate=$("#enddate").val();
	requestUHB.deap=$("#deapid").val();
	
	var checkbox=document.getElementsByName("tswb");
	var s="";
	for(var i=0;i<checkbox.length;i++)
	{
		if(checkbox[i].checked)
			s+=checkbox[i].value+",";
	}
	 if(s=="")
		 {
		 alert("����ѡ��һ������������");
		 return;
		 }
	$("#biaoqian5").html("<span class='glyphicon glyphicon-lock'></span>ͬ����");
	$("#biaoqia7").html("<span class='glyphicon glyphicon-lock'></span>��Ա��ϵͼ");
	objlist4=new Array();
	//alert(1);
	requestUHB.wbtype=s;
	$.ajax({
		type : "POST",
		url :basepath + "/TWBQuery",
		data :JSON.stringify(requestUHB),
		dataType : "json", 
		processData:false,
		jsonp:false,
		success : function(restext) {
			var results=restext.result;
			 
			var content="";
			var count=0;
			for(var o in restext.result)
			{   
				// ����    ֤����  �ù�����  �����   ��סʱ��    �˷�ʱ��   ������Ϣ   ";
				var results5=results[o];
					    content="";
						content+="<tr >";
					    	if(results5.idcard2==$("#idcard").val()){
					    		content+="<td>"+results5.name1+"</td>";
								content+="<td>"+results5.idcard1+"</td>";
								content+="<td>"+results5.pubcode+"</td>";
								content+="<td>"+dotime(results5.etime1)+"</td>";
								content+="<td>"+dotime(results5.ltime1)+"</td>";
								var desp="";
								var filed="";
								desp=results5.name2+"��"+results5.name1+"��ͬ����ͬʱ�������";
								filed=results5.name2+"��"+results5.pubcode+"������"+dotime(results5.etime2)+"���ߣ�<br/>";
								filed+=results5.name2+"��"+results5.pubcode+"������"+dotime(results5.ltime2)+"���ߣ�<br/>";
								filed+=results5.name1+"��"+results5.pubcode+"������"+dotime(results5.etime1)+"���ߣ�<br/>";
								filed+=results5.name1+"��"+results5.pubcode+"������"+dotime(results5.ltime1)+"���ߡ�<br/>";
								content+="<td><div class='btn-group'> <button class='btn btn-xs btn-default ' onclick='desp(\""+desp+"\",\""+filed+"\")'     target='blank'>ͬ��������</button></div></td>";
								content+="<td><div class='btn-group'> <button class='btn btn-xs btn-default ' onclick='loaddzda(\""+results5.idcard1+"\")'     target='blank'>���˵���</button></div></td>";
							}else{
								content+="<td>"+results5.name2+"</td>";
								content+="<td>"+results5.idcard2+"</td>";
								content+="<td>"+results5.pubcode+"</td>";
								content+="<td>"+dotime(results5.etime2)+"</td>";
								content+="<td>"+dotime(results5.ltime2)+"</td>";
								var desp="";
								var filed="";
								desp=results5.name1+"��"+results5.name2+"��ͬ����ͬʱ�������";
								filed=results5.name1+"��"+results5.pubcode+"������"+dotime(results5.etime1)+"���ߣ�<br/>";
								filed+=results5.name1+"��"+results5.pubcode+"������"+dotime(results5.ltime1)+"���ߣ�<br/>";
								filed+=results5.name2+"��"+results5.pubcode+"������"+dotime(results5.etime2)+"���ߣ�<br/>";
								filed+=results5.name2+"��"+results5.pubcode+"������"+dotime(results5.ltime2)+"���ߡ�<br/>";
								content+="<td><div class='btn-group'> <button class='btn btn-xs btn-default ' onclick='desp(\""+desp+"\",\""+filed+"\")'     target='blank'>ͬ��������</button></div></td>";
								content+="<td><div class='btn-group'> <button class='btn btn-xs btn-default ' onclick='loaddzda(\""+results5.idcard2+"\")'    target='blank'>���˵���</button></div></td>";
								}
					    	content+="</tr>";
					    	objlist4[count]=content;
							count++;
					     
			 }
			if(objlist4.length>0)
			{
				if(types=='05')
				{
					$("#biaoqian5").html("<span class='glyphicon glyphicon-lock'></span>ͬ����<span id='biaoqian5' class='label label-warning'>"+objlist4.length+"</span>");
					$("#biaoqia7").html("<span class='glyphicon glyphicon-lock'></span>��Ա��ϵͼ<span id='biaoqia7' class='label label-danger'>NEW</span>");
				}
			}
			$.extend(param, {page : 1});
			pagecontent(types);
		}
	});
}
 

function searchTZSInfo(types){
	// alert();
	var requestUHB=new Object();
	var parm=new Object();
	requestUHB.idcard=$("#idcard").val();
	requestUHB.startdate=$("#startdate").val();
	requestUHB.enddate=$("#enddate").val();
	requestUHB.deap=$("#deapid").val();
	//tlgtfj  tlgttftzf tlgtzf tlgttf
	var checkbox=document.getElementsByName("tssw");
	var s="";
	for(var i=0;i<checkbox.length;i++)
	{
		if(checkbox[i].checked)
			s+=checkbox[i].value+",";
	}
	 if(s=="")
		 {
		 alert("����ѡ��һ��ס��������");
		 return;
		 }
	$("#biaoqian4").html("<span class='glyphicon glyphicon-lock'></span>ͬס��");
	$("#biaoqia7").html("<span class='glyphicon glyphicon-lock'></span>��Ա��ϵͼ");
	objlist3=new Array();
	//alert(1);
	requestUHB.rrtype=s;
	$.ajax({
		type : "POST",
		url :basepath + "/TLGQuery",
		data :JSON.stringify(requestUHB),
		dataType : "json", 
		processData:false,
		jsonp:false,
		success : function(restext) {
			var results=restext.result;
			//alert(JSON.stringify(results));
			var content="";
			var count=0;
			for(var o in restext.result)
			{   
				// ����    ֤����  �ù�����  �����   ��סʱ��    �˷�ʱ��   ������Ϣ   ";
				var results5=results[o];
				 
					    content="";
					    content+="<tr >";
					    if(results5.idcard1!=null&&results5.idcard1!="")
					    {
					    	
					    	if(results5.idcard2==$("#idcard").val()){
					    		content+="<td>"+results5.name1+"</td>";
								content+="<td>"+results5.idcard1+"</td>";
								content+="<td>"+results5.nohotel+"</td>";
								content+="<td>"+results5.noroom1+"</td>";
								content+="<td>"+dotime(results5.ltime1)+"</td>";
								content+="<td>"+dotime(results5.etime1)+"</td>";
								var desp="";
								var filed="";
								desp=results5.name2+"��"+results5.name1+"��ͬһ�ù�ס��";
								filed=results5.name2+"��"+results5.nohotel+"�ù�"+results5.noroom2+"����"+dotime(results5.ltime2)+"��ס��<br/>";
								filed+=results5.name2+"��"+results5.nohotel+"�ù�"+results5.noroom2+"����"+dotime(results5.etime2)+"�˷���<br/>";
								filed+=results5.name1+"��"+results5.nohotel+"�ù�"+results5.noroom1+"����"+dotime(results5.ltime1)+"��ס��<br/>";
								filed+=results5.name1+"��"+results5.nohotel+"�ù�"+results5.noroom1+"����"+dotime(results5.etime1)+"�˷���<br/>";
								content+="<td><div class='btn-group'> <button class='btn btn-xs btn-default ' onclick='desp(\""+desp+"\",\""+filed+"\")'     target='blank'>ͬס������</button></div></td>";
								content+="<td><div class='btn-group'> <button class='btn btn-xs btn-default ' onclick='loaddzda(\""+results5.idcard1+"\")'     target='blank'>���˵���</button></div></td>";
								content+="</tr>";
								
					    	}else{
					    		content+="<td>"+results5.name2+"</td>";
								content+="<td>"+results5.idcard2+"</td>";
								content+="<td>"+results5.nohotel+"</td>";
								content+="<td>"+results5.noroom2+"</td>";
								content+="<td>"+dotime(results5.ltime2)+"</td>";
								content+="<td>"+dotime(results5.etime2)+"</td>";
								var desp="";
								var filed="";
								desp=results5.name1+"��"+results5.name2+"��ͬһ�ù�ס��";
								filed=results5.name1+"��"+results5.nohotel+"�ù�"+results5.noroom1+"����"+dotime(results5.ltime1)+"��ס��<br/>";
								filed+=results5.name1+"��"+results5.nohotel+"�ù�"+results5.noroom1+"����"+dotime(results5.etime1)+"�˷���<br/>";
								filed+=results5.name2+"��"+results5.nohotel+"�ù�"+results5.noroom2+"����"+dotime(results5.ltime2)+"��ס��<br/>";
								filed+=results5.name2+"��"+results5.nohotel+"�ù�"+results5.noroom2+"����"+dotime(results5.etime2)+"�˷���<br/>";
							
								content+="<td><div class='btn-group'> <button class='btn btn-xs btn-default ' onclick='desp(\""+desp+"\",\""+filed+"\")'     target='blank'>ͬס������</button></div></td>";
								content+="<td><div class='btn-group'> <button class='btn btn-xs btn-default ' onclick='loaddzda(\""+results5.idcard2+"\")'    target='blank'>���˵���</button></div></td>";
								content+="</tr>";
								 
					    	}
					    	objlist3[count]=content;
							count++;
					    }
					    content="";
					    
			 }
			if(objlist3.length>0)
			{
				if(types=='04')
				{
					$("#biaoqian4").html("<span class='glyphicon glyphicon-lock'></span>ͬס��<span id='biaoqian4' class='label label-warning'>"+objlist3.length+"</span>");
					$("#biaoqia7").html("<span class='glyphicon glyphicon-lock'></span>��Ա��ϵͼ<span id='biaoqia7' class='label label-danger'>NEW</span>");
				}
			}
			$.extend(param, {page : 1});
			pagecontent(types);
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
	requestUHB.hbaseTable=hbaseTable5;
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
    var ppstrs1=ppstr+'000000#';
    requestUHB.params.fuzzyRow=$("#idcard").val()+ppstrs1+types;
       contents(requestUHB,types);//00
     $.extend(param, {page : 1});
}
function searchTZSInfotemp(types){
	 objlist3=new Array();
     ispass=0;
	counts=0;
	countwb=0;
	var requestUHB=new Object();
	var parm=new Object();
	requestUHB.hbaseInstance=HBase;
	requestUHB.starttime=$("#startdate").val();
	requestUHB.endtime=$("#enddate").val();
	requestUHB.hbaseTable=hbaseTable4;
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
    var ppstrs1=ppstr+'000000#';
    requestUHB.params.fuzzyRow=$("#idcard").val()+ppstrs1+types;
    contentsTZS(requestUHB,types);//00
    $.extend(param, {page : 1});
}


function searchTWFInfotemp(types){
	//document.getElementById('loadquery').style.visibility='visible';
	 objlist6=new Array();
    ispass=0;
	counts=0;
	countwb=0;
	var requestUHB=new Object();
	var parm=new Object();
	requestUHB.hbaseInstance=HBase;
	requestUHB.hbaseTable=hbaseTable6;
	requestUHB.indexName=indexName;
	requestUHB.qasType=qtype;
	requestUHB.params=new Object();
	requestUHB.params.rowkey="";
	requestUHB.params.isBatch='false';
	requestUHB.params.isFuzzy='true';
	requestUHB.params.pageSize=pageSize;
    requestUHB.params.returnType='rowkey';
	requestUHB.params.maxVersions='1';
	$("#biaoqian6").html("<span class='glyphicon glyphicon-ban-circle'></span>ͬ��Υ��");
    var ppstrs1='#?';
    requestUHB.params.fuzzyRow=$("#idcard").val()+ppstrs1;
    contentsTWF(requestUHB,types);//00
    $.extend(param, {page : 1});
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
            var  counts=0;
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
            var counts=0;
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



function contentsTWF(requestOb,types){
	  
	var content="";
	$.ajax({
		type : "POST",
		url :basepath + "/ProxTWZCRequest",
		data :JSON.stringify(requestOb),
		dataType : "json", 
		processData:false,
		jsonp:false,
		success : function(restext) {
			//alert(JSON.stringify(restext.result)); 
		var results2=restext.result;
           var nextRowkey="";
//          //alert(results2.length);
         var count=0;
           
           
         
		for(var o in restext.result)
           	{   
			   //alert(JSON.stringify(results2[o]));
			   // alert(o);
               var results3=results2[o];
               //alert(JSON.stringify(results3));
               for(var oo in results3)
            	   {
            	 //count++;
            	 
            	   var results4=results3[oo];
            	   
            	   var countstemp=0;
            	  // alert(oo);
            	   var cols=results3[oo].length;
            	  
            	   content="";
            	     for(var ooo in results4){
            	    	 var results5=results4[ooo].value;
            	    	 if(results5.JSZH==$("#idcard").val()){
            	    		 content+="<tr style='color:red'>";
            	    		 
            	    	 }else{
            	    		 content+="<tr >";
            	    	  }
            	    	 
            	         if(countstemp==0)
            	        	 {
            	        	
                      	     content+="<td rowspan='"+cols+"'>"+oo+"</td>";
            	        	 }
            	    	   countstemp++;
            	    	 
            	    	  //alert(results5.HPHM);
            	    	 
            	    	 // ���ƺ�  ����  ֤����  Υ�µص�   Υ��ʱ��  �������  ����ʱ��  Υ�´���   Υ������  ";
            	    	  
         				  
//         			     content+="<td>"+results2[o].HPHM+"</td>";
//         			// content+="<td>"+results2[o].HPZL-MC+"</td>";
//         			     content+="<td>"+results2[o].HPZL_MC+"</td>";
//         			     content+="<td>"+results2[o].WFDZ+"</td>";
//         			     content+="<td>"+dotime(results2[o].WFSJ)+"</td>";
//         			     content+="<td>"+results2[o].CLJGMC+"</td>";
//         			     content+="<td>"+dotime(results2[o].CLSJ)+"</td>";
//         			     content+="<td>"+results2[o].count+"</td>";
         			     
         			      content+="<td>"+results5.DSR+"</td>";
            	    	  content+="<td>"+results5.JSZH+"</td>";
            	    	  content+="<td>"+results5.WFDZ+"</td>";
            	    	  content+="<td>"+dotime(results5.WFSJ)+"</td>";
            	    	  content+="<td>"+results5.CLJGMC+"</td>";
            	    	  content+="<td>"+dotime(results5.CLSJ)+"</td>";//HPZL_MC
            	    	  content+="<td>"+results5.count+"</td>";
            	    	  //alert(results5.temp);
            	    	   content+="<td><div class='btn-group'> <button class='btn  btn-xs btn-default'  onclick='sameWF(\""+results5.DSR+"\",\""+results5.HPHM+"\",\""+results5.HPZL_MC+"\","+JSON.stringify(results5.temp)+")'>Υ������</button></div></td>";
            	    	  content+="</tr>";
            	     }
            	     objlist6[count]=content;
            	     count++;
            	     content="";
            	    
            	   }
			}
//          					
//          					
    //    alert(restext.totalcount);
			if(parseInt(restext.totalcount)>0)
    	    	{
			if(types=='06'){
	    		  $("#biaoqian6").html("<span class='glyphicon glyphicon-ban-circle'></span>ͬ��Υ��<span id='biaoqian1' class='label label-warning'>"+(parseInt(restext.totalcount))+"</span>");
			}}
			   $.extend(param, {page : 1});
			  // alert(types);
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
	var sjjg=$("#wbjgsj").val();
	var reg=/^\d+$/;
	if(!reg.test(sjjg)){
		$("#wbjgsj").val("20");
		
	}else{
		if(sjjg<0)
			{
			
			$("#wbjgsj").val("0");
			}else if(sjjg>=200){
				$("#wbjgsj").val("200");
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
	
	 document.getElementById('top2').style.display='none';
	 
	
}

function xianshi(){
 
	document.getElementById('top2').style.display='block';
	 
	 
	
}
function desp01(desp,filed){
	//$("#myModal").modal('hide'); 
    $("#myModal55").modal('show');
    $("#myModalLabel55").text(desp);
    $("#desp55").html(filed);
    
  /*  $('#myModal55').on('hidden.bs.modal', function (e) {
    	$("#myModal").modal('show'); 
    	});*/


}
function chosef(desp)
{  
	 
	if(desp=="�ؼ�·������")
		{
		    $("#idcartlabel").html("֤����(�������֤�����á�,������)"); 
		}else{
			$("#idcartlabel").html("֤����"); 
		}
	$("#fielddesc").html(desp);
}
function sameWF(XM,HPHM,HPZL_MC,temp){
	//alert(temp);
	//var temp=eval('(' + temp1 + ')');
	//alert(JSON.stringify(temp));
	   content='<tr><td>���</td><td>Υ�µص�</td><td>Υ��ʱ��</td><td>�������</td><td>����ʱ��</td><td>Υ��������</td><td>������</td><td>Υ����Ϊ</td></tr>';
		var countsxh=1;
	   for ( var oo in temp) 
	   {
		    // alert(oo);
		    content+="<tr ><td>"+countsxh+"</td>";
			content += "<td>"+temp[oo].WFDZ+"</td>";
			content += " <td>"+dotime(temp[oo].WFSJ)+"</td>";
			content += "<td>"+temp[oo].CLJGMC+"</td>";
			content += " <td>"+dotime(temp[oo].CLSJ)+"</td>";
			content += "<td>"+temp[oo].WFJFS+"</td>";
			content += "<td >"+temp[oo].FKJE+"</td>";
			content+="<td><div class='btn-group'> <button class='btn  btn-xs btn-default'  onclick='desp01(\"Υ����Ϊ\",\""+temp[oo].WFXW_MC+"\")'>Υ����Ϊ</button></div></td>";
			content += "</tr>";
			countsxh++;
		}
	 	$("#pagesamecart").html("");
		$("#pagesamecart").html(content);
	    $("#myModal").modal('show');
    //���ʻ���ƺż�A102С�ͳ���Υ�¼�¼
    	$("#myModalLabel").text(XM+'��ʻ���ƺ�'+HPHM+HPZL_MC+'��Υ�¼�¼');
}
