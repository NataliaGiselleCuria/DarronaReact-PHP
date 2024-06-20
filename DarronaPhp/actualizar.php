<?php 	
error_reporting(E_ALL);

require 'database.php';

$db = new DataBase();
$con = $db->conectar();

$dominioPermitido = "http://localhost:5173";
header("Access-Control-Allow-Origin: $dominioPermitido");
header("Access-Control-Allow-Headers: content-type");
header("Access-Control-Allow-Methods: OPTIONS,GET,PUT,POST,DELETE");



if (isset($_GET['action'])) {
    $action = $_GET['action'];
    switch ($action) {
        case 'cred':
            
            $input = json_decode(file_get_contents('php://input'), true);

            if (isset($input['usuario']) && isset($input['clave'])) {
                $nuevoUsuario = $input['usuario'];
                $nuevaClave = $input['clave'];

                $sql = "UPDATE `logcred` SET `usuario`='$nuevoUsuario', `clave`= sha2('$nuevaClave',256) WHERE `id`=1";

                if ($con->query($sql)) {
                    echo json_encode(['success' => true]);
                } else {
                    echo json_encode(['success' => false, 'error']);
                }
            } else {
                echo json_encode(['success' => false, 'error' => 'Invalid input']);
            }

            break;
        case 'amounts':
            $input = json_decode(file_get_contents('php://input'), true);

                if (isset($input['minorista']) && isset($input['mayorista']) && isset($input['distribuidor']) ) {
                    $nuevoMensajeMinorista = $input['minorista'] ?? $currentValues['minorista'];
                    $nuevoMensajeMayorista = $input['mayorista'] ?? $currentValues['mayorista'];
                    $nuevoMensajeDistribuidor = $input['distribuidor'] ?? $currentValues['distribuidor'];
                
                    $sql2 = "UPDATE `montominimo` SET
                                `mensaje` = CASE
                                WHEN `categoría` = 'minorista' THEN :minorista
                                WHEN `categoría` = 'mayorista' THEN :mayorista
                                WHEN `categoría` = 'distribuidor' THEN :distribuidor
                                ELSE mensaje
                                END
                            ";
                
                    $stmt = $con->prepare($sql2);
                    $stmt->bindParam(':minorista', $nuevoMensajeMinorista);
                    $stmt->bindParam(':mayorista', $nuevoMensajeMayorista);
                    $stmt->bindParam(':distribuidor', $nuevoMensajeDistribuidor);
                
                    // Ejecutar la consulta de actualización
                    if ($stmt->execute()) {
                        echo json_encode(['success' => true]);
                    } else {
                        echo json_encode(['success' => false, 'error' => $stmt->errorInfo()]);
                    }
                } else {
                    echo json_encode(['success' => false, 'error' => 'Invalid input']);
                }
                break;

            case 'shipments':
                $input = json_decode(file_get_contents('php://input'), true);

                if (isset($_GET['action']) && $_GET['action'] === 'shipments') {
                    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
                        try {
                            // Iniciar una transacción
                            $con->beginTransaction();

                            // Limpiar la tabla de envíos actual
                            $con->exec("DELETE FROM entregas");

                            // Preparar la consulta de inserción
                            $stmt = $con->prepare("INSERT INTO entregas (lugar, dia) VALUES (:lugar, :dia)");

                            // Insertar cada envío
                            foreach ($input as $shipment) {
                                $stmt->bindParam(':lugar', $shipment['lugar']);
                                $stmt->bindParam(':dia', $shipment['dia']);
                                $stmt->execute();
                            }

                            // Confirmar la transacción
                            $con->commit();
                            echo json_encode(['success' => true]);
                        } catch (Exception $e) {
                            // Revertir la transacción en caso de error
                            $con->rollBack();
                            echo json_encode(['success' => false, 'error' => $e->getMessage()]);
                        }
                    }
                } else {
                    echo json_encode(['success' => false, 'error' => 'Invalid action']);
                }

    }
    
}

?>