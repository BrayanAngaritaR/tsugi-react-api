<?php
require_once "../../config.php";

use \Tsugi\Util\U;
use \Tsugi\Util\Net;
use \Tsugi\Core\LTIX;

$http_origin = $_SERVER['HTTP_ORIGIN'];
$http_method = $_SERVER['REQUEST_METHOD'];

if ( strpos($http_origin, "http://localhost:") === 0 )  { 
    header("Access-Control-Allow-Origin: $http_origin");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Allow-Headers: x-tsugi-authorization');
    header('Access-Control-Max-Age: 86400');
    if ( $http_method == "OPTIONS" ) return;
}

$headers = apache_request_headers();

$session = U::get($headers, 'X-Tsugi-Authorization');
error_log("session ".$session);

if ( is_string($session) ) $_GET[session_name()] = $session;

$LAUNCH = LTIX::requireData(); 
if ( ! $USER->instructor ) {
    $OUTPUT->jsonError('not authorized');
    return;
}

$rows = $PDOX->allRowsDie("SELECT A.user_id,attend,A.ipaddr, displayname, email
            FROM {$CFG->dbprefix}attend AS A
            JOIN {$CFG->dbprefix}lti_user AS U ON U.user_id = A.user_id
            WHERE link_id = :LI ORDER BY attend DESC, user_id",
     array(':LI' => $LINK->id)
);

foreach($rows as $row) {
    $displayname = $row['user_id'];
    if ( strlen($row['email']) > 0 ) {
        $displayname .= ' | ';
        $displayname .= $row['email'] ;
    }
    if ( strlen($row['displayname']) > 0 ) {
        $displayname .= ' | ';
        $displayname .= $row['displayname'] ;
    }
    $row['displayname'] = $displayname;
}

$OUTPUT->jsonOutput($rows);

