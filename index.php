<?php

require_once "../config.php";

use \Tsugi\Core\LTIX;

// No parameter means we require CONTEXT, USER, and LINK
$LAUNCH = LTIX::requireData();

$data = file_get_contents("dist/index.html");
// Remove the developer data
$data = preg_replace("/<script>var starttsugi = true.*?<.script>/s", "", $data);
$pos = strpos($data,"</head>");
echo(substr($data,0,$pos));
echo($OUTPUT->headerData());
echo(substr($data,$pos));


