<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>ueditor</title>
<script type="text/javascript" src="./ueditor.all.js"></script>
<script type="text/javascript" src="./ueditor.config.js"></script>
</head>
<body>
	<textarea name="test" id="myEditor">test</textarea>
	<script type="text/javascript">
	 var editor = new UE.ui.Editor();
	    UE.getEditor('myEditor')
	</script>
</body>
</html>