<?php

require_once "../config.php";

use \Tsugi\Core\LTIX;

// No parameter means we require CONTEXT, USER, and LINK
$LAUNCH = LTIX::requireData();

$data = file_get_contents("dist/index.html");
$pos = strpos($data,"</head>");
echo(substr($data,0,$pos));
$OUTPUT->headerData();
echo(substr($data,$pos));


