<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

ini_set('display_errors', '1'); 	
ini_set('display_startup_errors', '1'); 	
error_reporting(E_ALL);

require 'database.php';

$db = new DataBase();
$con = $db->conectar();

$sql = $con->prepare("SELECT * FROM productos");
$sql->execute();
$resultado = $sql->fetchAll(PDO::FETCH_ASSOC);

//$sql1 = $con->prepare("SELECT * FROM information_schema.columns WHERE table_schema = 'if0_35619953_darrona' AND table_name = 'productos'"); 
$sql1 = $con->prepare("SELECT * FROM information_schema.columns WHERE table_schema = 'darrona' AND table_name = 'productos'");
$sql1->execute();
$cabecera = $sql1->fetchAll(PDO::FETCH_ASSOC);

$sql2 = $con->prepare("SELECT distinct CATEGORÍA FROM productos");
$sql2->execute();
$categorias = $sql2->fetchAll(PDO::FETCH_ASSOC);

$sql3 = $con->prepare("SELECT * FROM login");
$sql3->execute();
$log = $sql3->fetchAll(PDO::FETCH_ASSOC);

$sql6 = $con->prepare("SELECT * FROM montominimo");
$sql6->execute();
$monto = $sql6->fetchAll(PDO::FETCH_ASSOC);


$categoria = null;
echo json_encode($resultado);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Darrona2</title>
    <link rel="stylesheet" href="../DarronaReact/dist/assets/index-DONsvf3q.css">
</head>
<body>
    <div id="root"></div>
    <script>
        window.initialData = <?php echo json_encode($resultado); ?>;
        console.log(window.initialData);

    </script>
    <script src="../DarronaReact/dist/assets/index-DONsvf3q.js"></script>
</body>
</html>
