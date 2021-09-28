import React from 'react';
import './styles.scss';
import { ContactSupportLink } from '../../../../components';

const ErrorNotification = () => (
  <div className="ErrorNotification">
    <p>
      <span>Sorry for the inconvenience, please try again or contact us at&nbsp;</span>
      <ContactSupportLink />
      <span>&nbsp;to get support.</span>
    </p>
  </div>
);

export default ErrorNotification;
