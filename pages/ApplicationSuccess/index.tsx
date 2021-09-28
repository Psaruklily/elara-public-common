import React from 'react';
import { ReactComponent as SuccessIcon } from '../../assets/application-success-icon.svg';
import { Button, Tooltip, List } from '../../components';
import { navigationStack } from '../../services';
import './styles.scss';

const SafeRentTooltip = () => (
  <Tooltip
    title="What is SafeRent?"
    text={<p><b>SafeRent</b> helps Elara with providing a solid resident background screening solution.<br /><br />There will be a questionnaire for your to complete for Elara to better understand your status of Income & Employment, Identity, Background Check, and Rental History. You will be charged a fee for this service.</p>}
    learnMoreUrl="https://saferentsolutions.com/resident-screening/"
  />
);

export default () => (
  <div className="ApplicationSuccessPage">
    <div className="ApplicationSuccessPage__content">
      <SuccessIcon />

      <h1 className="ApplicationSuccessPage__title">Application Request Submitted!</h1>

      <div className="ApplicationSuccessPage__message">
        <span>You have successfully started the application!</span>
        <span>We now need to verify a few more things with <b>SafeRent</b> <SafeRentTooltip /> before approving your application.</span>
      </div>

      <div className="ApplicationSuccessPage__check-list">
        <List
          items={[
            'Income & Employment',
            'Identity',
            'Background Check',
            'Rental History',
          ]}
        />
      </div>

      <div className="ApplicationSuccessPage__buttons">
        {/*<span className="ApplicationSuccessPage__buttons__finish-later">Email Me The Link to Finish Later</span>*/}

        <Button
          text="Continue to Finish Now"
          onClick={() => navigationStack.push('/')}
          theme="application-theme"
        />
      </div>
    </div>
  </div>
);
