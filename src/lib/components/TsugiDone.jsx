import * as React from 'react';

import {
  Button,
  PageHeaderTools,
} from '@patternfly/react-core';


function inIframe(props) {
  var retval =  (window.location !== window.parent.location );
  return ( retval );
}


// https://stackoverflow.com/questions/19761241/window-close-and-self-close-do-not-close-the-window-in-chrome
// How to close a window even if we did not open it
function window_close()
{
    window.close();
    setTimeout(function(){ console.log("Attempting self.close"); self.close(); }, 1000);
    setTimeout(function(){ console.log("Notifying the user."); alert(_TSUGI.window_close_message); open("about:blank", '_self').close(); }, 2000);
}

function TsugiDone() {
  function handleSubmit(e) {
    e.preventDefault();    console.log('You clicked submit.');
    window_close();
  }

  if ( inIframe() ) return null;

  return (
     <div>
      <Button onClick={handleSubmit}>Done</Button>
     </div>
  );
}

export { TsugiDone };
