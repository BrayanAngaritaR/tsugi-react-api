import * as React from 'react';
import '@patternfly/react-core/dist/styles/base.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppLayout } from '@app/AppLayout/AppLayout';
import { AppRoutes } from '@app/routes';
import '@app/app.css';

const App: React.FunctionComponent = () => {
  var bname="__TSUGI_RELATIVE_PATH__";
  // console.log('App running at:', bname);
  // console.log(_TSUGI);

  // const tsugi_global = _TSUGI;
  // console.log("===============================");
  // console.log(tsugi_global.ajax_session);
  // console.log("===============================");
  
  return (
  <Router basename={ bname }>
    <AppLayout>
      <AppRoutes />
    </AppLayout>
  </Router>
  );
};

export default App;
