<?php
    $table_name=isset($_POST['table_name'])?htmlspecialchars($_POST['table_name']):'';
    echo json_encode($table_name);
?>