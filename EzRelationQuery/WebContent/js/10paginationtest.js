	    var obj=new Object();
	    var param=new Object();
	    var pagesize=10;
	    $.extend(param, {page : 1});
		function getPagerContent(page,pagenum,types){
		//	alert(types);
			if(types=='01')
			{
				obj=$("#pager1");
			}
			else if(types=='02'){
				obj=$("#pager2");
			}
			else if(types=='03'){
				obj=$("#pager3");
			}
			else if(types=='04'){
				obj=$("#pager4");
			}
			else if(types=='05'){
				obj=$("#pager5");
			}
			 else if(types=='06'){
				obj=$("#pager6");
			}else{}
			var pcontent = "";
 
			if(page>1)
				{
				pcontent += "<li><a href=\"javascript:void(0)\">&lt</a></li>";
				}else{
					pcontent += "<li class='disabled'><a href=\"javascript:void(0)\">&lt</a></li>";
				}
			var start=Math.floor((page/10))*10+1;
			//alert(page);
			var end=Math.floor(page/10)*10+10;
			if((page%10)>5||page%10==0)
			{
				start=Math.floor((page/10))*10+5;
				if(start>page)
					{start=page;
					end=page+9;
					}else{
						end=Math.floor((page/10))*10+14;
					}
			}else{
				
				if(start-4>=1)
					{
					start-=4;
					end-=4;
					}
			}
			
			for(var i=start;i<=end;i++)
				{
				if(i<=pagenum){ 
				if(i==page)
				{
					pcontent += "<li class=\"active\"><a href=\"javascript:void(0)\">"+i+"</a></li>";
				}else{
					pcontent += "<li><a href=\"javascript:void(0)\">"+i+"</a></li>";
				}
				}else{
					pcontent += "<li  class='disabled'> <a href=\"javascript:void(0)\">"+i+"</a></li>";
				}
				}
			
				
			if(page<pagenum){
				
				pcontent += "<li ><a href=\"javascript:void(0)\">&gt</a></li>";
			}else{
				
				pcontent += "<li class=\"disabled\"><a href=\"javascript:void(0)\">&gt</a></li>";
			}
		    // alert(pcontent);
			$(obj).find("ul").html(pcontent);
		 initEvent(types);
			
		}
		
		
		
		
		
		function initEvent(types){
			$(obj).find("ul li").each(function(index){
				switch(index){
				case 0:
					$(this).bind("click", function() {
						if($(this).hasClass("disabled")){
							return;
						}
						var curpage = parseInt($(obj).find("ul li.active a").text());
						--curpage;
						if (curpage <= 0)
						{
							curpage = 1;
						}
						$.extend(param, {page : curpage});
						pagecontent(types);
						 
					});
					break;
				case 11:
					$(this).bind("click", function() {
						if($(this).hasClass("disabled")){
							return;
						}
						var curpage = parseInt($(obj).find("ul li.active a").text());
						++curpage;
						$.extend(param, {page : curpage});
						pagecontent(types);
						 
					});
					break;
				default:
					$(this).bind("click", function() {
						if($(this).hasClass("disabled")){
							return;
						}
						var curpage = parseInt($(this).find("a").text());
	 
						$.extend(param, {page : curpage});
						
						pagecontent(types);
						 
					});
					break;
				}
			});
		}
 
		function pagecontent(types) {
			 
//			$("#mapli5").removeClass();
//			$("#mapli4").removeClass();
//			$("#mapli3").removeClass();
//			$("#mapli2").removeClass();
//			$("#mapli1").removeClass();
//			
//			$("#mapline1").removeClass("active");
//			$("#mapline2").removeClass("active");
//			$("#mapline3").removeClass("active");
//			$("#mapline4").removeClass("active");
//			$("#mapline5").removeClass("active");
//			if(types=='01')
//			{
//				$("#mapli1").addClass("active");
//				$("#mapline1").addClass("active");
//			}
//			else if(types=='02'){
//				$("#mapline2").addClass("active");
//				$("#mapli2").addClass("active");
//			}
//			else if(types=='03'){
//				$("#mapline3").addClass("active");
//				$("#mapli3").addClass("active");
//			}
//			else if(types=='04'){
//				$("#mapline4").addClass("active");
//				$("#mapli4").addClass("active");
//
//			}else if(types=='05'){
//				$("#mapline5").addClass("active");
//				$("#mapli5").addClass("active");
//
//			}
			var totalcounts=0;
			 
			if(types=='01')
			{
				totalcounts=objlist.length;
			 
			}
		else if(types=='02'){
			totalcounts=objlist1.length; 
		}
		else if(types=='03'){
			totalcounts=objlist2.length;
		}
		else if(types=='04'){
			totalcounts=objlist3.length;
			
		}else if(types=='05'){
			totalcounts=objlist4.length;
		}else if(types=='06'){
			totalcounts=objlist6.length;
			
		}
			//alert(totalcounts);
			 var pagenum=totalcounts%pagesize==0?0:1;
			pagenum=Math.floor(totalcounts/pagesize)+pagenum;
			// alert(pagenum);
			getPagerContent(param.page,pagenum,types);
			var content="";
			 if(types=='01')
				{                                                                                           
				 content="<table class='table table-bordered table-striped' border='1'> <thead> <tr>  <th width='10%'>����</th><th align='center' width='15%'>֤����</th> <th width='8%'>�Ա�</th><th width='25%'>��������</th> <th width='20%'>����ʱ��</th>   <th width='15%'> ��������</th> </tr> </thead>";
				}
			else if(types=='02'){
				content="<table class='table table-bordered table-striped' border='1'> <thead> <tr>  <th width='10%'>����</th><th align='center' width='15%'>֤����</th> <th width='6%'>�Ա�</th>   <th width='25%'>��������</th><th width='20%'>����ʱ��</th><th width='15%'> ����ԭ��</th> </tr> </thead>";
				                                                                  //������֤���ţ��Ա𣬼������ƣ�ͬ��ʱ�䣬����ԭ��
			}
			else if(types=='03'){
				content="<table class='table table-bordered table-striped' border='1'> <thead> <tr>  <th width='10%'>����</th><th align='center' width='15%'>֤����</th> <th width='10%'>�Ա�</th>   <th width='20%'>��ͥסַ</th> <th width='20%'> ��ϵ����</th> </tr> </thead>";
				
			}
			else if(types=='04'){
				content="<table class='table table-bordered table-striped' border='1'> <thead> <tr>  <th width='10%'>����</th><th align='center' width='15%'>֤����</th> <th width='8%'>�Ա�</th><th width='20%'>�ù�����</th>  <th width='8%'>�����</th><th width='12%'>��סʱ��</th> <th width='12%'>�˷�ʱ��</th><th width='10%'>����</th><th width='15%'>ͬס����</th> </tr> </thead>";
				
			}else if(types=='05'){
				
				
				content="<table class='table table-bordered table-striped' border='1'> <thead> <tr>  <th width='10%'>����</th><th align='center' width='15%'>֤����</th>   <th width='20%'>����ʱ��</th> <th width='8%'>ͬ��������</th>  <th width='15%'> ��������</th> </tr> </thead>";
			}else if(types=='06'){

				content="<table class='table table-bordered table-striped' border='1'> <thead> <tr>  <th width='10%'>��ʻ֤��</th><th align='center' width='8%'>������</th>   <th width='10%'>���ƺ�</th><th width='15%'>������������</th> <th width='12%'>Υ�µص�</th> <th width='10%'>Υ��ʱ��</th><th width='13%'>�������</th><th width='13%'>����ʱ��</th><th width='15%'>����</th>   </tr> </thead>";
			}
			//JSZH   DSR  HPHM HPZL-MC   WFDZ WFSJ    CLJGMC CLSJ
			 var start = (param.page- 1) *pagesize;
				var end = param.page*pagesize-1;
			 
			 if(types=='01')
				{
				 if(objlist.length>0){
					  for(var ii=start;ii<=(end>(objlist.length-1)?(objlist.length-1):end);ii++){
				    	content+=objlist[ii];
				     }}				 
				}
			else if(types=='02'){
				 if(objlist1.length>0){
					  for(var ii=start;ii<=(end>(objlist1.length-1)?(objlist1.length-1):end);ii++){
				    	content+=objlist1[ii];
				     }}
			}
			else if(types=='03'){
				 if(objlist2.length>0){
					  for(var ii=start;ii<=(end>(objlist2.length-1)?(objlist2.length-1):end);ii++){
				    	content+=objlist2[ii];
				     }}
			}
			else if(types=='04'){
				 if(objlist3.length>0){
					  for(var ii=start;ii<=(end>(objlist3.length-1)?(objlist3.length-1):end);ii++){
				    	content+=objlist3[ii];
				     }}
				
			}else if(types=='05'){
				 if(objlist4.length>0){
					  for(var ii=start;ii<=(end>(objlist4.length-1)?(objlist4.length-1):end);ii++){
				    	content+=objlist4[ii];
				     }}
			}else if(types=='06'){
				 if(objlist6.length>0){
					  for(var ii=start;ii<=(end>(objlist6.length-1)?(objlist6.length-1):end);ii++){
				    	content+=objlist6[ii];
				     }}
			}
				
				//alert(end);
				//alert(objlist.length);
				
			  //alert(content);
			   
		    content+="<tbody style='border: none'>";
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
			
		}else if(types=='05'){
			$("#map5").html("");
			$("#map5").html(content);
			//document.getElementById('loadquery').style.visibility='hidden';
			
		}else if(types=='06'){
			$("#map6").html("");
			$("#map6").html(content);
			document.getElementById('loadquery').style.visibility='hidden';
			
		}
	 
	 
		else{
			$("#map1").html("");
			$("#map1").html(content);
			
		}
			/**/
		}
		
		
	
