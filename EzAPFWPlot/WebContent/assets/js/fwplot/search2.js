	function searchservice(){
		$('#searchinput').bind('keypress',function(event){
			if(event.keyCode == "13")    
			{    
				if($("#searchinput").val()&&$("#searchinput").val()!="")
				window.location.href="servicelist.html?condition="+$("#searchinput").val();
			}
		});
	}
	 
	