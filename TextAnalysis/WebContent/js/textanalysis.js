var basepath = getBaseURL();
function sendpost(){
   var parm=new Object();
   $("#resultcontent").html("<br><br><br><br>");
   if($("#textcontent").val()==null||$("#textcontent").val()=="")
	   {
	   alert("�������ݲ�����Ϊ�գ�");
	   return;
	   }
   parm.content=$("#textcontent").val();

   
	   
	   
	   
   $.ajax({
		type : "POST",
		url :basepath + "/TextAnalysisQuery",
		data :JSON.stringify(parm),
		dataType : "json", 
		processData:false,
		jsonp:false,
		success : function(restext)
		{
			
			 //alert(JSON.stringify(restext));
			 $("#resultcontent").html(restext.result);
			//idcode sex address "phonenum" addresss
			//{"xm":"����","zjhm":"362421198110055920","xb":"Ů��","csdz":"��","dhhm":"85575909,18922348149,85575909"}
		/*	$("#idcode").html(restext.zjhm);
			$("#sex01").html(restext.xb);
			$("#name").html(restext.xm);
			$("#phonenum").html(restext.dhhm);
			$("#address").html(restext.csdz);*/
		}
	});
}