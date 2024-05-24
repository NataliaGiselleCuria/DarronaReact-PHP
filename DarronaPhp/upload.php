<?php 		
error_reporting(E_ALL);
ini_set('display_errors', 1);

require 'database.php';

$db = new DataBase();
$con = $db->conectar();

$directorioDescarga = "descargas/";
$uploadOk = 1;
$targetFile = $directorioDescarga . basename($_FILES["fileInput"]["name"]);
$fileType = strtolower(pathinfo($targetFile, PATHINFO_EXTENSION));


    if ($fileType != "csv") {
        echo "Solo pueden subirse archivos en formato CSV.";
        $uploadOk = 0;
    } else{
        if ($uploadOk == 0) {
            echo '<i class="fa-solid fa-xmark"></i> Fallo en la carga del archivo.';
    
        } else { 
    
            $truncateQuery = "TRUNCATE TABLE productos";
            if ($con->query($truncateQuery)) {
                
            } else {
                echo '<i class="fa-solid fa-xmark"></i> Error al limpiar la tabla: ' . $con->errorInfo()[2];
                exit; // Stop execution if cleaning the table fails
            }
    
            // Get file details
            $fileName = $_FILES['fileInput']['name'];
            $tempFilePath = $_FILES['fileInput']['tmp_name'];
    
            // Move the uploaded file to the specified directory
            $targetFilePath = $directorioDescarga . $fileName;
            move_uploaded_file($tempFilePath, $targetFilePath);
    
            // Open and read the CSV file
            $csvFile = fopen($targetFilePath, 'r');
    
            // Skip the header row
            fgetcsv($csvFile);
    
            // Prepare the INSERT statement
            $sql4 = $con->prepare("INSERT INTO productos (`Código`, `Producto`, `Categoría`, `kG x Unidad`, `KG x Bulto`, `Precio x Unidad`, `Precio x Bulto`) VALUES (?, ?, ?, ?, ?, ?, ?)");
    
            // Loop through the CSV rows and insert into the database
            while (($data = fgetcsv($csvFile)) !== false) {
                $sql4->execute($data);
            }
    
            // Close the file and database connection
            fclose($csvFile);
            $con = null;
    
            echo '<i class="fa-solid fa-check"></i>';
        }
    }
    



?>