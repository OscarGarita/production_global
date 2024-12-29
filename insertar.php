<?php
// Incluye el archivo de conexión
include 'conexion.php';

// Verifica si los datos fueron enviados a través de POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Obtén los datos enviados desde JavaScript
    $pid = $_POST['pid'];
    $type = $_POST['type'];
    $percentage = $_POST['percentage'];

    // Prepara la consulta SQL
    $sql = "INSERT INTO cases (pid, type, percentage) VALUES ('$pid', '$type', '$percentage')";

    // Ejecuta la consulta
    if (mysqli_query($conexion, $sql)) {
        echo "Nuevo registro creado exitosamente";
    } else {
        echo "Error: " . $sql . "<br>" . mysqli_error($conexion);
    }

    // Cierra la conexión
    mysqli_close($conexion);
} else {
    echo "Método de solicitud no permitida";
}
?>
