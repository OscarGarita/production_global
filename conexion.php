<?php
$servername = "srv1625.hstgr.io";
$username = "u114387937_oscarg";
$password = "bB1|S;S>";
$database = "u114387937_prod_01db";

$conexion = new mysqli($servername, $username, $password, $database);

//verifica conexion

if ($conexion->connect_error) {
    die("Conexion Fallida: " . $conexion->connect_error);
}
//conexion exitosa

?>