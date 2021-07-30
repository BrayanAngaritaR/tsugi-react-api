import * as React from 'react';
import { PageSection, Title } from '@patternfly/react-core';

const Dashboard: React.FunctionComponent = () => (
  <PageSection>
    <Title headingLevel="h1" size="lg">Tsugi React</Title>
    <p>
        Welcome { _TSUGI.user_displayname } from { _TSUGI.context_title }
    </p>
  </PageSection>
)

export { Dashboard };
