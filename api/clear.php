<?php
require_once "../../config.php";

use \Tsugi\Util\U;
use \Tsugi\Util\Net;
use \Tsugi\Core\Rest;
use \Tsugi\UI\Output;
use \Tsugi\Core\LTIX;

if ( Rest::preFlight() ) return;

// No parameter means we require CONTEXT, USER, and LINK
$LAUNCH = LTIX::requireData(); 

// Takes raw data from the request
$json = file_get_contents('php://input');
$data = json_decode($json);

// Model
$p = $CFG->dbprefix;
$old_code = $LAUNCH->link->settingsGet('code');
$send_grade = $LAUNCH->link->settingsGet('grade');
$match = $LAUNCH->link->settingsGet('match');
$ip = Net::getIP();


if ( $LAUNCH->user->instructor ) {
    $rows = $PDOX->queryDie("DELETE FROM {$p}attend WHERE link_id = :LI",
            array(':LI' => $LINK->id)
    );
} else {
    Net::send403();
    return;
}

$retval = new \stdClass();
$retval->status = "success";

echo(json_encode($retval));

