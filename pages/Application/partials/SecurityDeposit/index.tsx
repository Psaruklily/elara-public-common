import React from 'react';
// @ts-ignore
import { LEASE } from 'picket-node-common/constants/elara';
import { RadioButtons, Tooltip } from '../../../../components';
import { IRadioButtonsOption } from '../../../../interfaces';
import { currencyFormatter } from '../../../../helpers';
import './styles.scss';

const LeaseLockTooltip = () => (
  <Tooltip
    title="What is LeaseLock?"
    text={<p>LeaseLock helps eliminate the financial burden for renters with <b>Zero Security Deposit</b> when renting a home. Instead, renters pay a small amount of monthly fee through LeaseLock that will automatically generate a $5000 insurance.</p>}
    learnMoreUrl="https://www.leaselock.com/zero-deposit"
  />
);

export default function SecurityDeposit(props: IProps) {
  const { onChange } = props;

  return (
    <div className="SecurityDeposit">
      <h2>How would you pay the security deposit?</h2>

      <div className="SecurityDeposit__script">
        Elara works with LeaseLock <LeaseLockTooltip /> to totally eliminate all security deposits. Instead, you will pay a small monthly deposit waiver fee alongside rent, to the property.
      </div>

      <RadioButtons
        options={[
          {
            value: true,
            display: <span>I prefer to pay a <b>monthly fee</b> at <b>{currencyFormatter.format(LEASE.FEES.SECURITY_MONTHLY)}</b> after move-in</span>,
          },
          {
            value: false,
            display: <span>I prefer to pay the <b>security deposit</b> of <b>{currencyFormatter.format(LEASE.FEES.SECURITY_ONCE)}</b> before move-in</span>,
          },
        ]}
        defaultSelectedIndex={1}
        onChange={onChange}
      />
    </div>
  );
}

interface IProps {
  onChange: (option: IRadioButtonsOption) => void;
}
