<?php
include 'conexion.php';

// Prepara la consulta SQL
$sql = "DELETE FROM cases ";

// Ejecuta la consulta
if (mysqli_query($conexion, $sql)) {
    echo "Tabla limpia";
} else {
    echo "Error: " . $sql . "<br>" . mysqli_error($conexion);
}

// Cierra la conexión
mysqli_close($conexion);



?>