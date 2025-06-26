<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

// Conexión a MySQL
$host = "52.45.232.96";
$dbname = "iabotcom_apptatumbo";
$user = "iabotcom_admintatumbo";
$pass = "UAXIgMXzp2b1Kx2";
$port = 3306;

try {
    $pdo = new PDO("mysql:host=$host;port=$port;dbname=$dbname;charset=utf8mb4", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => "Error de conexión"]);
    exit;
}

$input = json_decode(file_get_contents("php://input"), true);

if (!$input || !isset($input['visit_approval']) || !isset($input['site_survey'])) {
    http_response_code(400);
    echo json_encode(["error" => "Faltan datos"]);
    exit;
}

$visit = $input['visit_approval'];
$survey = $input['site_survey'];

try {
    $pdo->beginTransaction();

    // 1. Insertar VISIT APPROVAL
    $stmt1 = $pdo->prepare("
        INSERT INTO visit_approvals (
            site_name, visit_date, rssi, coverage_photo,
            connectivity_results, connectivity_photo,
            devices_tested, devices_photo,
            web_access_results, web_access_photo,
            equipment_functionality, equipment_photo,
            equipment_list, equipment_list_photo,
            conclusion, supervisor_signature
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ");
    $stmt1->execute([
        $visit['siteName'] ?? null,
        $visit['visitDate'] ?? null,
        $visit['rssi'] ?? null,
        $visit['coveragePhoto'] ?? null,
        $visit['connectivityResults'] ?? null,
        $visit['connectivityPhoto'] ?? null,
        $visit['devicesTested'] ?? null,
        $visit['devicesPhoto'] ?? null,
        $visit['webAccessResults'] ?? null,
        $visit['webAccessPhoto'] ?? null,
        $visit['equipmentFunctionality'] ?? null,
        $visit['equipmentPhoto'] ?? null,
        $visit['equipmentList'] ?? null,
        $visit['equipmentListPhoto'] ?? null,
        $visit['conclusion'] ?? null,
        $visit['signature'] ?? null
    ]);

    // 2. Insertar SITE SURVEY
    $stmt2 = $pdo->prepare("
        INSERT INTO site_surveys (
            site_name, address, topographic_conditions, topography_photo,
            infrastructure, infrastructure_photo,
            rf_noise, rf_snr, rf_survey_photo,
            cable_last_mile, cable_photo,
            headend_location, headend_photo,
            homes_location, homes_photo,
            client_signature
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ");
    $stmt2->execute([
        $survey['siteName'] ?? null,
        $survey['address'] ?? null,
        $survey['topographicConditions'] ?? null,
        $survey['topographyPhoto'] ?? null,
        $survey['infrastructure'] ?? null,
        $survey['infrastructurePhoto'] ?? null,
        $survey['rfNoise'] ?? null,
        $survey['rfSnr'] ?? null,
        $survey['rfSurveyPhoto'] ?? null,
        $survey['cableLastMile'] ?? null,
        $survey['cablePhoto'] ?? null,
        $survey['headendLocation'] ?? null,
        $survey['headendPhoto'] ?? null,
        $survey['homesLocation'] ?? null,
        $survey['homesPhoto'] ?? null,
        $survey['signature'] ?? null
    ]);

    $pdo->commit();
    echo json_encode(["success" => true, "message" => "Datos guardados correctamente"]);
} catch (Exception $e) {
    $pdo->rollBack();
    http_response_code(500);
    echo json_encode(["error" => "Error al guardar: " . $e->getMessage()]);
}
