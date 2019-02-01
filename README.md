<!DOCTYPE html>
<html lang="en">
<head>
<meta charset = "UTF-8">
<title> PECCI<3 </title>
<style>
	*{margin: 0; padding: 0;}
	#galleryZone {text-align: center;}
	#galleryZone input[type="image"]{margin:0 8px;}
	
</style>
<script>
	var num = 1;
	///
	function gallery(btn_num){
		if(btn_num){
			if(num >= 4){
				alert("end");
				return;
			}
			num++;
			console.log(num);
		}else{
			if(num <= 1){
			alert("end");
				return;
			}
			num--;
			console.log(num);
		}
		
		var imgTag = document.getElementById("photo");
		imgTag.setAttribute("src","pecci/pic_" + num + ".jpg");
	}
	///
	var i = 0;
	var color = ["red", "orange", "yellow", "green"];
	function colorBg(){
		i++;
		if(i >= color.length){
			i = 0;
		}
		
		var bodyTag = document.getElementsByTagName("body")[0];
		bodyTag.style.backgroundColor = color[i];
		
	}
</script>
</head>
<body>
	<div id="galleryZone">
		<h1>PECCI</h1>
		<br>
		<p><img src="pecci/pic_1.jpg" id="photo" alt=""></p>
		<br>
		
		<p id="p_text">PECCI</p>
		
		<p>
			<button onclick="gallery(0)">Prev</button>
			<button onclick="gallery(1)">Next</button>
		</p>
		<br>
		<p><img src="pecci/pic_5.jpg" alt = ""></P>
		<br>
		<p><button onclick="colorBg()">Change Color</p>
	</div>
</body>
</html>
