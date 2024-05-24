<?php
$dominioPermitido = "http://localhost:5173";
header("Access-Control-Allow-Origin: $dominioPermitido");
header("Access-Control-Allow-Headers: content-type");
header("Access-Control-Allow-Methods: OPTIONS,GET,PUT,POST,DELETE");

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

// $sql2 = $con->prepare("SELECT distinct CATEGORÍA FROM productos");
// $sql2->execute();
// $categorias = $sql2->fetchAll(PDO::FETCH_ASSOC);

        // $sql3 = $con->prepare("SELECT * FROM login");
        // $sql3->execute();
        // $log = $sql3->fetchAll(PDO::FETCH_ASSOC);

        // $sql6 = $con->prepare("SELECT * FROM montominimo");
        // $sql6->execute();
        // $monto = $sql6->fetchAll(PDO::FETCH_ASSOC);


// $categoria = null;
echo json_encode($resultado);
?>

