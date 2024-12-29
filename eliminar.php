<?php
include 'conexion.php';

if (!empty($_GET["pid"])) {
    $pid = $_GET["pid"];

    $sql = $conexion->query("delete from cases where pid = $pid");
    if ($sql == 1) {
    } else {
    }
}
