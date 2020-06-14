<?php
	$table_name=isset($_POST['table_name'])?htmlspecialchars($_POST['table_name']):'';
	require("./sqlFunctions.php");
	$conn=mConnectSql();
	if(!$conn){
		echo json_encode("连接数据库失败");
		exit;
	}
	$data=mGetAll($table_name);
	if(!$data){
		echo json_encode('查询表失败');
		exit;
	}
	echo json_encode($data);
?>